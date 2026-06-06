import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// Stagger config — each child animates in 150 ms after the previous.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="home"
      tabIndex={-1}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      {/* Dot-grid background layer */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(245,158,11,0.55) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Radial vignette that fades the dots toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,#020617_100%)]"
      />

      {/* Ambient light: warm gold top-left, cool teal bottom-right */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-amber-500/10 blur-[100px] motion-safe:animate-pulse"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[100px] motion-safe:animate-pulse"
        style={{ animationDelay: '1.2s' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        variants={shouldReduce ? undefined : containerVariants}
        initial={shouldReduce ? 'visible' : 'hidden'}
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs tracking-[0.35em] uppercase text-amber-400/80 mb-8"
        >
          Full-Stack Engineer · Data Scientist · Cloud Architect
        </motion.p>

        {/* Headline — splits name for a two-tone effect */}
        <motion.h1
          variants={itemVariants}
          className="text-[3.25rem] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8"
        >
          <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Paul{' '}
          </span>
          <span className="bg-gradient-to-br from-amber-400 via-amber-300 to-teal-400 bg-clip-text text-transparent">
            Joel
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-12"
        >
          I build scalable digital solutions that transform ideas into impact —
          from data pipelines to polished product interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm tracking-wide transition-all duration-300 motion-safe:hover:scale-105 hover:shadow-[0_0_32px_rgba(245,158,11,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-white font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            About Me
          </button>
        </motion.div>
      </motion.div>

      {/* Animated scroll cue */}
      <motion.button
        aria-label="Scroll down"
        onClick={() => scrollTo('projects')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
        animate={shouldReduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};

export default Hero;
