import React, { useState } from 'react';
import { ClubApplication, User, ZoneId } from '../../types';
import { UserCheck, CheckCircle2, XCircle, Search, Filter, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  applications: ClubApplication[];
  currentUser: User;
  onApprove: (appId: string) => void;
  onReject: (appId: string) => void;
}

export const ApplicationsManager: React.FC<Props> = ({
  applications,
  currentUser,
  onApprove,
  onReject
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = applications.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.primarySkill.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-black text-white">
            Membership Applications Registry
          </h2>
          <p className="text-xs text-zinc-400">
            Review incoming audition submissions, skillsets, and assign new recruits to zone rosters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
          >
            <option value="all">All Submissions</option>
            <option value="Pending">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Name, Reg, Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading font-black text-lg text-white">
                    {app.fullName}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Reg: <strong className="text-zinc-200">{app.regNumber}</strong> ({app.section})
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                  app.status === 'Accepted'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : app.status === 'Waitlisted'
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {app.status}
                </span>
              </div>

              {/* Zone Preferences & Skills */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-mono">PRIMARY ZONE:</span>
                    <span className="text-red-400 font-bold uppercase font-mono">{app.primaryZone.replace('zone-', '')}</span>
                  </div>
                  {app.secondaryZone && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-mono">SECONDARY ZONE:</span>
                      <span className="text-purple-400 font-mono uppercase">{app.secondaryZone.replace('zone-', '')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-mono">PRIMARY SKILL:</span>
                    <span className="text-zinc-200 font-bold">{app.primarySkill}</span>
                  </div>
                </div>

                {app.secondarySkills && app.secondarySkills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {app.secondarySkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {app.experience && (
                  <p className="text-zinc-300 text-xs bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/50 mt-2">
                    "{app.experience}"
                  </p>
                )}

                {/* Portfolio link */}
                {app.portfolioLink && (
                  <a
                    href={app.portfolioLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-mono"
                  >
                    <span>View Submitted Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-[11px] font-mono text-zinc-500">
                Applied: {app.submittedAt}
              </div>

              {app.status === 'Pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sfx.playSubtleChime();
                      onReject(app.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                  >
                    Decline
                  </button>

                  <button
                    onClick={() => {
                      sfx.playClapper();
                      onApprove(app.id);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-950/40"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Recruit</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
