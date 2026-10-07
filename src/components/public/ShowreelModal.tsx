import React from 'react';
import { X, Play, Award, Film, Sparkles, Volume2, Maximize2 } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoinWizard: () => void;
}

export const ShowreelModal: React.FC<Props> = ({ isOpen, onClose, onOpenJoinWizard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-[#111116] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">CaSR Movie Club Official Showreel</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Highlights 2024-2025 • Directed & Produced by In-House Team</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Screen Simulation */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80" 
            alt="Showreel Preview"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

          {/* Large Play Button */}
          <button 
            onClick={() => {
              sfx.playCinematicBoom();
            }}
            className="relative w-20 h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-950/80 hover:scale-110 active:scale-95 transition-all group/btn"
          >
            <Play className="w-8 h-8 ml-1 fill-white" />
            <span className="absolute -bottom-7 text-[11px] font-mono tracking-widest text-zinc-300 uppercase font-bold">
              PLAY SHOWREEL
            </span>
          </button>

          {/* Cinematic details on bottom bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">4K CINEMA</span>
              <span>24.000 FPS • DOLBY 5.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <span>03:45 / 03:45</span>
            </div>
          </div>
        </div>

        {/* Showreel Description & Credits */}
        <div className="p-6 bg-zinc-950/90 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BEST SHORT DRAMA</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">The Silent Echo (Zone 02)</p>
              <p className="text-[11px] text-zinc-500">Dir. Sagar Panda • 14 Mins</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">TOP VIRAL REEL</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Color Grade Transformation</p>
              <p className="text-[11px] text-zinc-500">112K+ Views • Edit: Aman Baidya</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Film className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">CAMPUS FESTIVAL</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">CineAura 2025 (Zone 05)</p>
              <p className="text-[11px] text-zinc-500">800+ Attendees • Lead: Chinmayee</p>
            </div>

          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80">
            <p className="text-xs text-zinc-400 text-center sm:text-left">
              Interested in seeing your name in the next showreel credits roll?
            </p>
            <button
              onClick={() => {
                sfx.playClapper();
                onClose();
                onOpenJoinWizard();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-950/50"
            >
              Apply to Join CaSR Movie Club
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
