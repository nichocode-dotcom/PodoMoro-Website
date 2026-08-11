import { User, Lock } from 'lucide-react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200 rounded-full blur-[100px] opacity-40 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-orange-200 rounded-full blur-[100px] opacity-40 animate-[pulse_6s_ease-in-out_infinite]"></div>
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative z-10">
        
        <div className="flex justify-center mb-8">
          <img 
            src="/src/assets/Logo-removebg-preview.png" 
            alt="PodoMoro Logo" 
            className="h-16 object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-8 tracking-tight">
          Portal Pengelola
        </h2>
        
        {/* We use onSubmit to prevent default form submission in a real React app, 
            but keeping the visual structure intact */}
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/admin-dashboard'; }}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-bold text-slate-600 mb-2">
              Nama Pengguna
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                id="username" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-800 font-semibold shadow-sm focus:shadow-md focus:shadow-amber-500/10" 
                placeholder="Masukkan nama pengguna" 
                required 
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-bold text-slate-600 mb-2">
              Kata Sandi
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                id="password" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-800 font-semibold shadow-sm focus:shadow-md focus:shadow-amber-500/10" 
                placeholder="Masukkan kata sandi" 
                required 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold rounded-2xl hover:from-amber-600 hover:to-amber-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-600/40 shadow-md shadow-amber-600/20 transition-all duration-300"
          >
            Masuk ke Sistem
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-semibold">
          <a href="/" className="text-slate-400 hover:text-amber-600 transition-colors no-underline">
            Kembali ke Beranda Publik
          </a>
        </div>

      </div>
    </div>
  );
}
