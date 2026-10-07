import React, { useState } from 'react';
import { X, CheckSquare, Calendar, User, AlertCircle, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { ZoneId, TaskPriority, Task } from '../../types';
import { MOVIE_CLUB_MEMBERS } from '../../data/movieClubMembers';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultZoneId?: ZoneId;
}

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose, defaultZoneId }) => {
  const { zones, users, projects, currentUser, createTask } = useClub();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zoneId, setZoneId] = useState<ZoneId>(defaultZoneId || currentUser.primaryZone || 'zone-movie');
  const [assignedToId, setAssignedToId] = useState(users[0]?.id || MOVIE_CLUB_MEMBERS[0]?.regNo || '');
  const [projectId, setProjectId] = useState('');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<Task['category']>('Shoot');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const isAdmin = currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Find assigned user from app users or official Movie Club student members dataset
    const matchedUser = users.find(u => u.id === assignedToId);
    const matchedMember = MOVIE_CLUB_MEMBERS.find(m => m.regNo === assignedToId);

    const assigneeName = matchedUser?.name || matchedMember?.name || assignedToId;
    const assigneeId = matchedUser?.id || matchedMember?.regNo || assignedToId;

    const project = projects.find(p => p.id === projectId);

    createTask({
      title,
      description,
      zoneId,
      assignedToId: assigneeId,
      assignedToName: assigneeName,
      assignedById: currentUser.id,
      assignedByName: currentUser.name,
      supportingMembers: [],
      deadline,
      priority,
      status: 'not_started',
      category,
      projectId: projectId || undefined,
      projectName: project?.title || undefined,
      remarks: remarks || (isAdmin ? 'Assigned by Admin Authority' : '')
    });

    sfx.playClapper();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0e0e13] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950 via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800/60 flex items-center justify-center shadow-lg shadow-red-950">
              <CheckSquare className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-heading font-black text-white">
                  Allocate New Task
                </h3>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 text-[10px] font-mono font-bold flex items-center gap-1 uppercase">
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    <span>Admin Authority</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Full authority access to assign, schedule & direct production tasks across all zones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Shoot & Direction for CineAura Promotional Teaser Reel"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
                Creative Zone *
              </label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value as ZoneId)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.number} — {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Task['category'])}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="Script">Scriptwriting & Storyboard</option>
                <option value="Shoot">Cinematography & Shoot</option>
                <option value="Editing">Editing & VFX Post-Production</option>
                <option value="Sound">Sound Design & Scoring</option>
                <option value="Design">Poster & Graphical Design</option>
                <option value="Social">Social Media & Promotion</option>
                <option value="Event">Event Operations & Logistics</option>
                <option value="Management">Executive Management</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold flex items-center justify-between">
                <span>Assignee (Crew / Member) *</span>
                <span className="text-[10px] text-red-400 font-mono">All Members</span>
              </label>
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <optgroup label="Coordinators & Active Crew">
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role.replace('_', ' ')})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Official Movie Club Student Members">
                  {MOVIE_CLUB_MEMBERS.map((m) => (
                    <option key={m.regNo} value={m.regNo}>
                      {m.name} ({m.regNo} - {m.degree})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
                Related Production
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="">None (Independent Task)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
                Completion Deadline *
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
                Priority Level
              </label>
              <div className="flex gap-1.5">
                {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono uppercase font-bold border transition-all ${
                      priority === p
                        ? p === 'high'
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-950/60'
                          : p === 'medium'
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-zinc-700 text-white border-zinc-600'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">
              Instructions & Deliverables
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline specific quality guidelines, file resolution requirements, and Google Drive delivery folder link..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          {isAdmin && (
            <div className="p-3 rounded-2xl bg-red-950/40 border border-red-900/60 text-xs font-mono text-red-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Admin Authority: You are allocating this task with full executive authority override.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono shadow-lg shadow-red-950/70 uppercase tracking-wider"
            >
              Allocate Task →
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
