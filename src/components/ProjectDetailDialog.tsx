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
  if (!url) return undefined;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

const ProjectDetailDialog = ({ project, open, shouldReduceMotion, onOpenChange }: ProjectDetailDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
                  {project.title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  {project.description}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="Close project details" className="shrink-0 rounded-full border border-slate-200 bg-white/80 shadow-sm hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <X className="w-4 h-4" />
                </Button>
              </Dialog.Close>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative rounded-2xl bg-slate-100 p-3 dark:bg-slate-800/70">
                <Carousel className="w-full">
                  <CarouselContent>
                    {(project.gallery?.length ? project.gallery : [project.image]).map((slide, slideIndex) => (
                      <CarouselItem key={`${project.title}-${slideIndex}`}>
                        <div className="relative overflow-hidden rounded-2xl">
                          <img
                            src={slide}
                            alt={`${project.title} preview ${slideIndex + 1}`}
                            className="h-[18rem] w-full object-cover sm:h-[22rem]"
                            loading={slideIndex === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {(project.gallery?.length ?? 0) > 1 ? (
                    <>
                      <CarouselPrevious className="-left-2 border-white/20 bg-white/90 text-slate-900 shadow-lg hover:bg-white dark:border-white/10 dark:bg-slate-950/90 dark:text-white" />
                      <CarouselNext className="-right-2 border-white/20 bg-white/90 text-slate-900 shadow-lg hover:bg-white dark:border-white/10 dark:bg-slate-950/90 dark:text-white" />
                    </>
                  ) : null}
                </Carousel>
                <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span key={index} className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:bg-slate-950/80 dark:text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Tech stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white">
                      <GithubIcon className="h-4 w-4" /> Code
                    </a>
                  ) : null}
                  {normalizeExternalUrl(project.demo) ? (
                    <a href={normalizeExternalUrl(project.demo)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/15 transition-transform hover:translate-x-0.5">
                      Live Demo
                      <ArrowUpRight className="h-4 w-4" />
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