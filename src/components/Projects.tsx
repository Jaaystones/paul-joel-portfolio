
import { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';

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

  const projects = [
    {
      title: 'Sugar Queen Bead Business',
      description: 'Landing page for the Sugar Queen bead business',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      tech: ['React', 'LovableAi', 'Next.js', 'Docker'],
      github: 'https://github.com/Jaaystones/sugar-queen-landing-page',
      demo: 'https://sugar-queen-landing-page.loveable.app'
    },
    {
      title: 'Real-time Data Analytics Platform',
      description: 'Built a scalable data processing pipeline handling 1M+ events daily, with real-time dashboards and predictive analytics capabilities.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tech: ['Typscript', 'Apache Kafka', 'PostgreSQL', 'Next.js'],
      github: 'https://github.com/Jaaystones/type_script_projects',
      demo: 'https://type-script-projects-yc93.vercel.app/'
    },
    {
      title: 'Microservices E-commerce API',
      description: 'Developed a robust microservices architecture for e-commerce, featuring user management, Search, Media, and Posting processes.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      tech: ['Node.js', 'Express', 'MongoDB', 'Redis'],
      github: 'https://github.com/Jaaystones/social_media_microservice',
      demo: '#'
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
      title: 'Binoaural Sound System',
      description: 'Binoaural sound application with base and sweep frequency for mental alertness.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      tech: ['Typescript', 'Vite', 'Tailwind CSS', 'Postgres'],
      github: 'https://github.com/Jaaystones/MindWave_v3',
      demo: 'https://mindwave-v3.onrender.com/'
    },
    {
      title: 'Distributed Task Scheduler',
      description: 'High-performance task scheduling system with load balancing, fault tolerance, and horizontal scaling capabilities.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      tech: ['Go', 'Redis', 'PostgreSQL', 'Docker'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            A showcase of innovative solutions that demonstrate my expertise in full-stack development, cloud architecture, and data engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-slate-800 text-cyan-400 text-xs rounded-md border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.github}
                    className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
