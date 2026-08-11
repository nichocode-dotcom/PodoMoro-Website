import { LayoutDashboard, UtensilsCrossed, Wallet, LogOut, ClipboardList } from 'lucide-react';

export default function AdminLayout({ children, activeMenu }) {
  const menus = [
    { id: 'dashboard', label: 'Ringkasan Aktivitas', href: '/admin-dashboard', icon: LayoutDashboard },
    { id: 'pesanan', label: 'Manajemen Pesanan', href: '/admin-pesanan', icon: ClipboardList },
    { id: 'menu', label: 'Manajemen Produk', href: '/admin-kelola-menu', icon: UtensilsCrossed },
    { id: 'keuangan', label: 'Pantau Arus Kas', href: '/admin-keuangan', icon: Wallet },
  ];

  return (
    <div className="bg-slate-50 flex flex-col md:flex-row min-h-screen text-slate-800 font-sans">
      
      {/* Sidebar (Desktop Only) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 sticky top-0 h-screen shadow-sm z-10">
        
        {/* Brand / Logo Area */}
        <div className="h-24 border-b border-slate-100 flex items-center justify-center px-6">
          <img 
            src="/src/assets/Logo-removebg-preview.png" 
            alt="PodoMoro Logo" 
            className="h-14 object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-grow py-8 flex flex-col gap-2 px-5">
          <p className="px-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-3">Menu Admin</p>
          
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            
            return (
              <a 
                key={menu.id} 
                href={menu.href} 
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 no-underline group ${
                  isActive 
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 border-transparent' 
                    : 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-amber-600'
                  }`} 
                />
                {menu.label}
              </a>
            );
          })}
        </nav>
        
        {/* Footer Sidebar (Logout) */}
        <div className="p-5 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <a 
              href="/admin-login" 
              className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-600 font-bold hover:bg-red-50 hover:text-red-600 hover:shadow-sm rounded-xl transition-all duration-300 no-underline group"
            >
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
              Keluar Sistem
            </a>
          </div>
        </div>
        
      </aside>

      {/* Mobile Header (Sticky Top) */}
      <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-5 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/Logo-removebg-preview.png" 
            alt="PodoMoro Logo" 
            className="h-9 object-contain" 
          />
          <span className="font-extrabold text-slate-800 text-sm tracking-wide">ADMIN</span>
        </div>
        <a href="/admin-login" className="text-slate-400 hover:text-red-600 p-2 transition-colors">
          <LogOut className="w-5 h-5" />
        </a>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-4 pb-24 md:p-8 overflow-y-auto max-w-[1600px] mx-auto w-full min-w-0 overflow-x-hidden">
        {children}
      </main>
      {/* Mobile Bottom Navigation (Fixed Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-[72px] z-50 px-2 pb-safe shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = activeMenu === menu.id;
          // Ambil kata pertama untuk label di HP agar muat
          const shortLabel = menu.label.split(' ')[1] || menu.label.split(' ')[0];
          
          return (
            <a 
              key={menu.id} 
              href={menu.href} 
              className={`flex flex-col items-center justify-center w-full h-full gap-1 no-underline transition-colors ${
                isActive ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-amber-50' : 'bg-transparent'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'fill-amber-600/20' : ''}`} />
              </div>
              <span className="text-[10px] font-bold tracking-tight">{shortLabel}</span>
            </a>
          );
        })}
      </nav>
      
    </div>
  );
}
