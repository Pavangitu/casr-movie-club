import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, CheckCircle2, XCircle, Shield, Award, UserPlus, Mail, Phone } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { UserRole } from '../../../types';
import { sfx } from '../../../utils/audio';

export const MembersManagementView: React.FC = () => {
  const { users, applications, approveApplication, rejectApplication, zones, currentUser } = useClub();
  const [activeTab, setActiveTab] = useState<'roster' | 'applications'>('roster');
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');

  const filteredUsers = users.filter(u => {
    const s = search.toLowerCase();
    const matchesSearch = !s || u.name.toLowerCase().includes(s) || u.primarySkill.toLowerCase().includes(s);
    const matchesZone = selectedZone === 'all' || u.primaryZone === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            <span>Cast, Crew & Member Management</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Manage inducted crew roster, roles, and review new audition applications</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => { sfx.playSubtleChime(); setActiveTab('roster'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'roster' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Active Roster (0)
          </button>

          <button
            onClick={() => { sfx.playSubtleChime(); setActiveTab('applications'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'applications' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Audition Queue</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black">
              {applications.length}
            </span>
          </button>
        </div>
      </div>

      {/* 1. Active Roster Tab */}
      {activeTab === 'roster' && (
        <div className="p-12 rounded-3xl bg-[#0e0e14] border border-zinc-800 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-lg font-heading font-bold text-white">Active Member Roster Cleared</h4>
            <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
              All mock crew records have been removed. Verified student participants and activity allocations are now managed in the central Participant Management section.
            </p>
          </div>
          <div>
            <Link
              to="/admin/participants"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-red-950/60"
            >
              <Users className="w-4 h-4" />
              <span>Go to Participant Management</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. Audition Applications Queue Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-mono font-bold uppercase">
                          Audition Application #{app.id.slice(0, 6)}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">Target Cell: {app.primaryZone.replace('zone-', '')}</span>
                      </div>
                      <h4 className="text-xl font-heading font-bold text-white mt-1">{app.fullName}</h4>
                      <p className="text-xs font-mono text-zinc-400">{app.regNumber} • {app.section} • {app.email} • {app.phone}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          sfx.playSubtleChime();
                          rejectApplication(app.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs border border-zinc-700 flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span>Decline</span>
                      </button>

                      <button
                        onClick={() => {
                          sfx.playCinematicBoom();
                          approveApplication(app.id);
                        }}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Induct Member</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[10px]">Primary Expertise:</span>
                      <p className="text-white font-bold">{app.primarySkill}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[10px]">Secondary Skills:</span>
                      <p className="text-zinc-300">{app.secondarySkills.join(', ') || 'None'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[10px]">Learning Interests:</span>
                      <p className="text-zinc-300">{app.learningInterests.join(', ') || 'General'}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1">
                    <span className="text-zinc-500 uppercase text-[10px]">Experience Statement:</span>
                    <p className="text-zinc-300 leading-relaxed">{app.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-[#0e0e14] border border-zinc-800 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-heading font-bold text-white">Audition Queue is Clean</h4>
              <p className="text-xs font-mono text-zinc-400">All pending applicant dossiers have been processed.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
