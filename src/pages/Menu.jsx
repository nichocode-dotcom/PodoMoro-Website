import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, X, Minus, Trash2, LayoutGrid, Star, Utensils, Coffee, Cookie } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

// Marquee images are kept
import marquee1 from '../assets/hero_indomie_goreng.webp';
import marquee2 from '../assets/menu_indomie_goreng_spesial.webp';
import marquee3 from '../assets/menu_indomie_rebus_telur.webp';
import marquee4 from '../assets/section_gorengan.webp';
import marquee5 from '../assets/menu_indomie_rebus_ayam_bawang.webp';

export default function Menu() {
  const { menus } = useAdmin();
  
  // Transform context menu to match the property names expected by Menu.jsx UI
  const menuData = menus.map(m => ({
    ...m,
    nama: m.nama_menu,
    isAvailable: m.status_tersedia
  }));


  const categories = [
    { id: "Semua", icon: LayoutGrid },
    { id: "Favorit", icon: Star },
    { id: "Makanan Utama", icon: Utensils },
    { id: "Minuman", icon: Coffee },
    { id: "Camilan", icon: Cookie }
  ];
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  // States for Cart and Modal
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = 
      activeCategory === "Semua" || 
      (activeCategory === "Favorit" ? item.badge === "Favorit" : item.kategori === activeCategory);
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Functions
  const addToCart = (menu) => {
    if (!menu.isAvailable) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === menu.id);
      if (existing) {
        return prev.map(item => item.id === menu.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.harga * item.qty), 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    let text = "Halo Admin PodoMoro, saya ingin memesan:\n\n";
    cart.forEach(item => {
      text += `- ${item.qty}x ${item.nama} (${formatRupiah(item.harga * item.qty)})\n`;
    });
    text += `\n*Total Tagihan: ${formatRupiah(getCartTotal())}*`;
    text += "\n\nMohon informasi ketersediaan dan total pembayarannya. Terima kasih!";
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/6285123884737?text=${encodedText}`, '_blank');
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  const marqueeImages = [
    marquee1,
    marquee2,
    marquee3,
    marquee4,
    marquee5,
  ];
  const doubledImages = [...marqueeImages, ...marqueeImages];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <style>
        {`
          @keyframes scrollUpMarquee {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scrollDownMarquee {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .marquee-up {
            animation: scrollUpMarquee 15s linear infinite;
          }
          .marquee-down {
            animation: scrollDownMarquee 18s linear infinite;
          }
        `}
      </style>
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
              className="hidden md:flex w-full md:w-auto relative z-10 h-72 md:h-96 overflow-hidden gap-4 lg:gap-6 justify-center"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
            >
              {/* Kolom 1 (Bergerak ke Atas) */}
              <div className="flex flex-col w-32 md:w-40 marquee-up">
                {/* Set 1 */}
                <div className="flex flex-col gap-4 pb-4">
                  {marqueeImages.map((src, i) => (
                    <img key={`col1-s1-${i}`} src={src} className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                  ))}
                </div>
                {/* Set 2 */}
                <div className="flex flex-col gap-4 pb-4">
                  {marqueeImages.map((src, i) => (
                    <img key={`col1-s2-${i}`} src={src} className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                  ))}
                </div>
              </div>

              {/* Kolom 2 (Bergerak ke Bawah) */}
              <div className="flex flex-col w-32 md:w-40 mt-[-100%] marquee-down">
                {/* Set 1 */}
                <div className="flex flex-col gap-4 pb-4">
                  {marqueeImages.map((src, i) => (
                    <img key={`col2-s1-${i}`} src={src} className="w-full h-48 md:h-56 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                  ))}
                </div>
                {/* Set 2 */}
                <div className="flex flex-col gap-4 pb-4">
                  {marqueeImages.map((src, i) => (
                    <img key={`col2-s2-${i}`} src={src} className="w-full h-48 md:h-56 object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" alt="Menu PodoMoro" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs (Iconic Segmented Slider) */}
          <div className="relative mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Scrollable Container with Gradient Fade Mask for Mobile */}
            <div 
              className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 sm:justify-center"
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mx-auto w-max min-w-min border border-slate-200/50">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`relative flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-xl font-semibold transition-colors duration-300 z-10 ${
                        isActive ? "text-amber-700" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryHighlight"
                          className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(202,129,0,0.3)] border border-slate-200/50"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
                        {category.id}
                      </span>
                    </button>
                  );
                })}
              </div>
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
                  className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-row sm:flex-col ${!item.isAvailable ? "opacity-75 grayscale-[40%]" : ""
                    }`}
                >
                  {/* Image Area */}
                  <div 
                    className="relative w-32 h-32 sm:w-full sm:h-56 m-3 sm:m-0 shrink-0 overflow-hidden cursor-pointer rounded-xl sm:rounded-none"
                    onClick={() => setSelectedMenu(item)}
                  >
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-bold text-slate-700 shadow-sm">
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
                  <div className="p-3 sm:p-6 pl-0 sm:pl-6 flex flex-col flex-grow justify-between">
                    <div className="flex-grow">
                      <h3 
                        className="text-base sm:text-xl font-bold text-slate-800 leading-tight mb-1 sm:mb-2 cursor-pointer hover:text-amber-600 transition-colors"
                        onClick={() => setSelectedMenu(item)}
                      >
                        {item.nama}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    {/* Footer / Price & Action */}
                    <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-gray-50/50 sm:border-gray-50">
                      <p className="text-sm sm:text-xl font-extrabold text-amber-600">
                        {formatRupiah(item.harga)}
                      </p>

                      {item.isAvailable ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // prevent modal opening if card was clicked
                            addToCart(item);
                          }}
                          className="bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 shadow-sm"
                          title="Tambah ke Keranjang"
                        >
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider">
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

      {/* --- MENU DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedMenu(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close btn */}
              <button 
                onClick={() => setSelectedMenu(null)}
                className="absolute top-4 right-4 z-10 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="h-64 sm:h-72 w-full relative">
                <img src={selectedMenu.gambar} alt={selectedMenu.nama} className="w-full h-full object-cover" />
                {selectedMenu.badge && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    {selectedMenu.badge}
                  </div>
                )}
                {!selectedMenu.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white/95 px-4 py-2 rounded-lg font-bold text-slate-800 tracking-wider transform -rotate-6 shadow-xl">
                      HABIS TERJUAL
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-grow overflow-y-auto">
                <div className="text-amber-600 text-sm font-bold mb-2 uppercase tracking-wider">{selectedMenu.kategori}</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedMenu.nama}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {selectedMenu.deskripsi}
                </p>
              </div>
              
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Harga</p>
                  <p className="text-2xl font-extrabold text-amber-600">{formatRupiah(selectedMenu.harga)}</p>
                </div>
                {selectedMenu.isAvailable ? (
                  <button 
                    onClick={() => {
                      addToCart(selectedMenu);
                      setSelectedMenu(null);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-600/30 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Tambah
                  </button>
                ) : (
                  <button disabled className="bg-slate-200 text-slate-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed">
                    Habis
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING CART BUTTON --- */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-amber-600 text-white p-4 rounded-full shadow-2xl shadow-amber-600/40 hover:bg-amber-700 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            aria-label="Buka keranjang pesanan"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {getCartCount()}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- CART SIDEBAR --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 w-[90%] sm:w-[450px] max-h-[85vh] bg-white z-[120] shadow-2xl flex flex-col rounded-3xl overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <ShoppingCart className="text-amber-600" />
                  Pesanan Saya
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
                  aria-label="Tutup keranjang"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                    <p>Keranjang Anda kosong</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <img src={item.gambar} alt={item.nama} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-1">{item.nama}</h4>
                          <p className="text-amber-600 font-semibold text-sm">{formatRupiah(item.harga)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                            <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-amber-600 p-1" aria-label="Kurangi jumlah">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-sm w-4 text-center" aria-label={`Jumlah ${item.qty}`}>{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-amber-600 p-1" aria-label="Tambah jumlah">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors" aria-label="Hapus dari keranjang">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-medium">Total Harga</span>
                    <span className="text-2xl font-extrabold text-amber-600">{formatRupiah(getCartTotal())}</span>
                  </div>
                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-[#CA8100] hover:bg-[#8d5d0a] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#CA8100]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    Pesan via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
