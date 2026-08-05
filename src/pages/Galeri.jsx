import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Camera, ArrowRight, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Galeri() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const galleryData = [
    {
      id: 1, kategori: "Suasana", tipe: "image",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      spanClass: "md:col-span-2 md:row-span-2",
      caption: "Sudut terfavorit pelanggan PodoMoro. Hangat, santai, dan cocok untuk bercengkerama hingga larut malam."
    },
    {
      id: 2, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Indomie Goreng Spesial dengan racikan bumbu rahasia yang selalu bikin kangen."
    },
    {
      id: 3, kategori: "Di Balik Dapur", tipe: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-preparing-a-pizza-in-a-wood-oven-41662-large.mp4",
      spanClass: "md:col-span-1 md:row-span-2",
      caption: "Proses memasak di dapur kami yang selalu mengutamakan kebersihan dan kecepatan ekstra."
    },
    {
      id: 4, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Kuah kental berempah dari Indomie Rebus Tek-Tek andalan kami."
    },
    {
      id: 5, kategori: "Suasana", tipe: "image",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      spanClass: "md:col-span-2 md:row-span-1",
      caption: "Desain interior minimalis kekinian yang membuat Anda betah berlama-lama."
    },
    {
      id: 6, kategori: "Di Balik Dapur", tipe: "image",
      url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Setiap hidangan disiapkan dengan bahan-bahan yang selalu segar setiap harinya."
    },
    {
      id: 7, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Kesegaran tiada tara dari segelas Es Teh Manis Jumbo."
    },
    {
      id: 8, kategori: "Suasana", tipe: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-friends-toasting-with-beers-at-a-bar-43187-large.mp4",
      spanClass: "md:col-span-2 md:row-span-2",
      caption: "Momen kebersamaan dan tawa canda adalah esensi sejati dari PodoMoro."
    },
    {
      id: 9, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-2",
      caption: "Roti Bakar Coklat Keju yang lumer di mulut, camilan penutup yang sempurna."
    },
    {
      id: 10, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Mendoan Panas nan gurih disajikan dengan cocolan sambal kecap pedas manis."
    },
    {
      id: 11, kategori: "Di Balik Dapur", tipe: "image",
      url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      spanClass: "md:col-span-2 md:row-span-1",
      caption: "Chef PodoMoro memastikan setiap bumbu tertakar dengan presisi."
    },
    {
      id: 12, kategori: "Suasana", tipe: "image",
      url: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Fasilitas WiFi kencang dan meja nyaman, cocok untuk maraton nugas kuliah."
    },
    {
      id: 13, kategori: "Suasana", tipe: "image",
      url: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      spanClass: "md:col-span-2 md:row-span-1",
      caption: "Suasana malam yang diiringi musik akustik santai ala PodoMoro."
    },
    {
      id: 14, kategori: "Menu", tipe: "image",
      url: "https://images.unsplash.com/photo-1550586940-058e5ff41249?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      spanClass: "md:col-span-1 md:row-span-1",
      caption: "Kopi Hitam Joss, racikan murni dari dapur untuk menemani obrolan dalam."
    }
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
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:auto-rows-[250px] grid-flow-dense"
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
                  {item.tipe === 'image' ? (
                    <img
                      src={item.url}
                      alt={`Galeri ${item.kategori}`}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white pointer-events-none">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                    </div>
                  )}
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
          <div className="mt-24 space-y-8 lg:space-y-0 lg:flex lg:gap-8">

            {/* Community Banner */}
            <div className="flex-1 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center border border-red-100 shadow-sm flex flex-col justify-center items-center group">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Punya Momen Seru?</h3>
              <p className="text-slate-500 mb-6 max-w-md">
                Upload foto nongkrong atau hidangan favoritmu ke Instagram dengan hashtag <span className="font-bold text-amber-600">#MomenPodoMoro</span>.
                Dapatkan kesempatan memenangkan Es Teh Jumbo gratis di kunjungan berikutnya!
              </p>
            </div>

            {/* Final CTA */}
            <div className="flex-[1.5] bg-gray-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg flex flex-col justify-center items-center relative overflow-hidden">
              {/* Dekorasi Glow Efek */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Tergiur dengan hidangan kami?</h3>
              <p className="text-gray-300 mb-8 max-w-md relative z-10">
                Jangan cuma dilihat. Datang sekarang atau intip menu lengkap kami untuk merencanakan pesananmu!
              </p>
              <a
                href="/menu"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-600/30 relative z-10"
              >
                Lihat Menu Lengkap <ArrowRight className="w-5 h-5" />
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
                {selectedMedia.tipe === 'image' ? (
                  <img
                    src={selectedMedia.url}
                    alt={`Fokus ${selectedMedia.kategori}`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain"
                  />
                )}
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
