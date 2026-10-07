import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Film, Users, CheckSquare, Clapperboard, CheckCircle2, 
  ArrowLeft, ArrowRight, UserCheck, Sparkles, ChevronRight 
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { sfx } from '../utils/audio';

export const ZoneDetailPage: React.FC = () => {
  const { zoneId } = useParams<{ zoneId: string }>();
  const { zones, projects, tasks, users } = useClub();
  const navigate = useNavigate();

  const zone = zones.find(z => z.id === zoneId) || zones[0];
  const zoneProjects = projects.filter(p => p.zoneId === zone.id);
  const zoneTasks = tasks.filter(t => t.zoneId === zone.id);
  const zoneMembers = users.filter(u => u.primaryZone === zone.id || u.secondaryZone === zone.id);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={() => {
            sfx.playSubtleChime();
            navigate('/zones');
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Zones</span>
        </button>

        {/* Zone Header Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#0e0e14] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-red-950 text-red-300 border border-red-800/60 font-mono text-xs font-bold">
                  {zone.number}
                </span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  OFFICIAL CREATIVE CELL
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                {zone.name}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                {zone.description}
              </p>

              {/* Leadership stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">ZONE COORDINATOR</p>
                  <p className="text-base font-bold text-white mt-1">{zone.coordinator}</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">SUB-COORDINATOR</p>
                  <p className="text-base font-bold text-white mt-1">{zone.subCoordinator}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/join"
                  onClick={() => sfx.playClapper()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/60"
                >
                  <span>Apply to Join {zone.name} Cell</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
              <img
                src={zone.bannerImage}
                alt={zone.name}
                className="w-full h-72 object-cover"
              />
            </div>

          </div>
        </div>

        {/* Responsibilities & Mandates */}
        <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
          <h3 className="text-xl font-heading font-bold text-white">
            Operational Responsibilities & Mandates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {zone.responsibilities.map((resp, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-300">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Productions in Zone */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-black text-white">
            Active Productions & Film Projects ({zoneProjects.length})
          </h3>

          {zoneProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zoneProjects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl bg-[#0e0e14] border border-zinc-800 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-red-400 font-bold uppercase">
                      Stage: {p.currentStage}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-lg font-heading font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">{p.synopsis}</p>
                    <div className="pt-2 flex justify-between text-[11px] font-mono text-zinc-500">
                      <span>Dir: {p.director}</span>
                      <span>Target: {p.deadline}</span>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <Link
                      to={`/projects/${p.id}`}
                      onClick={() => sfx.playClapper()}
                      className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 border border-zinc-800"
                    >
                      <span>View Film Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center text-xs font-mono text-zinc-400">
              No active major productions logged in this cell. Pitches currently in review.
            </div>
          )}
        </div>

        {/* Zone Member Roster */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-black text-white">
            Assigned Crew & Members ({zoneMembers.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zoneMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800 flex items-center gap-3.5"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{member.name}</p>
                  <p className="text-[10px] font-mono text-red-400">{member.role.replace('_', ' ')}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{member.primarySkill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
