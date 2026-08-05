import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, MessageCircle, Send, Wifi, Plug, Car, CreditCard, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Variabel untuk animasi
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Kontak() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "Apakah PodoMoro menerima pembayaran non-tunai?",
      answer: "Tentu! Kami menerima pembayaran melalui QRIS, transfer bank, dan e-wallet (GoPay, OVO, Dana) selain uang tunai."
    },
    {
      question: "Bisakah saya reservasi tempat untuk rombongan (ulang tahun/rapat)?",
      answer: "Sangat bisa. Anda dapat melakukan reservasi via WhatsApp minimal H-1 untuk memastikan ketersediaan tempat, tanpa biaya tambahan."
    },
    {
      question: "Apakah PodoMoro tetap buka di hari libur nasional?",
      answer: "Kami buka setiap hari sepanjang tahun, termasuk hari libur nasional, kecuali ada pemberitahuan khusus di media sosial kami."
    },
    {
      question: "Apakah ada menu vegetarian atau tanpa MSG?",
      answer: "Tentu saja. Harap beri tahu kasir saat memesan jika Anda ingin menu tanpa MSG atau opsi hidangan tanpa daging."
    }
  ];

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activePage="kontak" />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">Hubungi Kami</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Ada pertanyaan, masukan, atau ingin reservasi tempat? Kami selalu siap mendengar dan menyambut kedatangan Anda.
            </p>
          </motion.div>

          {/* Bagian Atas: Peta & Info Penting */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mb-16">
            
            {/* Kolom Kiri: Peta */}
            <motion.div 
              className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white relative h-full min-h-[400px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <iframe 
                src="https://maps.google.com/maps?q=-7.7463608,110.3456157&hl=id&z=16&output=embed" 
                className="w-full h-full border-0 absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </motion.div>

            {/* Kolom Kanan: Detail Kontak Utama */}
            <motion.div 
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Card Jam Operasional */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Jam Operasional</h3>
                  <p className="text-slate-500 mb-3 text-sm">Buka Setiap Hari: <span className="font-semibold text-slate-800">08.00 - 24.00</span></p>
                  <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Buka Sekarang
                  </div>
                </div>
              </div>

              {/* Card Lokasi */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Alamat Lengkap</h3>
                  <p className="text-slate-500 leading-relaxed mb-3 text-sm">
                    Jl. Ngawen, Kranggahan II, Trihanggo, Kec. Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta
                  </p>
                  <a href="https://maps.app.goo.gl/hwAUYbJJuNNS4M3U6" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 transition-colors">
                    Buka di Google Maps <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card Reservasi WA */}
              <div 
                className="bg-amber-600 text-white rounded-2xl p-6 shadow-lg shadow-amber-600/20 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-600/30 transition-all duration-300 flex flex-col justify-center items-center text-center group"
                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              >
                <MessageCircle className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-1">Reservasi via WhatsApp</h3>
                <p className="text-amber-100 text-sm">Klik untuk memulai percakapan cepat</p>
              </div>

            </motion.div>
          </div>

          {/* Bagian Bawah: Fasilitas, FAQ, Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
            
            {/* Kiri: Fasilitas & FAQ */}
            <motion.div 
              className="space-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {/* Fasilitas Kenyamanan */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Fasilitas Kenyamanan</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <Wifi className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-slate-600 text-sm">Free WiFi 50Mbps</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <Plug className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-slate-600 text-sm">Colokan Tiap Meja</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <Car className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-slate-600 text-sm">Parkir Motor & Mobil Luas</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-slate-600 text-sm">Bisa Tunai & QRIS</span>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Tanya Jawab (FAQ)</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <button
                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-4 text-slate-500 leading-relaxed border-t border-slate-100">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Kanan: Form Kontak */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 h-fit"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Tinggalkan Pesan</h2>
              <p className="text-slate-500 mb-8 text-sm">Punya masukan, keluhan, atau penawaran kerja sama? Isi formulir di bawah ini.</p>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-600">Nama Lengkap</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-600">Nomor WhatsApp</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm" placeholder="08123456789" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">Tujuan Pesan</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-600 text-sm">
                    <option>Saran & Masukan</option>
                    <option>Komplain Layanan</option>
                    <option>Tawaran Kemitraan / Bisnis</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600">Isi Pesan</label>
                  <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none text-sm" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>

                <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 hover:shadow-lg mt-2">
                  Kirim Pesan <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
