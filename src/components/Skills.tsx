
import { useEffect, useRef, useState } from 'react';

type SkillLevel = 'Expert' | 'Intermediate' | 'Beginner';

type Skill = {
  name: string;
  level: SkillLevel;
  color: string;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const SKILL_LEVEL_WIDTH_CLASS: Record<SkillLevel, string> = {
  Expert: 'w-5/6',
  Intermediate: 'w-3/5',
  Beginner: 'w-2/5',
};

const SKILL_LEVEL_WIDTH_PERCENT: Record<SkillLevel, string> = {
  Expert: '83.333333%',
  Intermediate: '60%',
  Beginner: '40%',
};

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

  const skillCategories: SkillCategory[] = [
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

  const getLevelWidthClass = (level: SkillLevel) => SKILL_LEVEL_WIDTH_CLASS[level];

  const getLevelWidthPercent = (level: SkillLevel) => SKILL_LEVEL_WIDTH_PERCENT[level];

  return (
    <section id="skills" ref={sectionRef} tabIndex={-1} className="py-20 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.92),_rgba(2,6,23,0.95))] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-indigo-400 mx-auto rounded-full shadow-[0_0_18px_rgba(99,102,241,0.18)]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="bg-slate-950/55 p-6 rounded-3xl border border-white/10 hover:border-sky-300/25 transition-all duration-300 backdrop-blur-xl shadow-[0_16px_50px_-24px_rgba(15,23,42,0.9)]">
                <h3 className="text-xl font-bold text-sky-200 mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-100 font-medium">{skill.name}</span>
                        <span className="text-slate-400 text-sm">{skill.level}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} ${getLevelWidthClass(skill.level)} transition-all duration-1000 ease-out rounded-full`}
                          style={{
                            transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`,
                            width: isVisible ? getLevelWidthPercent(skill.level) : '0%'
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
