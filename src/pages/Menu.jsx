import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Menu() {
  const menuData = [
    // 1. Makanan Utama
    { id: 1, nama: "Indomie Goreng Telur", kategori: "Makanan Utama", deskripsi: "Indomie goreng disajikan dengan telur (pilihan: dadar, ceplok, atau setengah matang).", harga: 10000, gambar: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 2, nama: "Indomie Goreng Spesial / Intel", kategori: "Makanan Utama", deskripsi: "Indomie goreng dengan porsi lebih mengenyangkan ditambah telur.", harga: 12000, gambar: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "🔥 Best Seller" },
    { id: 3, nama: "Indomie Goreng Dobel", kategori: "Makanan Utama", deskripsi: "Dua bungkus Indomie goreng jadikan satu untuk porsi jumbo.", harga: 15000, gambar: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "Porsi Jumbo" },
    
    { id: 4, nama: "Indomie Rebus Ayam Bawang", kategori: "Makanan Utama", deskripsi: "Varian kuah klasik yang paling banyak dicari.", harga: 8000, gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 5, nama: "Indomie Rebus Telur", kategori: "Makanan Utama", deskripsi: "Indomie kuah dengan telur yang dimasak setengah matang menyatu dengan kuah.", harga: 10000, gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 6, nama: "Indomie Rebus Tek-Tek", kategori: "Makanan Utama", deskripsi: "Indomie kuah yang dimasak ulang dengan bumbu ulek tambahan, sayur sawi, kol, dan irisan cabai rawit merah.", harga: 15000, gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "🌶️ Pedas" },
    
    { id: 7, nama: "Magelangan", kategori: "Makanan Utama", deskripsi: "Perpaduan nasi goreng yang dicampur dengan Indomie goreng dan bumbu rempah. Sangat populer di kalangan mahasiswa.", harga: 14000, gambar: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "⭐ Favorit" },
    { id: 8, nama: "Nasi Omelet Mie", kategori: "Makanan Utama", deskripsi: "Indomie yang dihancurkan, dicampur telur, lalu digoreng menjadi martabak mie tebal, disajikan dengan nasi hangat.", harga: 13000, gambar: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 9, nama: "Nasi Telur Kecap (Pontianak)", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur ceplok krispi di pinggirnya, disiram bumbu kecap manis gurih.", harga: 10000, gambar: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 10, nama: "Nasi Sarden", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan lauk sarden kaleng yang dimasak ulang dengan irisan bawang merah dan cabai.", harga: 15000, gambar: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 11, nama: "Nasi Ayam Geprek", kategori: "Makanan Utama", deskripsi: "Nasi dengan ayam goreng tepung yang digeprek dengan sambal bawang.", harga: 18000, gambar: "https://images.unsplash.com/photo-1626082895617-2c6ab3abce03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "🌶️ Pedas" },
    { id: 12, nama: "Nasi Telur Balado", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur rebus goreng yang disiram bumbu balado pedas manis.", harga: 12000, gambar: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 13, nama: "Nasi Orak-Arik Telur", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur orak-arik yang dimasak dengan bumbu gurih.", harga: 10000, gambar: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    
    // 2. Minuman
    { id: 14, nama: "Es Teh Manis / Teh Panas", kategori: "Minuman", deskripsi: "Minuman wajib pelepas dahaga dengan seduhan teh melati.", harga: 5000, gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "Jumbo" },
    { id: 15, nama: "Es Jeruk Peras / Panas", kategori: "Minuman", deskripsi: "Menggunakan jeruk peras asli, bukan sirup.", harga: 6000, gambar: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "Segar" },
    { id: 16, nama: "Es Lemon Tea", kategori: "Minuman", deskripsi: "Teh manis dengan perasan jeruk nipis/lemon.", harga: 7000, gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    
    { id: 17, nama: "Es Nutrisari", kategori: "Minuman", deskripsi: "Tersedia berbagai rasa menyegarkan.", harga: 5000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 18, nama: "Nutrisari Susu (Nutrisu)", kategori: "Minuman", deskripsi: "Nutrisari yang dicampur dengan susu kental manis.", harga: 7000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 19, nama: "Es Milo / Dancow / Ovaltine", kategori: "Minuman", deskripsi: "Minuman susu coklat favorit.", harga: 8000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 20, nama: "Es Chocolatos / Drink Beng-Beng", kategori: "Minuman", deskripsi: "Minuman coklat kekinian.", harga: 8000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    
    { id: 21, nama: "Kopi Hitam (Kopi Tubruk / Joss)", kategori: "Minuman", deskripsi: "Kopi hitam seduh (Kapal Api atau sejenisnya).", harga: 5000, gambar: "https://images.unsplash.com/photo-1550586940-058e5ff41249?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 22, nama: "Kopi Susu Instan", kategori: "Minuman", deskripsi: "Varian Good Day, Nescafe, atau Indocafe.", harga: 6000, gambar: "https://images.unsplash.com/photo-1550586940-058e5ff41249?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 23, nama: "Es Extra Joss / Kuku Bima", kategori: "Minuman", deskripsi: "Minuman berenergi pelepas dahaga.", harga: 5000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 24, nama: "Joss Susu / Kuku Bima Susu", kategori: "Minuman", deskripsi: "Minuman berenergi yang dicampur dengan susu kental manis putih.", harga: 7000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "⚡ Segar" },
    { id: 25, nama: "Soda Gembira (Sodgem)", kategori: "Minuman", deskripsi: "Fanta merah/soda bening yang disajikan dengan es batu dan susu kental manis.", harga: 12000, gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "Populer" },

    // 3. Camilan & Tambahan
    { id: 26, nama: "Tempe Mendoan", kategori: "Camilan", deskripsi: "Tempe goreng tepung setengah matang bertabur daun bawang. Disajikan hangat.", harga: 10000, gambar: "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "🔥 Best Seller" },
    { id: 27, nama: "Tahu Isi / Tahu Susur", kategori: "Camilan", deskripsi: "Tahu pong berisi tumisan sayur tauge dan wortel yang gurih.", harga: 8000, gambar: "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 28, nama: "Bakwan Sayur / Bala-Bala", kategori: "Camilan", deskripsi: "Gorengan sayur renyah yang baru diangkat dari wajan.", harga: 8000, gambar: "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: null },
    { id: 29, nama: "Kerupuk Putih / Udang", kategori: "Camilan", deskripsi: "Topping tambahan ekstra untuk teman makan.", harga: 2000, gambar: "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", isAvailable: true, badge: "Ekstra" },
  ];

  const categories = ["Semua", "Makanan Utama", "Minuman", "Camilan"];
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = activeCategory === "Semua" || item.kategori === activeCategory;
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  const marqueeImages = [
    "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1596649272304-406cb75b8e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  ];
  const doubledImages = [...marqueeImages, ...marqueeImages];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activePage="menu" />
      
      <main className="flex-grow pt-16 md:pt-20 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Split Layout */}
          <motion.div 
            className="relative bg-white rounded-3xl p-6 md:p-10 lg:p-12 mb-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Dekorasi Background */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            {/* Kiri: Teks & Search */}
            <div className="w-full md:flex-1 max-w-xl relative z-10 text-left mb-10 md:mb-0">
              <span className="inline-block py-1.5 px-4 rounded-full bg-amber-100 text-amber-600 text-xs font-black tracking-widest mb-4 uppercase">
                PodoMoro Taste
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-[1.1] tracking-tight">
                Eksplorasi Rasa <br className="hidden lg:block" /> di <span className="text-amber-600">PodoMoro</span>
              </h1>
              <p className="text-lg text-slate-500 mb-8 max-w-md leading-relaxed font-medium">
                Dari racikan rahasia Indomie yang melegenda hingga minuman penyegar dahaga. Temukan hidangan favorit Anda di sini!
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari menu favoritmu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl leading-5 bg-slate-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 hover:bg-white text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Kanan: Vertical Marquee Galeri */}
            <div 
              className="w-full md:w-auto relative z-10 h-72 md:h-96 overflow-hidden flex gap-4 lg:gap-6 justify-center"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
            >
              {/* Kolom 1 (Bergerak ke Atas) */}
              <motion.div 
                className="flex flex-col gap-4 w-32 md:w-40"
                animate={{ y: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 15, repeat: Infinity }}
              >
                {doubledImages.map((src, i) => (
                  <img key={`col1-${i}`} src={src} className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                ))}
              </motion.div>
              
              {/* Kolom 2 (Bergerak ke Bawah) */}
              <motion.div 
                className="flex flex-col gap-4 w-32 md:w-40 mt-[-100%]"
                animate={{ y: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 18, repeat: Infinity }}
              >
                {doubledImages.map((src, i) => (
                  <img key={`col2-${i}`} src={src} className="w-full h-48 md:h-56 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Category Tabs (Bukan Sticky Lagi) */}
          <div className="-mx-4 px-4 py-4 mb-10 flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:justify-center">
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 border-transparent"
                      : "bg-white text-slate-500 hover:bg-amber-50 hover:text-amber-600 border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Menu */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col ${
                    !item.isAvailable ? "opacity-75 grayscale-[40%]" : ""
                  }`}
                >
                  {/* Image Area */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.gambar} 
                      alt={item.nama} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-slate-700 shadow-sm">
                        {item.badge}
                      </div>
                    )}

                    {/* Overlay jika habis */}
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-white/95 px-4 py-2 rounded-lg font-bold text-slate-800 tracking-wider transform -rotate-6 shadow-xl">
                          HABIS TERJUAL
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                        {item.nama}
                      </h3>
                      <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    {/* Footer / Price & Action */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <p className="text-xl font-extrabold text-amber-600">
                        {formatRupiah(item.harga)}
                      </p>
                      
                      {!item.isAvailable && (
                        <span className="bg-slate-100 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                          Habis
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
