import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Filter, Sparkles, ChevronRight, Play } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { sfx } from '../utils/audio';

export const ProjectsPage: React.FC = () => {
  const { projects, zones } = useClub();
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filtered = projects.filter(p => {
    const formatMatch = selectedFormat === 'all' || p.type === selectedFormat;
    const zoneMatch = selectedZone === 'all' || p.zoneId === selectedZone;
    return formatMatch && zoneMatch;
  });

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            FILM CATALOGUE
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Cinematic Productions
          </h1>
          <p className="text-sm text-zinc-400">
            Browse our original films, short formats, and documentaries through their full 9-stage production lifecycle.
          </p>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-2">FORMAT:</span>
            {['all', 'Short Film', 'Movie', 'Reel Series', 'Social Media Campaign'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => {
                  sfx.playSubtleChime();
                  setSelectedFormat(fmt);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedFormat === fmt
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {fmt === 'all' ? 'All Formats' : fmt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">ZONE:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
            >
              <option value="all">All Creative Zones</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-[#0e0e14] border border-zinc-800/90 overflow-hidden flex flex-col justify-between hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-950/30 group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40" />

                  {/* Stage Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-red-400 font-mono text-[10px] font-bold uppercase">
                    Stage: {project.currentStage}
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-300 font-mono text-[10px]">
                    {project.type}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {project.synopsis}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Production Lifecycle</span>
                      <span className="text-red-400 font-bold">{project.stageProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.stageProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-800/80">
                    <span>Dir: {project.director}</span>
                    <span>Cin: {project.cinematographer}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/projects/${project.id}`}
                  onClick={() => sfx.playClapper()}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-zinc-800 group-hover:border-red-500/40 transition-colors"
                >
                  <span>Open Full Dossier & Credits</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
