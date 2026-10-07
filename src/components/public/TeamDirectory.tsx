import React, { useState } from 'react';
import { User, ZoneId, UserRole } from '../../types';
import { Users, Search, Shield, Film, UserCheck, Sparkles, CheckCircle2, Award, Mail, Phone } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
  onOpenJoinWizard: () => void;
}

export const TeamDirectory: React.FC<Props> = ({ users, onSelectUser, onOpenJoinWizard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.primarySkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.section.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesZone = selectedZone === 'all' || u.primaryZone === selectedZone || u.secondaryZone === selectedZone;
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;

    return matchesSearch && matchesZone && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'faculty_coordinator':
        return { label: 'Faculty Coordinator', bg: 'bg-purple-950/80 text-purple-300 border-purple-800' };
      case 'overall_coordinator':
        return { label: 'Overall Coordinator', bg: 'bg-red-950/80 text-red-300 border-red-800' };
      case 'zone_coordinator':
        return { label: 'Zone Coordinator', bg: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'sub_coordinator':
        return { label: 'Sub-Coordinator', bg: 'bg-blue-950/80 text-blue-300 border-blue-800' };
      default:
        return { label: 'Club Member', bg: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          TALENT & CREATIVE MINDS
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
          Club Members & Leadership
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
          Meet the directors, cinematographers, video editors, scriptwriters, graphic artists, and event organizers behind every production.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 p-4 rounded-2xl bg-[#111116] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, skill, or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Zones' },
            { id: 'zone-movie', label: '01. Movie' },
            { id: 'zone-shortfilm', label: '02. Short Film' },
            { id: 'zone-reels', label: '03. Reels' },
            { id: 'zone-social', label: '04. Social' },
            { id: 'zone-events', label: '05. Events' }
          ].map((z) => (
            <button
              key={z.id}
              onClick={() => {
                sfx.playSubtleChime();
                setSelectedZone(z.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedZone === z.id
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>

      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => {
          const badge = getRoleBadge(user.role);

          return (
            <div
              key={user.id}
              onClick={() => {
                sfx.playSubtleChime();
                onSelectUser(user);
              }}
              className="group p-5 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-zinc-600 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Top Row: Avatar and Role */}
                <div className="flex items-start gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-red-500 transition-colors shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <h3 className="font-heading font-black text-sm text-white mt-1 group-hover:text-red-400 transition-colors truncate">
                      {user.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {user.section} • Reg: {user.registrationNumber}
                    </p>
                  </div>
                </div>

                {/* Bio / Skill */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-zinc-300 font-medium leading-tight">
                    {user.primarySkill}
                  </p>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                    {user.bio}
                  </p>
                </div>

                {/* Secondary Skills Chips */}
                {user.secondarySkills && user.secondarySkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {user.secondarySkills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Task Metrics */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <strong>{user.tasksCompleted} Tasks Done</strong>
                </span>
                <span className="text-zinc-500">
                  Joined {user.joinDate.slice(0, 7)}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
