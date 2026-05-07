import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/profile.jpg'; // ✅ Use your image file name here

type Quality = {
  title: string;
  icon: string;
};

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

  const qualities: Quality[] = [
    { title: 'Innovative Thinker', icon: '💡' },
    { title: 'Problem Solver', icon: '🔧' },
    { title: 'Team Player', icon: '🤝' },
  ];

  return (
    <section id="about" ref={sectionRef} tabIndex={-1} className="relative py-20 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.92),_rgba(15,23,42,0.92))] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-indigo-400 mx-auto rounded-full shadow-[0_0_18px_rgba(99,102,241,0.18)]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-3xl bg-gradient-to-br from-sky-500/12 via-indigo-500/10 to-violet-500/12 p-1 shadow-[0_20px_70px_-20px_rgba(99,102,241,0.18)]">
                <div className="w-full h-full rounded-[1.4rem] bg-slate-950/70 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <img
                    src={profileImg}
                    alt="Profile"
                    loading="lazy"
                    decoding="async"
                    className="rounded-full w-64 h-64 object-cover shadow-2xl ring-1 ring-white/10"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-400 rounded-full blur-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-violet-400 to-sky-400 rounded-full blur-2xl opacity-20"></div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.75)] backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              From petroleum engineering to tech innovation, my journey has been driven by curiosity and a passion for solving complex problems. As an ALX Software Engineering graduate (Cohort 9), I've transformed my analytical background into expertise in building scalable digital solutions.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              I specialize in backend engineering, cloud infrastructure, data analytics, and automation — bridging the gap between traditional engineering principles and cutting-edge technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {qualities.map((quality, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 hover:border-sky-300/30 transition-colors duration-300 backdrop-blur-sm"
                >
                  <div className="text-2xl mb-2">{quality.icon}</div>
                  <div className="text-sky-200 text-sm font-semibold">{quality.title}</div>
                </div>
              ))}
            </div>

            <a
              href="/Joel%20Osagie%20Paul%20CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_18px_50px_-18px_rgba(99,102,241,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Download Resume
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
