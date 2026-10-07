import React from 'react';
import { ClubEvent } from '../../types';
import { X, Calendar, Clock, MapPin, Users, Sparkles, CheckCircle2, Video, Share2, Film } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  event: ClubEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<Props> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-[#111116] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={event.bannerImage} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent"></div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider">
              {event.type}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1.5">
              {event.name}
            </h2>
          </div>
        </div>

        {/* Quick Meta */}
        <div className="p-4 bg-zinc-950/80 border-b border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">DATE</p>
              <p className="font-bold">{event.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">TIME & DURATION</p>
              <p className="font-bold">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <MapPin className="w-4 h-4 text-red-400" />
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">VENUE</p>
              <p className="font-bold">{event.venue}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Users className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">AUDIENCE</p>
              <p className="font-bold">{event.expectedAudience}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
          
          {/* Concept & Objective */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
              EVENT CONCEPT & OBJECTIVES
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              {event.objective}
            </p>
          </div>

          {/* Schedule Breakdown */}
          {event.schedule && event.schedule.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                RUN OF SHOW / SCHEDULE TIMELINE
              </h4>
              <div className="space-y-2">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-emerald-400 font-bold">{item.time}</span>
                      <span className="text-zinc-200 font-medium">{item.activity}</span>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono">Lead: {item.lead}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          {event.activities && event.activities.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                KEY ACTIVITIES & HIGHLIGHTS
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {event.activities.map((act, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supporting Leadership */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">LEAD EVENT COORDINATOR</p>
              <p className="text-sm font-bold text-white mt-0.5">{event.coordinatorName} & {event.subCoordinatorName}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">CROSS-ZONE REELS & SOCIAL SUPPORT</p>
              <p className="text-xs text-zinc-300 mt-0.5">{event.supportingTeam.join(', ')}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">CaSR Movie Club Event Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
