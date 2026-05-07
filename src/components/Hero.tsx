
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" tabIndex={-1} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_34%),linear-gradient(to_bottom,_#060816,_#0b1120_50%,_#050816)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sky-400/8 rounded-full blur-3xl motion-safe:animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl motion-safe:animate-pulse motion-safe:delay-1000"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl motion-safe:animate-pulse motion-safe:delay-500"></div>
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute top-20 left-20 text-sky-200/20 text-sm font-mono motion-safe:animate-float">const developer = 'Joel';</div>
        <div className="absolute top-40 right-32 text-indigo-200/20 text-sm font-mono motion-safe:animate-float motion-safe:delay-300">console.log('Building the future');</div>
        <div className="absolute bottom-32 left-16 text-violet-200/20 text-sm font-mono motion-safe:animate-float motion-safe:delay-700">function innovate() {'{'}return magic;{'}'}</div>
        <div className="absolute bottom-40 right-20 text-sky-200/20 text-sm font-mono motion-safe:animate-float motion-safe:delay-1000">// Code that changes the world</div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="motion-safe:animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-sky-200 via-indigo-200 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(148,163,184,0.08)]">
            Hi, I'm Paul Joel
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 mb-4 font-light tracking-wide">
            Software Engineer | Data Scientist | Cloud Architect
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I build scalable digital solutions that transform ideas into impact.
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 text-slate-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 motion-safe:transform motion-safe:hover:scale-105 hover:shadow-[0_18px_50px_-18px_rgba(99,102,241,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Explore My Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 motion-safe:animate-bounce">
        <ChevronDown className="text-slate-500 w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
