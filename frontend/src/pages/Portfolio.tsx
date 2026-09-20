import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Clock from '../components/Clock';
import { motion, AnimatePresence } from 'framer-motion';

const mockProjects = [
  { id: '1', title: 'Aplikasi E-Commerce', description: 'Platform e-commerce dengan React dan Node.js' },
  { id: '2', title: 'Sistem Manajemen Inventaris', description: 'Aplikasi desktop untuk manajemen barang' },
  { id: '3', title: 'Blog Pribadi', description: 'Blog minimalis dengan Gatsby dan Markdown' }
];

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100vh' : '-100vh',
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.4, delay: 0.1 }
    },
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100vh' : '-100vh',
    opacity: 0,
    scale: 0.9,
    transition: {
      y: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    },
  }),
};

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const sections = ['home', 'about', 'projects', 'contact'];

  const paginate = (newDirection: number) => {
    const nextSection = currentSection + newDirection;
    if (nextSection >= 0 && nextSection < sections.length) {
      setDirection(newDirection);
      setCurrentSection(nextSection);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) {
        paginate(1);
      } else if (e.deltaY < -50) {
        paginate(-1);
      }
    };

    let timeout: ReturnType<typeof setTimeout>;
    const debouncedWheel = (e: WheelEvent) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => handleWheel(e), 100);
    };

    window.addEventListener('wheel', debouncedWheel);
    return () => window.removeEventListener('wheel', debouncedWheel);
  }, [currentSection]);

  useEffect(() => {
    const handleNav = (e: any) => {
      const targetId = e.detail;
      const index = sections.indexOf(targetId);
      if (index !== -1 && index !== currentSection) {
        setDirection(index > currentSection ? 1 : -1);
        setCurrentSection(index);
      }
    };

    window.addEventListener('navigateToSection', handleNav);
    return () => window.removeEventListener('navigateToSection', handleNav);
  }, [currentSection]);

  const renderSection = () => {
    switch (sections[currentSection]) {
      case 'home':
        return (
          <motion.div
            key="home"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center bg-m3-background p-8"
          >
            <Clock />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center bg-m3-surface p-8 max-w-5xl mx-auto gap-8"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-m3-primary shadow-xl shrink-0">
               <img src="https://via.placeholder.com/256" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-m3-primary mb-4">Tentang Saya</h2>
              <p className="text-lg text-m3-secondary leading-relaxed">
                Halo! Saya adalah seorang pengembang perangkat lunak yang antusias dalam menciptakan pengalaman web yang menarik dan fungsional.
                Dengan keahlian di berbagai teknologi modern seperti React, Go, dan desain Material 3, saya siap mewujudkan ide Anda menjadi aplikasi yang menakjubkan.
              </p>
            </div>
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div
            key="projects"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center bg-m3-background p-8 overflow-y-auto"
          >
            <h2 className="text-4xl font-bold text-m3-primary mb-8 mt-16">Proyek Saya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
              {mockProjects.map(project => (
                <div key={project.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-m3-primary mb-2">{project.title}</h3>
                  <p className="text-m3-secondary">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center bg-m3-surface p-8"
          >
            <h2 className="text-4xl font-bold text-m3-primary mb-8">Dukungan & Kontak</h2>
            <form className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-m3-secondary mb-1">Nama</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-m3-primary focus:border-transparent outline-none transition" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-m3-secondary mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-m3-primary focus:border-transparent outline-none transition" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-m3-secondary mb-1">Pesan</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-m3-primary focus:border-transparent outline-none transition"></textarea>
              </div>
              <button type="button" className="w-full bg-m3-primary text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition shadow-md">Kirim Pesan</button>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden overscroll-y-bounce">
      <Navbar />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {renderSection()}
      </AnimatePresence>
    </div>
  );
}