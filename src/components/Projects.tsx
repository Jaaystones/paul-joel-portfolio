
import { useEffect, useRef, useState } from 'react';
import { GithubIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const normalizeExternalUrl = (url?: string) => {
  if (!url) return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

const PROJECTS: Project[] = [
  {
    title: 'Sugar Queen Bead Business',
    description: 'Landing page for the Sugar Queen bead business',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    tech: ['React', 'Next.js', 'Docker', 'Tailwind CSS'],
    github: 'https://github.com/Jaaystones/sugar-queen-landing-page',
    demo: 'https://sugar-queen-landing-page.onrender.com'
  },
  {
    title: 'E Africa Website',
    description: 'Built a scalable data processing pipeline handling 1M+ events daily, with real-time dashboards and predictive analytics capabilities.',
    image: 'public/E-africa.png',
    tech: ['TypeScript', 'Apache Kafka', 'PostgreSQL', 'Next.js'],
    github: 'https://github.com/Jaaystones/enterprise-ui',
    demo: 'https://www.hireeafrica.com/'
  },
  {
    title: 'Microservices E-commerce API',
    description: 'Developed a robust microservices architecture for e-commerce, featuring user management, Search, Media, and Posting processes.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    tech: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    github: 'https://github.com/Jaaystones/social_media_microservice'
  },
  {
    title: 'Personalised Note App for Small Businesses',
    description: 'This is a note application for communication between business owners and employees.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    tech: ['Node.js', 'Redux', 'Postgres', 'React'],
    github: 'https://github.com/Jaaystones/Note-API',
    demo: 'https://stonegrowth.onrender.com/'
  },
  {
    title: 'Binaural Sound System',
    description: 'Binaural sound application with base and sweep frequency for mental alertness.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    tech: ['TypeScript', 'Vite', 'Tailwind CSS', 'Postgres'],
    github: 'https://github.com/Jaaystones/MindWave_v3',
    demo: 'https://mindwave-v3.onrender.com/'
  },
  {
    title: 'Eventnoire Event Platform',
    description: 'High-performance AI event scheduling system with load balancing, fault tolerance, and horizontal scaling capabilities.',
    image: '/event-noire.png',
    tech: ['Typescript', 'Redis', 'PostgreSQL', 'Docker'],
    github: undefined,
    demo: 'www.eventnoire.com'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="projects" ref={sectionRef} tabIndex={-1} className="py-20 bg-slate-100/50 dark:bg-slate-800/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            A showcase of innovative solutions that demonstrate my expertise in full-stack development, cloud architecture, and data engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => {
            const demoUrl = normalizeExternalUrl(project.demo);

            return (
            <Card
              key={index}
              className={`group relative overflow-hidden hover:border-cyan-500/50 transition-all duration-300 motion-safe:hover:scale-[1.02] shadow-lg backdrop-blur-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
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
                  className="w-full h-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60"></div>
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-700 dark:text-slate-400 mb-4 text-base leading-relaxed font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 text-xs rounded-md border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                ) : (
                  <span className="flex items-center space-x-2 text-slate-400 dark:text-slate-500" aria-label="Code link unavailable">
                    <GithubIcon className="w-4 h-4" />
                    <span className="text-sm">Code N/A</span>
                  </span>
                )}
                {demoUrl ? (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800">
                    Demo N/A
                  </span>
                )}
              </CardFooter>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
