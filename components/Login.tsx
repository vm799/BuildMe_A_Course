
import React, { useState } from 'react';
import { useApp } from '../App';
import { ThemeMode } from '../types';
import ThemeSlider from './ThemeSlider';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { theme } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-all duration-1000 ${isCyber ? 'bg-black' : 'bg-[#f5f8f6]'}`}>
      <div className={`absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full blur-[80px] opacity-30 ${isCyber ? 'bg-emerald-500' : 'bg-sun'}`}></div>
      <div className={`absolute bottom-[-100px] left-[-100px] w-96 h-96 rounded-full blur-[80px] opacity-20 ${isCyber ? 'bg-magenta-neon' : 'bg-terracotta'}`}></div>

      <div className="fixed top-0 left-0 w-full flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-2">
          <div className={`size-10 rounded-full flex items-center justify-center border transition-all ${isCyber ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-forest/10 border-forest/20'}`}>
            <span className={`material-symbols-outlined text-2xl ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>shield_lock</span>
          </div>
          <span className={`font-bold tracking-tight text-lg ${isCyber ? 'text-white' : 'text-forest'}`}>AI Security Ops</span>
        </div>
        <ThemeSlider />
      </div>

      <main className={`w-full max-w-md backdrop-blur-3xl rounded-3xl p-8 flex flex-col gap-8 shadow-2xl relative border-t transition-all ${isCyber ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-forest/5'}`}>
        <div className="flex flex-col items-center text-center gap-2">
          <div className={`size-16 rounded-full flex items-center justify-center mb-2 transition-all ${isCyber ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-sun/20 border border-sun/50'}`}>
            <span className={`material-symbols-outlined text-3xl ${isCyber ? 'text-emerald-500' : 'text-sun'}`}>fingerprint</span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isCyber ? 'text-white' : 'text-forest'}`}>SECURE AUTHORIZATION</h1>
          <p className={`text-[10px] font-black tracking-[0.2em] uppercase ${isCyber ? 'text-emerald-500' : 'text-forest/60'}`}>Level 4 Access Required</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isCyber ? 'text-white/40' : 'text-forest/40'}`}>Access Identity</label>
            <input 
              type="text" 
              defaultValue="OPERATOR_X772"
              className={`w-full rounded-2xl py-4 px-5 transition-all outline-none border focus:ring-2 ${isCyber ? 'bg-black/40 border-white/10 text-white focus:ring-emerald-500/50 placeholder:text-white/10' : 'bg-linen/30 border-forest/5 text-forest focus:ring-forest/20'}`} 
              placeholder="OPERATOR_X772" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isCyber ? 'text-white/40' : 'text-forest/40'}`}>Secure Passkey</label>
            <input 
              type="password" 
              defaultValue="password"
              className={`w-full rounded-2xl py-4 px-5 transition-all outline-none border focus:ring-2 ${isCyber ? 'bg-black/40 border-white/10 text-white focus:ring-emerald-500/50 placeholder:text-white/10' : 'bg-linen/30 border-forest/5 text-forest focus:ring-forest/20'}`} 
              placeholder="••••••••••••" 
            />
          </div>
        </div>

        <button 
          onClick={handleLogin}
          disabled={loading}
          className={`w-full font-bold text-lg py-4 rounded-full transition-all active:scale-95 shadow-xl uppercase tracking-widest flex items-center justify-center gap-2 ${isCyber ? 'bg-emerald-500 text-black shadow-emerald-500/30' : 'bg-forest text-white shadow-forest/20'}`}
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">refresh</span>
          ) : 'Authorize Access'}
        </button>

        <div className="flex justify-between px-2">
          <button className={`text-[10px] font-bold uppercase tracking-widest ${isCyber ? 'text-white/30 hover:text-emerald-500' : 'text-forest/40 hover:text-forest'}`}>Forgot Key</button>
          <button className={`text-[10px] font-bold uppercase tracking-widest ${isCyber ? 'text-white/30 hover:text-emerald-500' : 'text-forest/40 hover:text-forest'}`}>Request Invite</button>
        </div>
      </main>

      <footer className="fixed bottom-8 w-full flex flex-col items-center gap-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all ${isCyber ? 'bg-black/40 border-white/5' : 'bg-linen/50 border-forest/5'}`}>
          <div className={`size-2 rounded-full animate-pulse ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isCyber ? 'text-white/40' : 'text-forest/40'}`}>AES-256 Quantum Encryption Active</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
