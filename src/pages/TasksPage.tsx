import React from 'react';
import { TasksView } from './dashboard/modules/TasksView';

export const TasksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            OPERATIONS & TASK ENGINE
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Task Management
          </h1>
          <p className="text-sm text-zinc-400">
            Track, assign, and manage production tasks across all 5 creative zones in real time.
          </p>
        </div>

        {/* Tasks Engine View */}
        <TasksView />

      </div>
    </div>
  );
};
