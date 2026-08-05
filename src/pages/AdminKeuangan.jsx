import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Download } from 'lucide-react';

export default function AdminKeuangan() {
  const [financeData, setFinanceData] = useState([]);
  
  const cashFlowData = [
    { tanggal: '21 Jul', pemasukan: 1200000, pengeluaran: 400000 },
    { tanggal: '22 Jul', pemasukan: 1500000, pengeluaran: 300000 },
    { tanggal: '23 Jul', pemasukan: 1100000, pengeluaran: 500000 },
    { tanggal: '24 Jul', pemasukan: 1800000, pengeluaran: 600000 },
    { tanggal: '25 Jul', pemasukan: 1600000, pengeluaran: 450000 },
    { tanggal: '26 Jul', pemasukan: 2100000, pengeluaran: 300000 },
    { tanggal: '27 Jul', pemasukan: 2400000, pengeluaran: 800000 },
    { tanggal: '28 Jul', pemasukan: 1900000, pengeluaran: 600000 },
    { tanggal: '29 Jul', pemasukan: 1100000, pengeluaran: 450000 },
    { tanggal: '30 Jul', pemasukan: 1250000, pengeluaran: 350000 },
  ];

  const history = [
    { id: 1, date: '30 Jul 2026', desc: 'Pemasukan Harian Kasir', category: 'Penjualan', amount: 1250000, type: 'Kredit' },
    { id: 2, date: '29 Jul 2026', desc: 'Pemasukan Harian Kasir', category: 'Penjualan', amount: 1100000, type: 'Kredit' },
    { id: 3, date: '29 Jul 2026', desc: 'Belanja Bahan Baku (Pasar)', category: 'Bahan Baku', amount: 450000, type: 'Debit' },
    { id: 4, date: '28 Jul 2026', desc: 'Tagihan Listrik Bulan Ini', category: 'Operasional', amount: 600000, type: 'Debit' },
    { id: 5, date: '27 Jul 2026', desc: 'Gaji Karyawan Mingguan', category: 'Gaji', amount: 800000, type: 'Debit' },
  ];

  useEffect(() => {
    // TODO: Fetch dari API Backend
    /*
    fetch('http://localhost:5000/api/keuangan/ringkasan')
      .then(res => res.json())
      .then(data => setFinanceData(data))
      .catch(err => console.error(err));
    */
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <AdminLayout activeMenu="keuangan">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 m-0">Pantau Arus Kas</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 shadow-sm text-sm transition-all duration-200">
          <Download className="w-4 h-4" /> Unduh Laporan (PDF)
        </button>
      </header>

      {/* Top Cards (Modul Ringkasan) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Pemasukan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Pemasukan</h3>
          <span className="text-3xl font-extrabold text-green-600 mb-2 block">Rp 15.500.000</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
              <TrendingUp className="w-3 h-3" /> +8.4%
            </span>
            <span className="text-xs text-slate-400 font-medium">dari bulan lalu</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>

        {/* Total Pengeluaran */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Pengeluaran</h3>
          <span className="text-3xl font-extrabold text-amber-600 mb-2 block">Rp 8.200.000</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-red-100">
              <TrendingDown className="w-3 h-3" /> -2.1%
            </span>
            <span className="text-xs text-slate-400 font-medium">dari bulan lalu</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>

        {/* Keuntungan Bersih */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Keuntungan Bersih</h3>
          <span className="text-3xl font-extrabold text-orange-600 mb-2 block">Rp 7.300.000</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
              <DollarSign className="w-3 h-3" /> Stabil & Optimal
            </span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>
      </section>

      {/* Main Chart Section: Grafik Area Overlapping */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Arus Kas (10 Hari Terakhir)</h2>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="tanggal" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `Rp ${val / 1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [formatRupiah(value)]}
              />
              <Area type="monotone" dataKey="pemasukan" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPemasukan)" name="Pemasukan" />
              <Area type="monotone" dataKey="pengeluaran" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorPengeluaran)" name="Pengeluaran" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* History Table */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Riwayat Transaksi Terakhir</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Tanggal</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Deskripsi</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Kategori</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Jumlah Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{row.date}</td>
                  <td className="p-4 text-sm font-bold text-slate-900">{row.desc}</td>
                  <td className="p-4 text-sm text-slate-600">{row.category}</td>
                  <td className="p-4 text-sm font-bold text-right whitespace-nowrap">
                    {row.type === 'Kredit' ? (
                      <span className="text-green-600">+ {formatRupiah(row.amount)}</span>
                    ) : (
                      <span className="text-amber-600">- {formatRupiah(row.amount)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </AdminLayout>
  );
}
