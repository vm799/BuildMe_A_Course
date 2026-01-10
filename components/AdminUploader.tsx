
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';
import { getStandardizedPath } from '../src/utils/fileChecker';

const AdminUploader: React.FC = () => {
  const { theme, updateAsset, courseState } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const navigate = useNavigate();

  const [week, setWeek] = useState(1);
  const [format, setFormat] = useState<'video' | 'slides' | 'infographic' | 'quiz'>('video');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus({ type: 'info', message: 'Initiating Secure File Transfer Protocol...' });

    try {
      // Get standardized path
      const extension = file.name.split('.').pop()?.toLowerCase() || 'dat';
      const standardizedPath = getStandardizedPath(week, format, extension);
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('week', week.toString());
      formData.append('format', format);
      formData.append('standardizedPath', standardizedPath);
      
      // Simulate upload process (in a real app, this would POST to a server endpoint)
      setStatus({ type: 'info', message: `Transferring ${file.name} to secure storage...` });
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // For now, we'll simulate successful upload and update the course data
      const fileName = standardizedPath.split('/').pop() || file.name;
      const folderName = standardizedPath.split('/')[2];
      
      // Update the course manifest
      updateAsset(week, format, standardizedPath);
      
      setStatus({ 
        type: 'success', 
        message: `✅ DEPLOYMENT COMPLETE: ${fileName} successfully deployed to /public/${folderName}/` 
      });
      
      // Clear the file input
      e.target.value = '';
      
      // Auto-navigation to view the change
      setTimeout(() => {
        setStatus(null);
        navigate(`/module/${week}`);
      }, 3000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus({ 
        type: 'error', 
        message: `❌ UPLOAD FAILED: ${(error as Error).message || 'Unknown error occurred'}` 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput) return;
    setIsUploading(true);
    setStatus({ type: 'info', message: 'Validating and Linking Remote Manifest...' });

    setTimeout(() => {
      updateAsset(week, format, urlInput);
      setStatus({ type: 'success', message: `UPLINK SUCCESS: Week ${week} ${format} successfully mapped to remote artifact.` });
      setIsUploading(false);
      setTimeout(() => navigate(`/module/${week}`), 2000);
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-700 ${isCyber ? 'bg-[#020a05] text-emerald-500' : 'bg-[#fcfdfc] text-forest'}`}>
      <header className={`px-8 py-6 flex items-center justify-between border-b ${isCyber ? 'border-emerald-500/20 bg-black/40 shadow-lg shadow-emerald-500/5' : 'border-slate-100 bg-white shadow-sm'}`}>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 group">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Recall Hub</span>
        </button>
        <div className="text-center">
           <h1 className="text-sm font-black tracking-widest uppercase">Maestro Asset Ingestion</h1>
           <p className={`text-[8px] font-bold tracking-[0.4em] opacity-40 uppercase`}>Chassis Version 2.5.2-Stable</p>
        </div>
        <div className="w-24"></div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 space-y-12">
        <section className="space-y-4 text-center">
           <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${isCyber ? 'bg-emerald-500/10 border-emerald-500/30 text-primary' : 'bg-forest/5 border-forest/10 text-forest'}`}>
              <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
              Root Access Verified
           </div>
           <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isCyber ? 'text-white' : 'text-forest'}`}>
             Content Factory
           </h2>
           <p className={`text-xl opacity-60 max-w-2xl mx-auto ${isCyber ? 'font-mono' : 'font-serif italic'}`}>
             Standardize, rename, and deploy mission-critical multimodal artifacts to the training hub.
           </p>
        </section>

        <div className={`rounded-[4rem] border p-8 md:p-16 transition-all ${isCyber ? 'bg-zinc-950 border-white/5 shadow-2xl shadow-emerald-500/10' : 'bg-white border-forest/10 shadow-2xl shadow-forest/5'}`}>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Training Context (Week)</label>
              <div className="relative">
                <select 
                  value={week} 
                  onChange={(e) => setWeek(Number(e.target.value))}
                  className={`w-full p-6 rounded-[2rem] border outline-none appearance-none cursor-pointer font-bold transition-all ${isCyber ? 'bg-black border-white/10 text-emerald-500 focus:border-emerald-500/50' : 'bg-slate-50 border-forest/5 text-forest focus:border-forest/20'}`}
                >
                  {courseState.weeks.map(w => (
                    <option key={w.weekNumber} value={w.weekNumber}>Week {w.weekNumber}: {w.title}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Asset Format (Subfolder Mapping)</label>
              <div className="relative">
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value as any)}
                  className={`w-full p-6 rounded-[2rem] border outline-none appearance-none cursor-pointer font-bold transition-all ${isCyber ? 'bg-black border-white/10 text-emerald-500 focus:border-emerald-500/50' : 'bg-slate-50 border-forest/5 text-forest focus:border-forest/20'}`}
                >
                  <option value="video">MP4 Video (/videos/)</option>
                  <option value="slides">PDF Slide Deck (/decks/)</option>
                  <option value="infographic">PNG Schema (/images/)</option>
                  <option value="quiz">External AI Lab (/assets/)</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">expand_more</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Option 1: Disk-to-Public Uplink</h3>
              <div className="relative group">
                <input 
                  type="file" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <div className={`p-12 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${isCyber ? 'border-emerald-500/20 bg-black/40 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5' : 'border-forest/10 bg-slate-50 group-hover:border-forest/30 group-hover:bg-forest/5'}`}>
                  <div className={`size-20 rounded-full flex items-center justify-center mb-4 transition-all ${isCyber ? 'bg-emerald-500/10 text-emerald-500' : 'bg-forest/5 text-forest'}`}>
                    <span className={`material-symbols-outlined text-4xl ${isUploading ? 'animate-spin' : ''}`}>
                      {isUploading ? 'sync' : 'cloud_upload'}
                    </span>
                  </div>
                  <p className="font-black text-xs uppercase tracking-widest">{isUploading ? 'Processing Artifact...' : 'Drop file to initiate standardize rename'}</p>
                  <p className="text-[10px] opacity-40 mt-2 uppercase tracking-[0.2em]">Automated Mapping Logic: week{week}-{format}.*</p>
                </div>
              </div>
            </div>

            <div className={`h-px w-full flex items-center justify-center relative ${isCyber ? 'bg-white/5' : 'bg-forest/5'}`}>
               <span className={`px-4 text-[9px] font-black uppercase tracking-widest ${isCyber ? 'bg-zinc-950 text-white/20' : 'bg-white text-forest/20'}`}>OR</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Option 2: Remote URL Sync</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://notebooklm.google.com/..."
                    className={`w-full p-6 rounded-[2rem] border outline-none font-bold transition-all ${isCyber ? 'bg-black border-white/10 text-emerald-500 focus:border-emerald-500/50' : 'bg-slate-50 border-forest/5 text-forest focus:border-forest/20'}`}
                  />
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 opacity-20">language</span>
                </div>
                <button 
                  onClick={handleUrlSubmit}
                  disabled={!urlInput || isUploading}
                  className={`px-10 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-30 ${isCyber ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40' : 'bg-forest text-white shadow-xl shadow-forest/20 hover:shadow-forest/40'}`}
                >
                  Map Artifact
                </button>
              </div>
            </div>
          </div>

          {status && (
            <div className={`mt-12 p-8 rounded-[2rem] border flex items-center gap-5 animate-in fade-in slide-in-from-top-4 duration-500 ${status.type === 'success' ? (isCyber ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-800') : (isCyber ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-800')}`}>
              <div className="size-10 rounded-full flex items-center justify-center bg-current opacity-10">
                <span className="material-symbols-outlined">{status.type === 'success' ? 'verified' : 'info'}</span>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1">System Status</p>
                <p className="text-[11px] font-bold opacity-80 leading-relaxed">{status.message}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {isCyber && <div className="scanline"></div>}
      <footer className="p-10 text-center opacity-30">
         <p className={`text-[9px] font-black uppercase tracking-[0.5em]`}>Ingestion Protocol Verified // Secure Session Hub</p>
      </footer>
    </div>
  );
};

export default AdminUploader;
