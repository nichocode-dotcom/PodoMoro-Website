import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Clock, Wallet, Armchair, Plus } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * 0.15, ease: 'easeOut' }
  })
};

export function ValueProposition() {
  const values = [
    { icon: <Wifi size={32} strokeWidth={1.5} />, text: 'Akses Wi-Fi Cepat' },
    { icon: <Clock size={32} strokeWidth={1.5} />, text: 'Buka 24 Jam' },
    { icon: <Wallet size={32} strokeWidth={1.5} />, text: 'Harga Ramah Mahasiswa' },
    { icon: <Armchair size={32} strokeWidth={1.5} />, text: 'Ruang Nyaman untuk Nugas' }
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInVariant}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-bg-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                {val.icon}
              </div>
              <h4 className="font-semibold text-text-main font-heading">{val.text}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SpecialMenu() {
  const menuItems = [
    {
      id: 1,
      title: 'Indomie Spesial Podomoro',
      desc: 'Racikan bumbu rahasia dengan topping telur setengah matang & kornet.',
      price: 'Rp 18.000',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Nasi Gila Extra Pedas',
      desc: 'Nasi putih hangat dengan oseng sosis, bakso, dan sambal mercon.',
      price: 'Rp 22.000',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Es Kopi Susu Aren',
      desc: 'Perpaduan espresso kental, susu creamy, dan gula aren asli.',
      price: 'Rp 15.000',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Roti Bakar Coklat Keju',
      desc: 'Roti tebal dengan olesan mentega, taburan coklat meses, dan keju melimpah.',
      price: 'Rp 16.000',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop',
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold tracking-wider text-sm mb-2 uppercase">Curated Selection</p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main font-heading">Our Special Menu</h2>
          </motion.div>
          <motion.a
            href="/menu"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold hover:text-primary-hover flex items-center gap-2 group"
          >
            See Full Menu
            <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInVariant}
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${item.badgeColor} shadow-sm backdrop-blur-sm bg-opacity-90`}>
                  {item.badge}
                </div>
              </div>
              <div className="p-6 relative">
                <h3 className="font-bold text-xl text-text-main mb-2 font-heading leading-tight">{item.title}</h3>
                <p className="text-text-muted text-sm mb-6 line-clamp-2">{item.desc}</p>
                <div className="font-bold text-lg text-primary">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AmbianceTeaser() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image / Video Placeholder */}
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
        alt="Cinematic Restaurant Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading"
        >
          Sebuah Pengalaman Rasa dan Suasana
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-200 mb-8"
        >
          Kami memadukan cita rasa autentik dengan desain ruang yang mengundang kenyamanan, menghadirkan momen tak terlupakan di setiap kunjungan Anda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="/tentang-kami" className="inline-block px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-md hover:bg-white hover:text-text-main transition-all duration-300">
            Jelajahi Cerita Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function LocationAndCTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Map Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg h-[400px] w-full bg-gray-200 border border-border"
        >
          <iframe
            src="https://maps.google.com/maps?q=-7.7463608,110.3456157&hl=id&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi PodoMoro"
          ></iframe>
        </motion.div>

        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-text-main mb-6 font-heading">Kunjungi Kami</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="font-semibold text-lg text-text-main mb-1">Alamat Lengkap</h4>
              <p className="text-text-muted">Jl. Ngawen, Kranggahan II, Trihanggo, Kec. Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg text-text-main mb-1">Jam Operasional</h4>
              <p className="text-text-muted">Senin - Minggu: 24 Jam Non-Stop</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/6280000000000" target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-6 py-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors duration-200 shadow-sm hover:shadow-md">
              Pesan via WhatsApp
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-6 py-4 bg-transparent text-primary border-2 border-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm hover:shadow-md">
              Arahkan ke Lokasi
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export function CinematicSection() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const bgText1Ref = useRef(null);
  const bgText2Ref = useRef(null);
  const bgText3Ref = useRef(null);
  const ctaRef = useRef(null);
  const accent1Ref = useRef(null);
  const accent2Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    // 1. Center Image Scaling up gracefully to full viewport
    tl.to(mediaRef.current, {
      width: '95vw',
      height: '90vh',
      borderRadius: '2rem',
      ease: 'power2.inOut',
    }, 0);

    // 2. Accents Flying Outwards (The 3D Gallery Effect)
    tl.to(accent1Ref.current, {
      xPercent: -150,
      yPercent: 150,
      rotation: -25,
      opacity: 0,
      ease: 'power2.inOut',
    }, 0);

    tl.to(accent2Ref.current, {
      xPercent: 150,
      yPercent: -150,
      rotation: 25,
      opacity: 0,
      ease: 'power2.inOut',
    }, 0);

    // 3. Multiple Background Typography Parallax
    // Baris 1: Geser ke kiri atas
    tl.fromTo(bgText1Ref.current,
      { xPercent: 5, y: 100, opacity: 1 },
      { xPercent: -15, y: -100, opacity: 0.1, ease: 'none' },
      0
    );
    // Baris 2: Geser ke kanan atas
    tl.fromTo(bgText2Ref.current,
      { xPercent: -15, y: 100, opacity: 1 },
      { xPercent: 5, y: -100, opacity: 0.1, ease: 'none' },
      0
    );
    // Baris 3: Geser ke kiri atas
    tl.fromTo(bgText3Ref.current,
      { xPercent: 0, y: 100, opacity: 1 },
      { xPercent: -20, y: -100, opacity: 0.1, ease: 'none' },
      0
    );

    // 4. Subtitle Fade In (Staggered, Frameless)
    tl.fromTo('.stagger-word',
      { y: 100, opacity: 0, rotation: 8 },
      { y: 0, opacity: 1, rotation: 0, stagger: 0.1, ease: 'back.out(1.5)' },
      0.4 // Starts fading in after the scrub is halfway
    );

    // 5. CTA and Description Fade In
    tl.fromTo(ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power3.out' },
      0.6 // Starts after the title
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-[400vh] relative bg-surface">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-surface">

        {/* Dense Background Typography */}
        <div className="absolute inset-0 flex flex-col justify-center gap-8 md:gap-16 pointer-events-none z-0 overflow-hidden">
          <h2
            ref={bgText1Ref}
            className="text-7xl md:text-8xl lg:text-[9rem] font-black text-gray-200/60 font-heading whitespace-nowrap"
          >
            LEBIH DARI SEKADAR RASA • LEBIH DARI SEKADAR RASA
          </h2>
          <h2
            ref={bgText2Ref}
            className="text-7xl md:text-8xl lg:text-[9rem] font-black text-gray-200/60 font-heading whitespace-nowrap -ml-[20vw]"
          >
            MOMEN TERBAIK BERSAMA • MOMEN TERBAIK BERSAMA
          </h2>
          <h2
            ref={bgText3Ref}
            className="text-7xl md:text-8xl lg:text-[9rem] font-black text-gray-200/60 font-heading whitespace-nowrap ml-[10vw]"
          >
            SEBUAH CERITA RASA • SEBUAH CERITA RASA
          </h2>
        </div>

        {/* Center Image Container */}
        <div ref={mediaRef} className="w-[50vw] md:w-[25vw] h-[40vh] md:h-[50vh] rounded-[2rem] overflow-hidden relative z-10 shadow-2xl flex flex-col items-center justify-end pb-12 md:pb-16">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
            alt="Ambiance"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Dark gradient overlay at the bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 opacity-90 pointer-events-none"></div>

          {/* Foreground Content */}
          <div className="relative z-20 text-center px-6 md:px-12 w-full flex flex-col items-center gap-6 mt-auto">
            {/* Staggered Elegant Subtitle */}
            <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4">
              <div className="overflow-hidden p-1"><span className="stagger-word inline-block text-4xl md:text-5xl lg:text-7xl font-black text-white font-heading tracking-wide drop-shadow-lg origin-bottom-left">Ini</span></div>
              <div className="overflow-hidden p-1"><span className="stagger-word inline-block text-4xl md:text-5xl lg:text-7xl font-black text-white font-heading tracking-wide drop-shadow-lg origin-bottom-left">Tentang</span></div>
              <div className="overflow-hidden p-1"><span className="stagger-word inline-block text-4xl md:text-5xl lg:text-7xl font-black text-primary font-heading tracking-wide drop-shadow-lg origin-bottom-left">Suasana.</span></div>
            </div>

            {/* Description & CTA */}
            <div ref={ctaRef} className="max-w-3xl mx-auto flex flex-col items-center gap-8">
              <p className="text-white/90 text-sm md:text-lg lg:text-xl drop-shadow-md font-medium max-w-2xl leading-relaxed">
                Tempat di mana rasa secangkir kopi yang sempurna bertemu dengan kenyamanan yang tak tertandingi.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Accents */}
        <div
          ref={accent1Ref}
          className="absolute left-[5%] md:left-[15%] bottom-[15%] md:bottom-[20%] w-[35vw] md:w-[15vw] h-[15vh] md:h-[25vh] rounded-[1.5rem] overflow-hidden shadow-xl z-20"
        >
          <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop" alt="Coffee" className="w-full h-full object-cover" />
        </div>

        <div
          ref={accent2Ref}
          className="absolute right-[5%] md:right-[15%] top-[15%] md:top-[20%] w-[30vw] md:w-[12vw] h-[15vh] md:h-[20vh] rounded-[1.5rem] overflow-hidden shadow-xl z-20"
        >
          <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop" alt="Toast" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}
