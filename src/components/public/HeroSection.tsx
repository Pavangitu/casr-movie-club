import React from 'react';
import { Play, Sparkles, Film, ArrowRight, Layers, Award, Users, Video } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  onExploreZones: () => void;
  onOpenJoinWizard: () => void;
  onOpenShowreel: () => void;
  onOpenProjects: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onExploreZones,
  onOpenJoinWizard,
  onOpenShowreel,
  onOpenProjects
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden text-center">
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glowing Spotlight from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-red-600/15 via-red-950/10 to-transparent blur-[120px] rounded-full"></div>
        {/* Soft amber fill bottom right */}
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-600/5 blur-[100px] rounded-full"></div>
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#09090b_80%)]"></div>
      </div>

      {/* Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner mb-6 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
          CaSR MOVIE CLUB • OFFICIAL PLATFORM
        </span>
      </div>

      {/* Main Punchy Display Heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white max-w-5xl leading-[1.05] drop-shadow-2xl">
        CREATE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">CAPTURE.</span> COLLABORATE.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
        One Club. Five Creative Zones. One Passionate Team. From feature films and festival shorts to viral reels, dynamic branding, and campus film galas.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          onClick={() => {
            sfx.playClapper();
            onExploreZones();
          }}
          className="px-6 sm:px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-red-950/60 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Layers className="w-4 h-4" />
          <span>Explore 5 Zones</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            sfx.playClapper();
            onOpenJoinWizard();
          }}
          className="px-6 sm:px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold text-sm tracking-wide border border-zinc-700 shadow-lg hover:border-red-500/50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-red-500" />
          <span>Join Movie Club</span>
        </button>

        <button
          onClick={() => {
            sfx.playCinematicBoom();
            onOpenShowreel();
          }}
          className="px-5 py-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white font-semibold text-sm tracking-wide border border-zinc-800 backdrop-blur-sm flex items-center gap-2 hover:border-zinc-600 transition-all"
        >
          <Play className="w-4 h-4 text-red-500 fill-red-500" />
          <span>Watch Showreel</span>
        </button>
      </div>

      {/* Live Impact Counters Bar */}
      <div className="mt-16 sm:mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 rounded-2xl bg-[#111116]/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl">
        
        <div className="text-center p-3 border-r border-zinc-800/60 last:border-none">
          <p className="font-heading font-black text-3xl sm:text-4xl text-white">05</p>
          <p className="text-xs font-mono uppercase tracking-wider text-red-400 mt-1 font-bold">Creative Zones</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Specialized production units</p>
        </div>

        <div className="text-center p-3 border-r border-zinc-800/60 last:border-none">
          <p className="font-heading font-black text-3xl sm:text-4xl text-white">12+</p>
          <p className="text-xs font-mono uppercase tracking-wider text-amber-400 mt-1 font-bold">Short Films & Teasers</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Written, directed & edited</p>
        </div>

        <div className="text-center p-3 border-r border-zinc-800/60 last:border-none">
          <p className="font-heading font-black text-3xl sm:text-4xl text-white">850K+</p>
          <p className="text-xs font-mono uppercase tracking-wider text-purple-400 mt-1 font-bold">Reel Views</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Across Instagram & TikTok</p>
        </div>

        <div className="text-center p-3">
          <p className="font-heading font-black text-3xl sm:text-4xl text-white">100%</p>
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 mt-1 font-bold">Student-Led Team</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Collaborative filmmaking</p>
        </div>

      </div>

    </section>
  );
};
