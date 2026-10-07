import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Film, ChevronRight, Video, Share2 } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { sfx } from '../utils/audio';

export const EventsPage: React.FC = () => {
  const { events } = useClub();

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-mono text-xs font-bold uppercase">
            ZONE 05 LIVE OPERATIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Screenings & Film Festivals
          </h1>
          <p className="text-sm text-zinc-400">
            Auditorium premieres, filmmaking masterclasses, annual short film competitions, and open campus cinema nights.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl bg-[#0e0e14] border border-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-2xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700 text-emerald-400 font-mono text-xs font-bold">
                    {event.type}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="px-3 py-1 rounded-lg bg-black/80 text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {event.date} • {event.time}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {event.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    {event.concept}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px] uppercase">Venue:</span>
                      <span className="text-white font-bold block truncate">{event.venue}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px] uppercase">Expected Crowd:</span>
                      <span className="text-emerald-400 font-bold block">{event.expectedAudience}</span>
                    </div>
                  </div>

                  {/* Inter-Zone Cross Promotion Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono">
                    <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                      event.reelStatus === 'Published'
                        ? 'bg-amber-950/80 border-amber-800 text-amber-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}>
                      <Video className="w-3.5 h-3.5" />
                      <span>Reel: {event.reelStatus || 'Planned'}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                      event.socialStatus === 'Campaign Live'
                        ? 'bg-pink-950/80 border-pink-800 text-pink-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Social: {event.socialStatus || 'Drafted'}</span>
                    </span>
                  </div>

                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  to={`/events/${event.id}`}
                  onClick={() => sfx.playClapper()}
                  className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors"
                >
                  <span>View Full Schedule & Activities</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
