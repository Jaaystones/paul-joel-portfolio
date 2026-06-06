import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Monitor } from 'lucide-react';
import FadeUp from './ui/FadeUp';

const ProjectDetailDialog = lazy(() => import('./ProjectDetailDialog.tsx'));

type Project = {
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  tech: string[];
  github?: string;
  demo?: string;
};

const normalizeUrl = (url?: string): string | undefined => {
  if (!url || url === 'undefined') return undefined;
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;
};

const PROJECTS: Project[] = [
  {
    title: 'Sugar Queen Bead Business',
    description:
      'E-commerce landing page for Sugar Queen, a handcrafted bead business. Focused on brand storytelling, product showcase, and conversion-optimised layout.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
    ],
    tech: ['React', 'Next.js', 'Docker', 'Tailwind CSS'],
    github: 'https://github.com/Jaaystones/sugar-queen-landing-page',
    demo: 'https://sugar-queen-landing-page.onrender.com',
  },
  {
    title: 'E Africa Website',
    description:
      'Corporate website for E Africa Services — a pan-African digital solutions firm. Includes service listings, case studies, and a contact pipeline.',
    image: 'e-africa copy.png',
    gallery: [
      'e-africa copy.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    ],
    tech: ['TypeScript', 'Next.js', 'PostgreSQL', 'Apache Kafka'],
    github: 'https://github.com/Jaaystones/enterprise-ui',
    demo: 'https://www.eafricaservices.com/',
  },
  {
    title: 'Spotter Logistics',
    description:
      'Full-stack truck logistics management platform. Drivers, dispatchers, and admins each get tailored dashboards with real-time load tracking.',
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop',
    ],
    tech: ['Django', 'React', 'Python', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/Jaaystones/spotter_api',
    demo: 'https://spotter-client.onrender.com/',
  },
  {
    title: 'Iriju Alufaa',
    description:
      'AI-powered pastor assistant that renders Bible passages with rich contextual captions and automatically formats sermon graphics for social media.',
    image: 'iriju.png',
    gallery: [
      'iriju.png',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=800&fit=crop',
    ],
    tech: ['FastAPI', 'React', 'Python', 'PostgreSQL'],
    // Private repo — linking to org profile instead
    github: 'https://github.com/Jaaystones',
    demo: 'https://www.irijuai.com/',
  },
  {
    title: 'GosPool App',
    description:
      'Ride-sharing platform built specifically for church communities. Members can post, join, and manage carpools to services and events.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
    ],
    tech: ['TypeScript', 'Vite', 'Tailwind CSS', 'PostgreSQL'],
    github: 'https://github.com/Jaaystones/MindWave_v3',
    demo: 'https://www.gospool.com/',
  },
  {
    title: 'Eventnoire Event Platform',
    description:
      'AI-assisted event scheduling and discovery platform for the Black community. Features intelligent venue matching and automated social promotion.',
    image: '/event-noire.png',
    gallery: [
      '/event-noire.png',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&h=800&fit=crop',
    ],
    tech: ['TypeScript', 'Redis', 'PostgreSQL', 'Docker'],
    // Repo is private — linking to GitHub profile
    github: 'https://github.com/Jaaystones',
    demo: 'https://www.eventnoire.com',
  },
];

// Placeholder shown when a project image fails to load or is unavailable
const MockupPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/15 via-slate-800 to-teal-500/15">
    <Monitor className="w-16 h-16 text-amber-500/30" />
  </div>
);

type ProjectRowProps = {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  shouldReduce: boolean;
};

const ProjectRow = ({ project, index, onOpen, shouldReduce }: ProjectRowProps) => {
  const [imgError, setImgError] = useState(false);
  const isReversed = index % 2 === 1;
  const demoUrl = normalizeUrl(project.demo);
  const codeUrl = normalizeUrl(project.github);

  return (
    <FadeUp delay={0.05}>
      <div
        className={`group flex flex-col gap-6 lg:gap-16 lg:items-center ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* ── Mockup ── */}
        <motion.div
          className="w-full lg:w-[52%] shrink-0 cursor-pointer max-w-xl mx-auto lg:max-w-none lg:mx-0"
          whileHover={shouldReduce ? {} : { scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={() => onOpen(project)}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title} case study`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen(project);
            }
          }}
        >
          <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)] group-hover:border-amber-500/20 transition-colors duration-300">
            {imgError ? (
              <MockupPlaceholder />
            ) : (
              <img
                src={project.image}
                alt={`${project.title} mockup`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            )}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            {/* "Click to expand" hint on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 rounded-full bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide backdrop-blur">
                View case study
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-5 lg:w-[48%]">
          {/* Index number */}
          <span className="font-mono text-xs text-amber-500/50 tracking-[0.2em]">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight group-hover:text-amber-300 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed text-[0.95rem]">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-teal-400 border border-teal-500/20 bg-teal-500/5 px-3 py-1 rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-1">
            <button
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
            >
              Case Study <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded"
              >
                Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeUp>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const shouldReduce = useReducedMotion() ?? false;

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section
      id="projects"
      tabIndex={-1}
      className="relative py-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
    >
      {/* Section background tint */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.04),transparent_50%)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <FadeUp>
          <div className="mb-16 lg:mb-24 max-w-2xl">
            <p className="font-mono text-xs text-amber-400/70 tracking-[0.3em] uppercase mb-4">
              Selected Work — {String(PROJECTS.length).padStart(2, '0')} projects
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
              Things I've{' '}
              <span className="bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
                built.
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              A focused collection of production work — each project shaped for
              real users, real constraints, and a high bar for quality.
            </p>
          </div>
        </FadeUp>

        {/* Alternating project rows */}
        <div className="space-y-20 lg:space-y-28">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              onOpen={openProject}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>

      {/* Case study dialog — lazy loaded */}
      {dialogOpen && selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailDialog
            project={selectedProject}
            open={dialogOpen}
            shouldReduceMotion={shouldReduce}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setSelectedProject(null);
            }}
          />
        </Suspense>
      )}
    </section>
  );
};

export default Projects;
