import React from 'react';
import { User, UserRole } from '../../types';
import { ShieldCheck, UserCheck, Film, Users, Sparkles, ChevronDown } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  currentUser: User;
  allUsers: User[];
  onSelectUser: (user: User) => void;
  isDashboardOpen: boolean;
  onToggleDashboard: () => void;
}

export const RoleSwitcherBanner: React.FC<Props> = ({
  currentUser,
  allUsers,
  onSelectUser,
  isDashboardOpen,
  onToggleDashboard
}) => {
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'faculty_coordinator':
        return { label: 'Faculty Mentor', bg: 'bg-purple-950/80 text-purple-300 border-purple-800/60', icon: ShieldCheck };
      case 'overall_coordinator':
        return { label: 'Overall Coordinator (Admin)', bg: 'bg-red-950/80 text-red-300 border-red-800/60', icon: ShieldCheck };
      case 'zone_coordinator':
        return { label: 'Zone Coordinator', bg: 'bg-amber-950/80 text-amber-300 border-amber-800/60', icon: Film };
      case 'sub_coordinator':
        return { label: 'Sub-Coordinator', bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60', icon: UserCheck };
      default:
        return { label: 'Club Member', bg: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60', icon: Users };
    }
  };

  const badge = getRoleBadge(currentUser.role);
  const IconComponent = badge.icon;

  // Key demo personas
  const demoPersonas = [
    { id: 'user-pavan', label: 'Overall Student Coord (G. Pavan Datta)' },
    { id: 'user-sagar', label: 'Short Film Coord (Sagar)' },
    { id: 'user-spyro', label: 'Reels Coord (Spyro)' },
    { id: 'user-kruti', label: 'Student Coord / Social (Kruti)' },
    { id: 'user-chinmayee', label: 'Events Coord (Chinmayee)' },
    { id: 'user-rohan', label: 'Member / Editor (Rohan)' },
    { id: 'user-faculty', label: 'Faculty Coordinator (Mr. R. Nihal)' }
  ];

  return (
    <aside aria-label="Demo Role Switcher" className="bg-[#121216] border-b border-zinc-800 text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 z-40 relative">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 text-zinc-400 font-mono tracking-wider uppercase text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE SIMULATOR / ROLE:
        </span>

        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${badge.bg}`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span className="font-semibold">{currentUser.name}</span>
          <span className="text-zinc-400">•</span>
          <span>{badge.label}</span>
        </div>

        <div className="relative inline-block">
          <label htmlFor="persona-switcher-select" className="sr-only">Switch active persona</label>
          <select
            id="persona-switcher-select"
            aria-label="Switch active persona"
            value={currentUser.id}
            onChange={(e) => {
              const selected = allUsers.find(u => u.id === e.target.value);
              if (selected) {
                sfx.playSubtleChime();
                onSelectUser(selected);
              }
            }}
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md px-2 py-0.5 text-[11px] cursor-pointer focus:outline-none focus:border-red-500 transition-colors"
          >
            {demoPersonas.map((p) => (
              <option key={p.id} value={p.id}>
                Switch To: {p.label}
              </option>
            ))}
            <option disabled>──────────</option>
            {allUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            sfx.playClapper();
            onToggleDashboard();
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all shadow-sm ${
            isDashboardOpen
              ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-950/50'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>{isDashboardOpen ? 'Exit to Public Portal' : 'Open Production Dashboard'}</span>
        </button>
      </div>
    </aside>
  );
};
