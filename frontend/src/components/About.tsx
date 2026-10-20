import { motion } from 'motion/react';
import { Code, Palette, Zap, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function About() {
  const skills = [
    {
      category: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']
    },
    {
      category: 'Nástroje',
      items: ['Git', 'Linux', 'Figma', 'Vercel']
    }
  ];

  const highlights = [
    {
      icon: Code,
      title: 'Čistý kód',
      description: 'Psaní udržitelného, škálovatelného a efektivního kódu podle moderních standardů.'
    },
    {
      icon: Palette,
      title: 'Důraz na design',
      description: 'Tvorba estetických a přehledných rozhraní, která přináší skvělý uživatelský zážitek.'
    },
    {
      icon: Zap,
      title: 'Rychlost & Výkon',
      description: 'Optimalizace rychlosti načítání, přístupnosti (WCAG) a plynulého zobrazení na všech zařízeních.'
    },
    {
      icon: Users,
      title: 'Spolupráce',
      description: 'Otevřená a spolehlivá komunikace, schopnost srozumitelně vysvětlit technická řešení.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            O mně
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Jsem vývojář se zápalem pro moderní technologie a design s {new Date().getFullYear() - 2022} lety zkušeností s tvorbou webů. 
            Rád proměňuji složité problémy v jednoduchá, estetická a intuitivní řešení.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl mb-6">Moje cesta</h3>
            <p className="text-muted-foreground mb-6">
              K programování mě přivedla zvědavost a zájem o technologie. Postupně jsem vyrostl ve vývojáře, 
              který propojuje technický svět kódu s funkčním designem. Věřím v tvorbu řešení, 
              která nejen skvěle vypadají, ale především spolehlivě fungují a řeší skutečné potřeby uživatelů.
            </p>
            <p className="text-muted-foreground">
              Když zrovna nekóduji, věnuji se objevování nových technologií, bastlení s hardwarem a 3D tiskem nebo správě vlastního domácího serveru.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-4 h-full border-border/50 hover:border-chart-1/50 transition-colors">
                  <CardContent className="p-0">
                    <highlight.icon className="h-8 w-8 text-chart-1 mb-3" />
                    <h4 className="mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl text-center mb-8">Dovednosti &amp; Technologie</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-chart-1 mb-4">{skillGroup.category}</h4>
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill) => (
                        <motion.li
                          key={skill}
                          className="text-muted-foreground"
                          whileHover={{ x: 5, color: 'var(--foreground)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}