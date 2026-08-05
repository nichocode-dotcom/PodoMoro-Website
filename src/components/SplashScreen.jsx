import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SplashScreen = ({ onComplete }) => {
  const splashRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Tahap 1 (Init)
    gsap.set(iconRef.current, { scale: 0, opacity: 0 });
    gsap.set(textRef.current, { y: 30, opacity: 0 });

    // Tahap 2 (Logo Pop): Ikon membesar dengan efek memantul
    tl.to(iconRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.6)"
    })
      // Tahap 3 (Text Reveal): Teks muncul dari bawah perlahan
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8")
      // Tahap 4 & 5 (Exit Berbarengan): Logo/Teks memudar bersamaan dengan layar terbelah
      .add("split", "+=0.8")
      .to([iconRef.current, textRef.current], {
        opacity: 0,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.inOut"
      }, "split")
      .to(topPanelRef.current, {
        y: '-100%',
        duration: 1.2,
        ease: "power4.inOut"
      }, "split")
      .to(bottomPanelRef.current, {
        y: '100%',
        duration: 1.2,
        ease: "power4.inOut"
      }, "split");

  }, { scope: splashRef });

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Latar Belakang (Dua Panel Gelap) */}
      <div ref={topPanelRef} className="absolute top-0 left-0 right-0 h-1/2 bg-gray-900 pointer-events-auto" />
      <div ref={bottomPanelRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-900 pointer-events-auto" />

      {/* Konten Utama */}
      <div ref={contentRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Ikon */}
        <img
          ref={iconRef}
          src="/src/assets/logo-removebg-preview.png"
          alt="PodoMoro Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain scale-125 mb-4 filter drop-shadow-[0_0_15px_rgba(252,211,77,0.3)]"
        />

        {/* Teks */}
        <div className="overflow-hidden">
          <h1
            ref={textRef}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase font-heading"
          >
            PodoMoro
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
