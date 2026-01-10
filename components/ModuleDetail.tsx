
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';
import MultimodalGallery, { MediaFormat } from './MultimodalGallery';

const ModuleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, modules, courseState } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const [activeTab, setActiveTab] = useState<MediaFormat>('Video');
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const weekData = courseState.weeks.find(w => w.weekNumber.toString() === id) || courseState.weeks[0];
  const moduleData = modules.find(m => m.id === id) || modules[0];

  const getActiveAsset = () => {
    switch (activeTab) {
      case 'Video': return weekData.assets.video;
      case 'Slides': return weekData.assets.slides;
      case 'Infographic': return weekData.assets.infographic;
      case 'Quiz': return weekData.assets.quiz;
      default: return null;
    }
  };

  const activeAsset = getActiveAsset();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isCyber ? 'bg-black text-emerald-500' : 'bg-[#fcfdfc] text-forest'}`}>
      
      <header className={`px-8 py-5 flex items-center justify-between border-b sticky top-0 bg-inherit/90 backdrop-blur-2xl z-50 transition-all ${isCyber ? 'border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'border-slate-100'}`}>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 hover:opacity-70 transition-all group">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Recall Hub</span>
        </button>
        
        <div className="flex flex-col items-center">
           <h2 className={`text-sm font-bold tracking-tight ${isCyber ? 'text-white' : 'text-slate-900'}`}>{moduleData.title}</h2>
           <p className={`text-[8px] font-black uppercase tracking-[0.4em] opacity-40 ${isCyber ? 'text-primary' : 'text-forest'}`}>
             MISSION UNIT {moduleData.week_number} // MULTIMODAL HUB
           </p>
        </div>

        <div className="flex items-center gap-6">
           <button 
             onClick={() => setIsTheaterMode(!isTheaterMode)}
             className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all ${isTheaterMode ? (isCyber ? 'bg-primary text-black' : 'bg-forest text-white') : 'hover:bg-black/5'}`}
           >
             <span className="material-symbols-outlined text-xl">{isTheaterMode ? 'close_fullscreen' : 'fit_screen'}</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Theater</span>
           </button>
           <button 
             onClick={() => navigate('/admin/upload')}
             className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all ${isCyber ? 'border-emerald-500/20 text-emerald-500' : 'border-forest/10 text-forest'}`}
           >
             <span className="material-symbols-outlined text-xl">upload_file</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Deploy</span>
           </button>
        </div>
      </header>

      <main className={`flex-1 flex flex-col transition-all duration-700 ${isTheaterMode ? 'max-w-full p-0' : 'max-w-6xl mx-auto w-full p-6 md:p-12'} space-y-12`}>
        
        {!isTheaterMode && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-center md:text-left">
            <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-[10px] font-black tracking-widest ${isCyber ? 'bg-emerald-500/10 border-emerald-500/30 text-primary' : 'bg-forest/5 border-forest/10 text-forest'}`}>
              <span className={`size-2 rounded-full animate-pulse ${isCyber ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]' : 'bg-forest'}`}></span>
              SECURE TRAINING UNIT: {activeTab.toUpperCase()}
            </div>
            <h1 className={`text-5xl md:text-8xl font-black tracking-tighter leading-tight ${isCyber ? 'text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-forest'}`}>
              {weekData.title}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl opacity-70 leading-relaxed mx-auto md:mx-0 ${isCyber ? 'font-mono' : 'font-serif italic text-forest/80'}`}>
              {weekData.description}
            </p>
          </section>
        )}

        <section className={`transition-all duration-700 rounded-[3.5rem] border overflow-hidden relative shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] ${isTheaterMode ? 'h-[calc(100vh-80px)] rounded-none border-none' : 'aspect-video w-full'} ${isCyber ? 'bg-zinc-950 border-emerald-500/20' : 'bg-slate-50 border-forest/5'}`}>
           <MultimodalGallery 
             week={weekData.weekNumber}
             format={activeTab}
             contentSource={activeTab === 'Quiz' ? (weekData.assets.quiz as any).url : (activeAsset as any)?.path}
             title={activeAsset?.title || ''}
             theme={theme}
             onAdminRedirect={() => navigate('/admin/upload')}
           />
        </section>

        <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-700 ${isTheaterMode ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
          <nav className={`flex p-2.5 rounded-[2.5rem] border backdrop-blur-md overflow-x-auto scrollbar-hide max-w-full ${isCyber ? 'bg-white/5 border-emerald-500/20' : 'bg-black/5 border-forest/5'}`}>
            {(['Video', 'Slides', 'Infographic', 'Quiz'] as MediaFormat[]).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${activeTab === tab ? (isCyber ? 'bg-primary text-black shadow-xl shadow-primary/20' : 'bg-forest text-white shadow-xl shadow-forest/20') : (isCyber ? 'text-emerald-500 hover:bg-emerald-500/10' : 'text-forest/60 hover:bg-forest/5')}`}
              >
                <span className="material-symbols-outlined text-lg">
                  {tab === 'Video' ? 'smart_display' : tab === 'Slides' ? 'co_present' : tab === 'Infographic' ? 'architecture' : 'quiz'}
                </span>
                {tab}
              </button>
            ))}
          </nav>
          
          <div className="flex gap-4 w-full lg:w-auto">
             <button className={`flex-1 lg:flex-none p-5 rounded-3xl border transition-all hover:scale-105 active:scale-90 flex items-center justify-center gap-3 ${isCyber ? 'bg-zinc-900 border-emerald-500/20 text-emerald-500 shadow-xl' : 'bg-white border-forest/10 shadow-lg shadow-forest/5'}`}>
                <span className="material-symbols-outlined text-xl">cloud_download</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Offline Pack</span>
             </button>
          </div>
        </div>

        {!isTheaterMode && (
          <section className={`rounded-[4rem] p-12 border relative overflow-hidden transition-all grid lg:grid-cols-4 gap-12 ${isCyber ? 'bg-zinc-950 border-emerald-500/10' : 'bg-white border-forest/5 shadow-2xl'}`}>
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`size-14 rounded-3xl flex items-center justify-center ${isCyber ? 'bg-primary/10 text-primary' : 'bg-forest text-white'}`}>
                  <span className="material-symbols-outlined text-3xl">terminal</span>
                </div>
                <div>
                   <h4 className="text-2xl font-black tracking-tight">Mission Context</h4>
                   <p className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-40`}>Compliance Status: PRODUCTION_SIGNED_001</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed opacity-70 ${isCyber ? 'font-mono' : 'font-serif italic'}`}>
                <strong>{activeTab}:</strong> {activeAsset?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                 {courseState.frameworks.map(tag => (
                   <span key={tag} className={`text-[9px] font-black px-4 py-2 rounded-2xl border transition-colors ${isCyber ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-forest/5 border-forest/10 text-forest/70'}`}>
                     #{tag.toUpperCase()}
                   </span>
                 ))}
              </div>
            </div>
            
            <div className={`p-8 rounded-[3rem] flex flex-col justify-between relative overflow-hidden ${isCyber ? 'bg-black/40 border border-emerald-500/10' : 'bg-leaf-light/20 border border-forest/10'}`}>
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-6">RETENTION</p>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black">{70 + weekData.weekNumber * 4}%</span>
                    <span className={`text-[10px] font-bold ${isCyber ? 'text-primary' : 'text-forest/60'}`}>AVG_SIG</span>
                 </div>
                 <div className={`h-3 w-full rounded-full overflow-hidden ${isCyber ? 'bg-white/10' : 'bg-forest/10'}`}>
                    <div className={`h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] ${isCyber ? 'bg-primary' : 'bg-forest'}`} style={{ width: `${70 + weekData.weekNumber * 4}%` }}></div>
                 </div>
               </div>
               <button className={`relative z-10 w-full py-4 mt-10 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${isCyber ? 'bg-primary text-black' : 'bg-forest text-white'}`}>
                  Recalibrate Mastery
               </button>
            </div>
          </section>
        )}

        <div className="h-24"></div>
      </main>

      {isCyber && <div className="scanline"></div>}
    </div>
  );
};

export default ModuleDetail;
