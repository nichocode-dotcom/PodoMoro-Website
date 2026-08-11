import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdmin } from '../context/AdminContext';
import { Plus, ShoppingCart, CheckCircle, Trash2, Utensils, ShoppingBag, Clock, User, AlertCircle, X } from 'lucide-react';

export default function AdminPesanan() {
  const { menus, orders, addOrder, updateOrderStatus } = useAdmin();
  
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Makan di tempat');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // For selecting a menu
  const [currentMenuId, setCurrentMenuId] = useState('');
  const [currentQty, setCurrentQty] = useState(1);
  
  // Custom Alert State
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleAddItem = () => {
    if (!currentMenuId || currentQty < 1) return;
    
    const menu = menus.find(m => m.id === parseInt(currentMenuId));
    if (!menu) return;

    if (menu.stok < currentQty) {
      showToast('error', 'Stok Tidak Mencukupi!', `Sisa stok ${menu.nama_menu} hanya tinggal ${menu.stok}.`);
      return;
    }

    const existingItem = selectedItems.find(i => i.menuId === menu.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.menuId === menu.id ? { ...i, qty: i.qty + currentQty } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { menuId: menu.id, nama_menu: menu.nama_menu, qty: currentQty, harga: menu.harga }]);
    }
    
    setCurrentMenuId('');
    setCurrentQty(1);
  };

  const handleRemoveItem = (menuId) => {
    setSelectedItems(selectedItems.filter(i => i.menuId !== menuId));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      showToast('error', 'Pesanan Kosong', 'Silakan klik tombol "Tambah" untuk memasukkan minimal 1 menu sebelum konfirmasi.');
      return;
    }

    addOrder({
      customerName,
      type: orderType,
      items: selectedItems.map(item => ({ menuId: item.menuId, qty: item.qty }))
    });

    // Reset form
    setCustomerName('');
    setOrderType('Makan di tempat');
    setSelectedItems([]);
    setCurrentMenuId('');
    setCurrentQty(1);
    
    showToast('success', 'Pesanan Berhasil Dibuat!', 'Riwayat pesanan, stok, dan kas keuangan telah diperbarui secara otomatis.');
  };

  const currentTotal = selectedItems.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  return (
    <AdminLayout activeMenu="pesanan">
      
      {/* Custom Toast Notification */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-start gap-4 w-[90vw] max-w-[400px]">
          <div className={`mt-0.5 rounded-full p-1 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1 pr-2">
            <h4 className="font-bold text-sm tracking-wide">{toast.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast(prev => ({...prev, show: false}))} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Manajemen Pesanan</h1>
        <p className="text-slate-500">Input pesanan dari WhatsApp atau Pelanggan langsung.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Tambah Pesanan */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingCart className="text-amber-500 w-6 h-6" /> Buat Pesanan Baru
          </h2>
          
          <form onSubmit={handleSubmitOrder}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Pelanggan / Nomor WA</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" 
                  placeholder="Contoh: Budi (WA)" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tipe Pesanan</label>
                <select 
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="Makan di tempat">Makan di tempat</option>
                  <option value="Bungkus / Takeaway">Bungkus / Takeaway</option>
                  <option value="Reservasi">Reservasi</option>
                </select>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Pilih Item Menu</label>
                <div className="flex flex-col 2xl:flex-row gap-3 mb-4">
                  <select 
                    value={currentMenuId}
                    onChange={(e) => setCurrentMenuId(e.target.value)}
                    className="w-full 2xl:flex-grow px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-slate-50/50"
                  >
                    <option value="">-- Pilih Menu --</option>
                    {menus.map(menu => (
                      <option key={menu.id} value={menu.id} disabled={!menu.status_tersedia || menu.stok === 0}>
                        {menu.nama_menu}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-3 w-full 2xl:w-auto">
                    <input 
                      type="number" 
                      min="1" 
                      value={currentQty}
                      onChange={(e) => setCurrentQty(parseInt(e.target.value) || 1)}
                      className="w-24 px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50 text-center font-semibold"
                    />
                    <button 
                      type="button"
                      onClick={handleAddItem}
                      className="flex-1 2xl:flex-none bg-amber-100 hover:bg-amber-200 text-amber-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-colors text-sm whitespace-nowrap shadow-sm"
                    >
                      <Plus className="w-5 h-5 mr-1" /> Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* Daftar Item Terpilih */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[100px]">
                <h3 className="text-sm font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Item Terpilih:</h3>
                {selectedItems.length === 0 ? (
                  <p className="text-sm text-slate-400 italic text-center py-2">Belum ada item ditambahkan</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedItems.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{item.nama_menu} <span className="text-amber-600 font-bold">x{item.qty}</span></span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-600 font-semibold">{formatRupiah(item.harga * item.qty)}</span>
                          <button type="button" onClick={() => handleRemoveItem(item.menuId)} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                
                {selectedItems.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-800">Total Harga:</span>
                    <span className="text-lg font-extrabold text-amber-600">{formatRupiah(currentTotal)}</span>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-4 rounded-xl shadow-md shadow-amber-600/30 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> Konfirmasi & Simpan Pesanan
            </button>
          </form>
        </section>

        {/* Daftar Pesanan Aktif */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">Pesanan Aktif Terbaru</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-extrabold px-3 py-1 rounded-full">{orders.length} Pesanan</span>
          </div>
          
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => {
              const isTakeaway = order.type.toLowerCase().includes('bungkus') || order.type.toLowerCase().includes('takeaway');
              const isDone = order.status === 'Selesai';
              const isCooking = order.status === 'Menyiapkan';
              
              const statusColor = isDone ? 'bg-green-500' : isCooking ? 'bg-amber-500' : 'bg-blue-500';
              const statusBg = isDone ? 'bg-green-50' : isCooking ? 'bg-amber-50' : 'bg-blue-50';
              const statusText = isDone ? 'text-green-700' : isCooking ? 'text-amber-700' : 'text-blue-700';
              
              return (
                <div key={order.id} className="relative bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all overflow-hidden group">
                  {/* Left accent border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColor}`}></div>
                  
                  <div className="p-5 pl-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-extrabold text-slate-900 text-lg">{order.id}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${statusBg} ${statusText}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {order.customerName || 'Pelanggan'}</span>
                          <span className="flex items-center gap-1.5">
                            {isTakeaway ? <ShoppingBag className="w-3.5 h-3.5 text-slate-400" /> : <Utensils className="w-3.5 h-3.5 text-slate-400" />}
                            {order.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
                      <ul className="space-y-1.5 text-sm">
                        {order.items.map((i, idx) => (
                          <li key={idx} className="flex justify-between items-start">
                            <span className="text-slate-600 font-medium">
                              <span className="text-slate-400 mr-2">{i.qty}x</span>{i.nama_menu}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-3 border-t border-slate-100 gap-3">
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Menunggu')} 
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${order.status === 'Menunggu' ? 'bg-blue-500 text-white scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          Menunggu
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Menyiapkan')} 
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${order.status === 'Menyiapkan' ? 'bg-amber-500 text-white scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          Menyiapkan
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Selesai')} 
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${order.status === 'Selesai' ? 'bg-green-500 text-white scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          Selesai
                        </button>
                      </div>
                      <span className="font-extrabold text-amber-600 text-lg">
                        {formatRupiah(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {orders.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <ShoppingCart className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-slate-500 font-bold text-lg">Belum ada pesanan aktif</p>
                <p className="text-slate-400 text-sm mt-1">Pesanan yang baru masuk akan muncul di sini.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </AdminLayout>
  );
}
