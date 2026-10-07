import React, { useState } from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { ZoneId, ZoneReport } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultZoneId?: ZoneId;
}

export const WeeklyReportModal: React.FC<Props> = ({ isOpen, onClose, defaultZoneId }) => {
  const { zones, currentUser, submitWeeklyReport } = useClub();

  const [weekNumber, setWeekNumber] = useState(`Week ${Math.ceil(new Date().getDate() / 7)} - ${new Date().toLocaleString('default', { month: 'short' })}`);
  const [zoneId, setZoneId] = useState<ZoneId>(defaultZoneId || currentUser.primaryZone);
  const [workCompleted, setWorkCompleted] = useState('');
  const [ongoingWork, setOngoingWork] = useState('');
  const [upcomingWork, setUpcomingWork] = useState('');
  const [membersFollowUp, setMembersFollowUp] = useState('');
  const [problems, setProblems] = useState('');
  const [supportRequired, setSupportRequired] = useState('');
  const [zoneStatus, setZoneStatus] = useState<ZoneReport['zoneStatus']>('good');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zone = zones.find(z => z.id === zoneId);

    submitWeeklyReport({
      weekNumber,
      zoneId,
      zoneName: zone ? zone.name : 'Creative Zone',
      coordinatorName: currentUser.name,
      workCompleted: workCompleted || 'Production tasks executed per schedule.',
      ongoingWork: ongoingWork || 'Editing cuts and rehearsal scripts ongoing.',
      upcomingWork: upcomingWork || 'Targeting next week campus shoots.',
      activeProjects: ['Short Film Production', 'Weekly Reel Drop'],
      membersFollowUp: membersFollowUp || 'All zone members active and responsive.',
      problems: problems || 'None reported.',
      supportRequired: supportRequired || 'No cross-zone blockers at present.',
      zoneStatus,
      remarks
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0e0e13] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-800/60 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-heading font-black text-white">
                Submit Standardized Weekly Zone Report
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">
                8-Section Accountability & Inter-Zone Support Protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                1. Reporting Week *
              </label>
              <input
                type="text"
                required
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                2. Creative Zone *
              </label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value as ZoneId)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.number} — {z.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              3. Work Completed This Week *
            </label>
            <textarea
              rows={2}
              required
              value={workCompleted}
              onChange={(e) => setWorkCompleted(e.target.value)}
              placeholder="e.g., Completed primary screenplay draft, recorded 3 reels, secured auditorium permission..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              4. Ongoing Work & Active Shoots *
            </label>
            <textarea
              rows={2}
              required
              value={ongoingWork}
              onChange={(e) => setOngoingWork(e.target.value)}
              placeholder="e.g., Video editing of campus spotlight reel, scheduling audio dubbing..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              5. Upcoming Targets For Next Week *
            </label>
            <textarea
              rows={2}
              required
              value={upcomingWork}
              onChange={(e) => setUpcomingWork(e.target.value)}
              placeholder="e.g., Release 2 reels, hold table read for upcoming drama short..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                6. Members Requiring Follow-Up
              </label>
              <input
                type="text"
                value={membersFollowUp}
                onChange={(e) => setMembersFollowUp(e.target.value)}
                placeholder="Names of members needing check-in..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Zone Health Status *
              </label>
              <div className="flex gap-1.5">
                {(['good', 'needs_attention', 'delayed'] as ZoneReport['zoneStatus'][]).map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setZoneStatus(s)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-mono uppercase font-bold border transition-all ${
                      zoneStatus === s
                        ? s === 'good'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                          : s === 'needs_attention'
                          ? 'bg-amber-950 text-amber-300 border-amber-600'
                          : 'bg-red-950 text-red-300 border-red-600'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                7. Problems, Delays & Blockers
              </label>
              <input
                type="text"
                value={problems}
                onChange={(e) => setProblems(e.target.value)}
                placeholder="Equipment issues, studio booking conflicts..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                8. Support Needed From Other Zones
              </label>
              <input
                type="text"
                value={supportRequired}
                onChange={(e) => setSupportRequired(e.target.value)}
                placeholder="Cross-zone actors, graphic designers..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-purple-950/60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Zone Report →</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
