import React, { useState } from 'react';
import { Project, ZoneId } from '../../types';
import { Clapperboard, Film, Play, Users, Clock, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onOpenJoinWizard: () => void;
}

export const ProjectsGallery: React.FC<Props> = ({ projects, onSelectProject, onOpenJoinWizard }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    if (filterType === 'all') return true;
    return p.type.toLowerCase().includes(filterType.toLowerCase());
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'RELEASE': return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'POST_PRODUCTION': return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'PRODUCTION': return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'PRE_PRODUCTION': return 'bg-blue-950 text-blue-300 border-blue-800';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            PORTFOLIO & PRODUCTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Original Cinema & Projects
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            Explore active film productions, festival shorts, viral reel series, and campus campaigns built through our 8-stage creative pipeline.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'short film', label: 'Short Films' },
            { id: 'movie', label: 'Feature Film' },
            { id: 'reel series', label: 'Reel Series' },
            { id: 'event', label: 'Events' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sfx.playSubtleChime();
                setFilterType(tab.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              sfx.playClapper();
              onSelectProject(project);
            }}
            className="group rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-red-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/30 cursor-pointer flex flex-col justify-between transition-all duration-300"
          >
            {/* Image Poster */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent"></div>
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-200 font-mono text-[10px] font-bold uppercase tracking-wider">
                  {project.type}
                </span>
              </div>

              {/* Stage Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${getStageColor(project.currentStage)}`}>
                  {project.currentStage.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-heading font-black text-white group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                  {project.synopsis}
                </p>
              </div>

              {/* Stage Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">PIPELINE COMPLETION</span>
                  <span className="text-red-400 font-bold">{project.stageProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${project.stageProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Key Crew Footnote */}
              <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-1.5 truncate">
                  <Film className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="truncate">Dir: <strong className="text-zinc-300">{project.director}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-red-400 group-hover:translate-x-1 transition-transform font-bold text-[11px] font-mono">
                  <span>DETAILS</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
