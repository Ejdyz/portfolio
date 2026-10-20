import { motion } from 'motion/react';
import { ExternalLink, Github, Calendar, Tag, Figma } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: 'Meteostanice (Weather Station)',
      description: 'Kompletní meteorologické řešení s vlastní hardwarovou stanicí, serverem a webovou aplikací pro zobrazení naměřených dat v reálném čase.',
      image: '/weather-station.webp',
      tags: ['Next.js', 'Prisma', 'TypeScript', 'ShadCN', 'Tailwind'],
      date: '2023–2025',
      github: 'https://github.com/Ejdyz/weather-station',
      demo: 'https://weather.ejdy.cz',
      featured: true
    },
    {
      title: 'Správa ročníkových projektů (SRP)',
      description: 'Zabezpečená webová aplikace pro studenty a pedagogy pro efektivní správu projektů, termínů, hodnocení a obhajob.',
      image: '/srp-banner.webp',
      tags: ['KODEXIA', 'Next.js', 'JavaScript', 'Tailwind', 'HeroUI', 'Prisma'],
      date: '2023–2025',
      github: 'https://github.com/Kodexia',
      demo: 'https://test.srp.spsul.cz',
      featured: true
    },
    {
      title: 'Taskify',
      description: 'Aplikace pro správu úkolů a osobní produktivitu s přehledným rozhraním a asistencí AI.',
      image: '/taskify.webp',
      tags: ['Next.js', 'MagicUI', 'TypeScript', 'Tailwind'],
      date: '2025',
      github: 'https://github.com/Ejdyz/Taskify',
      demo: 'https://taskify.ejdy.cz',
      featured: false
    },
    {
      title: 'QuiznFun',
      description: 'Zábavná a interaktivní kvízová aplikace s kategoriemi vytvořená pro podporu výuky ve školách.',
      image: '/quiznfun.webp',
      tags: ['Next.js', 'TypeScript', 'HeroUI', 'PostgreSQL'],
      date: '2023',
      github: 'https://github.com/Kodexia/QuiznFun',
      demo: 'https://quiznfun.ejdy.cz',
      featured: false
    },
    {
      title: 'Panema s.r.o. – Firemní web',
      description: 'Kompletní návrh firemního webu a design systému ve Figmě pro společnost Panema s.r.o.',
      image: '/panema.webp',
      tags: ['Figma'],
      date: '2025',
      figma: 'https://www.figma.com/design/gCANvkrGiDLePUV8zXYxIH/Panema-V2?node-id=0-1&t=1ZLLlyt3DdVwHmnK-1',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Vybrané projekty
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ukázka projektů, na kterých demonstruji své zkušenosti s vývojem moderních webových aplikací, 
            UI/UX designem a řešením praktických úloh.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <motion.div
                className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110 rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                         {project.figma && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.figma} target="_blank" rel="noopener noreferrer" aria-label={`Figma design pro ${project.title}`}>
                                <Figma className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.github && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repozitář pro ${project.title}`}>
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.demo && (
                          <Button size="sm" variant="secondary" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Živé demo pro ${project.title}`}>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl mb-4 text-chart-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-chart-1/10 text-chart-1 border border-chart-1/20"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Zdrojový kód
                      </a>
                    </Button>
                    <Button asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Živé demo
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl text-center mb-12">Další projekty</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={350}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl hover:rounded-t-xl"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        {project.figma && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.figma} target="_blank" rel="noopener noreferrer" aria-label={`Figma návrh pro ${project.title}`}>
                                <Figma className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.github && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repozitář pro ${project.title}`}>
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.demo && (
                          <Button size="sm" variant="secondary" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Živé demo pro ${project.title}`}>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          )}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.date}</span>
                    </div>
                    
                    <h4 className="text-xl mb-3 text-chart-1">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{project.tags.length - 3} dalších
                        </span>
                      )}
                    </div>
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