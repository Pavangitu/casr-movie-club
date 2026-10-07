import React, { useState } from 'react';
import { Project, ProjectStage, ZoneId, User } from '../../types';
import { Film, Clapperboard, Plus, ArrowRight, CheckCircle2, Clock, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  projects: Project[];
  currentUser: User;
  onSelectProject: (p: Project) => void;
  onAdvanceStage: (projectId: string, nextStage: ProjectStage) => void;
  onAddNewProject: (project: Project) => void;
}

const ALL_STAGES: { key: ProjectStage; label: string }[] = [
  { key: 'IDEA', label: 'Idea' },
  { key: 'DISCUSSION', label: 'Discussion' },
  { key: 'APPROVAL', label: 'Approval' },
  { key: 'PRE_PRODUCTION', label: 'Pre-Prod' },
  { key: 'PRODUCTION', label: 'Production' },
  { key: 'POST_PRODUCTION', label: 'Post-Prod' },
  { key: 'REVIEW', label: 'Review' },
  { key: 'FINAL_APPROVAL', label: 'Final Sign-off' },
  { key: 'RELEASE', label: 'Release' }
];

export const ProjectsManager: React.FC<Props> = ({
  projects,
  currentUser,
  onSelectProject,
  onAdvanceStage,
  onAddNewProject
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Project Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Short Film');
  const [zoneId, setZoneId] = useState<ZoneId>('zone-shortfilm');
  const [synopsis, setSynopsis] = useState('');
  const [director, setDirector] = useState(currentUser.name);
  const [cinematographer, setCinematographer] = useState('Debasish Swain');
  const [editor, setEditor] = useState('Subham Rout (Spyro)');
  const [location, setLocation] = useState('Campus Amphitheatre & Media Lab');
  const [budget, setBudget] = useState('₹10,000');

  const filteredProjects = projects.filter(p => {
    if (selectedZone === 'all') return true;
    return p.zoneId === selectedZone;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      type: type as Project['type'],
      zoneId,
      description: synopsis,
      concept: synopsis,
      synopsis,
      status: 'Active',
      director,
      productionLead: currentUser.name,
      cinematographer,
      editor,
      soundDesigner: 'Pavan Datta Gedila',
      cast: ['Student Cast Members'],
      startDate: new Date().toISOString().slice(0, 10),
      deadline: '2025-04-15',
      currentStage: 'IDEA',
      stageProgress: 10,
      coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      location,
      budget,
      crew: [
        { userId: currentUser.id, name: director, role: 'Director' },
        { userId: 'u-cinematographer', name: cinematographer, role: 'Cinematographer' },
        { userId: 'u-editor', name: editor, role: 'Lead Editor' }
      ]
    };

    onAddNewProject(newProj);
    setShowCreateModal(false);
    setTitle('');
    setSynopsis('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-black text-white">
            Club Production Pipelines
          </h2>
          <p className="text-xs text-zinc-400">
            Standardized 8-stage production lifecycle tracking & stage gating.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Zone Filter */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none"
          >
            <option value="all">All Zones</option>
            <option value="zone-movie">Zone 01: Movie Making</option>
            <option value="zone-shortfilm">Zone 02: Short Film</option>
            <option value="zone-reels">Zone 03: Reels & Viral</option>
            <option value="zone-social">Zone 04: Social & Branding</option>
            <option value="zone-events">Zone 05: Event Management</option>
          </select>

          <button
            onClick={() => {
              sfx.playClapper();
              setShowCreateModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Production</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((p) => {
          const currentStageIndex = ALL_STAGES.findIndex(s => s.key === p.currentStage);

          return (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 hover:border-zinc-700 transition-all space-y-4 shadow-xl"
            >
              {/* Top Row: Title, Type, Stage Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={p.coverImage} alt={p.title} className="w-16 h-12 object-cover rounded-lg border border-zinc-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-heading font-black text-white hover:text-red-400 cursor-pointer" onClick={() => onSelectProject(p)}>
                        {p.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                        {p.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Director: <strong className="text-zinc-200">{p.director}</strong> • Cinematographer: <strong className="text-zinc-200">{p.cinematographer}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">CURRENT STAGE</span>
                    <span className="text-xs font-mono font-bold text-red-400">{p.currentStage.replace('_', ' ')}</span>
                  </div>

                  {currentStageIndex < ALL_STAGES.length - 1 && (
                    <button
                      onClick={() => {
                        sfx.playClapper();
                        onAdvanceStage(p.id, ALL_STAGES[currentStageIndex + 1].key);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm"
                      title="Advance to next production milestone"
                    >
                      <span>Advance ({ALL_STAGES[currentStageIndex + 1].label})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                {p.synopsis}
              </p>

              {/* 8-Stage Progress Tracker Strip */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1 text-center font-mono text-[10px]">
                  {ALL_STAGES.map((stg, idx) => {
                    const isCurrent = idx === currentStageIndex;
                    const isPast = idx < currentStageIndex;

                    return (
                      <div
                        key={stg.key}
                        className={`py-1 px-1 rounded border truncate ${
                          isCurrent
                            ? 'bg-red-600 text-white border-red-500 font-bold'
                            : isPast
                            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                        }`}
                      >
                        {stg.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  {p.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {p.location}</span>}
                  {p.budget && <span className="flex items-center gap-1 text-emerald-400"><DollarSign className="w-3.5 h-3.5" /> Budget: {p.budget}</span>}
                </div>

                <button
                  onClick={() => onSelectProject(p)}
                  className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  View Full Production Dossier <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#111116] border border-zinc-700 rounded-3xl p-6 sm:p-8 space-y-4 my-8">
            <h3 className="text-xl font-heading font-black text-white">Initialize New Production</h3>
            
            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Echoes of Campus"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Production Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  >
                    <option value="Short Film">Short Film (Narrative)</option>
                    <option value="Feature Film">Feature Film</option>
                    <option value="Reel Series">Reel Series</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Documentary">Documentary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Operating Zone</label>
                  <select
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value as ZoneId)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  >
                    <option value="zone-movie">Zone 01: Movie Making</option>
                    <option value="zone-shortfilm">Zone 02: Short Film</option>
                    <option value="zone-reels">Zone 03: Reels & Viral</option>
                    <option value="zone-social">Zone 04: Social & Branding</option>
                    <option value="zone-events">Zone 05: Event Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Story Synopsis *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write the premise, logline, and core visual style..."
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Director</label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Cinematographer</label>
                  <input
                    type="text"
                    value={cinematographer}
                    onChange={(e) => setCinematographer(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Shoot Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Estimated Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
                >
                  Create Production
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
