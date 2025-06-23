
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-cyan-400/20 text-sm font-mono animate-float">const developer = 'Joel';</div>
        <div className="absolute top-40 right-32 text-blue-400/20 text-sm font-mono animate-float delay-300">console.log('Building the future');</div>
        <div className="absolute bottom-32 left-16 text-purple-400/20 text-sm font-mono animate-float delay-700">function innovate() { return magic; }</div>
        <div className="absolute bottom-40 right-20 text-cyan-400/20 text-sm font-mono animate-float delay-1000">// Code that changes the world</div>
      </div>
      
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hi, I'm Joel
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
            Software Engineer | Data Scientist | Cloud Architect
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I build scalable digital solutions that transform ideas into impact.
          </p>
          <button 
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-cyan-500/25"
          >
            Explore My Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400 w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
