import React from 'react';
import { ClubEvent } from '../../types';
import { Calendar, MapPin, Clock, Users, Sparkles, ArrowRight, Video, Share2, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  events: ClubEvent[];
  onSelectEvent: (e: ClubEvent) => void;
  onOpenJoinWizard: () => void;
}

export const EventsShowcase: React.FC<Props> = ({ events, onSelectEvent, onOpenJoinWizard }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          EXPERIENCES & SHOWCASES
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
          Club Screenings & Events
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
          From full auditorium film festivals and indie director masterclasses to interactive trivia nights — experience the magic of cinema together.
        </p>
      </div>

      {/* Events List / Cards */}
      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              sfx.playClapper();
              onSelectEvent(event);
            }}
            className="group rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-emerald-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 cursor-pointer transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Banner Side */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
              <img
                src={event.bannerImage}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md">
                  {event.type}
                </span>
              </div>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-200">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <strong>{event.date}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-200">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {event.time} ({event.duration})
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-200">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {event.venue}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-emerald-400 transition-colors">
                  {event.name}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {event.concept}
                </p>
              </div>

              {/* Cross-Zone Alignment Visualizer */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400">
                  <span>CROSS-ZONE PRODUCTION WORKFLOW</span>
                  <span className="text-emerald-400">ZONE 05 + 03 + 04 SYNERGY</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-zinc-950/70 border border-emerald-900/40">
                    <span className="text-[10px] text-zinc-500 block font-mono">ZONE 05</span>
                    <span className="text-emerald-300 font-semibold text-[11px]">Event Planning</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950/70 border border-amber-900/40">
                    <span className="text-[10px] text-zinc-500 block font-mono">ZONE 03 (REELS)</span>
                    <span className="text-amber-300 font-semibold text-[11px]">{event.reelStatus || 'Pre-Event Reel'}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950/70 border border-purple-900/40">
                    <span className="text-[10px] text-zinc-500 block font-mono">ZONE 04 (SOCIAL)</span>
                    <span className="text-purple-300 font-semibold text-[11px]">{event.socialStatus || 'Promo Campaign'}</span>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="text-xs text-zinc-400">
                  Lead Coordinator: <strong className="text-zinc-200">{event.coordinatorName}</strong>
                </div>

                <button className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>FULL SCHEDULE & DETAILS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
