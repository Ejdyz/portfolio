import { motion } from 'motion/react';
import { Heart, ArrowUp, ShieldCheck, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { BUSINESS_INFO } from '../config/legal';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.pathname = path;
    }
  };

  return (
    <footer className="py-12 border-t border-border bg-secondary/20 text-muted-foreground">
      <div className="container mx-auto px-4">
        {/* Top / Main Footer Info */}
        <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-border/60 text-sm">
          {/* Column 1: Identity & Legal (§ 435 OZ) */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-base">
              {BUSINESS_INFO.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Frontend webový vývojář &amp; UI/UX designer.<br />
              Zakázkový vývoj moderních webů, frontendových aplikací a digitálních produktů.
            </p>
            <div className="pt-2 text-xs space-y-1 text-muted-foreground/90">
              <div><strong className="text-foreground">IČO:</strong> {BUSINESS_INFO.ico}</div>
              <div><strong className="text-foreground">Sídlo:</strong> {BUSINESS_INFO.address}</div>
              <div>{BUSINESS_INFO.registeredIn}</div>
              <div className="text-chart-1 font-medium">{BUSINESS_INFO.vatStatus}</div>
            </div>
          </div>

          {/* Column 2: Legal Documents & Compliance */}
          <div className="space-y-2 md:text-center">
            <h4 className="font-semibold text-foreground text-base">
              Právní informace &amp; Compliance
            </h4>
            <ul className="space-y-2 text-xs pt-1">
              <li>
                <a
                  href="/ochrana-osobnich-udaju"
                  onClick={(e) => handleLinkClick(e, '/ochrana-osobnich-udaju')}
                  className="hover:text-chart-1 transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-chart-1" />
                  Ochrana osobních údajů &amp; Cookies
                </a>
              </li>
              <li>
                <a
                  href="/obchodni-podminky"
                  onClick={(e) => handleLinkClick(e, '/obchodni-podminky')}
                  className="hover:text-chart-1 transition-colors inline-flex items-center gap-1.5"
                >
                  <Scale className="h-3.5 w-3.5 text-chart-1" />
                  Všeobecné obchodní podmínky (VOP)
                </a>
              </li>
              <li className="text-[11px] text-muted-foreground/80 pt-1">
                Web používá pouze technicky nezbytné zabezpečení (Cloudflare Turnstile). Žádné reklamní cookies.
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-2 md:text-right">
            <h4 className="font-semibold text-foreground text-base">
              Kontakt
            </h4>
            <p className="text-xs">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="hover:text-chart-1 transition-colors font-medium text-foreground"
              >
                {BUSINESS_INFO.email}
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Dostupný pro freelance spolupráci a konzultace.
            </p>
            <div className="flex md:justify-end gap-3 pt-2 text-xs">
              <a
                href={BUSINESS_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href={BUSINESS_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 text-xs">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <span>Vytvořil s</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
            </motion.div>
            <span>{BUSINESS_INFO.name}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground"
          >
            <p>&copy; {currentYear} {BUSINESS_INFO.name}. Všechna práva vyhrazena.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full hover:bg-chart-1/10 hover:text-chart-1 cursor-pointer"
              aria-label="Zpět nahoru"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Zpět nahoru</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
