
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';
import ThemeSlider from './ThemeSlider';
import { courseData } from '../data/course';

const Dashboard: React.FC = () => {
  const { theme, modules, courseTitle } = useApp();
  const navigate = useNavigate();
  const isCyber = theme === ThemeMode.CYBERPUNK;

  const activeModule = modules[0];

  return (
    <div className={`flex h-screen overflow-hidden ${isCyber ? 'font-mono' : 'font-display'}`}>
      {/* Sidebar */}
      <aside className={`w-20 md:w-24 flex flex-col items-center py-8 z-20 border-r transition-all ${isCyber ? 'bg-black border-emerald-500/20' : 'sidebar-texture-light border-forest/10 bg-white'}`}>
        <div 
          onClick={() => navigate('/')}
          className={`mb-10 transition-all cursor-pointer hover:scale-110 ${isCyber ? 'text-emerald-500' : 'text-forest'}`}
        >
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
        
        <nav className="flex flex-col gap-8 flex-1">
          {modules.map((m) => (
            <div 
              key={m.id}
              onClick={() => navigate(`/module/${m.id}`)}
              className="group relative flex flex-col items-center cursor-pointer transition-all hover:scale-110"
            >
              <div className={`size-12 md:size-14 rounded-2xl flex items-center justify-center transition-all ${
                m.id === (activeModule?.id || '1')
                  ? (isCyber ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-forest text-white shadow-lg shadow-forest/20')
                  : (isCyber ? 'bg-white/5 text-emerald-500/50 border border-white/10' : 'bg-forest/10 text-forest')
              }`}>
                <span className="text-xl">{['🌱', '🔥', '🛡️', '🏆'][m.week_number - 1]}</span>
              </div>
              <span className={`text-[10px] mt-2 font-black uppercase tracking-widest ${m.id === (activeModule?.id || '1') ? (isCyber ? 'text-emerald-500' : 'text-forest') : (isCyber ? 'text-white/30' : 'text-forest/50')}`}>
                Wk {m.week_number}
              </span>
            </div>
          ))}
        </nav>

        <button 
          onClick={() => navigate('/generate')}
          className={`mt-auto transition-all ${isCyber ? 'text-magenta-neon hover:scale-125' : 'text-terracotta hover:scale-125'}`}
        >
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col overflow-y-auto ${isCyber ? 'bg-background-dark' : 'bg-[#fcfdfc]'}`}>
        <header className={`flex items-center px-8 py-5 justify-between border-b backdrop-blur-md sticky top-0 z-10 ${isCyber ? 'bg-black/90 border-emerald-500/10' : 'bg-white/90 border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isCyber ? 'bg-emerald-500/10' : 'bg-forest/10'}`}>
              <span className={`material-symbols-outlined ${isCyber ? 'text-emerald-500' : 'text-forest'}`} style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
            </div>
            <div>
              <h2 className={`text-lg font-bold leading-none tracking-tight ${isCyber ? 'text-emerald-500 crt-glow-emerald' : 'text-forest'}`}>{courseTitle}</h2>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isCyber ? 'text-white/40' : 'text-forest/50'}`}>Solarpunk Protocol // Academy v1.0</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSlider />
            <div className={`size-10 rounded-full border-2 p-0.5 shadow-sm overflow-hidden cursor-pointer ${isCyber ? 'border-emerald-500 shadow-emerald-500/20' : 'border-sun'}`}>
              <img src="https://picsum.photos/100/100?seed=maestro" className="w-full h-full object-cover rounded-full" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-10">
          {/* Hero Curriculum Overview */}
          {activeModule && (
            <section className={`rounded-3xl p-8 border overflow-hidden relative ${isCyber ? 'bg-zinc-900 border-emerald-500/20' : 'bg-white border-forest/5 shadow-2xl shadow-forest/5'}`}>
              <div className={`absolute top-0 right-0 p-8 opacity-10 ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>
                <span className="material-symbols-outlined text-[120px]">architecture</span>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isCyber ? 'bg-emerald-500/10 text-primary' : 'bg-forest/5 text-forest'}`}>
                    Curriculum Signed & Active
                  </div>
                  <h2 className={`text-4xl font-black tracking-tight ${isCyber ? 'text-white' : 'text-forest'}`}>Week {activeModule.week_number}: {activeModule.title}</h2>
                </div>
                <p className={`text-lg max-w-2xl leading-relaxed ${isCyber ? 'text-white/60' : 'text-forest/70'}`}>{activeModule.description}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate(`/module/${activeModule.id}`)}
                    className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl ${isCyber ? 'bg-primary text-black shadow-primary/20' : 'bg-forest text-white shadow-forest/20'}`}
                  >
                    Enter Training
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Asset Deliverable Grid */}
          <div className="space-y-6">
            <h3 className={`text-[11px] font-black tracking-[0.4em] uppercase flex items-center gap-4 ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>
              AI SECOPS CONTENT CHECKLIST <div className={`h-px flex-1 ${isCyber ? 'bg-emerald-500/20' : 'bg-forest/10'}`}></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: 'Infographic', icon: 'dashboard', color: 'text-blue-500', desc: 'Visual Flowcharts & Models' },
                { type: 'Slides', icon: 'co_present', color: 'text-orange-500', desc: 'Technical Presentations' },
                { type: 'Quiz', icon: 'quiz', color: 'text-purple-500', desc: 'Interactive Assessments' },
                { type: 'Video', icon: 'smart_display', color: 'text-red-500', desc: 'Walking Scripts & Walkthroughs' }
              ].map((deliverable) => (
                <div key={deliverable.type} className={`p-6 rounded-[2rem] border transition-all hover:-translate-y-1 ${isCyber ? 'bg-black border-emerald-500/10' : 'bg-white border-forest/5 shadow-sm'}`}>
                  <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${isCyber ? 'bg-emerald-500/10' : 'bg-slate-50'}`}>
                    <span className={`material-symbols-outlined text-2xl ${deliverable.color}`}>{deliverable.icon}</span>
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2">{deliverable.type}</h4>
                  <p className="text-[10px] opacity-50 mb-4">{deliverable.desc}</p>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isCyber ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <div className="h-full bg-emerald-500 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Week Overview */}
          <section className="space-y-4">
             <h3 className={`text-[11px] font-black tracking-[0.4em] uppercase flex items-center gap-4 ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>
              SYLLABUS PROGRESSION <div className={`h-px flex-1 ${isCyber ? 'bg-emerald-500/20' : 'bg-forest/10'}`}></div>
            </h3>
            <div className="space-y-3">
              {courseData.weeks.map((week) => (
                <div 
                  key={week.weekNumber}
                  onClick={() => navigate(`/module/${week.weekNumber}`)}
                  className={`group flex items-center justify-between p-6 rounded-[2rem] border cursor-pointer transition-all hover:translate-x-2 ${isCyber ? 'bg-white/5 border-emerald-500/10 hover:border-primary/40' : 'bg-white border-forest/5 shadow-sm hover:border-forest/40'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`size-12 rounded-full flex items-center justify-center font-black ${isCyber ? 'bg-primary text-black' : 'bg-forest text-white'}`}>
                      {week.weekNumber}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{week.title}</h4>
                      <p className="text-xs opacity-50">{week.description.substring(0, 80)}...</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex -space-x-2">
                      {['smart_display', 'co_present', 'dashboard', 'quiz'].map(icon => (
                        <div key={icon} className={`size-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${isCyber ? 'bg-black border-zinc-800' : 'bg-slate-50 border-white'}`}>
                          <span className="material-symbols-outlined text-[14px] opacity-40">{icon}</span>
                        </div>
                      ))}
                    </div>
                    <span className="material-symbols-outlined opacity-30 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="h-24"></div>
      </main>
    </div>
  );
};

export default Dashboard;
