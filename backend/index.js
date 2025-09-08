require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure transporter for Seznam.cz
const transporter = nodemailer.createTransport({
  host: "smtp.seznam.cz",
  port: 465, // SSL port
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("⚠️ EMAIL_USER or EMAIL_PASS not set. Check your .env file.");
}

// Route to send email
app.post("/send", async (req, res) => {
  const { name, email, message, subject, turnstileToken } = req.body;

  // Verify Cloudflare Turnstile token first
  try {
    if (!process.env.TURNSTILE_SECRET) {
      return res.status(500).json({ success: false, error: "Turnstile secret not configured" });
    }
    if (!turnstileToken) {
      return res.status(400).json({ success: false, error: "Missing Turnstile token" });
    }

    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET);
    formData.append("response", turnstileToken);
    // Optionally: formData.append("remoteip", req.ip);

    const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const verifyJson = await verifyResp.json();
    if (!verifyJson.success) {
      return res.status(403).json({ success: false, error: "Turnstile verification failed", data: verifyJson });
    }
  } catch (vErr) {
    console.error("Turnstile verify error", vErr);
    return res.status(500).json({ success: false, error: "Turnstile verification error" });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to yourself
      subject: "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSubject: ${subject}`,
      replyTo: email, // so you can reply directly
    });

  res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS) });
});

app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
