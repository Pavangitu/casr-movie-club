import React from 'react';
import { User, UserRole } from '../../types';
import { X, UserCheck, Shield, Film, Award, CheckCircle2, Mail, Phone, Calendar, Sparkles } from 'lucide-react';

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal: React.FC<Props> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

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

  const badge = getRoleBadge(user.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-lg bg-[#111116] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Banner */}
        <div className="relative h-32 bg-gradient-to-r from-red-950 via-purple-950 to-zinc-900 border-b border-zinc-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar & Header */}
        <div className="px-6 pb-6 pt-0 relative space-y-4">
          <div className="flex items-end justify-between -mt-12">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-[#111116] shadow-2xl"
            />
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-black text-white">{user.name}</h3>
            <p className="text-xs font-mono text-zinc-400">
              Reg: <strong className="text-zinc-200">{user.registrationNumber}</strong> • {user.section}
            </p>
          </div>

          {/* Primary Skill & Bio */}
          <div className="space-y-2">
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold">PRIMARY SPECIALIZATION</span>
              <p className="text-sm font-bold text-white">{user.primarySkill}</p>
            </div>

            {user.bio && (
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60">
                "{user.bio}"
              </p>
            )}
          </div>

          {/* Secondary Skills */}
          {user.secondarySkills && user.secondarySkills.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">ADDITIONAL CREATIVE SKILLS</span>
              <div className="flex flex-wrap gap-1.5">
                {user.secondarySkills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
            {user.email && (
              <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-300 flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>

          {/* Bottom Stats */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {user.tasksCompleted} Tasks Completed
            </span>
            <span className="text-zinc-500">
              Joined {user.joinDate}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
