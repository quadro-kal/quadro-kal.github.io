import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang Saya', id: 'about' },
    { name: 'Proyek', id: 'projects' },
    { name: 'Kontak', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
     window.dispatchEvent(new CustomEvent('navigateToSection', { detail: id }));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-m3-surface bg-opacity-90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-m3-primary cursor-pointer tracking-wider">
          Portofolio.
        </div>
        <ul className="flex space-x-8">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className="relative cursor-pointer py-2 px-1 text-m3-secondary hover:text-m3-primary transition-colors duration-300 font-medium"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-highlight"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-m3-primary rounded-full"
                    style={{ originX: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}