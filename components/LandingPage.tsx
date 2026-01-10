
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const isCyber = theme === ThemeMode.CYBERPUNK;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const glitchInterval = setInterval(() => {
      if (isCyber && Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 120 + Math.random() * 150);
      }
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, [isCyber]);

  const terminalLogs = useMemo(() => {
    const logs = [
      "INITIALIZING_PROTOCOL", "AI_CORE_SHIELD_ACTIVE", "THREAT_VECTOR_SCAN: NULL", 
      "NEURAL_NET_STABILIZED", "ENCRYPTING_LAYER_7", "SEEDING_SECURE_VAULT", 
      "UPDATING_MODELS...", "HANDSHAKE_COMPLETE", "AUTHORIZING_OPERATOR",
      "SYNERGY_LOADED", "MAESTRO_V2_ONLINE", "BUFFER_CLEARED", "GRID_STABLE"
    ];
    return [...Array(24)].map((_, i) => ({
      id: i,
      hex: Math.random().toString(16).slice(2, 6).toUpperCase(),
      text: logs[Math.floor(Math.random() * logs.length)],
      opacity: 0.15 + Math.random() * 0.35
    }));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-1000 ${isCyber ? 'bg-[#020a05]' : 'bg-[#e8f5e9]'} font-display selection:bg-primary/40`}>
      
      {/* Immersive Background Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Solarpunk Background: Deep Lush Green Foliage */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 scale-110 ${!isCyber ? 'opacity-60 animate-leaf' : 'opacity-0'}`}
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-739e828a1751?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        
        {/* Subtle Gradient Overlays */}
        <div className={`absolute inset-0 transition-all duration-1000 ${isCyber ? 'bg-black/80' : 'bg-gradient-to-b from-forest/40 via-transparent to-leaf-light/90'}`}></div>
      </div>

      <nav className="fixed top-0 z-50 w-full px-4 py-6 flex justify-center">
        <div className={`flex max-w-xl w-full items-center justify-between glass-panel rounded-full px-6 py-3 shadow-2xl transition-all border ${isCyber ? 'bg-black/70 border-emerald-500/20' : 'bg-white/80 border-forest/10'}`}>
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined ${isCyber ? 'text-primary' : 'text-forest'} scale-110 transition-colors`} style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
            <span className={`font-bold tracking-tight ${isCyber ? 'text-white/90' : 'text-forest'} text-sm md:text-base`}>AI Security Ops</span>
          </div>
          <button onClick={() => navigate('/login')} className={`${isCyber ? 'bg-primary text-[#020a05]' : 'bg-forest text-white'} px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl`}>
            START TRAINING
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-24 md:py-32 gap-20">
        
        <section className={`relative w-full overflow-hidden rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] aspect-[16/11] md:aspect-[21/9] border transition-all duration-1000 ${isCyber ? 'bg-[#010301] border-white/5 shadow-primary/5' : 'bg-white border-forest/10 shadow-forest/10'}`}>
          
          <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` }}>
            {/* Pure Foliage for Solarpunk Hero */}
            <div 
              className={`absolute inset-0 bg-cover bg-center animate-leaf transition-opacity duration-1000 ${!isCyber ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop')",
                filter: "brightness(0.9) saturate(1.1)"
              }}
            ></div>

            {/* Terminal for Cyberpunk Hero */}
            <div className={`absolute inset-0 hero-split-left transition-opacity duration-1000 ${isCyber ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute inset-0 flex flex-wrap content-start p-10 font-mono text-[8px] md:text-[10px] text-primary select-none transition-all ${isCyber ? 'opacity-100' : 'opacity-0'} ${glitchActive ? 'animate-glitch' : 'animate-terminal-pulse'}`}>
              {terminalLogs.map((log) => (
                <p key={log.id} style={{ opacity: log.opacity }} className="w-1/2 md:w-1/4 mb-3">
                  <span className="opacity-40">0x{log.hex}</span> <span className="mx-1">&gt;</span> <span className="font-bold">{log.text}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none">
            <div 
              className={`glass-panel p-12 md:p-20 rounded-[4rem] flex flex-col items-center transition-all duration-700 pointer-events-auto group ${isCyber ? 'border-primary/20 bg-black/70' : 'border-forest/5 bg-white/70 shadow-2xl backdrop-blur-3xl'}`}
              style={{ transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)` }}
            >
              <div className={`absolute -top-6 px-5 py-2 rounded-full border text-[9px] font-black tracking-[0.4em] uppercase transition-all duration-700 ${isCyber ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(13,242,89,0.4)]' : 'bg-forest/10 border-forest text-forest shadow-lg shadow-forest/5'}`}>
                {isCyber ? 'Neural Defense Engine' : 'SOLARPUNK CONTENT FACTORY'}
              </div>

              <h1 className={`flex flex-col text-5xl md:text-[7.5rem] font-black leading-[0.85] tracking-tighter transition-all duration-700 ${glitchActive ? 'animate-glitch' : ''}`}>
                <span className={`${isCyber ? 'text-white' : 'text-forest'} transition-all duration-700`}>Master AI</span>
                <span className={`font-serif italic ${isCyber ? 'text-primary' : 'text-leaf-mid'} mt-2 transition-all duration-1000`}>Security</span>
              </h1>
              
              <p className={`mt-10 text-xs md:text-base font-medium ${isCyber ? 'text-gray-300/60' : 'text-forest/70'} max-w-[400px] leading-relaxed`}>
                Multimodal curricula for the modern defender. Pure {isCyber ? 'tactical precision' : 'organic wisdom'} meets autonomous asset generation.
              </p>

              <div className="mt-12 flex flex-col md:flex-row items-center gap-6">
                <button 
                  onClick={() => navigate('/login')}
                  className={`group/btn relative flex items-center gap-5 ${isCyber ? 'bg-primary text-[#020a05]' : 'bg-forest text-white'} px-14 py-6 rounded-full font-black tracking-[0.25em] text-[10px] transition-all hover:shadow-[0_0_60px_rgba(13,242,89,0.5)] hover:scale-105 active:scale-95`}
                >
                  <span>ACCESS MAESTRO</span>
                  <span className="material-symbols-outlined font-black group-hover/btn:translate-x-2 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {[
            { id: 1, title: 'Multimodal Assets', desc: 'MP4s, PDFs, and PNGs on demand.', icon: 'slow_motion_video' },
            { id: 2, title: '4-Week Intensive', desc: 'Strategic mastery timeline.', icon: 'bolt', img: 'https://images.unsplash.com/photo-1550745679-562211077db9?q=80&w=2070&auto=format&fit=crop' },
            { id: 3, title: 'NotebookLM Sync', desc: 'Direct AI artifact integration.', icon: 'auto_stories', pulse: true },
            { id: 4, title: 'Maestro Engine', desc: 'Autonomous curriculum sowing.', icon: 'psychology' }
          ].map((item) => (
            <div 
              key={item.id} 
              className={`group relative p-8 flex flex-col justify-between rounded-[3rem] border transition-all duration-500 overflow-hidden min-h-[220px] ${isCyber ? 'border-primary/10 bg-forest/[0.08]' : 'border-forest/10 bg-white/60 shadow-lg shadow-forest/5'} hover:border-primary/40 hover:-translate-y-1`}
            >
              {item.img && (
                <>
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 group-hover:opacity-20 transition-all duration-700" alt={item.title} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isCyber ? 'from-[#020a05]' : 'from-white'} via-transparent to-transparent`}></div>
                </>
              )}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <span className={`material-symbols-outlined ${isCyber ? 'text-primary' : 'text-forest'} text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.pulse ? 'animate-terminal-pulse' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  {item.pulse && <div className={`h-2 w-2 rounded-full ${isCyber ? 'bg-primary' : 'bg-leaf-mid'} animate-ping`}></div>}
                </div>
                <div>
                  <h3 className={`font-bold text-lg leading-tight transition-colors ${isCyber ? 'text-white/90 group-hover:text-primary' : 'text-forest group-hover:text-leaf-mid'}`}>{item.title}</h3>
                  <p className={`text-[11px] mt-2 tracking-wide ${isCyber ? 'text-primary/50' : 'text-forest/50'}`}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Floating Toggle */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[340px]">
          <div className={`glass-panel flex items-center justify-between rounded-full p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border group/toggle ${isCyber ? 'border-primary/25 bg-black/70' : 'border-forest/20 bg-white/80'}`}>
            <div className={`flex h-14 w-full items-center justify-center rounded-full p-1.5 relative overflow-hidden ${isCyber ? 'bg-[#010301]/90' : 'bg-leaf-light/60'}`}>
              <div 
                className={`absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isCyber ? 'left-1.5 bg-primary shadow-[0_0_20px_rgba(13,242,89,0.4)]' : 'left-[calc(50%+4.5px)] bg-forest shadow-lg shadow-forest/20'}`}
              ></div>
              
              <button 
                onClick={() => !isCyber && toggleTheme()}
                className={`relative z-10 flex h-full grow items-center justify-center rounded-full px-4 text-[11px] font-black tracking-[0.25em] uppercase transition-all duration-700 ${isCyber ? 'text-[#020a05]' : 'text-forest/40 hover:text-forest/60'}`}
              >
                Terminal
              </button>
              <button 
                onClick={() => isCyber && toggleTheme()}
                className={`relative z-10 flex h-full grow items-center justify-center rounded-full px-4 text-[11px] font-black tracking-[0.25em] uppercase transition-all duration-700 ${!isCyber ? 'text-white' : 'text-primary/40 hover:text-primary/60'}`}
              >
                Solarpunk
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className={`w-full py-20 text-center border-t transition-colors ${isCyber ? 'border-primary/5' : 'border-forest/5'}`}>
        <div className="flex flex-col items-center gap-6 opacity-30">
          <span className={`material-symbols-outlined text-3xl ${isCyber ? 'text-primary' : 'text-forest'}`} style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          <p className={`text-[10px] font-black tracking-[0.7em] uppercase ${isCyber ? 'text-primary/40' : 'text-forest/40'}`}>
            © 2024 AI Security Ops // Maestro Engine v2.5
          </p>
        </div>
      </footer>

      {isCyber && <div className="scanline"></div>}
    </div>
  );
};

export default LandingPage;
