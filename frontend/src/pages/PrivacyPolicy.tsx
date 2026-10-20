import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BUSINESS_INFO } from '../config/legal';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Button
          variant="outline"
          onClick={onBack}
          className="group inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Zpět na portfolio
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-chart-1/10 text-chart-1">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Zásady zpracování osobních údajů a cookies
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              V souladu s nařízením GDPR (EU) 2016/679 a zákonem č. 127/2005 Sb., o elektronických komunikacích
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          Poslední aktualizace: <span className="font-medium text-foreground">{BUSINESS_INFO.lastUpdated}</span>
        </p>

        <Card className="mb-8 border-chart-1/20 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-1" />
              1. Identifikace správce osobních údajů
            </h2>
            <p className="text-sm text-muted-foreground">
              Správcem vašich osobních údajů je:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm bg-secondary/40 p-4 rounded-lg">
              <div><strong className="text-foreground">Jméno a příjmení:</strong> {BUSINESS_INFO.name}</div>
              <div><strong className="text-foreground">IČO:</strong> {BUSINESS_INFO.ico}</div>
              <div><strong className="text-foreground">Sídlo:</strong> {BUSINESS_INFO.address}</div>
              <div><strong className="text-foreground">Zápis:</strong> {BUSINESS_INFO.registeredIn}</div>
              <div><strong className="text-foreground">Plátcovství DPH:</strong> {BUSINESS_INFO.vatStatus}</div>
              <div>
                <strong className="text-foreground">Kontaktní e-mail:</strong>{' '}
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-chart-1 hover:underline">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">2.</span> Jaké osobní údaje zpracováváme
            </h2>
            <p className="text-muted-foreground">
              Zpracováváme pouze údaje, které nám sami dobrovolně poskytnete při odeslání kontaktního formuláře na webu <span className="text-foreground font-medium">{BUSINESS_INFO.website}</span>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              <li>Jméno a příjmení (nebo název společnosti)</li>
              <li>E-mailová adresa</li>
              <li>Předmět zprávy a obsah vaší poptávky či dotazu</li>
              <li>Technické bezpečnostní telemetrické údaje (Cloudflare Turnstile token sloužící k ochraně před nevyžádaným spamem a roboty)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">3.</span> Účel a právní základ zpracování
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Vaše osobní údaje zpracováváme výhradně pro tyto zákonné účely:
              </p>
              <div className="p-4 rounded-lg bg-secondary/30 space-y-2 border border-border">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-1 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Vyřízení vaší poptávky a komunikace s vámi:</strong> Právním základem je provedení opatření před uzavřením smlouvy na vaši žádost dle čl. 6 odst. 1 písm. b) GDPR.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-1 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Ochrana webu a bezpečnost proti zneužití:</strong> Právním základem je oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR) na zabezpečení webové aplikace a infrastruktury před kybernetickými útoky.
                  </div>
                </div>
              </div>
              <p className="text-xs italic text-muted-foreground">
                Poznámka: Vaše údaje nejsou využívány pro zasílání nevyžádaných obchodních sdělení (newsletterů) ani předávány marketingovým agenturám.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">4.</span> Doba uchování osobních údajů
            </h2>
            <p className="text-sm text-muted-foreground">
              Údaje z kontaktního formuláře uchováváme pouze po dobu nezbytnou pro vyřízení vzájemné komunikace a zodpovězení vaší poptávky, maximálně však po dobu 2 let od poslední vzájemné komunikace (z důvodu ochrany oprávněných zájmů a případné obhajoby právních nároků), pokud mezi námi nedojde k uzavření smlouvy o dílo / poskytování služeb (v takovém případě se doba řídí daňovými a účetními předpisy).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">5.</span> Kdo jsou příjemci a zpracovatelé údajů
            </h2>
            <p className="text-sm text-muted-foreground">
              K vašim údajům má přístup správce. Pro technické zajištění chodu webu využíváme prověřené smluvní partnery (zpracovatele), kteří splňují veškeré bezpečnostní standardy GDPR:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              <li><strong className="text-foreground">Cloudflare, Inc.</strong> – bezpečnostní služba Cloudflare Turnstile pro ověření člověk/robot a CDN ochrana.</li>
              <li><strong className="text-foreground">Seznam.cz, a.s.</strong> – poskytovatel poštovního serveru (SMTP) pro doručování e-mailových zpráv.</li>
              <li><strong className="text-foreground">Poskytovatel webhostingu / serverové infrastruktury</strong> zajišťující technický provoz webu.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-chart-1" />
              <span className="text-chart-1">6.</span> Zásady používání souborů cookies
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Tento web klade maximální důraz na ochranu vašeho soukromí. <strong>Web nepoužívá žádné analytické ani reklamní cookies třetích stran</strong> (jako jsou Google Analytics, Meta Pixel, Seznam Sklik apod.).
              </p>
              <p>
                Na webu jsou využívány výhradně <strong>nezbytné technické a bezpečnostní identifikátory</strong>:
              </p>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <strong className="text-foreground">Cloudflare Turnstile token:</strong> Krátkodobý bezpečnostní token nezbytný pro rozlišení reálného návštěvníka od automatizovaných robotů a ochranu kontaktního formuláře. Dle § 89 zákona č. 127/2005 Sb. tyto technicky nezbytné prvky nevyžadují udělení opt-in souhlasu uživatele.
              </div>
              <p className="text-xs">
                Místní úložiště prohlížeče (LocalStorage) může být dále využito pro uložení vámi preferovaného barevného motivu (světlý/tmavý režim), což nepředstavuje sledování napříč sítěmi.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">7.</span> Vaše práva dle GDPR
            </h2>
            <p className="text-sm text-muted-foreground">
              V souvislosti se zpracováním vašich osobních údajů máte vůči správci následující práva:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-border bg-card">
                <strong className="text-foreground block mb-1">Právo na přístup k údajům</strong>
                <span className="text-muted-foreground text-xs">Máte právo vědět, zda a jaké vaše údaje zpracováváme.</span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <strong className="text-foreground block mb-1">Právo na opravu</strong>
                <span className="text-muted-foreground text-xs">Máte právo na opravu nepřesných či neaktuálních údajů.</span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <strong className="text-foreground block mb-1">Právo na výmaz (být zapomenut)</strong>
                <span className="text-muted-foreground text-xs">Můžete požádat o smazání údajů, pokud pominul účel jejich zpracování.</span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <strong className="text-foreground block mb-1">Právo vznést námitku</strong>
                <span className="text-muted-foreground text-xs">Máte právo vznést námitku proti zpracování na základě oprávněného zájmu.</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Pro uplatnění jakéhokoliv práva nás kontaktujte na e-mailu{' '}
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-chart-1 font-medium hover:underline">
                {BUSINESS_INFO.email}
              </a>. Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do 30 dnů.
            </p>
            <p className="text-sm text-muted-foreground">
              Pokud se domníváte, že s vašimi údaji nakládáme v rozporu s právními předpisy, máte právo podat stížnost u dozorového úřadu:{' '}
              <strong className="text-foreground">Úřad pro ochranu osobních údajů (ÚOOÚ)</strong>, Pplk. Sochora 27, 170 00 Praha 7,{' '}
              <a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer" className="text-chart-1 hover:underline">
                www.uoou.gov.cz
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="group inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Zpět na portfolio
          </Button>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="text-sm text-muted-foreground hover:text-chart-1 inline-flex items-center gap-1.5 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {BUSINESS_INFO.email}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

