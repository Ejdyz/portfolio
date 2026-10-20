require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Konfigurace z proměnných prostředí ---
const PORT = parseInt(process.env.PORT || "3001", 10);
const SMTP_HOST = process.env.SMTP_HOST || "smtp.seznam.cz";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
// SMTP_SECURE: pokud je explicitně nastaveno v env ("true" / "false"), použije se. Jinak automaticky true pro port 465.
const SMTP_SECURE = process.env.SMTP_SECURE !== undefined
  ? (process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1")
  : (SMTP_PORT === 465);

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;
const SITE_NAME = process.env.SITE_NAME || "Jan Adam – Portfolio";
const EMAIL_FROM_NAME = process.env.EMAIL_FROM || SITE_NAME;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET;
const DEFAULT_LANG = (process.env.API_LANG || "cs").toLowerCase().slice(0, 2);

// --- Vícejazyčné slovníky (i18n) ---
const MESSAGES = {
  cs: {
    missingSecret: "Turnstile secret není nakonfigurován.",
    missingToken: "Chybí ověřovací Turnstile token.",
    turnstileFailed: "Ověření Turnstile selhalo.",
    turnstileError: "Chyba při ověřování Turnstile.",
    missingFields: "Vyplňte prosím všechna povinná pole (jméno, e-mail, zpráva).",
    sendSuccess: "Zpráva byla úspěšně odeslána!",
    sendError: "Chyba při odesílání e-mailu.",
    formatSubject: (subj, site) => subj ? `Nová zpráva z ${site}: ${subj}` : `Nová zpráva z webu ${site}`,
    formatBody: ({ name, email, subject, message }) =>
      `Jméno: ${name}\nE-mail: ${email}\nPředmět: ${subject || "Neuveden"}\n\nZpráva:\n${message}`,
  },
  en: {
    missingSecret: "Turnstile secret is not configured.",
    missingToken: "Missing Turnstile verification token.",
    turnstileFailed: "Turnstile verification failed.",
    turnstileError: "Error during Turnstile verification.",
    missingFields: "Please fill in all required fields (name, email, message).",
    sendSuccess: "Message sent successfully!",
    sendError: "Error sending email.",
    formatSubject: (subj, site) => subj ? `New message from ${site}: ${subj}` : `New message from ${site}`,
    formatBody: ({ name, email, subject, message }) =>
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "None"}\n\nMessage:\n${message}`,
  },
};

/**
 * Zjistí jazyk pro odpověď:
 * 1. Přednost má explicitní `lang` z těla požadavku (nebo query)
 * 2. Následuje hlavička Accept-Language
 * 3. Fallback na nastavení z env (API_LANG)
 */
function resolveLang(req) {
  const reqLang = req.body?.lang || req.query?.lang;
  if (reqLang && MESSAGES[reqLang.toLowerCase().slice(0, 2)]) {
    return reqLang.toLowerCase().slice(0, 2);
  }
  const headerLang = req.headers["accept-language"];
  if (headerLang) {
    const candidate = headerLang.toLowerCase().slice(0, 2);
    if (MESSAGES[candidate]) return candidate;
  }
  return MESSAGES[DEFAULT_LANG] ? DEFAULT_LANG : "cs";
}

// Konfigurace Nodemailer transporteru
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("⚠️ Varování: EMAIL_USER nebo EMAIL_PASS není nastaven v .env. Odesílání e-mailů nebude fungovat.");
}

// Hlavní endpoint pro odeslání zprávy
app.post("/send", async (req, res) => {
  const lang = resolveLang(req);
  const t = MESSAGES[lang];
  const { name, email, message, subject, turnstileToken } = req.body;

  // 1. Ověření Cloudflare Turnstile tokenu
  try {
    if (!TURNSTILE_SECRET) {
      return res.status(500).json({ success: false, error: t.missingSecret });
    }
    if (!turnstileToken) {
      return res.status(400).json({ success: false, error: t.missingToken });
    }

    const formData = new URLSearchParams();
    formData.append("secret", TURNSTILE_SECRET);
    formData.append("response", turnstileToken);
    if (req.ip) {
      formData.append("remoteip", req.ip);
    }

    const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const verifyJson = await verifyResp.json();
    if (!verifyJson.success) {
      return res.status(403).json({ success: false, error: t.turnstileFailed, data: verifyJson });
    }
  } catch (vErr) {
    console.error("Turnstile verify error:", vErr);
    return res.status(500).json({ success: false, error: t.turnstileError });
  }

  // 2. Základní validace vstupních polí
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: t.missingFields });
  }

  // 3. Odeslání e-mailu přes konfigurovaný SMTP server
  try {
    await transporter.sendMail({
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: t.formatSubject(subject, SITE_NAME),
      text: t.formatBody({ name, email, subject, message }),
      replyTo: email,
    });

    res.json({ success: true, message: t.sendSuccess });
  } catch (err) {
    console.error("Nodemailer send error:", err);
    res.status(500).json({ success: false, error: err.message || t.sendError });
  }
});

// Health check endpoint pro monitoring a ověření konfigurace
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      configured: Boolean(EMAIL_USER && EMAIL_PASS),
    },
    apiLang: DEFAULT_LANG,
    siteName: SITE_NAME,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server běží na portu ${PORT} (SMTP: ${SMTP_HOST}:${SMTP_PORT}, Secure: ${SMTP_SECURE}, Jazyk: ${DEFAULT_LANG})`);
});
