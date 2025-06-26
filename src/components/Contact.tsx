
import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:Joelpaul345@example.com', target: '_blank', label: 'Email' },
    { icon: Github, href: 'https://github.com/Jaaystones', target: '_blank', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/paul-joel-osagie', target: '_blank', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-6 text-lg">
            Let's collaborate or talk tech! I'm always excited to discuss new opportunities and innovative projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Whether you have a project in mind, want to discuss technology, or simply want to connect, I'd love to hear from you. Let's build something amazing together!
            </p>
            
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.target}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <link.icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-slate-300 group-hover: text-white transition-colors duration-300">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-4 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-slate-700/50'
                  }`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-4 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-slate-700/50'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-4 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500' : 'border-slate-700/50'
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-cyan-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
