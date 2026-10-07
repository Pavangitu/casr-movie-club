import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Film, Clapperboard, Calendar, Users, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Project, Task, Reel, ClubEvent, User, Zone } from '../../types';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  tasks: Task[];
  reels: Reel[];
  events: ClubEvent[];
  users: User[];
  zones: Zone[];
  onSelectProject: (p: Project) => void;
  onSelectEvent: (e: ClubEvent) => void;
  onSelectZone: (zoneId: string) => void;
  onSelectUser: (u: User) => void;
  onOpenDashboardTab?: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  projects,
  tasks,
  reels,
  events,
  users,
  zones,
  onSelectProject,
  onSelectEvent,
  onSelectZone,
  onSelectUser,
  onOpenDashboardTab
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'projects' | 'tasks' | 'reels' | 'events' | 'team'>('all');

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled externally
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { projects: [], tasks: [], reels: [], events: [], users: [] };
    const q = query.toLowerCase();

    return {
      projects: (filterType === 'all' || filterType === 'projects')
        ? projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.director.toLowerCase().includes(q))
        : [],
      tasks: (filterType === 'all' || filterType === 'tasks')
        ? tasks.filter(t => t.title.toLowerCase().includes(q) || t.assignedToName.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
        : [],
      reels: (filterType === 'all' || filterType === 'reels')
        ? reels.filter(r => r.concept.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.editorName.toLowerCase().includes(q))
        : [],
      events: (filterType === 'all' || filterType === 'events')
        ? events.filter(e => e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.concept.toLowerCase().includes(q))
        : [],
      users: (filterType === 'all' || filterType === 'team')
        ? users.filter(u => u.name.toLowerCase().includes(q) || u.primarySkill.toLowerCase().includes(q) || u.section.toLowerCase().includes(q))
        : []
    };
  }, [query, filterType, projects, tasks, reels, events, users]);

  if (!isOpen) return null;

  const totalResultsCount = 
    filteredResults.projects.length +
    filteredResults.tasks.length +
    filteredResults.reels.length +
    filteredResults.events.length +
    filteredResults.users.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#111116] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/60">
          <Search className="w-5 h-5 text-red-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, tasks, reels, events, team members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-zinc-950/70 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          {(['all', 'projects', 'tasks', 'reels', 'events', 'team'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                sfx.playSubtleChime();
                setFilterType(type);
              }}
              className={`px-3 py-1 rounded-full capitalize text-[11px] font-medium transition-all ${
                filterType === type
                  ? 'bg-red-600 text-white font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-zinc-500">
              <Film className="w-8 h-8 mx-auto mb-2 opacity-40 text-red-500" />
              <p className="text-sm font-medium">Type to search anything in CaSR Movie Club</p>
              <p className="text-xs text-zinc-600 mt-1">Try "The Silent Echo", "CineAura", "Sagar", "DaVinci", "Reel"</p>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <p className="text-sm">No results found matching "{query}"</p>
              <p className="text-xs text-zinc-600 mt-1">Try another keyword or change the filter tab.</p>
            </div>
          ) : (
            <>
              {/* Projects */}
              {filteredResults.projects.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5" /> Projects ({filteredResults.projects.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredResults.projects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          sfx.playClapper();
                          onSelectProject(p);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-red-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-200 group-hover:text-red-300">{p.title}</p>
                          <p className="text-[11px] text-zinc-500">Stage: {p.currentStage} • Dir: {p.director}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {filteredResults.tasks.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tasks ({filteredResults.tasks.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredResults.tasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          sfx.playSubtleChime();
                          if (onOpenDashboardTab) onOpenDashboardTab('tasks');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-200">{t.title}</p>
                          <p className="text-[11px] text-zinc-500">Assigned to: {t.assignedToName} • Deadline: {t.deadline}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                          t.status === 'completed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredResults.events.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Events ({filteredResults.events.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredResults.events.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          sfx.playClapper();
                          onSelectEvent(e);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-200 group-hover:text-emerald-300">{e.name}</p>
                          <p className="text-[11px] text-zinc-500">{e.date} • {e.venue}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {filteredResults.users.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Team Members ({filteredResults.users.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredResults.users.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          sfx.playSubtleChime();
                          onSelectUser(u);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-purple-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                          <div>
                            <p className="text-xs font-semibold text-zinc-200 group-hover:text-purple-300">{u.name}</p>
                            <p className="text-[11px] text-zinc-500">{u.role.replace('_', ' ')} • {u.primarySkill}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Press ESC to close</span>
          <span>CaSR Movie Club Search Engine</span>
        </div>
      </div>
    </div>
  );
};
