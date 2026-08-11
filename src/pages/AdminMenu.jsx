import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdmin } from '../context/AdminContext';
import { Search, Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function AdminMenu() {
  const { menus, addMenu, updateMenu, deleteMenu } = useAdmin();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  
  const initialForm = {
    nama_menu: '', kategori: 'Makanan Utama', harga: '', stok: '', status_tersedia: true, deskripsi: '', gambar: '', badge: ''
  };
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  // Filtered menus
  const filteredMenus = menus.filter(m => m.nama_menu.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (menu) => {
    setModalMode('edit');
    setEditId(menu.id);
    setFormData(menu);
    setIsModalOpen(true);
  };

  const handleSaveMenu = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      addMenu({ ...formData, harga: Number(formData.harga), stok: Number(formData.stok) });
    } else {
      updateMenu(editId, { ...formData, harga: Number(formData.harga), stok: Number(formData.stok) });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (menu) => {
    setMenuToDelete(menu);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (menuToDelete) {
      deleteMenu(menuToDelete.id);
      setIsDeleteModalOpen(false);
      setMenuToDelete(null);
    }
  };

  return (
    <AdminLayout activeMenu="menu">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 m-0 tracking-tight">Manajemen Produk</h1>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[280px] pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm text-slate-700 shadow-sm transition-all" 
              placeholder="Cari nama menu..." 
            />
          </div>
          <button onClick={handleOpenAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 hover:-translate-y-0.5 shadow-sm shadow-amber-600/30 text-sm transition-all duration-200">
            <Plus className="w-4 h-4" /> Tambah Menu
          </button>
        </div>
      </header>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="w-full">
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Nama Menu</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Kategori</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Harga</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Stok</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status Ketersediaan</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMenus.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">Pencarian tidak ditemukan.</td>
                </tr>
              ) : (
                filteredMenus.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-900">{item.nama_menu}</td>
                    <td className="p-4 text-sm text-slate-600">{item.kategori}</td>
                    <td className="p-4 text-sm font-semibold text-slate-700">{formatRupiah(item.harga)}</td>
                    <td className="p-4 text-sm font-bold text-slate-700">{item.stok !== undefined ? item.stok : '-'}</td>
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
                        <button onClick={() => handleOpenEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmDelete(item)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {filteredMenus.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium">Pencarian tidak ditemukan.</div>
            ) : (
              filteredMenus.map((item) => (
                <div key={item.id} className="p-5 flex flex-col gap-4 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Bagian Atas: Nama & Status */}
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight mb-1">{item.nama_menu}</h3>
                      <p className="text-xs font-semibold text-slate-500">{item.kategori}</p>
                    </div>
                    {item.status_tersedia ? (
                      <span className="shrink-0 inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                        Tersedia
                      </span>
                    ) : (
                      <span className="shrink-0 inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-red-200">
                        Habis
                      </span>
                    )}
                  </div>
                  
                  {/* Bagian Tengah: Harga & Stok (Kotak Informasi) */}
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-wider">Harga</p>
                      <p className="text-sm font-extrabold text-amber-600">{formatRupiah(item.harga)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-wider">Sisa Stok</p>
                      <p className="text-sm font-bold text-slate-700">{item.stok !== undefined ? item.stok : '-'}</p>
                    </div>
                  </div>

                  {/* Bagian Bawah: Tombol Aksi */}
                  <div className="flex gap-3 mt-1">
                    <button onClick={() => handleOpenEdit(item)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit2 className="w-4 h-4" /> Edit Menu
                    </button>
                    <button onClick={() => confirmDelete(item)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" /> Hapus
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {modalMode === 'add' ? 'Tambah Menu Baru' : 'Edit Menu'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMenu} className="p-6 sm:p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Menu</label>
                  <input type="text" required value={formData.nama_menu} onChange={(e) => setFormData({...formData, nama_menu: e.target.value})} className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
                    <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
                      <option value="Makanan Utama">Makanan Utama</option>
                      <option value="Minuman">Minuman</option>
                      <option value="Camilan">Camilan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Harga (Rp)</label>
                    <input type="number" required min="0" value={formData.harga} onChange={(e) => setFormData({...formData, harga: e.target.value})} className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Stok (Porsi/Item)</label>
                    <input type="number" required min="0" value={formData.stok} onChange={(e) => setFormData({...formData, stok: e.target.value})} className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Status Ketersediaan</label>
                    <select value={formData.status_tersedia ? 'true' : 'false'} onChange={(e) => setFormData({...formData, status_tersedia: e.target.value === 'true'})} className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
                      <option value="true">Tersedia</option>
                      <option value="false">Habis</option>
                    </select>
                    {Number(formData.stok) === 0 && (
                      <p className="text-[10px] text-amber-600 mt-1">*Jika stok 0, status otomatis Habis.</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-slate-600 hover:bg-slate-100 font-bold rounded-xl transition-colors">Batal</button>
                <button type="submit" className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-amber-600/30">
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && menuToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus Menu?</h3>
            <p className="text-slate-500 text-sm mb-6">
              Anda yakin ingin menghapus <strong>{menuToDelete.nama_menu}</strong> dari daftar menu? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center mt-8">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl transition-colors flex-1">Batal</button>
              <button onClick={handleDelete} className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex-1 shadow-sm shadow-red-600/30">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
