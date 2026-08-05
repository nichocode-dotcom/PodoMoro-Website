import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// AI Image Generation Prompts (Midjourney/DALL-E):
// 1. Noodle bowl: "Commercial food photography, a steaming bowl of Asian noodles with rich dark broth, topped with fresh green garnish, soft boiled egg, and sliced roasted meat, dramatic studio lighting, 8k resolution, photorealistic, natural textures, appetizing, shot on 85mm lens, depth of field --ar 1:1"
// 2. Restaurant interior: "Interior architectural photography, warm and aesthetic modern restaurant interior, wooden furniture, soft ambient lighting, cozy atmosphere, cinematic lighting, 8k resolution, highly detailed, inviting, professional composition --ar 1:1"
// 3. Fresh drink: "Commercial product photography, a tall glass of refreshing iced tea with condensation droplets on the outside, ice cubes, a slice of lemon and mint leaves on top, bright and crisp lighting, summer vibe, macro details, 8k resolution, photorealistic --ar 1:1"
const heroImages = [
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop", // Noodles
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop", // Interior
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1200&auto=format&fit=crop"  // Drink
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      {heroImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Hero image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col items-center justify-center text-center h-full py-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-8 border border-white/20 shadow-sm"
        >
          <span>⭐</span> 5.0 Rating • 50+ Menu Items
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl leading-[1.1] text-white mb-6 font-bold font-heading max-w-4xl"
        >
          Nikmati <span className="text-primary">Pelayanan</span> Terbaik dari Kami
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl"
        >
          Nikmati pilihan terbaik hidangan klasik Warmindo, yang dibuat dari bahan-bahan berkualitas tinggi dan disajikan dalam suasana yang cerah dan ramah.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="/menu" className="inline-block px-8 py-3.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200">
            Lihat Menu
          </a>
          <a href="/kontak" className="inline-block px-8 py-3.5 bg-transparent text-white border-2 border-white font-semibold rounded-md hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all duration-200">
            Jam Operasional
          </a>
        </motion.div>

      </div>
    </section>
  );
}
