import React, { useState } from 'react';
import { Users, Plus, Clock, CheckCircle2, ArrowRight, Shield, FileText, Sparkles } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { MeetingSopModal } from '../../../components/modals/MeetingSopModal';
import { sfx } from '../../../utils/audio';

export const MeetingsView: React.FC = () => {
  const { meetings, convertActionItemToTask, addMeeting, users } = useClub();
  const [isSopOpen, setIsSopOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Weekly Coordinator Sync' as const,
    date: '2026-03-24',
    time: '18:00 - 18:40',
    venue: 'Studio Media Lab 304'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    addMeeting({
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      agendaBreakdown: [
        { timeWindow: '00-05 min', topic: 'Punctuality & Roll Call', owner: 'Overall Coordinator' },
        { timeWindow: '05-15 min', topic: 'Weekly Status Review (Done vs Not Done)', owner: '5 Zone Coordinators' },
        { timeWindow: '15-25 min', topic: 'Core Discussion (Main Problem / Event / Shoot)', owner: 'All Leads' },
        { timeWindow: '25-35 min', topic: 'Action Plan & Task Delegation', owner: 'Assigned Leads' },
        { timeWindow: '35-40 min', topic: 'Conclusion & Next Steps Summary', owner: 'Chairperson' }
      ],
      actionItems: [
        { id: `act-${Date.now()}-1`, who: 'Sagar Panda', what: 'Submit shot list for short film teaser', byWhen: 'Tomorrow 5 PM', isConvertedToTask: false },
        { id: `act-${Date.now()}-2`, who: 'Krutisundar Behera', what: 'Draft Instagram story countdown graphics', byWhen: 'Friday 12 PM', isConvertedToTask: false }
      ]
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Structured Meeting Protocols & SOPs</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Strict 40-minute disciplined agenda: 5-10-10-10-5 model</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sfx.playClapper();
              setIsSopOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Read 40-Min Meeting SOP</span>
          </button>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsAdding(!isAdding);
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-[#0e0e14] border border-amber-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-amber-400 uppercase">Schedule New Sync with 40-Min Agenda</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Meeting Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Weekly Core Committee Sync #12"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Meeting Category</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="Weekly Coordinator Sync">Weekly Coordinator Sync</option>
                <option value="Zone Level Discussion">Zone Level Discussion</option>
                <option value="Project Pre-Production Meeting">Project Pre-Production Meeting</option>
                <option value="General Body Meeting">General Body Meeting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Venue / Platform</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Media Lab 304 or Google Meet"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
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
              className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold"
            >
              Commit Meeting Schedule →
            </button>
          </div>
        </form>
      )}

      {/* Meetings List */}
      <div className="space-y-6">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-6 shadow-xl"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[10px] font-bold uppercase">
                  {meeting.type}
                </span>
                <h4 className="text-xl font-heading font-bold text-white mt-1.5">
                  {meeting.title}
                </h4>
              </div>

              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span>{meeting.date}</span>
                <span>•</span>
                <span>{meeting.time}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{meeting.venue}</span>
              </div>
            </div>

            {/* 5-10-10-10-5 Structured Breakdown */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                Standard 40-Minute Timeboxed Agenda Breakdown:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {meeting.agendaBreakdown.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold block">{item.timeWindow}</span>
                    <p className="text-xs font-bold text-white">{item.topic}</p>
                    <p className="text-[10px] text-zinc-400">Lead: {item.owner}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items Table (Who Will Do What By When) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-red-400">
                  ⚡ Who Will Do What By When? (Mandatory Accountability Table)
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Click to convert into live system task
                </span>
              </div>

              <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="p-3">Who (Responsible)</th>
                      <th className="p-3">What (Concrete Deliverable)</th>
                      <th className="p-3">By When (Hard Deadline)</th>
                      <th className="p-3 text-right">System Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {meeting.actionItems.map((act) => (
                      <tr key={act.id} className="hover:bg-zinc-900/40">
                        <td className="p-3 text-white font-bold">{act.who}</td>
                        <td className="p-3 text-zinc-300">{act.what}</td>
                        <td className="p-3 text-amber-400 font-bold">{act.byWhen}</td>
                        <td className="p-3 text-right">
                          {act.isConvertedToTask ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Live in Tasks Queue</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => convertActionItemToTask(meeting.id, act.id)}
                              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-mono font-bold shadow-sm"
                            >
                              Convert to Task →
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ))}
      </div>

      <MeetingSopModal
        isOpen={isSopOpen}
        onClose={() => setIsSopOpen(false)}
      />

    </div>
  );
};
