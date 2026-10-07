import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Film, Play, ArrowLeft, CheckCircle2, Clock, 
  Users, MapPin, DollarSign, Calendar, Clapperboard, 
  FileText, Share2, Sparkles, ChevronRight 
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ProjectStage } from '../types';
import { sfx } from '../utils/audio';

const ALL_STAGES: { stage: ProjectStage; label: string; desc: string }[] = [
  { stage: 'IDEA', label: '1. Idea & Logline', desc: 'Core concept brainstorm & genre selection' },
  { stage: 'DISCUSSION', label: '2. Writers Room', desc: 'Screenplay drafting & character breakdowns' },
  { stage: 'APPROVAL', label: '3. Executive Greenlight', desc: 'Budget & equipment clearance by Coordinators' },
  { stage: 'PRE_PRODUCTION', label: '4. Pre-Production', desc: 'Casting, shot-listing, location scouting' },
  { stage: 'PRODUCTION', label: '5. Principal Photography', desc: 'Multi-cam filming on location' },
  { stage: 'POST_PRODUCTION', label: '6. Post-Production', desc: 'Offline edit, color grading, sound design' },
  { stage: 'REVIEW', label: '7. Rough Cut Review', desc: 'Internal screening & revision notes' },
  { stage: 'FINAL_APPROVAL', label: '8. Final Master Cut', desc: 'ProRes master & audio normalization' },
  { stage: 'RELEASE', label: '9. Official Premiere', desc: 'Auditorium screening & YouTube release' },
];

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, advanceProjectStage, currentUser } = useClub();
  const navigate = useNavigate();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const project = projects.find(p => p.id === projectId) || projects[0];

  const currentStageIndex = ALL_STAGES.findIndex(s => s.stage === project.currentStage);

  const isCoordinatorOrAdmin = currentUser.role === 'overall_coordinator' || 
    currentUser.role === 'faculty_coordinator' || 
    currentUser.role === 'zone_coordinator';

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={() => {
            sfx.playSubtleChime();
            navigate('/projects');
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Productions Catalogue</span>
        </button>

        {/* Project Header Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#0e0e14] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Cover Player */}
            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/50" />
              
              <button
                onClick={() => {
                  sfx.playCinematicBoom();
                  setIsPlayingVideo(true);
                }}
                className="absolute w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600 transition-all hover:scale-110 active:scale-95"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300">
                Format: {project.type}
              </div>
            </div>

            {/* Content & Metadata */}
            <div className="lg:col-span-6 p-8 sm:p-10 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-red-950 text-red-300 border border-red-800/60 font-mono text-xs font-bold">
                    Stage {currentStageIndex + 1} of 9: {project.currentStage}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    ID: #{project.id.slice(0, 8)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
                  {project.title}
                </h1>

                <p className="text-sm font-medium text-red-400 font-mono">
                  "{project.concept}"
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.synopsis}
                </p>
              </div>

              {/* Technical Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Director</span>
                  <span className="text-xs font-bold text-white mt-0.5 block truncate">{project.director}</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Cinematographer</span>
                  <span className="text-xs font-bold text-white mt-0.5 block truncate">{project.cinematographer}</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Target Release</span>
                  <span className="text-xs font-bold text-red-400 font-mono mt-0.5 block">{project.deadline}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 9-Stage Interactive Timeline */}
        <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
                PRODUCTION LIFECYCLE
              </span>
              <h3 className="text-2xl font-heading font-black text-white mt-1">
                9-Stage Production Gate System
              </h3>
            </div>

            {isCoordinatorOrAdmin && currentStageIndex < ALL_STAGES.length - 1 && (
              <button
                onClick={() => {
                  const nextStage = ALL_STAGES[currentStageIndex + 1].stage;
                  advanceProjectStage(project.id, nextStage);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/60 self-start sm:self-auto"
              >
                Advance to Stage: {ALL_STAGES[currentStageIndex + 1].label} →
              </button>
            )}
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {ALL_STAGES.map((s, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={s.stage}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-red-950/80 border-red-500 shadow-lg shadow-red-950/80'
                      : isPast
                      ? 'bg-zinc-950 border-emerald-800/60 text-zinc-300'
                      : 'bg-zinc-950/40 border-zinc-800/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                  </div>
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                    {s.stage.replace('_', ' ')}
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cast, Crew & Location Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
            <h4 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-red-500" /> Cast Members
            </h4>
            <div className="space-y-2">
              {project.cast.map((actor, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex justify-between">
                  <span>{actor}</span>
                  <span className="text-zinc-500">Lead Role</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
            <h4 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-amber-500" /> Crew & Department Heads
            </h4>
            <div className="space-y-2">
              {project.crew.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-amber-400">{c.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
            <h4 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> Location & Budget Specs
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                <span className="text-zinc-500 uppercase text-[10px]">Location:</span>
                <p className="text-white font-bold">{project.location || 'Central Campus Grounds'}</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                <span className="text-zinc-500 uppercase text-[10px]">Allocated Budget:</span>
                <p className="text-emerald-400 font-bold">{project.budget || '₹15,000'}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Video Player Modal */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400">PLAYING: {project.title} [4K ProRes Master]</span>
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="text-zinc-400 hover:text-white font-mono text-xs"
              >
                ✕ Close Player
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-600 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="text-sm font-mono text-white font-bold">
                  Simulated Film Preview — Stage: {project.currentStage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
