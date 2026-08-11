import { MapPin, Phone, Accessibility } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-text-main text-white py-12 mt-auto">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Kolom 1: Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <h4 className="text-white font-bold font-heading text-2xl tracking-wide">PodoMoro</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Warmindo Barokah adalah tempat makan terbaik Anda dengan desain minimalis. Nikmati hidangan hangat di tempat yang hangat dan nyaman.
            </p>
          </div>

          {/* Kolom 2: Operasional & Sosial */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg">Operasional</h4>
            <div className="text-slate-300 text-sm space-y-2 mb-8">
              <p className="font-semibold text-secondary">Buka Setiap Hari</p>
              <p>06:00 - 12:00 Malam</p>
              <p className="text-slate-500 text-xs mt-1">Dine-in & Takeaway</p>
            </div>
            
            <h4 className="text-white font-bold mb-4 font-heading text-lg">Ikuti Kami</h4>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram PodoMoro" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-text-main transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Facebook PodoMoro" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-text-main transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Kolom 3: Kontak & Lokasi */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg">Lokasi Kami</h4>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Jl. Ngawen, Kranggahan II, Sleman, DIY</span>
              </li>
            </ul>
            
            <a 
              href="https://wa.me/6285801552635" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-secondary text-text-main px-6 py-3.5 rounded-xl font-bold hover:bg-primary-hover hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 w-full sm:w-auto justify-center mb-8"
            >
              <Phone size={18} />
              Pesan via WhatsApp
            </a>

            <h4 className="text-white font-bold mb-4 font-heading text-lg">Aksesibilitas</h4>
            <button
              onClick={() => window.dispatchEvent(new Event('toggle-accessibility'))}
              className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-white/5 p-2 -ml-2 rounded-lg transition-colors w-full sm:w-auto text-left"
            >
              <Accessibility className="w-5 h-5 text-secondary flex-shrink-0" />
              <span className="text-sm">Buka Pengaturan Aksesibilitas</span>
            </button>
          </div>
          
        </div>
        
        <div className="text-center pt-8 border-t border-white/10 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} PodoMoro. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
