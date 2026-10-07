import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Filter, LayoutList, Columns, 
  Calendar as CalendarIcon, CheckCircle2, Clock, AlertTriangle, Trash2, ShieldCheck 
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { TaskStatus, TaskPriority, ZoneId, Task } from '../../../types';
import { CreateTaskModal } from '../../../components/modals/CreateTaskModal';
import { sfx } from '../../../utils/audio';

export const TasksView: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask, zones, currentUser } = useClub();
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('kanban');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isAdmin = currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator';

  const filteredTasks = tasks.filter(t => {
    const zoneMatch = selectedZone === 'all' || t.zoneId === selectedZone;
    const prioMatch = selectedPriority === 'all' || t.priority === selectedPriority;
    return zoneMatch && prioMatch;
  });

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'not_started', label: 'Not Started', color: 'border-zinc-700 bg-zinc-900/50' },
    { id: 'in_progress', label: 'In Production', color: 'border-blue-900 bg-blue-950/30' },
    { id: 'review', label: 'Under Review', color: 'border-amber-900 bg-amber-950/30' },
    { id: 'completed', label: 'Completed', color: 'border-emerald-900 bg-emerald-950/30' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Admin Task Management Authority Banner */}
      {isAdmin && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border border-red-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center shadow-lg shadow-red-950 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm font-heading">Admin Task Authority Terminal</span>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase">
                  FULL EXECUTIVE ACCESS
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                You have overall admin authority to assign tasks to all student members, override deadlines, reassign zones, and direct production workflows.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playClapper();
              setIsCreateOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/80 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Allocate New Task</span>
          </button>
        </div>
      )}
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        
        {/* View Switchers */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => { sfx.playSubtleChime(); setViewMode('kanban'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'kanban' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>

          <button
            onClick={() => { sfx.playSubtleChime(); setViewMode('list'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'list' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>List</span>
          </button>

          <button
            onClick={() => { sfx.playSubtleChime(); setViewMode('calendar'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'calendar' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>
        </div>

        {/* Filters and Add */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
          >
            <option value="all">All Zones</option>
            {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsCreateOpen(true);
            }}
            className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>

      </div>

      {/* 1. Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter(t => t.status === col.id || (col.id === 'in_progress' && (t.status === 'delayed' || t.status === 'on_hold')));

            return (
              <div
                key={col.id}
                className={`p-4 rounded-3xl border ${col.color} flex flex-col space-y-3 min-h-[500px]`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-xs font-mono font-bold text-white uppercase">{col.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-zinc-400">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-zinc-600 transition-all space-y-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                          t.priority === 'high' ? 'bg-red-950 text-red-300 border border-red-800' :
                          t.priority === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {t.priority}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-zinc-500">
                            Due {t.deadline}
                          </span>
                          
                          {/* Delete Task Button ONLY for Admin/Coordinators */}
                          {isAdmin && (
                            <button
                              onClick={() => {
                                sfx.playClapper();
                                deleteTask(t.id);
                              }}
                              className="p-1 rounded bg-zinc-900 hover:bg-red-950 text-zinc-500 hover:text-red-400 border border-zinc-800 hover:border-red-800 transition-colors"
                              title="Delete Task (Admin Only)"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-2">
                        {t.title}
                      </h4>

                      <p className="text-[11px] text-zinc-400 line-clamp-2">
                        {t.description}
                      </p>

                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-300 truncate">{t.assignedToName}</span>
                        
                        {/* Quick status transition dropdown */}
                        <select
                          value={t.status}
                          onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                          className="bg-zinc-900 text-red-400 font-bold border border-zinc-700 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. List View */}
      {viewMode === 'list' && (
        <div className="rounded-3xl bg-[#0e0e14] border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="p-4">Status</th>
                  <th className="p-4">Task Name & Details</th>
                  <th className="p-4">Zone & Category</th>
                  <th className="p-4">Assignee</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Priority</th>
                  {isAdmin && <th className="p-4 text-right">Delete Task</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4">
                      <button
                        onClick={() => updateTaskStatus(t.id, t.status === 'completed' ? 'in_progress' : 'completed')}
                        className={`w-5 h-5 rounded flex items-center justify-center border ${
                          t.status === 'completed'
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-zinc-700 text-transparent hover:border-red-500'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="p-4 font-body">
                      <p className={`font-bold text-sm ${t.status === 'completed' ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {t.title}
                      </p>
                      <p className="text-xs text-zinc-400 font-mono line-clamp-1">{t.description}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {t.category}
                      </span>
                    </td>
                    <td className="p-4 text-white font-bold">{t.assignedToName}</td>
                    <td className="p-4 text-red-400">{t.deadline}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                        t.priority === 'high' ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            sfx.playClapper();
                            deleteTask(t.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-300 border border-zinc-800 hover:border-red-800 flex items-center gap-1 font-mono text-xs ml-auto transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          <span>Delete</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Calendar View */}
      {viewMode === 'calendar' && (
        <div className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
          <h4 className="text-sm font-mono font-bold uppercase text-red-400">
            Timeline Schedule & SLA Gates
          </h4>
          <div className="space-y-3">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                    {t.deadline}
                  </span>
                  <div>
                    <p className="font-bold text-white font-body text-sm">{t.title}</p>
                    <p className="text-[11px] text-zinc-400">Assigned to {t.assignedToName} • {t.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 uppercase text-[10px]">
                    {t.status.replace('_', ' ')}
                  </span>
                  
                  {isAdmin && (
                    <button
                      onClick={() => {
                        sfx.playClapper();
                        deleteTask(t.id);
                      }}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-800 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </div>
  );
};
