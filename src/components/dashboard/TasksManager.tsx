import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, ZoneId, User } from '../../types';
import { 
  CheckCircle2, Clock, AlertCircle, Plus, Search, 
  Filter, ArrowRight, UserCheck, Calendar, Sparkles, Check 
} from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  tasks: Task[];
  users: User[];
  currentUser: User;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onOpenCreateTask: () => void;
}

export const TasksManager: React.FC<Props> = ({
  tasks,
  users,
  currentUser,
  onUpdateTaskStatus,
  onOpenCreateTask
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesZone = zoneFilter === 'all' || t.zoneId === zoneFilter;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedToName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.projectName && t.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesZone && matchesSearch;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-950 text-red-300 border-red-800 font-bold';
      case 'medium':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'low':
        return 'bg-blue-950 text-blue-300 border-blue-800';
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', bg: 'bg-emerald-950 text-emerald-400 border-emerald-800' };
      case 'in_progress':
        return { label: 'In Progress', bg: 'bg-amber-950 text-amber-400 border-amber-800' };
      case 'review':
        return { label: 'In Review', bg: 'bg-purple-950 text-purple-400 border-purple-800' };
      case 'not_started':
      default:
        return { label: 'Not Started', bg: 'bg-zinc-800 text-zinc-400 border-zinc-700' };
    }
  };

  const cycleStatus = (task: Task) => {
    sfx.playClapper();
    let nextStatus: TaskStatus = 'not_started';
    if (task.status === 'not_started') nextStatus = 'in_progress';
    else if (task.status === 'in_progress') nextStatus = 'review';
    else if (task.status === 'review') nextStatus = 'completed';
    else if (task.status === 'completed') nextStatus = 'in_progress';

    onUpdateTaskStatus(task.id, nextStatus);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
            ACTION GOVERNANCE ENGINE
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            "Who Will Do What By When?"
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Standard operating task engine powering all 5 production zones.
          </p>
        </div>

        <button
          onClick={() => {
            sfx.playClapper();
            onOpenCreateTask();
          }}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Action Item</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-[#111116] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by task, assignee, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="completed">Completed</option>
          </select>

          {/* Zone Filter */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
          >
            <option value="all">All Zones</option>
            <option value="zone-movie">Zone 01: Movie Making</option>
            <option value="zone-shortfilm">Zone 02: Short Film</option>
            <option value="zone-reels">Zone 03: Reels & Viral</option>
            <option value="zone-social">Zone 04: Social & Branding</option>
            <option value="zone-events">Zone 05: Event Management</option>
          </select>
        </div>

      </div>

      {/* Tasks Table / Card List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-[#111116] rounded-2xl border border-zinc-800 text-zinc-500 text-xs font-mono">
            No action items matching the current filter.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const statusInfo = getStatusBadge(task.status);

            return (
              <div
                key={task.id}
                className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
              >
                {/* Left: Checkmark + Task Info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => cycleStatus(task)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                      task.status === 'completed'
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-zinc-900 border-zinc-700 text-transparent hover:text-zinc-500'
                    }`}
                    title="Click to cycle status: Not Started -> In Progress -> Review -> Completed"
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.category && (
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                          {task.category}
                        </span>
                      )}
                      {task.projectName && (
                        <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-900/50 text-[10px] font-mono text-red-300 font-bold truncate max-w-[200px]">
                          {task.projectName}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm font-bold text-white leading-snug ${task.status === 'completed' ? 'line-through text-zinc-500' : ''}`}>
                      {task.title}
                    </h4>

                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {task.description}
                    </p>

                    {task.supportingMembers && task.supportingMembers.length > 0 && (
                      <p className="text-[11px] font-mono text-zinc-500">
                        Supporting: {task.supportingMembers.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Assignee, Deadline & Status Control */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs font-mono border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800/80 justify-between md:justify-end">
                  
                  {/* Assignee */}
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-zinc-500 uppercase block">WHO (ASSIGNEE)</span>
                    <span className="text-zinc-200 font-bold">{task.assignedToName}</span>
                  </div>

                  {/* Deadline */}
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-zinc-500 uppercase block">BY WHEN</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.deadline}
                    </span>
                  </div>

                  {/* Status button */}
                  <button
                    onClick={() => cycleStatus(task)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all ${statusInfo.bg}`}
                  >
                    {statusInfo.label} ↻
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
