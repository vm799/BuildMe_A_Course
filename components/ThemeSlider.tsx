
import React from 'react';
import { useApp } from '../App';
import { ThemeMode } from '../types';

const ThemeSlider: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const isCyber = theme === ThemeMode.CYBERPUNK;

  return (
    <button 
      onClick={toggleTheme}
      className={`group relative flex items-center p-1 rounded-full transition-all duration-500 w-24 h-10 border overflow-hidden ${isCyber ? 'bg-black border-emerald-500/50' : 'bg-[#e0dfd5] border-forest/20'}`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-500 bg-emerald-500/10 ${isCyber ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Track Background Icons */}
      <div className="flex justify-between w-full px-2 z-0 opacity-40">
        <span className={`material-symbols-outlined text-sm ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>terminal</span>
        <span className={`material-symbols-outlined text-sm ${isCyber ? 'text-emerald-500' : 'text-forest'}`}>wb_sunny</span>
      </div>

      {/* The Knob */}
      <div 
        className={`absolute top-1 bottom-1 w-8 rounded-full transition-all duration-500 transform z-10 flex items-center justify-center ${
          isCyber 
            ? 'translate-x-[0px] bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.8)]' 
            : 'translate-x-[56px] bg-sun text-forest shadow-lg'
        }`}
      >
        <span className="material-symbols-outlined text-[16px] font-bold">
          {isCyber ? 'bolt' : 'psychology'}
        </span>
      </div>
    </button>
  );
};

export default ThemeSlider;
