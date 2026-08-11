import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Wifi, Wallet, Clock, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import img1 from '../assets/tata_ruang.png';
import img2 from '../assets/dapur.jpg';
import img3 from '../assets/menu_indomie_goreng_spesial.png'

// Variabel untuk animasi
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TentangKami() {
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    { name: "Budi Santoso", role: "Mahasiswa", review: "Tempat nongkrong favorit saya dan teman-teman kampus. Harganya pas di kantong, rasanya juara! Sambal terasinya benar-benar bikin nagih." },
    { name: "Siti Aminah", role: "Karyawan Swasta", review: "Indomie di sini beda banget rasanya, racikannya pas dan tempatnya selalu bersih. Sangat direkomendasikan buat makan siang." },
    { name: "Andi Wijaya", role: "Freelancer", review: "Sering banget ke sini pas lagi ngerjain tugas, WiFi nya kenceng dan colokan banyak. Top banget PodoMoro!" },
    { name: "Rina Kusuma", role: "Ibu Rumah Tangga", review: "Menu makanannya variatif, anak saya sangat suka Nasi Telur Kecap-nya. Pelayanannya juga sangat ramah dan cepat." },
    { name: "Dimas Pratama", role: "Mahasiswa", review: "Kalau ke sini wajib pesan Magelangan dan Kopi Joss! Vibe-nya bener-bener dapet banget, asik buat ngobrol lama sampai malam." },
    { name: "Putri Larasati", role: "Food Blogger", review: "Hidden gem yang tak boleh dilewatkan. Harga kaki lima, rasa bintang lima. Wajib coba Indomie Goreng Spesial mereka!" },
    { name: "Tegar Maulana", role: "Driver Ojek Online", review: "Sering mampir sini nunggu orderan. Kopi tubruknya mantap, Mendoannya selalu disajikan panas-panas. Pelayanan cepat walau lagi rame." },
    { name: "Keluarga Herman", role: "Pelanggan Setia", review: "Setiap akhir pekan selalu ajak anak istri ke sini. Suasananya hangat, Es Teh Jumbo-nya beneran jumbo! Sangat puas." },
    { name: "Nisa & Danang", role: "Pasangan Muda", review: "Tempat nge-date murah meriah tapi nggak murahan. Roti Bakar Coklat Keju dan Susu Soda gembiranya enak banget, bikin betah ngobrol." },
    { name: "Bapak Yono", role: "Warga Lokal", review: "Warungnya bersih, pelayannya ramah-ramah pada murah senyum. Nasi Ayam Gepreknya juga juara pedasnya!" },
    { name: "Clarissa", role: "Ekspatriat", review: "My first time trying authentic Indonesian street food noodle style here. Absolutely amazing and the place is so cozy. Love the vibes!" },
    { name: "Komunitas Sepeda", role: "Klub Hobi", review: "Titik kumpul wajib kalau abis gowes pagi. Nutrisu (Nutrisari Susu) segar banget buat balikin tenaga. Tempat parkir sepedanya juga aman." }
  ];

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}
      </style>
      <Navbar activePage="tentang" />

      <main className="flex-grow pt-16 md:pt-20 pb-16 overflow-hidden">
        {/* 1. Hero Section (Kisah Kami) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
                Lebih dari sekadar <span className="text-amber-600">warung makan.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                Berdiri sejak tahun 2015, PodoMoro lahir dari kecintaan kami terhadap kuliner Nusantara. Kami menyajikan berbagai hidangan sederhana seperti Indomie dan racikan minuman hangat khas warung. Nama PodoMoro adalah doa agar tempat ini selalu membawa berkah bagi setiap pengunjungnya.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={img1}
                alt="Suasana Warung PodoMoro"
                className="w-full h-auto object-cover rounded-3xl shadow-md"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-2 sm:-bottom-8 sm:-left-8 bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 sm:gap-4 max-w-[280px] sm:max-w-xs z-10">
                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  <span className="font-bold text-slate-800">Sejak 2015</span> <br />
                  Menyajikan ribuan hidangan kebahagiaan
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Filosofi Dapur Kami */}
        <section className="bg-orange-50 py-20 mt-12 md:mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Filosofi Dapur Kami</h2>
              <p className="text-lg text-slate-500">
                Kami percaya bahwa makanan enak tidak harus mahal, dan tempat yang nyaman tidak harus mewah.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {/* Baris 1 - Bahan Segar (Text Left, Image Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="order-2 md:order-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Bahan Segar Pilihan</h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-6">
                    Setiap mangkuk yang kami sajikan berawal dari bahan-bahan terbaik. Kami memilih sayuran segar dan bumbu berkualitas untuk memastikan cita rasa otentik di setiap suapan. Kepuasan Anda adalah berkah bagi kami.
                  </p>
                </motion.div>
                <motion.div
                  className="order-1 md:order-2"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Bahan segar"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl shadow-md"
                  />
                </motion.div>
              </div>

              {/* Baris 2 - Pelayanan (Image Left, Text Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="order-1"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={img2}
                    alt="Pelayanan warung"
                    className="w-full h-[300px] md:h-[400px] object-cover object-[40%_50%] rounded-3xl shadow-md"
                  />
                </motion.div>
                <motion.div
                  className="order-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Pelayanan Sepenuh Hati</h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-6">
                    Kami hadir untuk menyajikan lebih dari makanan, melainkan pengalaman yang membuat Anda serasa pulang ke rumah. Senyum ramah dan pelayanan responsif adalah standar yang selalu kami jaga.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Social Proof (Apa Kata Mereka) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Apa Kata Mereka</h2>
            <p className="text-lg text-slate-500">Pelanggan setia kami adalah alasan kami terus berinovasi.</p>
          </motion.div>

          {/* Modern Card Carousel - Continuous Marquee */}
          <div className="relative mt-16 group px-0 overflow-hidden">
            
            {/* Gradient Mask for fade effect on edges */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Carousel Container */}
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex w-max gap-6 lg:gap-8 px-4 py-8 md:py-12 animate-marquee hover:cursor-pointer"
              style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
            >
              {doubledTestimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="w-[300px] sm:w-[350px] md:w-[400px] shrink-0 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
                >
                  <Quote className="w-10 h-10 text-amber-100 mb-6 rotate-180 flex-shrink-0" />
                  <p className="text-slate-600 italic mb-8 leading-relaxed flex-grow">"{testimonial.review}"</p>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-auto">
                    <p className="font-bold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-400 font-medium mt-1">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Fasilitas Kenyamanan */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Fasilitas Kenyamanan Anda</h2>
              <p className="text-lg text-slate-500">Kami memastikan Anda mendapatkan pengalaman terbaik saat berkunjung.</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />, title: "Free WiFi", desc: "Koneksi stabil untuk nugas atau kerja." },
                { icon: <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />, title: "Harga Pelajar", desc: "Ramah di kantong tetap berkualitas." },
                { icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />, title: "Setiap Hari", desc: "Siap melayani perut lapar Anda." },
                { icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />, title: "Area Bersih", desc: "Kenyamanan adalah prioritas kami." }
              ].map((facility, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {facility.icon}
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{facility.title}</h3>
                  <p className="text-xs sm:text-base text-slate-500 leading-relaxed">{facility.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Final Call to Action (CTA) */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl group border border-gray-800"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {/* Background Image & Cinematic Dark Overlay */}
              <div className="absolute inset-0">
                <img
                  src={img3}
                  alt="Suasana Dapur PodoMoro"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-gray-900/40"></div>
              </div>

              {/* CTA Content */}
              <div className="relative z-10 p-12 md:p-20 text-center flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Penasaran dengan racikan <span className="text-amber-500">rahasia kami?</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                  Datang dan nikmati langsung berbagai pilihan menu andalan PodoMoro yang siap memanjakan lidah Anda.
                </p>
                <a
                  href="/menu"
                  className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-10 md:px-12 rounded-full text-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Lihat Menu PodoMoro
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
