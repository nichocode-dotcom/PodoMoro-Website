import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
const navLinks = [
  { id: 'home', label: 'Beranda', href: '/' },
  { id: 'menu', label: 'Menu', href: '/menu' },
  { id: 'tentang', label: 'Tentang Kami', href: '/tentang-kami' },
  { id: 'galeri', label: 'Galeri', href: '/galeri' },
  { id: 'kontak', label: 'Kontak', href: '/kontak' },
];

export default function Navbar({ activePage = 'home' }) {
  const [hoveredPage, setHoveredPage] = useState(activePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda', href: '/' },
    { id: 'menu', label: 'Menu', href: '/menu' },
    { id: 'tentang', label: 'Tentang Kami', href: '/tentang-kami' },
    { id: 'galeri', label: 'Galeri', href: '/galeri' },
    { id: 'kontak', label: 'Kontak', href: '/kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a href="/" className="font-heading text-2xl font-bold text-primary flex items-center gap-1 justify-self-start">
            <img src="/src/assets/logo-removebg-preview.png" alt="PodoMoro Logo" className="h-12 sm:h-14 w-auto scale-100 object-contain drop-shadow-sm" />
            <span className="ml-1 pt-1">PodoMoro</span>
          </a>

          {/* Desktop Navigation */}
          <ul
            className="hidden lg:flex flex-wrap justify-center gap-2 list-none"
            onMouseLeave={() => setHoveredPage(activePage)}
          >
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  className={`relative block px-4 py-2 font-medium transition-colors duration-200 z-10 ${activePage === link.id || hoveredPage === link.id
                      ? 'text-amber-600'
                      : 'text-slate-500 hover:text-amber-600'
                    }`}
                  onMouseEnter={() => setHoveredPage(link.id)}
                >
                  {link.label}
                </a>
                {/* Gliding Underline Background Indicator (Option A) */}
                {hoveredPage === link.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-amber-50 rounded-full -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-600/30 transition-all duration-300"
            >
              Pesan Sekarang
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.662-2.062-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-amber-600 transition-colors bg-slate-100 hover:bg-amber-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-slate-100"
            >
              <ul className="flex flex-col py-4 gap-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${activePage === link.id
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                {/* Mobile WhatsApp CTA */}
                <li className="mt-4 px-4 sm:hidden">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    Pesan Sekarang
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.662-2.062-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
