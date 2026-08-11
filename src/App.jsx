import React, { useState, useEffect } from 'react';
import { AdminProvider } from './context/AdminContext';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Menu from './pages/Menu';
import TentangKami from './pages/TentangKami';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMenu from './pages/AdminMenu';
import AdminKeuangan from './pages/AdminKeuangan';
import AdminPesanan from './pages/AdminPesanan';
import AccessibilityWidget from './components/AccessibilityWidget';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Mengecek apakah halaman dimuat ulang (Refresh/F5)
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    // Tampilkan jika di-refresh ATAU jika belum pernah melihat splash di sesi ini
    if (isReload) return true;
    return !sessionStorage.getItem('hasSeenSplash');
  });
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  let PageComponent = <Home />;
  if (currentPath === '/menu') {
    PageComponent = <Menu />;
  } else if (currentPath === '/tentang-kami') {
    PageComponent = <TentangKami />;
  } else if (currentPath === '/galeri') {
    PageComponent = <Galeri />;
  } else if (currentPath === '/kontak') {
    PageComponent = <Kontak />;
  } else if (currentPath === '/admin-login') {
    PageComponent = <AdminLogin />;
  } else if (currentPath === '/admin-dashboard') {
    PageComponent = <AdminDashboard />;
  } else if (currentPath === '/admin-kelola-menu') {
    PageComponent = <AdminMenu />;
  } else if (currentPath === '/admin-keuangan') {
    PageComponent = <AdminKeuangan />;
  } else if (currentPath === '/admin-pesanan') {
    PageComponent = <AdminPesanan />;
  }

  return (
    <AdminProvider>
      {showSplash && (
        <SplashScreen onComplete={() => {
          setShowSplash(false);
          sessionStorage.setItem('hasSeenSplash', 'true');
        }} />
      )}
      <div className="relative z-0 min-h-screen">
        {PageComponent}
        {!currentPath.startsWith('/admin') && <AccessibilityWidget />}
      </div>
    </AdminProvider>
  );
}

export default App;