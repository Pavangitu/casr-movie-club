import React, { useState } from 'react';
import { 
  Users, Search, Filter, Shield, Award, Mail, Phone, Lock, 
  GraduationCap, CheckCircle2, Sparkles, Star, Share2, Youtube, Instagram, ExternalLink 
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { UserRole } from '../types';
import { sfx } from '../utils/audio';

export const TeamPage: React.FC = () => {
  const { users, zones, leadership, socialAccounts } = useClub();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  // Sorted leadership members
  const sortedLeadership = [...leadership].sort((a, b) => (a.order || 99) - (b.order || 99));

  // Official primary channels
  const officialYoutube = socialAccounts.find(a => a.platform === 'youtube' && (a.status === 'Primary' || a.id === 'soc-yt-01')) || socialAccounts.find(a => a.platform === 'youtube');
  const officialInstagram = socialAccounts.find(a => a.platform === 'instagram' && (a.status === 'Primary' || a.id === 'soc-ig-01')) || socialAccounts.find(a => a.platform === 'instagram');

  const filtered = users.filter(u => {
    const s = search.toLowerCase();
    const matchesSearch = !s || u.name.toLowerCase().includes(s) || u.primarySkill.toLowerCase().includes(s) || u.section.toLowerCase().includes(s);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesZone = zoneFilter === 'all' || u.primaryZone === zoneFilter;
    return matchesSearch && matchesRole && matchesZone;
  });

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>EXECUTIVE GOVERNANCE & CREW</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Movie Club Leadership & Team
          </h1>
          <p className="text-sm text-zinc-400">
            Meet the faculty advisors, student coordinators, and creators steering cinema, viral reels, branding, and university events.
          </p>
        </div>

        {/* ============================================================== */}
        {/* PROMINENT MAIN LEADERSHIP SECTION */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold block">
                MAIN LEADERSHIP ROSTER
              </span>
              <h2 className="text-2xl font-heading font-black text-white mt-0.5">
                Core Club Coordinators
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Official administration & department leads
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedLeadership.map((leader) => {
              const isPavan = leader.isPermanent || leader.name.toLowerCase().includes('pavan datta');
              const isFaculty = leader.roleType === 'faculty_coordinator' || leader.name.toLowerCase().includes('nihal');
              const isSocial = leader.roleType === 'social_media_coordinator' || leader.name.toLowerCase().includes('subham rout');

              return (
                <div
                  key={leader.id}
                  className={`rounded-3xl p-6 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-2xl ${
                    isPavan
                      ? 'bg-gradient-to-b from-[#1c0f13] via-[#140d12] to-[#0d0d12] border-2 border-red-600/70 shadow-red-950/40'
                      : isFaculty
                      ? 'bg-gradient-to-b from-[#151021] via-[#100d1a] to-[#0d0d12] border border-purple-800/60'
                      : isSocial
                      ? 'bg-gradient-to-b from-[#1b1016] via-[#140d12] to-[#0d0d12] border border-pink-800/60 shadow-pink-950/20'
                      : 'bg-gradient-to-b from-[#1b150e] via-[#13100c] to-[#0d0d12] border border-amber-800/60'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isPavan
                          ? 'bg-red-950 text-red-300 border border-red-700/80'
                          : isFaculty
                          ? 'bg-purple-950 text-purple-300 border border-purple-800/80'
                          : isSocial
                          ? 'bg-pink-950 text-pink-300 border border-pink-800/80'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/80'
                      }`}>
                        {isPavan ? (
                          <>
                            <Lock className="w-3 h-3 text-red-400" />
                            <span>Permanent Overall</span>
                          </>
                        ) : isFaculty ? (
                          <>
                            <GraduationCap className="w-3 h-3 text-purple-400" />
                            <span>Faculty Advisor</span>
                          </>
                        ) : isSocial ? (
                          <>
                            <Share2 className="w-3 h-3 text-pink-400" />
                            <span>Social Media Lead</span>
                          </>
                        ) : (
                          <>
                            <Award className="w-3 h-3 text-amber-400" />
                            <span>Student Coordinator</span>
                          </>
                        )}
                      </span>

                      {isPavan && (
                        <span className="px-2 py-0.5 rounded bg-black/90 border border-red-700 text-[9px] font-mono text-red-400 font-bold uppercase">
                          Protected
                        </span>
                      )}
                    </div>

                    {/* Name & Details */}
                    <div className="pt-1">
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold text-white truncate">
                          {leader.name}
                        </h3>
                        {isPavan && (
                          <span title="Permanent and protected coordinator">
                            <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className={`text-xs font-mono font-bold truncate mt-0.5 ${
                        isPavan ? 'text-red-400' : isFaculty ? 'text-purple-400' : isSocial ? 'text-pink-400' : 'text-amber-400'
                      }`}>
                        {leader.designation}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {leader.department || 'Centurion University'}
                      </p>
                      {leader.registrationNumber && (
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          Reg: {leader.registrationNumber}
                        </p>
                      )}
                    </div>

                    {isSocial && (
                      <div className="p-2.5 rounded-xl bg-pink-950/40 border border-pink-900/50 text-[10px] text-pink-200/90 font-mono leading-relaxed">
                        📱 Responsible for coordinating and managing student social media activities across YouTube & Instagram.
                      </div>
                    )}

                    {/* Bio */}
                    {leader.bio && (
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {leader.bio}
                      </p>
                    )}
                  </div>

                  {/* Contact info footer */}
                  <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
                    {leader.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <a href={`mailto:${leader.email}`} className="truncate hover:text-white transition-colors">
                          {leader.email}
                        </a>
                      </div>
                    )}
                    {leader.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="text-zinc-300">{leader.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* OFFICIAL SOCIAL MEDIA ACCOUNTS HIGHLIGHT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#0e0e14] to-pink-950/40 border border-red-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Share2 className="w-3 h-3 text-red-400" />
                  <span>OFFICIAL DIGITAL CHANNELS</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                  Official Social Media Accounts
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  Coordinated by <strong className="text-pink-300">Subham Rout</strong> (Student Social Media Coordinator). Follow and subscribe for official premiere drops, student film screenings, and behind-the-scenes carousels.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={officialYoutube?.url || 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-red-950/60 transition-all hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                  <span>FRAMES ERA CASR CUTM PKD – YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={officialInstagram?.url || 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-pink-950/60 transition-all hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                  <span>CUTM Frame Era Vibes – Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* GENERAL CREW & ZONE DIRECTORY */}
        {/* ============================================================== */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                ZONE MEMBERS & TALENT POOL
              </span>
              <h2 className="text-2xl font-heading font-black text-white mt-0.5">
                Cast & Crew Directory
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Showing {filtered.length} club members
            </p>
          </div>

          {/* Filter Controls */}
          <div className="p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, section..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="faculty_coordinator">Faculty Advisor</option>
              <option value="overall_coordinator">Overall Coordinator</option>
              <option value="zone_coordinator">Zone Coordinator</option>
              <option value="sub_coordinator">Sub-Coordinator</option>
              <option value="member">Club Member</option>
            </select>

            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
            >
              <option value="all">All Zones</option>
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl bg-[#0e0e14] border border-zinc-800 hover:border-red-500/40 p-6 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl group"
            >
              <div className="space-y-3 text-center flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-red-500 transition-colors shadow-md"
                  />
                  <span className="absolute -bottom-2 px-2 py-0.5 rounded bg-black/90 border border-zinc-700 text-[10px] font-mono text-zinc-300">
                    {user.section}
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-xs font-mono text-red-400 uppercase font-bold mt-0.5">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>

                <div className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  {user.primarySkill}
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{user.primaryZone.replace('zone-', 'Zone ')}</span>
                <span className="text-emerald-400">{user.tasksCompleted} Tasks Done</span>
              </div>
            </div>
          ))}
        </div>
        </section>

      </div>
    </div>
  );
};
