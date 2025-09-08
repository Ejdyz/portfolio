import { motion } from 'motion/react';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { turnstile?: any; } }

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  // undefined = not rendered/ loading, string = valid token, null = expired/cleared
  const [turnstileToken, setTurnstileToken] = useState<string | null | undefined>(undefined);
  const [captchaError, setCaptchaError] = useState(false);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const renderedRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    // Load script once
    if (!document.querySelector('script[data-turnstile]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-turnstile', 'true');
      script.onload = () => {
        if (window.turnstile && !renderedRef.current) {
          window.turnstile.render('#turnstile-widget', {
            sitekey: siteKey,
            callback: (token: string) => { setTurnstileToken(token); setCaptchaError(false); },
            'error-callback': () => { setCaptchaError(true); setTurnstileToken(undefined); },
            'expired-callback': () => { setTurnstileToken(undefined); },
            theme: 'auto'
          });
          renderedRef.current = true;
        }
      };
      document.head.appendChild(script);
    } else if (window.turnstile && !renderedRef.current) {
      window.turnstile.render('#turnstile-widget', {
        sitekey: siteKey,
        callback: (token: string) => { setTurnstileToken(token); setCaptchaError(false); },
        'error-callback': () => { setCaptchaError(true); setTurnstileToken(undefined); },
        'expired-callback': () => { setTurnstileToken(undefined); },
        theme: 'auto'
      });
      renderedRef.current = true;
    }
  }, [siteKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    if (!turnstileToken) {
      toast.error('Please complete captcha first.');
      return;
    }
    setSubmitting(true);
    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: formData.subject,
      turnstileToken
    };
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || 'Message sent successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTurnstileToken(undefined);
        renderedRef.current = false; // force re-render captcha
      } else {
        toast.error(result.message || 'Error sending message');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'adamhonzikcz@seznam.cz',
      href: 'mailto:adamhonzikcz@seznam.cz'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Czech Republic',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/Ejdyz',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jan-adam-68531b2a3/',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl mb-6">Send me a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </motion.div>
                  
                  <div className="my-4">
                    <div id="turnstile-widget" className="my-4 w-full flex justify-center" />
                    {captchaError && (
                      <p className="text-xs text-red-500 mt-2">Captcha error. <button type="button" className="underline" onClick={() => { setCaptchaError(false); setTurnstileToken(undefined); renderedRef.current = false; }}>Retry</button></p>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full group relative overflow-hidden"
                      disabled={submitting}
                    >
                      <motion.span
                        className="relative z-10 flex items-center justify-center"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {submitting ? 'Sending...' : 'Send Message'}
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors group"
                  >
                    <div className="p-3 rounded-full bg-chart-1/10 text-chart-1 group-hover:bg-chart-1 group-hover:text-white transition-colors">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.title}</p>
                      <p className="group-hover:text-chart-1 transition-colors">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full bg-secondary text-secondary-foreground transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/20">
              <CardContent className="p-0">
                <h4 className="text-xl mb-3 text-chart-1">Let's work together!</h4>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work. 
                  Let's discuss how we can bring your ideas to life.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}