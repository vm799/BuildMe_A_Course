
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';

type MediaType = 'Video' | 'Slides' | 'Infographic' | 'Quiz';

const ModuleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, modules, courseState } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const [activeTab, setActiveTab] = useState<MediaType>('Video');
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  // Hydrate week data from central state
  const weekData = courseState.weeks.find(w => w.weekNumber.toString() === id) || courseState.weeks[0];
  const moduleData = modules.find(m => m.id === id) || modules[0];

  const renderMedia = () => {
    // Safety check function for standardized ingestion
    const isAssetReady = (path: string) => {
      // In a real prod app, we'd do a HEAD request or check a validated flag.
      // For this prototype, if it's not a placeholder path and not empty, it's ready.
      return path && !path.includes('assets/week');
    };

    const Placeholder = ({ format }: { format: string }) => (
      <div className={`w-full h-full flex flex-col items-center justify-center p-12 text-center transition-all ${isCyber ? 'bg-zinc-950 text-emerald-500/40' : 'bg-slate-50 text-forest/40'}`}>
         <div className="relative mb-8">
            <span className="material-symbols-outlined text-8xl animate-pulse">cloud_off</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl animate-spin">sync</span>
            </div>
         </div>
         <h3 className="text-xl font-black uppercase tracking-widest mb-2">Artifact Missing</h3>
         <p className="max-w-md text-xs leading-relaxed opacity-60">
           Week {id} {format} is currently undergoing high-fidelity optimization in the pipeline. Please check the Recall Dashboard for ingestion status.
         </p>
         <button 
           onClick={() => navigate('/admin/upload')}
           className={`mt-8 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isCyber ? 'border-emerald-500/20 hover:bg-emerald-500/10' : 'border-forest/10 hover:bg-forest/5'}`}
         >
           Launch Ingestion Portal
         </button>
      </div>
    );

    switch (activeTab) {
      case 'Video':
        if (!isAssetReady(weekData.assets.video.path)) return <Placeholder format="Video Briefing" />;
        return (
          <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <video 
              key={`${id}-vid`}
              className="w-full h-full max-h-full object-contain"
              controls
              playsInline
              preload="metadata"
              poster={`https://picsum.photos/1920/1080?seed=vid${id}`}
            >
              <source src={weekData.assets.video.path} type="video/mp4" />
            </video>
            <div className="absolute top-6 left-6 pointer-events-none">
               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-xl ${isCyber ? 'bg-black/60 border-emerald-500/30 text-emerald-500 shadow-[0_0_15px_rgba(13,242,89,0.3)]' : 'bg-white/70 border-forest/10 text-forest'}`}>
                 SESSION: {weekData.assets.video.title}
               </span>
            </div>
          </div>
        );
      case 'Slides':
        if (!isAssetReady(weekData.assets.slides.path)) return <Placeholder format="Slide Deck" />;
        return (
          <div className="w-full h-full bg-[#1e1e1e] flex flex-col items-center justify-center relative">
             <iframe 
               src={`${weekData.assets.slides.path}#toolbar=0`} 
               className="w-full h-full border-none shadow-inner"
               title={weekData.assets.slides.title}
             />
             <div className="absolute top-6 left-6 pointer-events-none">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-xl ${isCyber ? 'bg-black/60 border-emerald-500/30 text-emerald-500' : 'bg-white/70 border-forest/10 text-forest'}`}>
                  DECK: {weekData.assets.slides.title}
                </span>
             </div>
             <div className="absolute bottom-6 right-6">
                <button 
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/20 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                   <span className="material-symbols-outlined text-base">fullscreen</span>
                   Toggle Full Frame
                </button>
             </div>
          </div>
        );
      case 'Infographic':
        if (!isAssetReady(weekData.assets.infographic.path)) return <Placeholder format="Technical Schema" />;
        return (
          <div className={`w-full h-full flex flex-col items-center p-8 overflow-y-auto scrollbar-hide ${isCyber ? 'bg-zinc-950' : 'bg-[#fcfdfc]'}`}>
             <div className="max-w-4xl w-full group relative">
                <div className={`absolute -inset-4 rounded-[2rem] blur-2xl opacity-10 ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
                <img 
                  src={weekData.assets.infographic.path} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/1200/1600?seed=info${id}`;
                  }}
                  className="relative w-full h-auto object-cover rounded-[1.5rem] shadow-2xl transition-all cursor-zoom-in group-hover:scale-[1.01]"
                  alt={weekData.assets.infographic.title}
                />
             </div>
             <div className="mt-8 text-center pb-12">
                <h4 className="text-xl font-bold mb-2">{weekData.assets.infographic.title}</h4>
                <p className={`text-xs font-black uppercase tracking-widest ${isCyber ? 'text-primary' : 'text-forest/60'}`}>
                  Format: {weekData.assets.infographic.format}
                </p>
                <p className="mt-3 opacity-70 max-w-lg mx-auto">{weekData.assets.infographic.description}</p>
             </div>
          </div>
        );
      case 'Quiz':
        return (
          <div className={`w-full h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden ${isCyber ? 'bg-black' : 'bg-gradient-to-br from-indigo-50/50 to-emerald-50/50'}`}>
             <div className={`size-32 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl transition-all group ${isCyber ? 'bg-emerald-500/10 border border-emerald-500/30 text-primary' : 'bg-white border border-indigo-100 text-indigo-600'}`}>
                <span className="material-symbols-outlined text-6xl group-hover:scale-110 transition-transform">psychology</span>
             </div>
             <h3 className={`text-4xl font-black tracking-tighter mb-4 ${isCyber ? 'text-white' : 'text-slate-900'}`}>{weekData.assets.quiz.title}</h3>
             <p className={`max-w-md text-sm leading-relaxed mb-10 opacity-70 ${isCyber ? 'font-mono' : 'font-serif italic text-forest/80'}`}>
                {weekData.assets.quiz.format}. {weekData.assets.quiz.description} Use your secure session key to access the NotebookLM artifact.
             </p>
             <a 
               href={weekData.assets.quiz.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className={`group flex items-center gap-5 px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl ${isCyber ? 'bg-primary text-black shadow-primary/20' : 'bg-indigo-600 text-white shadow-indigo-600/30'}`}
             >
                <span>LAUNCH AI WORKSPACE</span>
                <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">rocket_launch</span>
             </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isCyber ? 'bg-black text-emerald-500' : 'bg-[#fcfdfc] text-forest'}`}>
      
      <header className={`px-8 py-5 flex items-center justify-between border-b sticky top-0 bg-inherit/90 backdrop-blur-2xl z-50 transition-all ${isCyber ? 'border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'border-slate-100'}`}>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 hover:opacity-70 transition-all group">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">RECALL HUB</span>
        </button>
        
        <div className="flex flex-col items-center">
           <h2 className={`text-sm font-bold tracking-tight ${isCyber ? 'text-white' : 'text-slate-900'}`}>{moduleData.title}</h2>
           <p className={`text-[8px] font-black uppercase tracking-[0.4em] opacity-40 ${isCyber ? 'text-primary' : 'text-forest'}`}>
             WEEK {moduleData.week_number} // MULTIMODAL SYLLABUS
           </p>
        </div>

        <div className="flex items-center gap-6">
           <button 
             onClick={() => setIsTheaterMode(!isTheaterMode)}
             className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isTheaterMode ? (isCyber ? 'bg-primary text-black' : 'bg-forest text-white') : 'hover:bg-black/5'}`}
           >
             <span className="material-symbols-outlined text-xl">{isTheaterMode ? 'close_fullscreen' : 'fit_screen'}</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Theater</span>
           </button>
        </div>
      </header>

      <main className={`flex-1 flex flex-col transition-all duration-700 ${isTheaterMode ? 'max-w-full p-0' : 'max-w-6xl mx-auto w-full p-6 md:p-12'} space-y-12`}>
        
        {!isTheaterMode && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-[10px] font-black tracking-widest ${isCyber ? 'bg-emerald-500/10 border-emerald-500/30 text-primary' : 'bg-forest/5 border-forest/10 text-forest'}`}>
              <span className={`size-2 rounded-full animate-pulse ${isCyber ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]' : 'bg-forest'}`}></span>
              SECURE TRAINING UNIT: {activeTab.toUpperCase()}
            </div>
            <h1 className={`text-5xl md:text-8xl font-black tracking-tighter leading-tight ${isCyber ? 'text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-forest'}`}>
              {weekData.title}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl opacity-70 leading-relaxed ${isCyber ? 'font-mono' : 'font-serif italic text-forest/80'}`}>
              {weekData.description}
            </p>
          </section>
        )}

        <section className={`transition-all duration-700 rounded-[3.5rem] border overflow-hidden relative shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] ${isTheaterMode ? 'h-[calc(100vh-80px)] rounded-none border-none' : 'aspect-video w-full'} ${isCyber ? 'bg-zinc-950 border-emerald-500/20' : 'bg-slate-50 border-forest/5'}`}>
           {renderMedia()}
        </section>

        <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-700 ${isTheaterMode ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
          <nav className={`flex p-2 rounded-[2.5rem] border backdrop-blur-md overflow-x-auto scrollbar-hide max-w-full ${isCyber ? 'bg-white/5 border-emerald-500/20' : 'bg-black/5 border-forest/5'}`}>
            {(['Video', 'Slides', 'Infographic', 'Quiz'] as MediaType[]).map((tab) => (
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
                   <h4 className="text-2xl font-black tracking-tight">Lesson Metadata</h4>
                   <p className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-40`}>Compliance: Production Signed • QSAF Layer 1</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed opacity-70 ${isCyber ? 'font-mono' : 'font-serif italic'}`}>
                <strong>{activeTab}:</strong> {activeTab === 'Video' ? weekData.assets.video.description : activeTab === 'Slides' ? weekData.assets.slides.description : activeTab === 'Infographic' ? weekData.assets.infographic.description : weekData.assets.quiz.description}
              </p>
              <div className="flex flex-wrap gap-3">
                 {courseState.frameworks.map(tag => (
                   <span key={tag} className={`text-[9px] font-black px-4 py-2 rounded-2xl border transition-colors ${isCyber ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-forest/5 border-forest/10 text-forest/70'}`}>
                     #{tag.replace(/\s+/g, '_').toUpperCase()}
                   </span>
                 ))}
              </div>
            </div>
            
            <div className={`p-8 rounded-[3rem] flex flex-col justify-between relative overflow-hidden ${isCyber ? 'bg-black/40 border border-emerald-500/10' : 'bg-leaf-light/20 border border-forest/10'}`}>
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-6">COMPLETION</p>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black">{70 + weekData.weekNumber * 5}%</span>
                    <span className={`text-[10px] font-bold ${isCyber ? 'text-primary' : 'text-forest/60'}`}>VERIFIED</span>
                 </div>
                 <div className={`h-3 w-full rounded-full overflow-hidden ${isCyber ? 'bg-white/10' : 'bg-forest/10'}`}>
                    <div className={`h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] ${isCyber ? 'bg-primary' : 'bg-forest'}`} style={{ width: `${70 + weekData.weekNumber * 5}%` }}></div>
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

      <button 
        onClick={() => navigate('/admin/upload')}
        className={`fixed bottom-10 right-10 size-20 rounded-[2rem] flex items-center justify-center border-2 transition-all hover:scale-110 active:scale-90 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-[60] ${isCyber ? 'bg-emerald-500 text-black border-white/20' : 'bg-forest text-white border-white/20 shadow-forest/40'}`}
      >
        <span className="material-symbols-outlined text-4xl">settings</span>
      </button>

      {isCyber && <div className="scanline"></div>}
    </div>
  );
};

export default ModuleDetail;
