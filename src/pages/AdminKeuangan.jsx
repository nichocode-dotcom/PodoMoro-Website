import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdmin } from '../context/AdminContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Plus, X } from 'lucide-react';

export default function AdminKeuangan() {
  const { transactions, setTransactions } = useAdmin();
  
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({ 
    type: 'Debit', // 'Debit' for Pengeluaran, 'Kredit' for Pemasukan
    desc: '', 
    amount: '', 
    category: 'Operasional' 
  });

  // Generate dynamic 7 days cash flow
  const getCashFlowData = () => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
      const dayName = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      
      const dayTransactions = transactions.filter(t => t.date === dateStr);
      const pemasukan = dayTransactions.filter(t => t.type === 'Kredit').reduce((acc, curr) => acc + curr.amount, 0);
      const pengeluaran = dayTransactions.filter(t => t.type === 'Debit').reduce((acc, curr) => acc + curr.amount, 0);
      
      data.push({ tanggal: dayName, pemasukan, pengeluaran });
    }
    return data;
  };

  const cashFlowData = getCashFlowData();

  const totalPemasukan = transactions
    .filter(t => t.type === 'Kredit')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPengeluaran = transactions
    .filter(t => t.type === 'Debit')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const keuntunganBersih = totalPemasukan - totalPengeluaran;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
    
    setTransactions([
      {
        id: Date.now(),
        date: dateStr,
        desc: transactionForm.desc,
        category: transactionForm.category,
        amount: Number(transactionForm.amount),
        type: transactionForm.type
      },
      ...transactions
    ]);
    
    setShowTransactionModal(false);
    setTransactionForm({ type: 'Debit', desc: '', amount: '', category: 'Operasional' });
  };

  return (
    <AdminLayout activeMenu="keuangan">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 m-0 tracking-tight">Pantau Arus Kas</h1>
        <button onClick={() => setShowTransactionModal(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 hover:-translate-y-0.5 shadow-sm shadow-amber-600/30 text-sm transition-all duration-200">
          <Plus className="w-4 h-4" /> Catat Transaksi
        </button>
      </header>

      {/* Top Cards (Modul Ringkasan) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Pemasukan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Pemasukan</h3>
          <span className="text-2xl lg:text-xl xl:text-3xl font-extrabold text-green-600 mb-2 block truncate" title={formatRupiah(totalPemasukan)}>{formatRupiah(totalPemasukan)}</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 shrink-0">
              <TrendingUp className="w-3 h-3" /> +8.4%
            </span>
            <span className="text-xs text-slate-400 font-medium">dari bulan lalu</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>

        {/* Total Pengeluaran */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Pengeluaran</h3>
          <span className="text-2xl lg:text-xl xl:text-3xl font-extrabold text-amber-600 mb-2 block truncate" title={formatRupiah(totalPengeluaran)}>{formatRupiah(totalPengeluaran)}</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-red-100 shrink-0">
              <TrendingDown className="w-3 h-3" /> -2.1%
            </span>
            <span className="text-xs text-slate-400 font-medium">dari bulan lalu</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>

        {/* Keuntungan Bersih */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Keuntungan Bersih</h3>
          <span className="text-2xl lg:text-xl xl:text-3xl font-extrabold text-amber-600 mb-2 block truncate" title={formatRupiah(keuntunganBersih)}>{formatRupiah(keuntunganBersih)}</span>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              <DollarSign className="w-3 h-3" /> Stabil & Optimal
            </span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl pointer-events-none opacity-60"></div>
        </div>
      </section>

      {/* Main Chart Section: Grafik Area Overlapping */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-8 mb-8 min-w-0">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-slate-800">Arus Kas (7 Hari Terakhir)</h2>
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
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="tanggal" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis width={65} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `Rp ${new Intl.NumberFormat('id-ID', { notation: "compact", maximumFractionDigits: 1 }).format(val)}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [formatRupiah(value)]}
              />
              <Area type="monotone" dataKey="pemasukan" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPemasukan)" name="Pemasukan" />
              <Area type="monotone" dataKey="pengeluaran" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorPengeluaran)" name="Pengeluaran" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* History Table */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-w-0">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-800">Riwayat Transaksi Terakhir</h2>
        </div>
        <div className="w-full">
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Tanggal</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Deskripsi</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Kategori</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Jumlah Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((row) => (
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

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium">Belum ada transaksi.</div>
            ) : (
              transactions.map((row) => (
                <div key={row.id} className="p-5 flex flex-col gap-2 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{row.date}</p>
                      <h4 className="font-bold text-slate-900 leading-tight">{row.desc}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      {row.type === 'Kredit' ? (
                        <span className="text-sm font-extrabold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">+ {formatRupiah(row.amount)}</span>
                      ) : (
                        <span className="text-sm font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-red-100">- {formatRupiah(row.amount)}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {row.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal Input Transaksi */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Catat Transaksi Baru</h3>
              <button onClick={() => setShowTransactionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              
              {/* Pilihan Jenis Transaksi */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                <button 
                  type="button"
                  onClick={() => setTransactionForm({...transactionForm, type: 'Debit', category: 'Operasional'})}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${transactionForm.type === 'Debit' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Pengeluaran
                </button>
                <button 
                  type="button"
                  onClick={() => setTransactionForm({...transactionForm, type: 'Kredit', category: 'Modal'})}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${transactionForm.type === 'Kredit' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Pemasukan
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                <input 
                  type="text" 
                  required
                  placeholder={transactionForm.type === 'Debit' ? "Contoh: Beli Gas Elpiji" : "Contoh: Tambahan Modal"}
                  value={transactionForm.desc} 
                  onChange={(e) => setTransactionForm({ ...transactionForm, desc: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                <select 
                  value={transactionForm.category}
                  onChange={(e) => setTransactionForm({ ...transactionForm, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  {transactionForm.type === 'Debit' ? (
                    <>
                      <option value="Operasional">Operasional</option>
                      <option value="Bahan Baku">Bahan Baku</option>
                      <option value="Gaji">Gaji / Upah</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </>
                  ) : (
                    <>
                      <option value="Penjualan">Penjualan Eksternal</option>
                      <option value="Modal">Tambahan Modal</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nominal (Rp)</label>
                <input 
                  type="number" 
                  min="1" 
                  required
                  placeholder="Contoh: 150000"
                  value={transactionForm.amount} 
                  onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" 
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowTransactionModal(false)} className="px-5 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl transition-colors flex-1">Batal</button>
                <button type="submit" className={`px-5 py-3 text-white font-bold rounded-xl transition-colors flex-1 shadow-sm ${transactionForm.type === 'Debit' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30' : 'bg-green-600 hover:bg-green-700 shadow-green-600/30'}`}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
