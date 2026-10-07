import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clapperboard, Plus, ChevronRight, CheckCircle2, 
  ArrowRight, Users, Play, Calendar, DollarSign 
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { ProjectStage } from '../../../types';
import { CreateProjectModal } from '../../../components/modals/CreateProjectModal';
import { sfx } from '../../../utils/audio';

const ALL_STAGES: ProjectStage[] = [
  'IDEA', 'DISCUSSION', 'APPROVAL', 'PRE_PRODUCTION', 
  'PRODUCTION', 'POST_PRODUCTION', 'REVIEW', 'FINAL_APPROVAL', 'RELEASE'
];

export const ProjectsView: React.FC = () => {
  const { projects, advanceProjectStage, zones, currentUser } = useClub();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filtered = projects.filter(p => selectedZone === 'all' || p.zoneId === selectedZone);

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white">Film Productions Pipeline</h3>
          <p className="text-xs font-mono text-zinc-400">9-stage rigorous creative gating system</p>
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
              setIsCreateOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Greenlight New Project</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filtered.map((p) => {
          const currentStageIndex = ALL_STAGES.indexOf(p.currentStage);

          return (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-5 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold">
                        {p.type}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">Zone: {p.zoneId.replace('zone-', '')}</span>
                    </div>
                    <h4 className="text-xl font-heading font-bold text-white mt-1">{p.title}</h4>
                    <p className="text-xs text-zinc-400 font-mono">Dir: {p.director} • Cin: {p.cinematographer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end lg:self-auto">
                  {currentStageIndex < ALL_STAGES.length - 1 && (
                    <button
                      onClick={() => advanceProjectStage(p.id, ALL_STAGES[currentStageIndex + 1])}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-red-400 hover:text-red-300 border border-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Advance to {ALL_STAGES[currentStageIndex + 1].replace('_', ' ')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <Link
                    to={`/projects/${p.id}`}
                    onClick={() => sfx.playClapper()}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold flex items-center gap-1 shadow-md shadow-red-950/50"
                  >
                    <span>Full Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Mini Pipeline Stepper */}
              <div className="pt-2 border-t border-zinc-800/80">
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                  {ALL_STAGES.map((s, idx) => {
                    const isPast = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={s}
                        className={`p-2 rounded-xl border text-center font-mono text-[9px] uppercase font-bold transition-all ${
                          isCurrent
                            ? 'bg-red-950 border-red-500 text-white shadow'
                            : isPast
                            ? 'bg-zinc-950 border-emerald-900/60 text-emerald-400'
                            : 'bg-zinc-950/40 border-zinc-800 text-zinc-600'
                        }`}
                      >
                        <span className="block">{s.replace('_', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </div>
  );
};
