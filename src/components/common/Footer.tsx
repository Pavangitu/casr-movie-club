import React from 'react';
import { Clapperboard, Film, Sparkles, Heart, Shield, ArrowUpRight, Github, Instagram, Youtube } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  onSelectZone: (zoneId: string) => void;
  onOpenJoinWizard: () => void;
  onOpenSopModal: () => void;
}

export const Footer: React.FC<Props> = ({ onSelectZone, onOpenJoinWizard, onOpenSopModal }) => {
  return (
    <footer className="bg-[#070709] border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#121218] to-zinc-950 border border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold">
              ONE CLUB • FIVE ZONES • ONE TEAM
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              Ready to create cinema with us?
            </h3>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Whether you write scripts, hold the camera, edit on DaVinci, design posters, or orchestrate grand events — there is a creative home for you at CaSR Movie Club.
            </p>
          </div>
          <button
            onClick={() => {
              sfx.playClapper();
              onOpenJoinWizard();
            }}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-950/50 flex items-center gap-2 hover:scale-105 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join CaSR Movie Club</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 w-11 h-11 rounded-2xl bg-black border border-white/15 p-1 shadow-lg shadow-red-950/40 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Frame Era Movie Club"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <span className="font-heading font-black tracking-widest text-xl text-white block">
                  FRAME ERA MOVIE CLUB
                </span>
                <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block -mt-1">
                  CASR CUTM
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Empowering student visionaries across feature cinema, festival shorts, viral vertical reels, creative brand design, and campus-wide cinematic showcases.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="CUTM Frame Era Vibes – Instagram"
                title="CUTM Frame Era Vibes – Instagram"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-pink-600 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="FRAMES ERA CASR CUTM PKD – YouTube"
                title="FRAMES ERA CASR CUTM PKD – YouTube"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-red-600 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 5 Zones Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Production Zones
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectZone('zone-movie')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-red-500 font-bold">01.</span> Movie Making
                </button>
              </li>
              <li>
                <button onClick={() => onSelectZone('zone-shortfilm')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-red-500 font-bold">02.</span> Short Film
                </button>
              </li>
              <li>
                <button onClick={() => onSelectZone('zone-reels')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-red-500 font-bold">03.</span> Reels & Viral
                </button>
              </li>
              <li>
                <button onClick={() => onSelectZone('zone-social')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-red-500 font-bold">04.</span> Social & Branding
                </button>
              </li>
              <li>
                <button onClick={() => onSelectZone('zone-events')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-red-500 font-bold">05.</span> Event Management
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Operations */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Operations & SOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenSopModal} className="hover:text-zinc-200 transition-colors flex items-center gap-1">
                  <span>Weekly Coordination SOP</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </button>
              </li>
              <li>
                <button onClick={onOpenSopModal} className="hover:text-zinc-200 transition-colors flex items-center gap-1">
                  <span>Task Allocation Guidelines</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </button>
              </li>
              <li>
                <button onClick={onOpenSopModal} className="hover:text-zinc-200 transition-colors flex items-center gap-1">
                  <span>8-Stage Project Pipeline</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </button>
              </li>
              <li>
                <button onClick={onOpenSopModal} className="hover:text-zinc-200 transition-colors flex items-center gap-1">
                  <span>Equipment & Studio Rules</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Leadership Credits */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Movie Club Leadership
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed space-y-1">
              <strong className="text-zinc-200">Faculty Coordinator:</strong> Mr. R. Nihal<br />
              <strong className="text-zinc-200">Overall MC Student Coordinator:</strong> G. Pavan Datta<br />
              <strong className="text-zinc-200">Student Coordinator:</strong> Krutisundar Behera<br />
              <span className="text-[10px] text-zinc-500 pt-1 block">
                Short Film: Sagar Panda & Aman Baidya • Reels: Subham Rout (Spyro)
              </span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} CaSR Movie Club. All rights reserved.</p>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Crafted for film visionaries with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>and pure cinema passion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
