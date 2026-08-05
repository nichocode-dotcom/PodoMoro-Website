import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminMenu() {
  const [menus, setMenus] = useState([]);

  const dummyMenu = [
    { id: 1, nama_menu: 'Indomie Goreng Spesial', kategori: 'Makanan Utama', harga: 15000, status_tersedia: true },
    { id: 2, nama_menu: 'Nasi Telur Pontianak', kategori: 'Makanan Utama', harga: 18000, status_tersedia: true },
    { id: 3, nama_menu: 'Es Teh Manis Jumbo', kategori: 'Minuman', harga: 5000, status_tersedia: true },
    { id: 4, nama_menu: 'Mendoan Panas', kategori: 'Camilan', harga: 10000, status_tersedia: false },
    { id: 5, nama_menu: 'Roti Bakar Coklat Keju', kategori: 'Camilan', harga: 15000, status_tersedia: true },
    { id: 6, nama_menu: 'Kopi Hitam Joss', kategori: 'Minuman', harga: 8000, status_tersedia: false }
  ];

  useEffect(() => {
    // Gunakan data dummy untuk UI saat ini
    setMenus(dummyMenu);

    // TODO: Fetch dari API Backend
    /*
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMenus(data);
      })
      .catch(err => console.error("Error fetching menus:", err));
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
    <AdminLayout activeMenu="menu">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 m-0">Manajemen Produk</h1>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              className="w-full md:w-[280px] pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm text-slate-700 shadow-sm transition-all" 
              placeholder="Cari nama menu..." 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 hover:-translate-y-0.5 shadow-sm shadow-orange-600/20 text-sm transition-all duration-200">
            <Plus className="w-4 h-4" /> Tambah Menu
          </button>
        </div>
      </header>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Nama Menu</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Kategori</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Harga</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status Ketersediaan</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {menus.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-900">{item.nama_menu}</td>
                  <td className="p-4 text-sm text-slate-600">{item.kategori}</td>
                  <td className="p-4 text-sm font-semibold text-slate-700">{formatRupiah(item.harga)}</td>
                  <td className="p-4 text-sm">
                    {item.status_tersedia ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        Tersedia
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700 border border-red-200">
                        Habis
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
