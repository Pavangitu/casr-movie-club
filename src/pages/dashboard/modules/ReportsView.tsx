import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, AlertTriangle, HelpCircle, Calendar, Sparkles, Filter } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { WeeklyReportModal } from '../../../components/modals/WeeklyReportModal';
import { sfx } from '../../../utils/audio';

export const ReportsView: React.FC = () => {
  const { reports, zones } = useClub();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filtered = reports.filter(r => selectedZone === 'all' || r.zoneId === selectedZone);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Weekly Zone Reports & Accountability Audit</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">8-field standardized weekly reporting archive</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
          >
            <option value="all">All Zones</option>
            {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
          </select>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>File 8-Field Weekly Report</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-6 shadow-xl"
          >
            {/* Header of Report */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold">
                    {r.weekNumber}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Zone: {r.zoneId.replace('zone-', '')}</span>
                </div>
                <h4 className="text-xl font-heading font-bold text-white mt-1">
                  Report submitted by {r.submittedByName || r.coordinatorName}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span>Filed: {r.submissionDate || r.dateSubmitted}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold uppercase">
                  {r.status || r.zoneStatus || 'Submitted'}
                </span>
              </div>
            </div>

            {/* 8-Field Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              
              {/* 1. Tasks Completed */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Tasks Completed This Week
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {(r.tasksCompleted || (r.workCompleted ? [r.workCompleted] : [])).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Tasks In Progress */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-blue-400 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                  <Calendar className="w-3.5 h-3.5" /> 2. Ongoing Tasks in Progress
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {(r.tasksInProgress || (r.ongoingWork ? [r.ongoingWork] : [])).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-500">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Delayed Tasks & Bottlenecks */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-red-400 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5" /> 3. Delayed Tasks & Bottlenecks
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {(r.delayedTasks || (r.problems ? [r.problems] : [])).length > 0 ? (
                    (r.delayedTasks || (r.problems ? [r.problems] : [])).map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500">•</span>
                        <span>{t}</span>
                      </li>
                    ))
                  ) : (
                    <span className="text-zinc-500 italic">No delayed tasks logged.</span>
                  )}
                </ul>
              </div>

              {/* 4. Plan for Next Week */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-purple-400 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" /> 4. Execution Plan for Next Week
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {(r.planForNextWeek || (r.upcomingWork ? [r.upcomingWork] : [])).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-500">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Support Needed */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                <span className="text-amber-400 font-bold flex items-center gap-1.5 uppercase text-[10px]">
                  <HelpCircle className="w-3.5 h-3.5" /> 5. Escalation / Support Required
                </span>
                <p className="text-zinc-300">{r.supportNeeded || r.supportRequired || 'All equipment and approvals on track.'}</p>
              </div>

              {/* 6. Attendance & Contributions */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">
                  6. Attendance & Active Members
                </span>
                <p className="text-zinc-300">{r.attendanceSummary || r.membersFollowUp}</p>
              </div>

            </div>

            {/* 7 & 8. Star Performer & Key Highlight */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-bold">⭐ 7. Star Contributor of the Week:</span>
                <p className="text-white font-bold">{r.starContributor || 'Zone Team'}</p>
              </div>

              <div className="space-y-1 text-right sm:text-right">
                <span className="text-[10px] text-purple-400 uppercase font-bold">🎬 8. Key Milestone / Output:</span>
                <p className="text-white font-bold">{r.keyHighlight || 'On Schedule'}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      <WeeklyReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
