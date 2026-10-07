import React from 'react';
import { Film, Clapperboard, Sparkles, Target, Compass, Award, Shield, Users, ArrowRight } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  onOpenJoinWizard: () => void;
  onExploreZones: () => void;
}

export const AboutSection: React.FC<Props> = ({ onOpenJoinWizard, onExploreZones }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Header Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            WHO WE ARE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight">
            A Hub for Visionary Student Filmmakers
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            CaSR Movie Club is the premier cinematic collective dedicated to nurturing original student storytelling, technical cinematography mastery, fast-paced vertical media, and grand campus film showcases.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Structured into five distinct creative zones under rigorous SOP governance, we transform raw ideas from dormitory whiteboards into high-production films, viral social content, and campus-wide red-carpet galas.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => {
                sfx.playClapper();
                onOpenJoinWizard();
              }}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-red-950/50 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Become a Member</span>
            </button>

            <button
              onClick={() => {
                sfx.playSubtleChime();
                onExploreZones();
              }}
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs border border-zinc-700"
            >
              <span>Explore Zones</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-700/80 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80"
              alt="Filmmaking behind the scenes"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-zinc-800">
              <p className="text-xs font-mono font-bold text-red-400 uppercase">OUR CORE MOTTO</p>
              <p className="text-lg font-heading font-black text-white mt-0.5">
                "One Club. Five Zones. One Team."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest">
            THE THREE PILLARS
          </p>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
            How We Make Cinema Happen
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-red-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/50 flex items-center justify-center text-red-500">
              <Clapperboard className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-black text-white">01. CREATE</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We empower scriptwriters, story architects, and conceptual thinkers to develop deep character arcs, provocative plots, and high-impact screenplays across genres.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-500">
              <Film className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-black text-white">02. CAPTURE</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              From Sony cinema rigs and anamorphic glass to sound capture on multi-track recorders and DaVinci color suites, we master the technical craft of film production.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-purple-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-500">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-black text-white">03. COLLABORATE</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Five creative zones work in synchrony. When Zone 02 shoots a short film, Zone 03 cuts viral BTS reels, Zone 04 designs key art posters, and Zone 05 hosts the premiere screening.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};
