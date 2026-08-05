import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  AlertCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({ total_pesanan: 0, total_pemasukan: 0 });

  // Uncomment block di bawah ini saat menghubungkan ke database riil
  /*
  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/harian')
      .then(res => res.json())
      .then(data => {
        setAnalytics(data);
      })
      .catch(err => console.error("Error fetching analytics:", err));
  }, []);
  */

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const revenueData = [
    { hari: 'Senin', pemasukan: 2100000 },
    { hari: 'Selasa', pemasukan: 1800000 },
    { hari: 'Rabu', pemasukan: 2400000 },
    { hari: 'Kamis', pemasukan: 2200000 },
    { hari: 'Jumat', pemasukan: 3100000 },
    { hari: 'Sabtu', pemasukan: 4500000 },
    { hari: 'Minggu', pemasukan: 4250000 },
  ];

  return (
    <AdminLayout activeMenu="dashboard">
      
      {/* Header Dashboard */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Performa Hari Ini</h1>
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Pemasukan</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 mb-2">Rp 4.250.000</span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
              +12.5%
            </span>
            <span className="text-xs text-slate-400">vs kemarin</span>
          </div>
          {/* Dekorasi tipis */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-50 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        </div>

        {/* Card 2: Total Pesanan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Pesanan</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 mb-2">148</span>
          <span className="text-xs text-slate-400">Pesanan selesai hari ini</span>
        </div>

        {/* Card 3: Status Meja */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status Meja</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900">12</span>
            <span className="text-lg font-medium text-slate-500">/ 20 Aktif</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Card 4: Peringatan Stok */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Peringatan Stok</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-amber-600">4</span>
            <span className="text-sm font-bold text-amber-600 leading-tight">Item Habis<br/>atau Menipis!</span>
          </div>
        </div>

      </section>

      {/* Middle Section: Chart & Inventory Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Chart (col-span-2) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Grafik Pemasukan (7 Hari Terakhir)</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hari" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `Rp ${val / 1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [formatRupiah(value), 'Pemasukan']}
                />
                <Bar dataKey="pemasukan" fill="#ea580c" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Alerts (col-span-1) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Butuh Restock
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-red-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Indomie Goreng</h4>
                <p className="text-xs text-amber-600 font-medium">Sisa 1 Dus</p>
              </div>
              <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md transition-colors shadow-sm">
                Order
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Telur Ayam</h4>
                <p className="text-xs text-orange-600 font-medium">Sisa 2 Tray</p>
              </div>
              <button className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-md transition-colors shadow-sm">
                Restock
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Kopi Bubuk Hitam</h4>
                <p className="text-xs text-slate-500 font-medium">Sisa 500g</p>
              </div>
              <button className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-md transition-colors">
                Order
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* Bottom Section: Live Orders Table */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Pesanan Langsung (Live Orders)</h2>
          <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">ID Pesanan</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Tipe</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Item</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Total</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-bold text-slate-900">#PM-001</td>
                <td className="p-4 text-sm text-slate-600 font-medium">Makan di tempat (Meja 4)</td>
                <td className="p-4 text-sm text-slate-600">Nasi Telur Pontianak (x2), Es Teh (x2)</td>
                <td className="p-4 text-sm font-semibold text-slate-900">Rp 30.000</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800">Selesai</span>
                </td>
                <td className="p-4 text-sm">
                  <button className="text-slate-400 hover:text-slate-600 font-medium">Detail</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-bold text-slate-900">#PM-002</td>
                <td className="p-4 text-sm text-slate-600 font-medium">Bungkus / Takeaway</td>
                <td className="p-4 text-sm text-slate-600">Indomie Goreng Spesial (x3)</td>
                <td className="p-4 text-sm font-semibold text-slate-900">Rp 45.000</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-yellow-100 text-yellow-800">Menyiapkan</span>
                </td>
                <td className="p-4 text-sm">
                  <button className="text-slate-400 hover:text-slate-600 font-medium">Detail</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-bold text-slate-900">#PM-003</td>
                <td className="p-4 text-sm text-slate-600 font-medium">Makan di tempat (Meja 12)</td>
                <td className="p-4 text-sm text-slate-600">Roti Bakar Coklat Keju (x1)</td>
                <td className="p-4 text-sm font-semibold text-slate-900">Rp 15.000</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800">Menunggu</span>
                </td>
                <td className="p-4 text-sm">
                  <button className="text-slate-400 hover:text-slate-600 font-medium">Detail</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

    </AdminLayout>
  );
}
