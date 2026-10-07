import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, QrCode, Video, Share2, Users, MapPin, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { QrAttendanceModal } from '../../../components/modals/QrAttendanceModal';
import { CrossZoneWorkflow } from '../../../components/ui/CrossZoneWorkflow';
import { sfx } from '../../../utils/audio';

export const EventsView: React.FC = () => {
  const { events, addEvent, users } = useClub();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Screening' as const,
    date: '2026-03-25',
    time: '17:30 - 20:00',
    venue: 'Central Auditorium',
    concept: '',
    coordinatorName: users[0]?.name || 'Pavan Datta Gedila',
    expectedAudience: 250
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    addEvent({
      name: formData.name,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      concept: formData.concept,
      coordinatorName: formData.coordinatorName,
      expectedAudience: formData.expectedAudience,
      supportingTeam: ['Zone 01 Crew', 'Zone 04 PR Team', 'Technical Sound Gaffer'],
      activities: ['Host Introduction', 'Film Screening', 'Director Q&A Panel', 'Audience Polls'],
      schedule: [
        { time: '17:30', activity: 'Doors Open & Seat Allocation', lead: 'Event Ops' },
        { time: '18:00', activity: 'Official Film Premiere Screening', lead: 'Projectionist' },
        { time: '19:15', activity: 'Cast & Crew Stage Q&A', lead: formData.coordinatorName }
      ],
      bannerImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      status: 'upcoming',
      reelStatus: 'Drafted',
      socialStatus: 'Drafted'
    });

    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span>Zone 05 — Event Operations & Screenings</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Auditorium premieres, live logistics & QR attendance</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sfx.playClapper();
              setIsQrOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Launch QR Attendance</span>
          </button>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsAdding(!isAdding);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Event</span>
          </button>
        </div>
      </div>

      {/* Cross Zone Workflow Interactive Diagram */}
      <CrossZoneWorkflow />

      {/* Add Event Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-[#0e0e14] border border-emerald-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-emerald-400 uppercase">Schedule New Screening / Masterclass</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Event Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Annual Campus Short Film Gala"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              >
                <option value="Screening">Screening</option>
                <option value="Festival">Festival</option>
                <option value="Workshop">Workshop / Masterclass</option>
                <option value="Meeting">General Body Meeting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Auditorium / Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Media Lab 304 or Main Auditorium"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Event Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Time Window</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="17:00 - 20:00"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Expected Attendees</label>
              <input
                type="number"
                value={formData.expectedAudience}
                onChange={(e) => setFormData({ ...formData, expectedAudience: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Concept Synopsis & Screening Lineup</label>
            <textarea
              rows={3}
              value={formData.concept}
              onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              placeholder="List the short films scheduled for screening, guest speakers, and projection requirements..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold"
            >
              Confirm Event Ops Schedule →
            </button>
          </div>
        </form>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-bold uppercase">
                  {event.type}
                </span>

                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {event.date} • {event.time}
                </span>
              </div>

              <h4 className="text-xl font-heading font-bold text-white">
                {event.name}
              </h4>

              <p className="text-xs text-zinc-300">
                {event.concept}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase">Venue</span>
                  <span className="text-white font-bold block truncate">{event.venue}</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase">Expected Crowd</span>
                  <span className="text-emerald-400 font-bold block">{event.expectedAudience} Guests</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => {
                  sfx.playClapper();
                  setSelectedEventId(event.id);
                  setIsQrOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-zinc-700 flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>QR Check-in</span>
              </button>

              <Link
                to={`/events/${event.id}`}
                onClick={() => sfx.playClapper()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1 shadow-md"
              >
                <span>Full Program</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <QrAttendanceModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

    </div>
  );
};
