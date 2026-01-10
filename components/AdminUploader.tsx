
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ThemeMode } from '../types';

const AdminUploader: React.FC = () => {
  const { theme, updateAsset, courseState } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;
  const navigate = useNavigate();

  const [week, setWeek] = useState(1);
  const [format, setFormat] = useState('video');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('Optimizing payload...');

    // Simulate standardizing path and "uploading"
    setTimeout(() => {
      const folder = format === 'video' ? 'videos' : format === 'slides' ? 'decks' : 'assets';
      const extension = file.name.split('.').pop();
      const standardizedPath = `/public/${folder}/week${week}-${format}.${extension}`;
      
      updateAsset(week, format, standardizedPath);
      
      setStatus(`SUCCESS: Registered to ${standardizedPath}`);
      setIsUploading(false);
      
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex flex-col p-8 ${isCyber ? 'bg-black text-emerald-500' : 'bg-linen text-forest'}`}>
      <header className="max-w-4xl mx-auto w-full mb-12 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Dashboard</span>
        </button>
        <h1 className="text-xl font-black tracking-tight">MISSION CONTROL: ASSET INGESTION</h1>
      </header>

      <main className="max-w-2xl mx-auto w-full space-y-8">
        <div className={`p-10 rounded-[3rem] border transition-all ${isCyber ? 'bg-zinc-900 border-emerald-500/20 shadow-2xl shadow-emerald-500/5' : 'bg-white border-forest/10 shadow-xl'}`}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Target Week</label>
                <select 
                  value={week} 
                  onChange={(e) => setWeek(Number(e.target.value))}
                  className={`w-full p-4 rounded-2xl border outline-none appearance-none cursor-pointer ${isCyber ? 'bg-black border-emerald-500/30 text-emerald-500' : 'bg-slate-50 border-forest/5'}`}
                >
                  {courseState.weeks.map(w => (
                    <option key={w.weekNumber} value={w.weekNumber}>Week {w.weekNumber}: {w.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Asset Category</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className={`w-full p-4 rounded-2xl border outline-none appearance-none cursor-pointer ${isCyber ? 'bg-black border-emerald-500/30 text-emerald-500' : 'bg-slate-50 border-forest/5'}`}
                >
                  <option value="video">Briefing (MP4)</option>
                  <option value="slides">Slide Deck (PDF)</option>
                  <option value="infographic">Schema (PNG)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className={`group relative block w-full aspect-video rounded-[2.5rem] border-4 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${isCyber ? 'border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40' : 'border-forest/10 bg-forest/5 hover:bg-forest/10'}`}>
                <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} />
                <span className="material-symbols-outlined text-6xl animate-float">{isUploading ? 'sync' : 'cloud_upload'}</span>
                <div className="text-center">
                  <p className="font-black text-xs uppercase tracking-widest">
                    {isUploading ? 'Processing Pipeline...' : 'Select Source Artifact'}
                  </p>
                  <p className="text-[9px] opacity-40 mt-1 uppercase tracking-[0.2em]">Ready for Automated Standardized Rename</p>
                </div>
              </label>
            </div>

            {status && (
              <div className={`p-4 rounded-2xl font-mono text-[10px] animate-in fade-in slide-in-from-top-2 ${status.startsWith('SUCCESS') ? (isCyber ? 'bg-emerald-500/10 text-emerald-400' : 'bg-forest/5 text-forest') : 'bg-red-500/10 text-red-500'}`}>
                {status}
              </div>
            )}
          </div>
        </div>

        <div className={`p-8 rounded-[2.5rem] border ${isCyber ? 'bg-black border-emerald-500/5 opacity-50' : 'bg-slate-50 border-forest/5 opacity-70'}`}>
           <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">info</span>
             Teacher Protocol
           </h3>
           <ul className="text-[11px] space-y-2 leading-relaxed italic">
             <li>• The system automatically resolves week/format mismatches.</li>
             <li>• Uploading will overwrite the existing asset link in the manifest.</li>
             <li>• Standardized naming convention: <code>week[#]-[format].[ext]</code></li>
           </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminUploader;
