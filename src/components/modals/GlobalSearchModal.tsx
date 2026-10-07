import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, CheckSquare, Calendar, Video, FileText, User, X, ArrowRight, Sparkles } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, projects, tasks, events, reels, users, zones } = useClub();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProjects = projects.filter(p => !q || p.title.toLowerCase().includes(q) || p.synopsis.toLowerCase().includes(q) || p.director.toLowerCase().includes(q)).slice(0, 3);
  const matchedTasks = tasks.filter(t => !q || t.title.toLowerCase().includes(q) || t.assignedToName.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)).slice(0, 3);
  const matchedEvents = events.filter(e => !q || e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)).slice(0, 2);
  const matchedReels = reels.filter(r => !q || r.code.toLowerCase().includes(q) || r.concept.toLowerCase().includes(q)).slice(0, 2);
  const matchedUsers = users.filter(u => !q || u.name.toLowerCase().includes(q) || u.primarySkill.toLowerCase().includes(q)).slice(0, 3);
  const matchedZones = zones.filter(z => !q || z.name.toLowerCase().includes(q) || z.number.toLowerCase().includes(q)).slice(0, 2);

  const handleSelect = (url: string) => {
    sfx.playClapper();
    setIsSearchOpen(false);
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#101015] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950/60">
          <Search className="w-5 h-5 text-red-500 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, reels, events, members, zones..."
            autoFocus
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          
          {/* Projects */}
          {matchedProjects.length > 0 && (
            <div>
              <p className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Film className="w-3 h-3" /> Productions & Films
              </p>
              <div className="space-y-1">
                {matchedProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/projects/${p.id}`)}
                    className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-red-500/50 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.coverImage} alt={p.title} className="w-10 h-7 object-cover rounded border border-zinc-700" />
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">{p.title}</p>
                        <p className="text-[10px] font-mono text-zinc-400">Dir: {p.director} • Stage: {p.currentStage}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {matchedTasks.length > 0 && (
            <div>
              <p className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-3 h-3" /> Tasks
              </p>
              <div className="space-y-1">
                {matchedTasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(`/admin/tasks`)}
                    className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{t.title}</p>
                      <p className="text-[10px] font-mono text-zinc-400">Assigned to {t.assignedToName} • Due {t.deadline}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                      t.priority === 'high' ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {matchedEvents.length > 0 && (
            <div>
              <p className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Screenings & Events
              </p>
              <div className="space-y-1">
                {matchedEvents.map(e => (
                  <div
                    key={e.id}
                    onClick={() => handleSelect(`/events/${e.id}`)}
                    className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{e.name}</p>
                      <p className="text-[10px] font-mono text-zinc-400">{e.date} • {e.venue}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reels */}
          {matchedReels.length > 0 && (
            <div>
              <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Video className="w-3 h-3" /> Viral Reels
              </p>
              <div className="space-y-1">
                {matchedReels.map(r => (
                  <div
                    key={r.id}
                    onClick={() => handleSelect(`/admin/reels`)}
                    className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{r.code}: {r.concept}</p>
                      <p className="text-[10px] font-mono text-zinc-400">Editor: {r.editorName} • Status: {r.status}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800/40 text-amber-300 text-[9px] font-mono font-bold">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {matchedUsers.length > 0 && (
            <div>
              <p className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3 h-3" /> Team Directory
              </p>
              <div className="space-y-1">
                {matchedUsers.map(u => (
                  <div
                    key={u.id}
                    onClick={() => handleSelect(`/team`)}
                    className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{u.name}</p>
                        <p className="text-[10px] font-mono text-zinc-400">{u.role.replace('_', ' ')} • {u.primarySkill}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate with mouse or keyboard</span>
          <span className="text-red-400 font-bold">CaSR Search v2.0</span>
        </div>

      </div>
    </div>
  );
};
