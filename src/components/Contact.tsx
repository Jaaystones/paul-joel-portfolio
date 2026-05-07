
import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, type LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

type SocialLink = {
  icon: LucideIcon;
  href: string;
  target: '_blank' | '_self';
  label: string;
};

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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
    const newErrors: ContactFormErrors = {};

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
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from Paul Joel Portfolio Contact Form`
      );
      const mailtoUrl = `mailto:Joelpaul345@gmail.com?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoUrl;

      // Clear form after attempting to send
      setFormData({ name: '', email: '', message: '' });

      // Show success toast notification
      toast({
        title: "Email Client Opened",
        description: "Your default email client should now be open with the message pre-filled. Please send the email to complete your message.",
        variant: "default",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = name as keyof ContactFormData;

    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const socialLinks: SocialLink[] = [
    { icon: Mail, href: 'mailto:Joelpaul345@gmail.com', target: '_blank', label: 'Email' },
    { icon: Github, href: 'https://github.com/Jaaystones', target: '_blank', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/paul-joel-osagie', target: '_blank', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" ref={sectionRef} tabIndex={-1} className="py-20 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.96),_rgba(15,23,42,0.98))] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`mx-auto mb-16 max-w-3xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-indigo-400 mx-auto rounded-full shadow-[0_0_18px_rgba(99,102,241,0.18)]"></div>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Let's collaborate or talk tech. I am always open to new opportunities and thoughtful projects.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            <div className="h-full rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Whether you have a project in mind, want to discuss technology, or simply want to connect, I would love to hear from you.
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-sky-300/30 transition-all duration-300 group backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <link.icon className="w-6 h-6 text-sky-200 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            <div className="h-full rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full p-4 bg-white/5 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 backdrop-blur-sm ${errors.name ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full p-4 bg-white/5 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 backdrop-blur-sm ${errors.email ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full p-4 bg-white/5 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 resize-none backdrop-blur-sm ${errors.message ? 'border-red-500' : 'border-white/10'
                      }`}
                  ></textarea>
                  {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_18px_50px_-18px_rgba(99,102,241,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
