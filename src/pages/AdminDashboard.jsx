import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdmin } from '../context/AdminContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Package, ShoppingCart, Users, AlertCircle, Plus, Minus, X
} from 'lucide-react';

export default function AdminDashboard() {
  const { menus, orders, transactions, updateOrderStatus, updateMenu } = useAdmin();

  // Local state for Table Management
  const [activeTables, setActiveTables] = useState(() => parseInt(localStorage.getItem('admin_active_tables')) || 12);
  const [totalTables, setTotalTables] = useState(() => parseInt(localStorage.getItem('admin_total_tables')) || 20);

  useEffect(() => { localStorage.setItem('admin_active_tables', activeTables); }, [activeTables]);
  useEffect(() => { localStorage.setItem('admin_total_tables', totalTables); }, [totalTables]);

  // Restock Modal State
  const [restockModal, setRestockModal] = useState({ show: false, menu: null, amount: 20 });

  // Dynamic calculations
  const totalPesanan = orders.length;
  const totalPemasukan = transactions
    .filter(t => t.type === 'Kredit' && t.category === 'Penjualan')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const stokMenipis = menus.filter(m => m.stok <= 5);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Calculate dynamic revenue chart data for the last 7 days
  const getRevenueData = () => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });

      const total = transactions
        .filter(t => t.date === dateStr && t.type === 'Kredit' && t.category === 'Penjualan')
        .reduce((acc, curr) => acc + curr.amount, 0);

      data.push({ hari: dayName, pemasukan: total });
    }
    return data;
  };
  const revenueData = getRevenueData();

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (restockModal.menu && restockModal.amount > 0) {
      updateMenu(restockModal.menu.id, {
        ...restockModal.menu,
        stok: restockModal.menu.stok + parseInt(restockModal.amount)
      });
      setRestockModal({ show: false, menu: null, amount: 20 });
    }
  };

  return (
    <AdminLayout activeMenu="dashboard">

      {/* Header Dashboard */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">Performa Hari Ini</h1>
          <p className="text-slate-500 font-medium">{currentDate}</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-green-50 border border-green-100 text-green-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Sistem Online
        </div>
      </header>

      {/* Top Cards (Modul Ringkasan) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Card 1: Total Pemasukan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Pemasukan</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <span
            className="text-2xl lg:text-xl xl:text-3xl font-extrabold text-slate-900 mb-2 truncate"
            title={formatRupiah(totalPemasukan)}
          >
            {formatRupiah(totalPemasukan)}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
              +12.5%
            </span>
            <span className="text-xs text-slate-400">vs kemarin</span>
          </div>
          {/* Dekorasi tipis */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        </div>

        {/* Card 2: Total Pesanan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Pesanan</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <span className="text-2xl lg:text-xl xl:text-3xl font-extrabold text-slate-900 mb-2 truncate" title={totalPesanan}>
            {totalPesanan}
          </span>
          <span className="text-xs text-slate-400">Total pesanan dalam sistem</span>
        </div>

        {/* Card 3: Status Meja */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status Meja</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
              <button onClick={() => setActiveTables(Math.max(0, activeTables - 1))} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500"><Minus className="w-4 h-4" /></button>
              <span className="text-xl font-extrabold text-slate-900 w-10 text-center">{activeTables}</span>
              <button onClick={() => setActiveTables(Math.min(totalTables, activeTables + 1))} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500"><Plus className="w-4 h-4" /></button>
            </div>
            <span className="text-lg font-medium text-slate-500">/ {totalTables} Aktif</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
            <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(activeTables / totalTables) * 100}%` }}></div>
          </div>
        </div>

        {/* Card 4: Peringatan Stok */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-red-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Peringatan Stok</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-amber-600">{stokMenipis.length}</span>
            <span className="text-sm font-bold text-amber-600 leading-tight">Item Habis<br />atau Menipis!</span>
          </div>
        </div>

      </section>

      {/* Middle Section: Chart & Inventory Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Main Chart (col-span-2) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 lg:col-span-2 min-w-0">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Grafik Pemasukan (7 Hari Terakhir)</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hari" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis width={65} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `Rp ${new Intl.NumberFormat('id-ID', { notation: "compact", maximumFractionDigits: 1 }).format(val)}`} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [formatRupiah(value), 'Pemasukan']}
                />
                <Bar dataKey="pemasukan" fill="#d97706" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Alerts (col-span-1) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Butuh Restock
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">

            {stokMenipis.length === 0 ? (
              <div className="p-4 text-center text-slate-400 font-medium">Stok aman, tidak ada peringatan.</div>
            ) : (
              stokMenipis.map(menu => (
                <div key={menu.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-red-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{menu.nama_menu}</h4>
                    <p className="text-xs text-amber-600 font-medium">Sisa Stok: {menu.stok}</p>
                  </div>
                  <button
                    onClick={() => setRestockModal({ show: true, menu: menu, amount: 20 })}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md transition-colors shadow-sm"
                  >
                    Restock
                  </button>
                </div>
              ))
            )}

          </div>
        </div>

      </section>

      {/* Bottom Section: Live Orders Table */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-w-0">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Pesanan Terkonfirmasi</h2>
          <button onClick={() => window.location.href = '/admin-pesanan'} className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">Lihat Semua</button>
        </div>
        <div className="w-full">
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">ID Pesanan</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Tipe</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Item</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Total</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">

              {orders.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-8 text-slate-400 font-medium">Tidak ada pesanan aktif.</td></tr>
              ) : (
                orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-900">{order.id}</td>
                    <td className="p-4 text-sm text-slate-600 font-medium">{order.type}</td>
                    <td className="p-4 text-sm text-slate-600">
                      {order.items.map(i => `${i.nama_menu} (x${i.qty})`).join(', ')}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-900">{formatRupiah(order.total)}</td>
                    <td className="p-4 text-sm">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                          order.status === 'Menyiapkan' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>{order.status}</span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-medium">Tidak ada pesanan aktif.</div>
            ) : (
              orders.slice(0, 5).map(order => (
                <div key={order.id} className="p-5 flex flex-col gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold text-slate-900">{order.id}</span>
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                          order.status === 'Menyiapkan' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>{order.status}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">{order.type}</p>
                    </div>
                    <span className="font-extrabold text-amber-600 shrink-0">{formatRupiah(order.total)}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {order.items.map(i => `${i.nama_menu} (x${i.qty})`).join(', ')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>


      {/* Restock Modal */}
      {restockModal.show && restockModal.menu && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl p-8 text-left animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Restock Menu</h3>
              <button onClick={() => setRestockModal({ show: false, menu: null, amount: 20 })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-500 text-sm mb-4">
              Menambahkan stok untuk <strong>{restockModal.menu.nama_menu}</strong>. (Saat ini: {restockModal.menu.stok})
            </p>

            <form onSubmit={handleRestockSubmit}>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Jumlah Tambahan (Porsi)</label>
              <input
                type="number"
                min="1"
                required
                value={restockModal.amount}
                onChange={(e) => setRestockModal({ ...restockModal, amount: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mb-6 text-lg font-bold"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setRestockModal({ show: false, menu: null, amount: 20 })} className="px-5 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl transition-colors flex-1">Batal</button>
                <button type="submit" className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors flex-1 shadow-sm shadow-amber-600/30">Tambah</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
