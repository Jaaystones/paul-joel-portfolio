
import { useEffect, useRef, useState } from 'react';

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 'Expert', color: 'from-green-400 to-green-600' },
        { name: 'JavaScript', level: 'Expert', color: 'from-yellow-400 to-yellow-600' },
        { name: 'SQL', level: 'Intermediate', color: 'from-blue-400 to-blue-600' },
        { name: 'Bash', level: 'Intermediate', color: 'from-gray-400 to-gray-600' },
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'Node.js', level: 'Expert', color: 'from-green-500 to-green-700' },
        { name: 'React', level: 'Expert', color: 'from-cyan-400 to-cyan-600' },
        { name: 'Express', level: 'Expert', color: 'from-gray-500 to-gray-700' },
        { name: 'Flask', level: 'Intermediate', color: 'from-blue-500 to-blue-700' },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Docker', level: 'Expert', color: 'from-blue-400 to-blue-600' },
        { name: 'AWS', level: 'Expert', color: 'from-orange-400 to-orange-600' },
        { name: 'Terraform', level: 'Intermediate', color: 'from-purple-400 to-purple-600' },
        { name: 'Git', level: 'Expert', color: 'from-red-400 to-red-600' },
      ]
    },
    {
      title: 'Data & AI',
      skills: [
        { name: 'Pandas', level: 'Expert', color: 'from-indigo-400 to-indigo-600' },
        { name: 'NumPy', level: 'Expert', color: 'from-blue-500 to-blue-700' },
        { name: 'Scikit-learn', level: 'Intermediate', color: 'from-orange-500 to-orange-700' },
        { name: 'Langflow', level: 'Beginner', color: 'from-teal-400 to-teal-600' },
      ]
    }
  ];

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'Expert': return 'w-5/6';
      case 'Intermediate': return 'w-3/5';
      case 'Beginner': return 'w-2/5';
      default: return 'w-1/2';
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-cyan-400 mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-slate-400 text-sm">{skill.level}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} ${getLevelWidth(skill.level)} transition-all duration-1000 ease-out rounded-full`}
                          style={{ 
                            transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`,
                            width: isVisible ? getLevelWidth(skill.level).replace('w-', '') === '5/6' ? '83.333333%' : 
                                   getLevelWidth(skill.level).replace('w-', '') === '3/5' ? '60%' : 
                                   getLevelWidth(skill.level).replace('w-', '') === '2/5' ? '40%' : '50%' : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
