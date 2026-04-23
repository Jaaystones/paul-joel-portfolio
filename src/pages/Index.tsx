
import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white dark:focus:bg-slate-900 focus:text-slate-900 dark:focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-cyan-500"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<div className="py-24 text-center text-slate-600 dark:text-slate-400">Loading content...</div>}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
