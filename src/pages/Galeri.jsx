import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ArrowRight, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import img1 from '../assets/fasilitas_warmindo.webp'
import img2 from '../assets/section_gorengan.webp';
import img3 from '../assets/menu_indomie_goreng_dobel.webp';
import img4 from '../assets/tata_ruang.webp';
import img5 from '../assets/es_teh_manis.webp';
import img6 from '../assets/es_jeruk.webp';
import img7 from '../assets/menu_indomie_rebus_ayam_bawang.webp'
import warmindoSudutFavorit from '../assets/warmindo_sudut_favorit.webp';
import warmindoDapurMasak from '../assets/warmindo_dapur_masak.webp';
import warmindoBahanSegar from '../assets/warmindo_bahan_segar.webp';
import warmindoKebersamaan from '../assets/warmindo_kebersamaan.webp';
import warmindoChefBumbu from '../assets/warmindo_chef_bumbu.webp';
import warmindoNugasWifi from '../assets/warmindo_nugas_wifi.webp';
import warmindoMusikAkustik from '../assets/warmindo_musik_akustik.webp';

export default function Galeri() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const galleryData = [
    {
      id: 1, kategori: "Suasana", tipe: "image",
      url: warmindoSudutFavorit,
      spanClass: "col-span-2 md:row-span-2",
      caption: "Sudut terfavorit pelanggan PodoMoro. Hangat, santai, dan cocok untuk bercengkerama hingga larut malam."
    },
    {
      id: 2, kategori: "Menu", tipe: "image",
      url: img2,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Indomie Goreng Spesial dengan racikan bumbu rahasia yang selalu bikin kangen."
    },
    {
      id: 3, kategori: "Di Balik Dapur", tipe: "image",
      url: warmindoDapurMasak,
      spanClass: "md:col-span-1 md:row-span-2",
      caption: "Proses memasak di dapur kami yang selalu mengutamakan kebersihan dan kecepatan ekstra."
    },
    {
      id: 4, kategori: "Menu", tipe: "image",
      url: img3,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Kuah kental berempah dari Indomie Rebus Tek-Tek andalan kami."
    },
    {
      id: 5, kategori: "Suasana", tipe: "image",
      url: img4,
      spanClass: "col-span-2 md:row-span-1",
      caption: "Desain interior minimalis kekinian yang membuat Anda betah berlama-lama."
    },
    {
      id: 6, kategori: "Di Balik Dapur", tipe: "image",
      url: warmindoBahanSegar,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Setiap hidangan disiapkan dengan bahan-bahan yang selalu segar setiap harinya."
    },
    {
      id: 7, kategori: "Menu", tipe: "image",
      url: img5,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Kesegaran tiada tara dari segelas Es Teh Manis Jumbo."
    },
    {
      id: 8, kategori: "Suasana", tipe: "image",
      url: warmindoKebersamaan,
      spanClass: "col-span-2 md:row-span-2",
      caption: "Momen kebersamaan dan tawa canda adalah esensi sejati dari PodoMoro."
    },
    {
      id: 9, kategori: "Menu", tipe: "image",
      url: img6,
      spanClass: "md:col-span-1 md:row-span-2",
      caption: "Roti Bakar Coklat Keju yang lumer di mulut, camilan penutup yang sempurna."
    },
    {
      id: 10, kategori: "Menu", tipe: "image",
      url: img7,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Indomie Rebus Ayam Bawang hangat nan gurih dengan potongan ayam dan telur yang bikin nagih."
    },
    {
      id: 11, kategori: "Di Balik Dapur", tipe: "image",
      url: warmindoChefBumbu,
      spanClass: "md:col-span-2 md:row-span-1",
      caption: "Chef PodoMoro memastikan setiap bumbu tertakar dengan presisi."
    },
    {
      id: 12, kategori: "Suasana", tipe: "image",
      url: warmindoNugasWifi,
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Fasilitas WiFi kencang dan meja nyaman, cocok untuk maraton nugas kuliah."
    },
    {
      id: 13, kategori: "Suasana", tipe: "image",
      url: warmindoMusikAkustik,
      spanClass: "md:col-span-2 md:row-span-1",
      caption: "Suasana malam yang diiringi musik akustik santai ala PodoMoro."
    },
  ];

  // Kunci scroll saat modal terbuka
  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMedia]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activePage="galeri" />

      <main className="flex-grow pt-16 md:pt-24 pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Headline: Minimalist Hero with Stats */}
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight tracking-tight mb-6">
              Momen di <span className="text-amber-600">PodoMoro</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
              Koleksi menu makanan dan minuman yang menggugah selera serta suasana hangat yang kami abadikan dalam setiap jepretan visual.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white border border-slate-100 shadow-sm rounded-full px-5 py-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-slate-700 text-sm">Lebih dari Seribu Kunjungan Pelanggan</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Grid dengan auto-flow dense agar celah kosong terisi otomatis */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px] grid-flow-dense"
          >
            <AnimatePresence mode="popLayout">
              {galleryData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-gray-200 ${item.spanClass}`}
                  onClick={() => setSelectedMedia(item)}
                >
                  <img
                    src={item.url}
                    alt={`Galeri ${item.kategori}`}
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay Kategori saat Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white font-semibold tracking-wider text-sm">
                      {item.kategori}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Community & CTA Section */}
          <div className="mt-12 md:mt-24 space-y-4 md:space-y-8 lg:space-y-0 lg:flex lg:gap-8">

            {/* Community Banner */}
            <div className="flex-1 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 sm:p-8 md:p-12 text-center border border-red-100 shadow-sm flex flex-col justify-center items-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Punya Cerita Seru?</h3>
              <p className="text-slate-500 mb-6 max-w-md">
                Abadikan foto nongkrong atau hidangan favoritmu ke Instagram dengan hashtag <span className="font-bold text-amber-600">#MomenPodoMoro</span>.
                Dapatkan kesempatan memenangkan Es Teh Jumbo gratis di kunjungan berikutnya!
              </p>
            </div>

            {/* Final CTA */}
            <div className="flex-[1.5] bg-gray-900 text-white rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-lg flex flex-col justify-center items-center relative overflow-hidden">
              {/* Dekorasi Glow Efek */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 relative z-10">Tergiur dengan hidangan kami?</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-md relative z-10">
                Jangan cuma dilihat. Datang sekarang atau kunjungi menu lengkap kami untuk mendapatkan hidangan favoritmu!
              </p>
              <a
                href="/menu"
                className="flex justify-center items-center w-full sm:w-auto gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-600/30 relative z-10"
              >
                Lihat Menu Lengkap
              </a>
            </div>

          </div>

        </div>
      </main>

      <Footer />

      {/* Lightbox Modal with Storytelling Caption */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md z-50 hover:bg-white/20"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-gray-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Area */}
              <div className="relative w-full flex justify-center items-center h-[55vh] md:h-[65vh] bg-black">
                <img
                  src={selectedMedia.url}
                  alt={`Fokus ${selectedMedia.kategori}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Caption Area */}
              <div className="p-6 md:p-8 text-center bg-gradient-to-b from-gray-900 to-black">
                <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full mb-4 tracking-wide shadow-md">
                  {selectedMedia.kategori.toUpperCase()}
                </span>
                <p className="text-gray-100 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                  "{selectedMedia.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
