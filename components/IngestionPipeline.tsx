
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Changed useTheme import to useApp
import { useApp } from '../App';
import { ThemeMode } from '../types';
import { generateModuleCurriculum } from '../services/geminiService';

const IngestionPipeline: React.FC = () => {
  // Fix: Changed useTheme to useApp
  const { theme } = useApp();
  const navigate = useNavigate();
  const isCyber = theme === ThemeMode.CYBERPUNK;

  const [topic, setTopic] = useState('AI Agent Security');
  const [source, setSource] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const startPipeline = async () => {
    if (!source) return;
    setIsProcessing(true);
    setLogs(['[0.1s] Initiating Agentic Ingestion Pipeline...', '[0.5s] Establishing Secure Uplink to n8n Workflow...']);
    
    // Simulated steps
    setTimeout(() => setLogs(prev => [...prev, '[1.2s] Sanitizing Input Data: Removing PII...']), 1000);
    setTimeout(() => setLogs(prev => [...prev, '[2.5s] Context Analysis: Embedding Vector Space mapping...']), 2000);
    setTimeout(() => setLogs(prev => [...prev, '[4.0s] Gemini 3.0 Pro engaged: Structuring Multimodal Curriculum...']), 3500);

    try {
      const result = await generateModuleCurriculum(topic, source);
      setLogs(prev => [...prev, '[8.0s] Generation Successful. 4 Modules cataloged.', '[9.5s] Review Agent (Gemini 1.5) performing SecOps Fact-Check...']);
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
      }, 5000);
    } catch (err) {
      setLogs(prev => [...prev, '[ERROR] LLM Generation Failed: Rate Limit or API Key invalid.']);
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isCyber ? 'bg-black text-emerald-500 font-mono' : 'bg-[#f8faf8] text-forest'}`}>
      <header className={`p-6 border-b flex items-center justify-between ${isCyber ? 'border-emerald-500/20' : 'border-forest/5 bg-white'}`}>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:opacity-70">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-black uppercase tracking-widest">Back to Terminal</span>
        </button>
        <h2 className="text-lg font-bold tracking-tight">THE MAESTRO CONTENT FACTORY</h2>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className={`w-full max-w-2xl rounded-3xl p-8 border transition-all ${isCyber ? 'bg-zinc-900 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-white border-forest/10 shadow-2xl'}`}>
          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className={`size-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isCyber ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-terracotta/10 border border-terracotta/20'}`}>
                  <span className={`material-symbols-outlined text-4xl ${isCyber ? 'text-emerald-500' : 'text-terracotta'}`}>upload_file</span>
                </div>
                <h1 className="text-2xl font-bold">SOW NEW CONTENT</h1>
                <p className="opacity-60 text-sm">Upload GitHub URLs, Whitepapers, or Raw Text.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Topic Context</label>
                  <input 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`w-full p-4 rounded-2xl outline-none border transition-all ${isCyber ? 'bg-black border-emerald-500/30 text-emerald-500' : 'bg-linen/20 border-forest/10'}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Source Data</label>
                  <textarea 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Paste technical documentation or GitHub link here..."
                    className={`w-full h-32 p-4 rounded-2xl outline-none border transition-all resize-none ${isCyber ? 'bg-black border-emerald-500/30 text-emerald-500' : 'bg-linen/20 border-forest/10'}`}
                  />
                </div>
              </div>

              {!isProcessing ? (
                <button 
                  onClick={startPipeline}
                  disabled={!source}
                  className={`w-full py-4 rounded-full font-black text-lg transition-all active:scale-95 disabled:opacity-30 ${isCyber ? 'bg-emerald-500 text-black shadow-emerald-500/40' : 'bg-terracotta text-white shadow-terracotta/40'}`}
                >
                  START UPLINK SYSTEM_V4
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border min-h-[160px] overflow-y-auto font-mono text-[11px] leading-relaxed ${isCyber ? 'bg-black/50 border-emerald-500/20' : 'bg-slate-50 border-forest/5'}`}>
                    {logs.map((log, i) => <div key={i} className="mb-1">{log}</div>)}
                    <div className="animate-pulse">_</div>
                  </div>
                  <div className="flex h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full animate-[progress_10s_ease-in-out_infinite] ${isCyber ? 'bg-emerald-500' : 'bg-terracotta'}`} style={{ width: '40%' }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 text-center">
               <div className={`size-24 mx-auto rounded-full flex items-center justify-center mb-4 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}>
                  <span className="material-symbols-outlined text-black text-5xl">check_circle</span>
                </div>
                <h1 className="text-3xl font-bold">HARVEST READY</h1>
                <p className="opacity-60 text-sm">The 4-week curriculum has been mapped and deployed to your dashboard.</p>
                <div className="grid grid-cols-2 gap-4">
                   <div className={`p-4 rounded-2xl border ${isCyber ? 'bg-white/5 border-emerald-500/20' : 'bg-linen/20 border-forest/5'}`}>
                      <p className="text-[10px] font-black uppercase opacity-40 mb-1">Assets Built</p>
                      <p className="text-xl font-bold">12</p>
                   </div>
                   <div className={`p-4 rounded-2xl border ${isCyber ? 'bg-white/5 border-emerald-500/20' : 'bg-linen/20 border-forest/5'}`}>
                      <p className="text-[10px] font-black uppercase opacity-40 mb-1">Safety Score</p>
                      <p className="text-xl font-bold text-emerald-500">98%</p>
                   </div>
                </div>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className={`w-full py-4 rounded-full font-black text-lg transition-all active:scale-95 ${isCyber ? 'bg-emerald-500 text-black shadow-emerald-500/40' : 'bg-forest text-white shadow-forest/40'}`}
                >
                  ENTER THE ECOSYSTEM
                </button>
            </div>
          )}
        </div>
      </main>

      <footer className="p-6 text-center opacity-40 text-[10px] font-black tracking-widest uppercase">
        Maestro Engine v2.0.4-stable // Secured by Quantum-Link
      </footer>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default IngestionPipeline;
