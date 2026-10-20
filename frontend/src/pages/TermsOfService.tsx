import { motion } from 'motion/react';
import { ArrowLeft, Scale, Mail, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BUSINESS_INFO } from '../config/legal';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <Scale className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Všeobecné obchodní podmínky
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Pro poskytování služeb v oblasti vývoje webových aplikací a UI/UX designu dle zákona č. 89/2012 Sb., občanský zákoník
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
              1. Úvodní ustanovení a identifikace poskytovatele
            </h2>
            <p className="text-sm text-muted-foreground">
              Tyto všeobecné obchodní podmínky (dále jen „VOP“) upravují smluvní vztahy mezi poskytovatelem a objednatelem při poskytování služeb:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm bg-secondary/40 p-4 rounded-lg">
              <div><strong className="text-foreground">Poskytovatel:</strong> {BUSINESS_INFO.name}</div>
              <div><strong className="text-foreground">IČO:</strong> {BUSINESS_INFO.ico}</div>
              <div><strong className="text-foreground">Sídlo:</strong> {BUSINESS_INFO.address}</div>
              <div><strong className="text-foreground">Zápis:</strong> {BUSINESS_INFO.registeredIn}</div>
              <div><strong className="text-foreground">Plátce DPH:</strong> {BUSINESS_INFO.vatStatus}</div>
              <div>
                <strong className="text-foreground">E-mail:</strong>{' '}
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
              <span className="text-chart-1">2.</span> Předmět poskytovaných služeb
            </h2>
            <p className="text-sm text-muted-foreground">
              Poskytovatel se zabývá zakázkovým vývojem digitálních produktů a poskytováním IT služeb, zejména:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              <li>Vývoj frontendových a full-stack webových aplikací (React, Next.js, TypeScript apod.)</li>
              <li>Návrh uživatelského rozhraní a zkušenosti (UI/UX design, wireframing, prototypování ve Figmě)</li>
              <li>Optimalizace výkonu webů, přístupnosti (a11y) a SEO</li>
              <li>Technické konzultace a správa webových projektů</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Přesná specifikace díla nebo služby, rozsah prací a termíny plnění jsou vždy sjednány individuálně v písemné nabídce či objednávce (např. e-mailem).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">3.</span> Objednávka a uzavření smlouvy
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. Objednatel odešle poptávku prostřednictvím kontaktního formuláře na webu nebo e-mailem.
              </p>
              <p>
                2. Na základě poptávky poskytovatel zpracuje nezávaznou cenovou a termínovou kalkulaci s rámcovým rozsahem prací.
              </p>
              <p>
                3. Smlouva o dílo / poskytování služeb je uzavřena okamžikem, kdy objednatel nabídku písemně (postačí e-mailem) akceptuje, případně úhradou dohodnuté zálohové faktury.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">4.</span> Cena služeb a platební podmínky
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. Ceny služeb jsou sjednávány individuálně formou pevné ceny za projekt, nebo dle hodinové sazby s odhadem celkového času.
              </p>
              <p>
                2. Poskytovatel je <strong className="text-foreground">{BUSINESS_INFO.vatStatus}</strong>. Uvedené ceny jsou konečné.
              </p>
              <p>
                3. Poskytovatel je oprávněn před zahájením prací vystavit zálohovou fakturu (obvykle ve výši 30–50 % z celkové odhadované ceny díla). Zbývající část ceny je fakturována po řádném dokončení a předání díla.
              </p>
              <p>
                4. Splatnost faktur činí standardně 14 kalendářních dnů od data vystavení, není-li dohodnuto jinak. Platba probíhá bezhotovostním převodem na bankovní účet poskytovatele.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">5.</span> Součinnost objednatele a předání díla
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. Objednatel je povinen poskytnout včasnou a úplnou součinnost (zejména textové a grafické podklady, přístupy na hosting/doménu, specifikaci požadavků a zpětnou vazbu).
              </p>
              <p>
                2. O dobu prodlení objednatele s dodáním podkladů či zpětné vazby se automaticky prodlužuje dohodnutý termín dokončení díla.
              </p>
              <p>
                3. Po dokončení díla vyzve poskytovatel objednatele k akceptaci a předání díla (předvedením na testovacím serveru nebo předáním zdrojových kódů).
              </p>
              <p>
                4. Objednatel má lhůtu 7 pracovních dnů k vyjádření připomínek. Nevyjádří-li se objednatel v této lhůtě, má se za to, že dílo bylo bez výhrad převzato.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">6.</span> Autorská práva a licence k dílu
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. Vytvořené webové stránky, zdrojové kódy a grafické návrhy jsou autorským dílem ve smyslu zákona č. 121/2000 Sb. (autorský zákon).
              </p>
              <p>
                2. Poskytovatel uděluje objednateli <strong className="text-foreground">nevýhradní časově a územně neomezenou licenci</strong> k užití díla pro dohodnutý účel.
              </p>
              <p>
                3. Licence na objednatele přechází <strong className="text-foreground">až okamžikem úplného zaplacení celkové ceny díla</strong>. Do té doby není objednatel oprávněn dílo komerčně užívat.
              </p>
              <p>
                4. Poskytovatel je oprávněn uvést vytvořené dílo jako svou referenci ve svém profesním portfoliu, sociálních sítích a profesních prezentacích, pokud si strany písemně nedohodly doložku mlčenlivosti (NDA).
              </p>
              <p className="text-xs">
                5. Součástí díla mohou být open-source knihovny a komponenty třetích stran (např. React, Tailwind CSS, ikony), které podléhají svým původním volným licencím (MIT, Apache apod.).
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">7.</span> Odpovědnost za vady a reklamace
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                1. Poskytovatel odpovídá za to, že dílo při předání odpovídá sjednané specifikaci a je plně funkční v podporovaných moderních webových prohlížečích (Chrome, Firefox, Safari, Edge).
              </p>
              <p>
                2. Případné vady vzniklé prokazatelně chybou poskytovatele uplatní objednatel písemně na e-mail <a href={`mailto:${BUSINESS_INFO.email}`} className="text-chart-1 hover:underline">{BUSINESS_INFO.email}</a>.
              </p>
              <p>
                3. Poskytovatel neodpovídá za vady a nefunkčnost způsobené neodborným zásahem objednatele či třetích osob do zdrojového kódu, výpadky třetích stran (hosting, platební brány, API) nebo změnami v externích službách po předání díla.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">8.</span> Mimosoudní řešení spotřebitelských sporů (ADR)
            </h2>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border text-sm text-muted-foreground space-y-2">
              <p>
                Je-li objednatel spotřebitelem (fyzická osoba nejednající v rámci své podnikatelské činnosti), má právo na mimosoudní řešení spotřebitelského sporu ze smlouvy o poskytování služeb.
              </p>
              <p>
                Věcně příslušným subjektem pro mimosoudní řešení spotřebitelských sporů je:
              </p>
              <div className="text-foreground font-medium pl-2 border-l-2 border-chart-1">
                Česká obchodní inspekce (ČOI)<br />
                Ústřední inspektorát – oddělení ADR<br />
                Štěpánská 567/15, 120 00 Praha 2<br />
                Web: <a href="https://www.coi.cz" target="_blank" rel="noopener noreferrer" className="text-chart-1 hover:underline">www.coi.cz</a> | <a href="https://adr.coi.cz" target="_blank" rel="noopener noreferrer" className="text-chart-1 hover:underline">adr.coi.cz</a>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-chart-1">9.</span> Závěrečná ustanovení
            </h2>
            <p className="text-sm text-muted-foreground">
              Vztahy neupravené těmito VOP se řídí právním řádem České republiky, zejména zákonem č. 89/2012 Sb., občanský zákoník, a zákonem č. 121/2000 Sb., o právu autorském. Tyto VOP nabývají platnosti a účinnosti dnem {BUSINESS_INFO.lastUpdated}.
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

