import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Film, ArrowLeft, ArrowRight, Video, Share2, CheckCircle2 } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { sfx } from '../utils/audio';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useClub();
  const navigate = useNavigate();

  const event = events.find(e => e.id === eventId) || events[0];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back */}
        <button
          onClick={() => {
            sfx.playSubtleChime();
            navigate('/events');
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Screenings & Events</span>
        </button>

        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#0e0e14] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono text-xs font-bold">
                  {event.type}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  STATUS: {event.status.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                {event.name}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                {event.concept}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Date & Time</span>
                  <span className="text-white font-bold block mt-0.5">{event.date} • {event.time}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Venue</span>
                  <span className="text-white font-bold block mt-0.5 truncate">{event.venue}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Lead Coordinator</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">{event.coordinatorName}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
              <img
                src={event.bannerImage}
                alt={event.name}
                className="w-full h-72 object-cover"
              />
            </div>

          </div>
        </div>

        {/* Event Program Schedule */}
        <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-6">
          <h3 className="text-2xl font-heading font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" /> Event Program & Rundown
          </h3>

          <div className="space-y-3">
            {event.schedule.map((slot, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
                    {slot.time}
                  </span>
                  <span className="text-sm font-bold text-white font-body">{slot.activity}</span>
                </div>
                <span className="text-zinc-500">Lead: {slot.lead}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Team & Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-3">
            <h4 className="text-base font-bold font-mono text-white">Event Support Crew</h4>
            <div className="flex flex-wrap gap-2">
              {event.supportingTeam.map((mem, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                  {mem}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-3">
            <h4 className="text-base font-bold font-mono text-white">Planned Activities</h4>
            <div className="space-y-1.5 text-xs text-zinc-300">
              {event.activities.map((act, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
