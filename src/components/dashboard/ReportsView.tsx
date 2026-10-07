import React, { useState } from 'react';
import { ZoneReport, ZoneId, User } from '../../types';
import { FileText, Plus, CheckCircle2, AlertTriangle, Clock, Calendar, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  reports: ZoneReport[];
  currentUser: User;
  onOpenSubmitReport: () => void;
}

export const ReportsView: React.FC<Props> = ({
  reports,
  currentUser,
  onOpenSubmitReport
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [expandedReportId, setExpandedReportId] = useState<string | null>(reports[0]?.id || null);

  const filteredReports = reports.filter(r => {
    if (selectedZone === 'all') return true;
    return r.zoneId === selectedZone;
  });

  const getStatusBadge = (status: ZoneReport['zoneStatus']) => {
    switch (status) {
      case 'good':
        return { label: '🟢 Good / On Track', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' };
      case 'needs_attention':
        return { label: '🟡 Needs Attention', bg: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'delayed':
        return { label: '🔴 Delayed', bg: 'bg-red-950/80 text-red-300 border-red-800' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-black text-white">
            Weekly Zone Reports Archive
          </h2>
          <p className="text-xs text-zinc-400">
            Standardized 8-field accountability reports submitted by Zone Coordinators each Saturday.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
          >
            <option value="all">All Zones</option>
            <option value="zone-movie">Zone 01: Movie Making</option>
            <option value="zone-shortfilm">Zone 02: Short Film</option>
            <option value="zone-reels">Zone 03: Reels & Viral</option>
            <option value="zone-social">Zone 04: Social Media</option>
            <option value="zone-events">Zone 05: Event Management</option>
          </select>

          <button
            onClick={() => {
              sfx.playClapper();
              onOpenSubmitReport();
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-950/50"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Zone Report</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const isExpanded = expandedReportId === report.id;
          const statusBadge = getStatusBadge(report.zoneStatus);

          return (
            <div
              key={report.id}
              className="rounded-2xl bg-[#111116] border border-zinc-800 overflow-hidden transition-all shadow-xl"
            >
              {/* Card Header Accordion Trigger */}
              <div
                onClick={() => {
                  sfx.playSubtleChime();
                  setExpandedReportId(isExpanded ? null : report.id);
                }}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
                    {report.weekNumber.slice(0, 7)}
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base">
                      {report.zoneName}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Coordinator: <strong className="text-zinc-200">{report.coordinatorName}</strong> • Submitted: {report.dateSubmitted}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${statusBadge.bg}`}>
                    {statusBadge.label}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                </div>
              </div>

              {/* Card Body - 8 Standardized Fields */}
              {isExpanded && (
                <div className="p-6 border-t border-zinc-800 bg-zinc-950/60 space-y-5 text-xs">
                  
                  {/* Field 1: Work Completed */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                      1. WORK COMPLETED THIS WEEK
                    </span>
                    <p className="text-zinc-200 leading-relaxed font-medium">
                      {report.workCompleted}
                    </p>
                  </div>

                  {/* Field 2 & 3: Ongoing & Upcoming */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        2. ONGOING WORK (CURRENT PIPELINE)
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        {report.ongoingWork}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                        3. UPCOMING WORK (NEXT SPRINT)
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        {report.upcomingWork}
                      </p>
                    </div>
                  </div>

                  {/* Field 4: Active Projects */}
                  {report.activeProjects && report.activeProjects.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                        4. ACTIVE PROJECTS LINKED
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {report.activeProjects.map((p, i) => (
                          <span key={i} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono">
                            🎬 {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Field 5: Members Follow-up */}
                  {report.membersFollowUp && (
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                        5. MEMBERS FOLLOW-UP & RECOGNITION
                      </span>
                      <p className="text-zinc-300">
                        {report.membersFollowUp}
                      </p>
                    </div>
                  )}

                  {/* Field 6 & 7: Problems & Support */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                        6. PROBLEMS / BOTTLENECKS
                      </span>
                      <p className="text-zinc-300">
                        {report.problems || 'None reported.'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                        7. SUPPORT REQUIRED FROM EXECUTIVE
                      </span>
                      <p className="text-zinc-300">
                        {report.supportRequired || 'Standard operations.'}
                      </p>
                    </div>
                  </div>

                  {/* Field 8: Remarks */}
                  {report.remarks && (
                    <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 italic">
                      Remarks: {report.remarks}
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
