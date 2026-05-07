
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, GithubIcon, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

type Project = {
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  tech: string[];
  github?: string;
  demo?: string;
};

const normalizeExternalUrl = (url?: string) => {
  if (!url) return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

const projectCountLabel = (count: number) => `${count.toString().padStart(2, '0')} projects`;

const PROJECTS: Project[] = [
  {
    title: 'Sugar Queen Bead Business',
    description: 'Landing page for the Sugar Queen bead business',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop'
    ],
    tech: ['React', 'Next.js', 'Docker', 'Tailwind CSS'],
    github: 'https://github.com/Jaaystones/sugar-queen-landing-page',
    demo: 'https://sugar-queen-landing-page.onrender.com'
  },
  {
    title: 'E Africa Website',
    description: 'Built a scalable data processing pipeline handling 1M+ events daily, with real-time dashboards and predictive analytics capabilities.',
    image: 'E-africa.png',
    gallery: [
      'E-africa.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ],
    tech: ['TypeScript', 'Apache Kafka', 'PostgreSQL', 'Next.js'],
    github: 'https://github.com/Jaaystones/enterprise-ui',
    demo: 'https://www.eafricaservices.com/'
  },
  {
    title: 'Spotter Logistics',
    description: 'Developed a robust application for Truck logistics management.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1521102765830-7e0f4c0a8a9d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop'
    ],
    tech: ['Django', 'React', 'Python', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/Jaaystones/spotter_api',
    demo: 'https://spotter-client.onrender.com/'
  },
  {
    title: 'Personalised Note App for Small Businesses',
    description: 'This is a note application for communication between business owners and employees.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=800&fit=crop'
    ],
    tech: ['Node.js', 'Redux', 'Postgres', 'React'],
    github: 'https://github.com/Jaaystones/Note-API',
    demo: 'https://stonegrowth.onrender.com/'
  },
  {
    title: 'GosPool APP',
    description: 'A rider sharing Platform for Church membership.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop'
    ],
    tech: ['TypeScript', 'Vite', 'Tailwind CSS', 'Postgres'],
    github: 'https://github.com/Jaaystones/MindWave_v3',
    demo: 'https://www.gospool.com/'
  },
  {
    title: 'Eventnoire Event Platform',
    description: 'High-performance AI event scheduling system with load balancing, fault tolerance, and horizontal scaling capabilities.',
    image: '/event-noire.png',
    gallery: [
      '/event-noire.png',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&h=800&fit=crop'
    ],
    tech: ['Typescript', 'Redis', 'PostgreSQL', 'Docker'],
    github: undefined,
    demo: 'www.eventnoire.com'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} tabIndex={-1} className="relative overflow-hidden py-24 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(to_bottom,_rgba(15,23,42,0.02),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_28%),linear-gradient(to_bottom,_rgba(2,6,23,0.2),_transparent_40%)]" />
      <div className="mx-auto max-w-6xl px-4">
        <div className={`mx-auto mb-16 max-w-3xl text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-sky-500/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-300/15 dark:bg-slate-900/60 dark:text-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            {projectCountLabel(PROJECTS.length)}
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl dark:text-white">
            Featured Projects
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
            A focused collection of production work, shaped for speed, clarity, and a high-end presentation layer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const demoUrl = normalizeExternalUrl(project.demo);
            const itemDelay = index * 0.12;

            return (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : itemDelay, ease: 'easeOut' }}
              className="rounded-lg"
            >
              <Card
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Open ${project.title} details`}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-white/60 bg-white/80 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/35 hover:shadow-[0_20px_60px_-18px_rgba(99,102,241,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 dark:border-white/5 dark:bg-slate-950/70 dark:hover:border-sky-300/25 dark:focus-visible:ring-offset-slate-900"
              >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onError={(event) => {
                    const img = event.currentTarget;
                    if (!img.dataset.fallbackApplied) {
                      img.src = '/placeholder.svg';
                      img.dataset.fallbackApplied = 'true';
                    }
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 dark:from-slate-950" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/60 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur dark:bg-indigo-500/15 dark:text-indigo-100">
                    Case study
                  </span>
                </div>
              </div>
              <CardHeader className="pb-0 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <p className="mb-5 text-sm leading-7 text-slate-600 dark:text-slate-400 md:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full border border-sky-500/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200 dark:border-sky-300/15 dark:bg-white/5 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200/70 pt-5 dark:border-white/5">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:ring-offset-slate-900"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-400 dark:text-slate-500" aria-label="Code link unavailable">
                    <GithubIcon className="w-4 h-4" />
                    <span className="text-sm">Code N/A</span>
                  </span>
                )}
                {demoUrl ? (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/15 transition-all duration-300 hover:translate-x-0.5 hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    Demo N/A
                  </span>
                )}
              </CardFooter>
              </Card>
            </motion.div>
            );
          })}
        </div>
        {/* Dialog for project details */}
        <Dialog.Root open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedProject(null);
        }}>
          <Dialog.Portal>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
            </motion.div>
            <Dialog.Content asChild>
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/50 bg-white/95 p-5 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 sm:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400" />
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <Dialog.Title className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                      {selectedProject?.title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                      {selectedProject?.description}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close project details" className="shrink-0 rounded-full border border-slate-200 bg-white/80 shadow-sm hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                      <X className="w-4 h-4" />
                    </Button>
                  </Dialog.Close>
                </div>

                {selectedProject && (
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative rounded-2xl bg-slate-100 p-3 dark:bg-slate-800/70">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {(selectedProject.gallery?.length ? selectedProject.gallery : [selectedProject.image]).map((slide, slideIndex) => (
                            <CarouselItem key={`${selectedProject.title}-${slideIndex}`}>
                              <div className="relative overflow-hidden rounded-2xl">
                                <img
                                  src={slide}
                                  alt={`${selectedProject.title} preview ${slideIndex + 1}`}
                                  className="h-[18rem] w-full object-cover sm:h-[22rem]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {(selectedProject.gallery?.length ?? 0) > 1 ? (
                          <>
                            <CarouselPrevious className="-left-2 border-white/20 bg-white/90 text-slate-900 shadow-lg hover:bg-white dark:border-white/10 dark:bg-slate-950/90 dark:text-white" />
                            <CarouselNext className="-right-2 border-white/20 bg-white/90 text-slate-900 shadow-lg hover:bg-white dark:border-white/10 dark:bg-slate-950/90 dark:text-white" />
                          </>
                        ) : null}
                      </Carousel>
                      <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
                        {selectedProject.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:bg-slate-950/80 dark:text-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Tech stack</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                          <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center gap-3">
                        {selectedProject.github ? (
                          <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white">
                            <GithubIcon className="h-4 w-4" /> Code
                          </a>
                        ) : null}
                        {normalizeExternalUrl(selectedProject.demo) ? (
                          <a href={normalizeExternalUrl(selectedProject.demo)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/15 transition-transform hover:translate-x-0.5">
                            Live Demo
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
};

export default Projects;
