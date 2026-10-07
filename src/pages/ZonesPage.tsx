import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Users, Clapperboard, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { sfx } from '../utils/audio';

export const ZonesPage: React.FC = () => {
  const { zones } = useClub();

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            CREATIVE ECOSYSTEM
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Five Creative Zones
          </h1>
          <p className="text-sm text-zinc-400">
            Dedicated cells handling movie development, festival short films, viral reels, social media branding, and live screening operations.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="rounded-3xl bg-[#0e0e14] border border-zinc-800 hover:border-red-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={zone.bannerImage}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40" />
                  
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700 text-red-400 font-mono text-xs font-bold">
                    {zone.number}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                    {zone.name}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {zone.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Coordinator:</span>
                      <span className="text-white font-bold">{zone.coordinator}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Sub-Coordinator:</span>
                      <span className="text-white font-bold">{zone.subCoordinator}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Key Responsibilities:</p>
                    {zone.responsibilities.slice(0, 3).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/zones/${zone.id}`}
                  onClick={() => sfx.playClapper()}
                  className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-zinc-800 group-hover:border-red-500/50 transition-colors"
                >
                  <span>Explore {zone.name} Cell</span>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
