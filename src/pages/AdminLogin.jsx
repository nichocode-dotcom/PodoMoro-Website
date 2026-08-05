export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-md border border-border">
        
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/podomoro_logo.png" 
            alt="PodoMoro Logo" 
            className="h-16 object-contain" 
          />
        </div>
        
        <h2 className="text-2xl font-bold font-heading text-text-main text-center mb-8">
          Portal Pengelola
        </h2>
        
        {/* We use onSubmit to prevent default form submission in a real React app, 
            but keeping the visual structure intact */}
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/admin-dashboard'; }}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-text-main mb-2">
              Nama Pengguna
            </label>
            <input 
              type="text" 
              id="username" 
              className="w-full px-4 py-2.5 bg-bg-light border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main" 
              placeholder="Masukkan nama pengguna" 
              required 
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-text-main mb-2">
              Kata Sandi
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2.5 bg-bg-light border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main" 
              placeholder="Masukkan kata sandi" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            Masuk ke Sistem
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <a href="/" className="text-text-muted hover:text-primary transition-colors no-underline">
            Kembali ke Beranda Publik
          </a>
        </div>

      </div>
    </div>
  );
}
