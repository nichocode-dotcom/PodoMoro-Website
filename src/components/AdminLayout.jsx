import { LayoutDashboard, UtensilsCrossed, Wallet, LogOut } from 'lucide-react';

export default function AdminLayout({ children, activeMenu }) {
  const menus = [
    { id: 'dashboard', label: 'Ringkasan Aktivitas', href: '/admin-dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Manajemen Produk', href: '/admin-kelola-menu', icon: UtensilsCrossed },
    { id: 'keuangan', label: 'Pantau Arus Kas', href: '/admin-keuangan', icon: Wallet },
  ];

  return (
    <div className="bg-slate-50 flex min-h-screen text-slate-800 font-sans">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 h-screen shadow-sm z-10">
        
        {/* Brand / Logo Area */}
        <div className="h-24 border-b border-slate-100 flex items-center justify-center px-6">
          <img 
            src="/src/assets/podomoro_logo.png" 
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
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 no-underline group ${
                  isActive 
                    ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100/50' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-600'
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
              className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-600 font-bold hover:bg-amber-50 hover:text-amber-600 hover:shadow-sm rounded-xl transition-all duration-300 no-underline group"
            >
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              Keluar Sistem
            </a>
          </div>
        </div>
        
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-8 md:p-10 overflow-y-auto max-w-[1600px] mx-auto w-full">
        {children}
      </main>
      
    </div>
  );
}
