import React, { useState, useEffect } from 'react';
import { Type, Eye, AlignLeft, ZapOff, X, Accessibility, Plus, Minus, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('a11y_settings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      textSizeLevel: 0,
      highContrast: false,
      dyslexiaFriendly: false,
      reduceMotion: false,
      isHidden: false
    };
  });

  // Load from local storage
  useEffect(() => {
    const handleToggle = () => {
      setSettings(prev => ({ ...prev, isHidden: false }));
      setIsOpen(true);
    };
    window.addEventListener('toggle-accessibility', handleToggle);
    return () => window.removeEventListener('toggle-accessibility', handleToggle);
  }, []);

  // Apply to body and save
  useEffect(() => {
    localStorage.setItem('a11y_settings', JSON.stringify(settings));
    
    const html = document.documentElement;
    const body = document.body;
    
    html.style.fontSize = `${100 + (settings.textSizeLevel * 10)}%`;
    
    settings.highContrast ? body.classList.add('a11y-high-contrast') : body.classList.remove('a11y-high-contrast');
    settings.dyslexiaFriendly ? body.classList.add('a11y-dyslexia') : body.classList.remove('a11y-dyslexia');
    settings.reduceMotion ? body.classList.add('a11y-reduce-motion') : body.classList.remove('a11y-reduce-motion');
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (settings.isHidden) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl p-4 w-[320px] border border-slate-200"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Aksesibilitas</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors" 
                aria-label="Tutup menu aksesibilitas"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between w-full px-3 py-3 rounded-xl bg-slate-50 border-2 border-transparent">
                <div className="flex items-center gap-2 text-slate-700">
                  <Type className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">Ukuran Teks</span>
                </div>
                <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-slate-200 p-1 flex-shrink-0">
                  <button 
                    onClick={() => setSettings(prev => ({ ...prev, textSizeLevel: Math.max(0, prev.textSizeLevel - 1) }))}
                    className="p-1 text-slate-400 hover:text-amber-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    disabled={settings.textSizeLevel === 0}
                    aria-label="Perkecil teks"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{settings.textSizeLevel}</span>
                  <button 
                    onClick={() => setSettings(prev => ({ ...prev, textSizeLevel: Math.min(2, prev.textSizeLevel + 1) }))}
                    className="p-1 text-slate-400 hover:text-amber-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    disabled={settings.textSizeLevel === 2}
                    aria-label="Perbesar teks"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => toggleSetting('highContrast')}
                className={`flex items-center gap-3 w-full px-3 py-4 rounded-xl transition-colors ${settings.highContrast ? 'bg-amber-100 text-amber-800 font-bold border-2 border-amber-500' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-2 border-transparent'}`}
                aria-pressed={settings.highContrast}
              >
                <Eye className="w-5 h-5 flex-shrink-0" />
                <span className="text-left text-sm leading-tight">Kontras Tinggi</span>
              </button>
              
              <button 
                onClick={() => toggleSetting('dyslexiaFriendly')}
                className={`flex items-center gap-3 w-full px-3 py-4 rounded-xl transition-colors ${settings.dyslexiaFriendly ? 'bg-amber-100 text-amber-800 font-bold border-2 border-amber-500' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-2 border-transparent'}`}
                aria-pressed={settings.dyslexiaFriendly}
              >
                <AlignLeft className="w-5 h-5 flex-shrink-0" />
                <span className="text-left text-sm leading-tight">Ramah Disleksia</span>
              </button>
              
              <button 
                onClick={() => toggleSetting('reduceMotion')}
                className={`flex items-center gap-3 w-full px-3 py-4 rounded-xl transition-colors ${settings.reduceMotion ? 'bg-amber-100 text-amber-800 font-bold border-2 border-amber-500' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-2 border-transparent'}`}
                aria-pressed={settings.reduceMotion}
              >
                <ZapOff className="w-5 h-5 flex-shrink-0" />
                <span className="text-left text-sm leading-tight">Hentikan Animasi</span>
              </button>

              <button 
                onClick={() => {
                  toggleSetting('isHidden');
                  setIsOpen(false);
                }}
                className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                <EyeOff className="w-3 h-3" /> Sembunyikan Tombol Ini
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buka pengaturan aksesibilitas"
        aria-expanded={isOpen}
        className="bg-amber-600 text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 hover:-translate-y-1 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
}
