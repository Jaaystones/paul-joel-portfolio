import { ArrowUpRight, GithubIcon, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

import { Button } from './ui/button';
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

type ProjectDetailDialogProps = {
  project: Project;
  open: boolean;
  shouldReduceMotion: boolean;
  onOpenChange: (open: boolean) => void;
};

const normalizeExternalUrl = (url?: string) => {
  if (!url || url === 'undefined') return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

const ProjectDetailDialog = ({ project, open, shouldReduceMotion, onOpenChange }: ProjectDetailDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* ── Backdrop ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        </motion.div>

        {/*
          Centering wrapper — Dialog.Content becomes the full-screen flex
          container. The motion.div inside it is the visible modal box and
          only animates scale/opacity (no y offset) so it doesn't fight
          the CSS transform used for centering.
        */}
        <Dialog.Content
          className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6 overflow-y-auto focus:outline-none"
          // Prevent Radix from stealing focus away from the close button on open
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/98 p-4 sm:p-6 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl my-auto"
          >
            {/* Accent bar — updated to amber/teal palette */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-300 to-teal-400" />

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 pt-2">
              <div className="min-w-0">
                <Dialog.Title className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl truncate">
                  {project.title}
                </Dialog.Title>
                <Dialog.Description className="mt-1.5 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 line-clamp-2 sm:line-clamp-none">
                  {project.description}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close project details"
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Body — single column on mobile, two columns from md up */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_0.8fr]">

              {/* Carousel */}
              <div className="relative rounded-xl bg-slate-800/60 p-2 sm:p-3">
                <Carousel className="w-full">
                  <CarouselContent>
                    {(project.gallery?.length ? project.gallery : [project.image]).map((slide, slideIndex) => (
                      <CarouselItem key={`${project.title}-${slideIndex}`}>
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={slide}
                            alt={`${project.title} preview ${slideIndex + 1}`}
                            className="h-44 w-full object-cover sm:h-56 md:h-64"
                            loading={slideIndex === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (!img.dataset.fallbackApplied) {
                                img.src = '/placeholder.svg';
                                img.dataset.fallbackApplied = 'true';
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {(project.gallery?.length ?? 0) > 1 && (
                    <>
                      <CarouselPrevious className="-left-1 border-white/10 bg-slate-950/80 text-white shadow-lg hover:bg-slate-800" />
                      <CarouselNext className="-right-1 border-white/10 bg-slate-950/80 text-white shadow-lg hover:bg-slate-800" />
                    </>
                  )}
                </Carousel>
                {/* Tech badge strip overlaid on the image */}
                <div className="pointer-events-none absolute inset-x-5 bottom-5 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar — stack below carousel on mobile */}
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Tech Stack
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1 text-xs font-mono text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                  {project.github ? (
                    <a
                      href={normalizeExternalUrl(project.github)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Code
                    </a>
                  ) : null}
                  {normalizeExternalUrl(project.demo) ? (
                    <a
                      href={normalizeExternalUrl(project.demo)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    >
                      Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectDetailDialog;
