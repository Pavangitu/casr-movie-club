import React from 'react';
import { Zone } from '../../types';
import { Film, Clapperboard, Sparkles, Share2, Calendar, ArrowRight, UserCheck, Shield, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  zones: Zone[];
  onSelectZone: (zoneId: string) => void;
  onOpenJoinWizard: () => void;
}

export const ZonesShowcase: React.FC<Props> = ({ zones, onSelectZone, onOpenJoinWizard }) => {
  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return Film;
      case 'Clapperboard': return Clapperboard;
      case 'Sparkles': return Sparkles;
      case 'Share2': return Share2;
      case 'Calendar': return Calendar;
      default: return Film;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          STRUCTURE & LEADERSHIP
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
          The Five Creative Production Zones
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
          Every zone operates as a specialized creative powerhouse with dedicated student leadership, clear responsibilities, and collaborative cross-zone pipelines.
        </p>
      </div>

      {/* Grid of 5 Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {zones.map((zone) => {
          const Icon = getZoneIcon(zone.icon);

          return (
            <div
              key={zone.id}
              className="group relative rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/20"
            >
              {/* Cover Banner Image with dark overlay */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={zone.bannerImage} 
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent"></div>
                
                {/* Zone Code Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-white font-mono font-bold text-xs tracking-wider">
                    {zone.code}
                  </span>
                </div>

                {/* Icon Floating */}
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-zinc-900/90 border border-zinc-700 flex items-center justify-center text-red-500 shadow-lg group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Zone Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                <div>
                  <h3 className="text-xl font-heading font-black text-white group-hover:text-red-400 transition-colors">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                    {zone.description}
                  </p>

                  {/* Leadership Box */}
                  <div className="mt-4 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-red-400" /> Coordinator:
                      </span>
                      <span className={`font-semibold ${zone.coordinator === 'To Be Assigned' ? 'text-amber-400 italic' : 'text-zinc-100'}`}>
                        {zone.coordinator}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800/60">
                      <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-blue-400" /> Sub-Coordinator:
                      </span>
                      <span className={`font-semibold ${zone.subCoordinator === 'To Be Assigned' ? 'text-amber-400 italic' : 'text-zinc-100'}`}>
                        {zone.subCoordinator}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities Preview (Top 3) */}
                  <div className="mt-4">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Key Responsibilities ({zone.responsibilities.length})
                    </p>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {zone.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                          <span className="truncate">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stats and Action */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 text-[10px] block">PROJECTS</span>
                      <span className="text-white font-bold">{zone.activeProjectsCount} Active</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-[10px] block">MEMBERS</span>
                      <span className="text-white font-bold">{zone.totalMembersCount} Total</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sfx.playClapper();
                      onSelectZone(zone.id);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-red-600 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all group-hover:border-red-500/50 border border-zinc-700"
                  >
                    <span>View Zone</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {/* 6th Card: Join the Team / Apply CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-red-950/40 via-[#111116] to-zinc-950 border border-red-900/40 p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold">
              OPEN RECRUITMENT 2025
            </span>
            <h3 className="text-2xl font-heading font-black text-white mt-2">
              Which Zone is Right For You?
            </h3>
            <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
              You can choose your primary zone and secondary zone during registration. We offer on-ground mentorship, camera gear access, editing suites, and hands-on production experience.
            </p>
          </div>

          <button
            onClick={() => {
              sfx.playClapper();
              onOpenJoinWizard();
            }}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply for a Zone Today</span>
          </button>
        </div>

      </div>

    </section>
  );
};
