import React from 'react';
import { Project, ProjectStage } from '../../types';
import { X, Clapperboard, Film, User, CheckCircle2, Clock, MapPin, DollarSign, Users, Sparkles, Video, ArrowRight } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onAdvanceStage?: (projectId: string, nextStage: ProjectStage) => void;
  canEdit?: boolean;
}

const ALL_STAGES: { key: ProjectStage; label: string; number: string }[] = [
  { key: 'IDEA', label: 'Idea', number: '01' },
  { key: 'DISCUSSION', label: 'Discussion', number: '02' },
  { key: 'APPROVAL', label: 'Approval', number: '03' },
  { key: 'PRE_PRODUCTION', label: 'Pre-Production', number: '04' },
  { key: 'PRODUCTION', label: 'Production', number: '05' },
  { key: 'POST_PRODUCTION', label: 'Post-Production', number: '06' },
  { key: 'REVIEW', label: 'Review', number: '07' },
  { key: 'FINAL_APPROVAL', label: 'Final Approval', number: '08' },
  { key: 'RELEASE', label: 'Release', number: '09' }
];

export const ProjectDetailModal: React.FC<Props> = ({
  project,
  isOpen,
  onClose,
  onAdvanceStage,
  canEdit = false
}) => {
  if (!isOpen || !project) return null;

  const currentStageIndex = ALL_STAGES.findIndex(s => s.key === project.currentStage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-[#111116] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with cover */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-md bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider">
                {project.type}
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mt-2">
                {project.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-zinc-400 block">PIPELINE COMPLETION</span>
              <span className="text-2xl font-mono font-black text-red-400">{project.stageProgress}%</span>
            </div>
          </div>
        </div>

        {/* 8-Stage Interactive Workflow Stepper */}
        <div className="p-6 bg-zinc-950/90 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              Standard 8-Stage Film Pipeline
            </h4>
            <span className="text-xs font-mono text-red-400 font-bold">
              Current: {project.currentStage.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 pt-2">
            {ALL_STAGES.map((stg, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isFuture = idx > currentStageIndex;

              return (
                <div
                  key={stg.key}
                  className={`p-2 rounded-lg text-center border transition-all ${
                    isCurrent
                      ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-950/40 ring-1 ring-red-500'
                      : isPast
                      ? 'bg-zinc-900/80 border-emerald-500/40 text-emerald-400'
                      : 'bg-zinc-900/30 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <p className="text-[9px] font-mono font-bold">{stg.number}</p>
                  <p className="text-[10px] font-bold truncate mt-0.5">{stg.label}</p>
                </div>
              );
            })}
          </div>

          {canEdit && onAdvanceStage && currentStageIndex < ALL_STAGES.length - 1 && (
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-end">
              <button
                onClick={() => {
                  sfx.playClapper();
                  onAdvanceStage(project.id, ALL_STAGES[currentStageIndex + 1].key);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Advance to Next Stage ({ALL_STAGES[currentStageIndex + 1].label})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
          
          {/* Synopsis & Concept */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              STORY SYNOPSIS
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              {project.synopsis}
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">DIRECTOR</span>
              <span className="text-xs font-bold text-white mt-1 block">{project.director}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">CINEMATOGRAPHER</span>
              <span className="text-xs font-bold text-white mt-1 block">{project.cinematographer}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">LEAD EDITOR</span>
              <span className="text-xs font-bold text-white mt-1 block">{project.editor}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">PRODUCTION LEAD</span>
              <span className="text-xs font-bold text-white mt-1 block">{project.productionLead}</span>
            </div>
          </div>

          {/* Location & Budget Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.location && (
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">SHOOT LOCATION</p>
                  <p className="text-xs text-zinc-200 font-medium">{project.location}</p>
                </div>
              </div>
            )}

            {project.budget && (
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">ESTIMATED PRODUCTION BUDGET</p>
                  <p className="text-xs text-emerald-300 font-bold">{project.budget}</p>
                </div>
              </div>
            )}
          </div>

          {/* Cast & Crew Matrix */}
          {project.crew && project.crew.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                ACTIVE CREW ROSTER
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.crew.map((member, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-200">{member.name}</span>
                    <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 rounded bg-red-950/80">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">CaSR Movie Club Production Matrix</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
