import React, { createContext, useState, useEffect, useContext } from 'react';

// Import gambar menu
import img1 from '../assets/menu_indomie_goreng_telur.png';
import img2 from '../assets/menu_indomie_goreng_spesial.png';
import img3 from '../assets/menu_indomie_goreng_dobel.png';
import img4 from '../assets/menu_indomie_rebus_ayam_bawang.png';
import img5 from '../assets/menu_indomie_rebus_telur.png';
import img7 from '../assets/mie_goreng_tek_tek.png';
import img8 from '../assets/magelangan.png';
import img9 from '../assets/nasi_omelet.png';
import img10 from '../assets/nasi_telur_kecap.png';
import img11 from '../assets/nasi_sarden.png';
import img12 from '../assets/nasi_ayam_geprek.png';
import img13 from '../assets/nasi_telur_balado.png';
import img14 from '../assets/nasi_orak_arik_telor.png';
import img15 from '../assets/es_teh_manis.png';
import img16 from '../assets/es_jeruk.png';
import img17 from '../assets/es_lemon_tea.png';
import img18 from '../assets/es_nutrisari.png';
import img19 from '../assets/es_milo.png';
import img20 from '../assets/es_chocolatos.png';
import img21 from '../assets/kopi_hitam.png';
import img22 from '../assets/kopi_susu_instan.png';
import img23 from '../assets/extra_jos.png';
import img24 from '../assets/kukubima_susu.png';
import img25 from '../assets/soda_gembira.png';
import img26 from '../assets/tempe_mendoan.png';
import img27 from '../assets/tahu_isi.png';
import img28 from '../assets/bakwan_sayur.png';
import img29 from '../assets/kerupuk.png';

export const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const defaultMenus = [
    { id: 1, nama_menu: "Indomie Goreng Telur", kategori: "Makanan Utama", deskripsi: "Indomie goreng disajikan dengan telur (pilihan: dadar, ceplok, atau setengah matang).", harga: 10000, gambar: img1, status_tersedia: true, badge: null, stok: 15 },
    { id: 2, nama_menu: "Indomie Goreng Spesial / Intel", kategori: "Makanan Utama", deskripsi: "Indomie goreng dengan porsi pas, ditambah telur, ekstra sayur sawi, dan irisan sosis/kornet.", harga: 12000, gambar: img2, status_tersedia: true, badge: "Favorit", stok: 15 },
    { id: 3, nama_menu: "Indomie Goreng Dobel", kategori: "Makanan Utama", deskripsi: "Dua bungkus Indomie goreng jadikan satu untuk porsi jumbo.", harga: 15000, gambar: img3, status_tersedia: true, badge: null, stok: 15 },
    { id: 4, nama_menu: "Indomie Rebus Ayam Bawang", kategori: "Makanan Utama", deskripsi: "Varian kuah klasik gurih yang disajikan polosan tanpa telur, dengan taburan bawang goreng.", harga: 8000, gambar: img4, status_tersedia: true, badge: null, stok: 15 },
    { id: 5, nama_menu: "Indomie Rebus Telur", kategori: "Makanan Utama", deskripsi: "Indomie kuah dengan telur yang dimasak setengah matang menyatu dengan kuah.", harga: 10000, gambar: img5, status_tersedia: true, badge: null, stok: 15 },
    { id: 6, nama_menu: "Indomie Rebus Tek-Tek", kategori: "Makanan Utama", deskripsi: "Indomie kuah yang dimasak ulang dengan bumbu ulek tambahan, sayur sawi, kol, dan irisan cabai rawit merah.", harga: 15000, gambar: img7, status_tersedia: true, badge: null, stok: 15 },
    { id: 7, nama_menu: "Magelangan", kategori: "Makanan Utama", deskripsi: "Perpaduan nasi goreng yang dicampur dengan Indomie goreng dan bumbu rempah.", harga: 14000, gambar: img8, status_tersedia: true, badge: "Favorit", stok: 15 },
    { id: 8, nama_menu: "Nasi Omelet Mie", kategori: "Makanan Utama", deskripsi: "Indomie yang dihancurkan, dicampur telur, lalu digoreng menjadi martabak mie tebal, disajikan dengan nasi hangat.", harga: 13000, gambar: img9, status_tersedia: true, badge: null, stok: 15 },
    { id: 9, nama_menu: "Nasi Telur Kecap", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur ceplok krispi di pinggirnya, disiram bumbu kecap manis gurih.", harga: 10000, gambar: img10, status_tersedia: true, badge: null, stok: 15 },
    { id: 10, nama_menu: "Nasi Sarden", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan lauk sarden kaleng yang dimasak ulang dengan irisan bawang merah dan cabai.", harga: 15000, gambar: img11, status_tersedia: true, badge: null, stok: 15 },
    { id: 11, nama_menu: "Nasi Ayam Geprek", kategori: "Makanan Utama", deskripsi: "Nasi dengan ayam goreng tepung yang digeprek dengan sambal bawang (Bisa request tingkat kepedasan).", harga: 18000, gambar: img12, status_tersedia: true, badge: null, stok: 15 },
    { id: 12, nama_menu: "Nasi Telur Balado", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur rebus goreng yang disiram bumbu balado pedas manis.", harga: 12000, gambar: img13, status_tersedia: true, badge: null, stok: 15 },
    { id: 13, nama_menu: "Nasi Orak-Arik Telur", kategori: "Makanan Utama", deskripsi: "Nasi hangat dengan telur orak-arik yang dimasak dengan bumbu gurih.", harga: 10000, gambar: img14, status_tersedia: true, badge: null, stok: 15 },
    { id: 14, nama_menu: "Es Teh Manis / Teh Panas", kategori: "Minuman", deskripsi: "Minuman wajib pelepas dahaga dengan seduhan teh melati.", harga: 5000, gambar: img15, status_tersedia: true, badge: "Favorit", stok: 20 },
    { id: 15, nama_menu: "Es Jeruk Peras / Panas", kategori: "Minuman", deskripsi: "Menggunakan jeruk peras asli, bukan sirup.", harga: 6000, gambar: img16, status_tersedia: true, badge: "Favorit", stok: 3 }, // <--- Low stock for demo
    { id: 16, nama_menu: "Es Lemon Tea", kategori: "Minuman", deskripsi: "Teh manis dengan perasan jeruk nipis/lemon.", harga: 7000, gambar: img17, status_tersedia: true, badge: null, stok: 20 },
    { id: 17, nama_menu: "Es Nutrisari", kategori: "Minuman", deskripsi: "Minuman segar rasa buah. Tersedia rasa: Jeruk Peras, Sweet Orange, Blewah, atau Mangga.", harga: 5000, gambar: img18, status_tersedia: true, badge: null, stok: 20 },
    { id: 19, nama_menu: "Es Milo", kategori: "Minuman", deskripsi: "Minuman susu coklat malt yang manis dan kaya rasa. Disajikan dingin menyegarkan dengan es batu.", harga: 8000, gambar: img19, status_tersedia: true, badge: null, stok: 20 },
    { id: 20, nama_menu: "Es Chocolatos", kategori: "Minuman", deskripsi: "Minuman coklat kekinian yang kental dan manis. Pilihan tepat untuk pecinta coklat, disajikan dingin.", harga: 8000, gambar: img20, status_tersedia: true, badge: null, stok: 20 },
    { id: 21, nama_menu: "Kopi Hitam (Kopi Tubruk)", kategori: "Minuman", deskripsi: "Kopi hitam seduh (Kapal Api atau sejenisnya) disajikan panas.", harga: 5000, gambar: img21, status_tersedia: true, badge: "Favorit", stok: 20 },
    { id: 22, nama_menu: "Kopi Susu Instan", kategori: "Minuman", deskripsi: "Kopi susu instan varian Good Day, Nescafe, atau Indocafe. Bisa request rasa jika tersedia.", harga: 6000, gambar: img22, status_tersedia: true, badge: null, stok: 20 },
    { id: 23, nama_menu: "Es Extra Joss / Kuku Bima", kategori: "Minuman", deskripsi: "Minuman berenergi pelepas dahaga.", harga: 5000, gambar: img23, status_tersedia: true, badge: null, stok: 20 },
    { id: 24, nama_menu: "Kuku Bima Susu", kategori: "Minuman", deskripsi: "Minuman berenergi yang dicampur dengan susu kental manis putih.", harga: 7000, gambar: img24, status_tersedia: true, badge: null, stok: 20 },
    { id: 25, nama_menu: "Soda Gembira", kategori: "Minuman", deskripsi: "Fanta merah/soda bening yang disajikan dengan es batu dan susu kental manis.", harga: 12000, gambar: img25, status_tersedia: true, badge: null, stok: 20 },
    { id: 26, nama_menu: "Tempe Mendoan", kategori: "Camilan", deskripsi: "Tempe goreng tepung setengah matang bertabur daun bawang. Disajikan hangat.", harga: 10000, gambar: img26, status_tersedia: true, badge: "Favorit", stok: 30 },
    { id: 27, nama_menu: "Tahu Isi / Tahu Susur", kategori: "Camilan", deskripsi: "Tahu pong berisi tumisan sayur tauge dan wortel yang gurih.", harga: 8000, gambar: img27, status_tersedia: true, badge: "Favorit", stok: 30 },
    { id: 28, nama_menu: "Bakwan Sayur", kategori: "Camilan", deskripsi: "Gorengan sayur renyah yang baru diangkat dari wajan.", harga: 8000, gambar: img28, status_tersedia: true, badge: null, stok: 2 }, // <--- Low stock for demo
    { id: 29, nama_menu: "Kerupuk Putih", kategori: "Camilan", deskripsi: "Topping tambahan ekstra untuk teman makan.", harga: 2000, gambar: img29, status_tersedia: true, badge: null, stok: 1 }, // <--- Low stock for demo
  ];

  // Generate past 7 days dates dynamically for demo
  const getRelativeDateStr = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  const defaultTransactions = [
    { id: 1, date: getRelativeDateStr(0), desc: 'Penjualan Harian Kasir', category: 'Penjualan', amount: 3250000, type: 'Kredit' },
    { id: 2, date: getRelativeDateStr(1), desc: 'Penjualan Harian Kasir', category: 'Penjualan', amount: 4100000, type: 'Kredit' },
    { id: 3, date: getRelativeDateStr(2), desc: 'Penjualan Harian Kasir', category: 'Penjualan', amount: 2450000, type: 'Kredit' },
    { id: 4, date: getRelativeDateStr(3), desc: 'Penjualan Harian Kasir', category: 'Penjualan', amount: 2800000, type: 'Kredit' },
    { id: 5, date: getRelativeDateStr(4), desc: 'Penjualan Harian Kasir', category: 'Penjualan', amount: 3100000, type: 'Kredit' },
    { id: 6, date: getRelativeDateStr(5), desc: 'Penjualan Akhir Pekan', category: 'Penjualan', amount: 4800000, type: 'Kredit' },
    { id: 7, date: getRelativeDateStr(6), desc: 'Penjualan Akhir Pekan', category: 'Penjualan', amount: 4500000, type: 'Kredit' },
    { id: 8, date: getRelativeDateStr(2), desc: 'Belanja Bahan Baku (Pasar)', category: 'Bahan Baku', amount: 850000, type: 'Debit' },
    { id: 9, date: getRelativeDateStr(1), desc: 'Tagihan Listrik', category: 'Operasional', amount: 600000, type: 'Debit' },
  ];

  const defaultOrders = [
    { id: 'PM-001', type: 'Makan di tempat (Meja 4)', items: [{ nama_menu: 'Nasi Telur Pontianak', qty: 2 }, { nama_menu: 'Es Teh Manis Jumbo', qty: 2 }], total: 46000, status: 'Selesai' },
    { id: 'PM-002', type: 'Bungkus / Takeaway', items: [{ nama_menu: 'Indomie Goreng Spesial', qty: 3 }], total: 45000, status: 'Menyiapkan' },
    { id: 'PM-003', type: 'Makan di tempat (Meja 12)', items: [{ nama_menu: 'Roti Bakar Coklat Keju', qty: 1 }], total: 15000, status: 'Menunggu' }
  ];

  const [menus, setMenus] = useState(() => {
    const saved = localStorage.getItem('admin_menus');
    if (saved) {
      const parsed = JSON.parse(saved);
      const migrated = parsed.map(item => ({
        ...item,
        badge: item.badge === "Best Seller" ? "Favorit" : item.badge
      }));
      localStorage.setItem('admin_menus', JSON.stringify(migrated));
      return migrated;
    }
    return defaultMenus;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('admin_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('admin_transactions');
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  useEffect(() => { localStorage.setItem('admin_menus', JSON.stringify(menus)); }, [menus]);
  useEffect(() => { localStorage.setItem('admin_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('admin_transactions', JSON.stringify(transactions)); }, [transactions]);

  const addOrder = (newOrder) => {
    // Generate simple ID
    const orderId = `PM-${String(orders.length + 1).padStart(3, '0')}`;
    
    // Calculate total and formatted items string
    let total = 0;
    const itemsFormatted = newOrder.items.map(item => {
      const menu = menus.find(m => m.id === item.menuId);
      total += menu.harga * item.qty;
      return { menuId: menu.id, nama_menu: menu.nama_menu, qty: item.qty };
    });

    const orderRecord = {
      id: orderId,
      type: newOrder.type,
      items: itemsFormatted,
      total: total,
      status: 'Menyiapkan',
      customerName: newOrder.customerName
    };

    setOrders([orderRecord, ...orders]);

    // Update Stock
    setMenus(prevMenus => prevMenus.map(menu => {
      const orderItem = itemsFormatted.find(i => i.menuId === menu.id);
      if (orderItem) {
        const newStock = Math.max(0, menu.stok - orderItem.qty);
        return { ...menu, stok: newStock, status_tersedia: newStock > 0 };
      }
      return menu;
    }));

    // Update Transactions
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
    setTransactions([
      {
        id: Date.now(),
        date: dateStr,
        desc: `Pesanan ${newOrder.customerName ? `dari ${newOrder.customerName}` : orderId}`,
        category: 'Penjualan',
        amount: total,
        type: 'Kredit'
      },
      ...transactions
    ]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addMenu = (newMenu) => {
    setMenus(prev => {
      const menuWithId = {
        ...newMenu,
        id: Date.now(),
        // Check availability strictly based on stock
        status_tersedia: parseInt(newMenu.stok) > 0 ? newMenu.status_tersedia : false
      };
      return [...prev, menuWithId];
    });
  };

  const updateMenu = (id, updatedMenu) => {
    setMenus(prev => prev.map(m => {
      if (m.id === id) {
        // Enforce stock rules
        const newStock = parseInt(updatedMenu.stok);
        return { 
          ...m, 
          ...updatedMenu, 
          status_tersedia: newStock > 0 ? updatedMenu.status_tersedia : false 
        };
      }
      return m;
    }));
  };

  const deleteMenu = (id) => {
    setMenus(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AdminContext.Provider value={{ 
      menus, setMenus, addMenu, updateMenu, deleteMenu,
      orders, setOrders, updateOrderStatus, addOrder,
      transactions, setTransactions
    }}>
      {children}
    </AdminContext.Provider>
  );
};
