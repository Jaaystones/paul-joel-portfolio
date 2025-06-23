
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const qualities = [
    { title: 'Innovative Thinker', icon: '💡' },
    { title: 'Problem Solver', icon: '🔧' },
    { title: 'Team Player', icon: '🤝' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-1">
                <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full blur opacity-30"></div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              From petroleum engineering to tech innovation, my journey has been driven by curiosity and a passion for solving complex problems. As an ALX Software Engineering graduate (Cohort 9), I've transformed my analytical background into expertise in building scalable digital solutions.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              I specialize in backend engineering, cloud infrastructure, data analytics, and automation — bridging the gap between traditional engineering principles and cutting-edge technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {qualities.map((quality, index) => (
                <div key={index} className="bg-slate-900/50 p-4 rounded-lg text-center border border-slate-700/50 hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="text-2xl mb-2">{quality.icon}</div>
                  <div className="text-cyan-400 text-sm font-semibold">{quality.title}</div>
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
