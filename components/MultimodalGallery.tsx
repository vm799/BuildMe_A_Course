
import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { checkFileExists } from '../src/utils/fileChecker';

export type MediaFormat = 'Video' | 'Slides' | 'Infographic' | 'Quiz';

interface MultimodalGalleryProps {
  week: number;
  format: MediaFormat;
  contentSource: string | undefined;
  title: string;
  theme: ThemeMode;
  onAdminRedirect: () => void;
}

const MultimodalGallery: React.FC<MultimodalGalleryProps> = ({ 
  week, 
  format, 
  contentSource, 
  title, 
  theme,
  onAdminRedirect 
}) => {
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const [fileExists, setFileExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check file existence on component mount
  useEffect(() => {
    const checkFile = async () => {
      if (!contentSource || contentSource.trim() === '' || contentSource === '/assets/') {
        setFileExists(false);
        setIsLoading(false);
        return;
      }
      
      try {
        const exists = await checkFileExists(contentSource);
        setFileExists(exists);
      } catch (error) {
        console.warn('Error checking file existence:', error);
        setFileExists(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkFile();
  }, [contentSource]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-12 text-center transition-all ${isCyber ? 'bg-zinc-950 text-emerald-500/40' : 'bg-slate-50 text-forest/40'}`}>
        <div className="relative mb-10">
          <div className={`absolute inset-0 scale-150 blur-3xl rounded-full opacity-10 animate-pulse ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
          <span className="material-symbols-outlined text-[100px] md:text-[160px] animate-spin">sync</span>
        </div>
        <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 ${isCyber ? 'text-emerald-500/80' : 'text-forest/80'}`}>
          Verifying Content Integrity
        </h3>
        <p className="max-w-md text-sm md:text-lg leading-relaxed opacity-60 mx-auto italic font-medium">
          Checking {format.toLowerCase()} availability for Week {week}...
        </p>
      </div>
    );
  }
  
  // Show content under optimization placeholder if file doesn't exist
  if (fileExists === false) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-12 text-center transition-all ${isCyber ? 'bg-gradient-to-br from-zinc-950 to-black text-emerald-500/60 border-2 border-dashed border-emerald-500/30' : 'bg-gradient-to-br from-slate-50 to-white text-forest/60 border-2 border-dashed border-slate-300'}`}>
        <div className="relative mb-10">
          <div className={`absolute inset-0 scale-150 blur-3xl rounded-full opacity-5 animate-pulse ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
          <div className={`relative size-40 rounded-full flex items-center justify-center border-4 ${isCyber ? 'border-emerald-500/30 bg-black/50' : 'border-forest/20 bg-white/50'}`}>
            <span className="material-symbols-outlined text-6xl">auto_fix_high</span>
          </div>
          <div className="absolute -top-2 -right-2 size-8 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-white text-sm">bolt</span>
          </div>
        </div>
        <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>
          Content Under Optimization
        </h3>
        <div className="mb-6">
          <span className={`inline-block px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${isCyber ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-forest/10 text-forest border border-forest/20'}`}>
            Week {week} • {format}
          </span>
        </div>
        <p className="max-w-md text-base md:text-lg leading-relaxed opacity-70 mx-auto mb-8 font-medium">
          This {format.toLowerCase()} content is currently being processed and optimized for your learning experience. Our systems are actively preparing this mission-critical asset.
        </p>
        <div className="flex items-center gap-4 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`size-3 rounded-full ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`} style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
        <button 
          onClick={onAdminRedirect}
          className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-lg ${isCyber ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-emerald-500/20' : 'border-forest/30 bg-forest/5 text-forest hover:bg-forest/10 shadow-forest/20'}`}
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">upload</span>
            Deploy Optimized Content
          </span>
        </button>
        <div className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
          AUTO-HEALING DATA LOADER ACTIVE
        </div>
      </div>
    );
  }
  
  // Safety Logic: Check if asset path is empty, which implies it needs ingestion
  const isMissing = !contentSource || contentSource.trim() === '' || contentSource === '/assets/';

  if (isMissing) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-12 text-center transition-all ${isCyber ? 'bg-zinc-950 text-emerald-500/40 border-2 border-dashed border-emerald-500/20' : 'bg-slate-50 text-forest/40 border-2 border-dashed border-slate-200'}`}>
        <div className="relative mb-10">
          <div className={`absolute inset-0 scale-150 blur-3xl rounded-full opacity-10 animate-pulse ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
          <span className="material-symbols-outlined text-[100px] md:text-[160px] animate-pulse relative z-10">pending_actions</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-4xl animate-spin opacity-40">sync</span>
          </div>
        </div>
        <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 ${isCyber ? 'text-emerald-500/80' : 'text-forest/80'}`}>
          Mission Artifact Required
        </h3>
        <p className="max-w-md text-sm md:text-lg leading-relaxed opacity-60 mx-auto italic font-medium">
          The requested {format} for Week {week} has not yet been ingested into the Maestro file system. 
          Please deploy the artifact to its standardized public path.
        </p>
        <button 
          onClick={onAdminRedirect}
          className={`mt-10 px-14 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border transition-all hover:scale-105 active:scale-95 shadow-2xl ${isCyber ? 'border-emerald-500/20 bg-emerald-500/5 text-primary hover:bg-emerald-500/10 shadow-primary/5' : 'border-forest/10 bg-forest/5 text-forest hover:bg-forest/10 shadow-forest/5'}`}
        >
          Initialize Ingestion Pipeline
        </button>
        <div className="mt-12 flex gap-3">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`size-1.5 rounded-full animate-bounce ${isCyber ? 'bg-primary' : 'bg-forest'}`} style={{ animationDelay: `${i * 0.15}s` }}></div>
           ))}
        </div>
      </div>
    );
  }

  // Consistent container styling for all media
  const containerClasses = "w-full h-full relative overflow-hidden flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000";

  switch (format) {
    case 'Video':
      return (
        <div className={`${containerClasses} bg-black`}>
          <video 
            key={`${week}-${format}-${contentSource}`}
            className="w-full h-full max-h-full object-contain"
            controls
            playsInline
            preload="metadata"
            autoPlay={false}
            muted={false}
            controlsList="nodownload"
          >
            <source src={contentSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-8 left-8 pointer-events-none">
             <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border backdrop-blur-2xl ${isCyber ? 'bg-black/60 border-emerald-500/30 text-emerald-500 shadow-2xl shadow-primary/20' : 'bg-white/80 border-forest/10 text-forest shadow-xl shadow-forest/5'}`}>
               MP4 BRIEFING: {title}
             </span>
          </div>
        </div>
      );

    case 'Slides':
      return (
        <div className={`${containerClasses} bg-[#1a1a1a]`}>
          {/* Primary PDF viewer with fallback */}
          <object 
            data={`${contentSource}#toolbar=0&view=FitH`} 
            type="application/pdf"
            className="w-full h-full border-none shadow-2xl"
            title={title}
          >
            {/* Fallback for browsers that don't support inline PDFs */}
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-gray-900 text-white">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl opacity-60">picture_as_pdf</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">PDF Viewer Not Supported</h3>
              <p className="mb-6 opacity-80">Your browser cannot display PDF files inline.</p>
              <a 
                href={contentSource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                Download PDF
              </a>
            </div>
          </object>
          <div className="absolute top-8 left-8 pointer-events-none">
             <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border backdrop-blur-2xl ${isCyber ? 'bg-black/60 border-emerald-500/30 text-emerald-500 shadow-2xl' : 'bg-white/80 border-forest/10 text-forest shadow-xl'}`}>
               MISSION DECK: {title}
             </span>
          </div>
        </div>
      );

    case 'Infographic':
      return (
        <div className={`${containerClasses} p-10 overflow-y-auto scrollbar-hide ${isCyber ? 'bg-zinc-950' : 'bg-[#fcfdfc]'}`}>
          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative group">
              <div className={`absolute -inset-6 rounded-[3rem] blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${isCyber ? 'bg-emerald-500' : 'bg-forest'}`}></div>
              <img 
                src={contentSource} 
                className="relative w-full h-auto object-cover rounded-[2rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] transition-all cursor-zoom-in hover:scale-[1.02]"
                alt={title}
                quality="90"
                placeholder="blur"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/1600/1200?seed=info${week}`;
                }}
              />
              <div className="absolute top-6 right-6 bg-emerald-500 text-black text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-2xl">
                HIGH FIDELITY SCHEMA
              </div>
            </div>
            <div className="mt-16 text-center pb-20">
              <h4 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{title}</h4>
              <p className="opacity-60 max-w-2xl text-lg md:text-xl italic leading-relaxed font-medium">Optimization Protocol: Production Schema v2.5 // Signed & Verified</p>
            </div>
          </div>
        </div>
      );

    case 'Quiz':
      return (
        <div className={`${containerClasses} p-12 text-center flex-col gap-10 ${isCyber ? 'bg-black' : 'bg-gradient-to-br from-indigo-50/40 to-emerald-50/40'}`}>
          <div className={`size-40 md:size-56 rounded-[4rem] flex items-center justify-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border transition-all hover:scale-110 ${isCyber ? 'bg-emerald-500/10 border-emerald-500/30 text-primary shadow-primary/10' : 'bg-white border-indigo-100 text-indigo-600 shadow-indigo-600/10'}`}>
            <span className="material-symbols-outlined text-8xl md:text-[120px]">psychology</span>
          </div>
          <div className="max-w-2xl">
            <h3 className={`text-4xl md:text-6xl font-black tracking-tighter mb-6 ${isCyber ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <p className="text-lg md:text-2xl opacity-70 italic leading-relaxed font-medium px-4">
              Initialize the specialized AI assessment workspace to validate mission-critical mastery of this unit's security protocols.
            </p>
          </div>
          <a 
            href={contentSource} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group flex items-center gap-8 px-24 py-8 rounded-full font-black text-xs uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95 shadow-2xl ${isCyber ? 'bg-primary text-black shadow-primary/50 hover:shadow-primary/80' : 'bg-indigo-600 text-white shadow-indigo-600/50 hover:shadow-indigo-600/80'}`}
          >
            <span>Uplink to Workspace</span>
            <span className="material-symbols-outlined font-black group-hover:translate-x-4 transition-transform text-2xl">rocket_launch</span>
          </a>
          <div className="opacity-40 text-[10px] font-black uppercase tracking-[0.6em] mt-6">Secure External Connection: Established</div>
        </div>
      );

    default:
      return (
        <div className="p-12 text-center">
          <p className="font-mono opacity-40 uppercase tracking-widest">ERROR: UNKNOWN_ARTIFACT_FORMAT_{format}</p>
        </div>
      );
  }
};

export default MultimodalGallery;
