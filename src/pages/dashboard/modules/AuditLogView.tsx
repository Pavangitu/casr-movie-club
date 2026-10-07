import React, { useState } from 'react';
import { Shield, Bell, CheckCircle2, Trash2, Filter, Sparkles, Activity } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { sfx } from '../../../utils/audio';

export const AuditLogView: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications } = useClub();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => filter === 'all' || !n.isRead);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            <span>Real-time Studio Activity & Audit Stream</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Timestamped operational events across all 5 production cells</p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => { sfx.playSubtleChime(); setFilter('all'); }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                filter === 'all' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Events ({notifications.length})
            </button>
            <button
              onClick={() => { sfx.playSubtleChime(); setFilter('unread'); }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                filter === 'unread' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Unread
            </button>
          </div>

          <button
            onClick={() => {
              sfx.playClapper();
              clearNotifications();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-700 text-xs font-mono flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Feed</span>
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 font-mono text-xs ${
              item.isRead
                ? 'bg-[#0e0e14]/60 border-zinc-800/60 text-zinc-400'
                : 'bg-[#111116] border-zinc-700 text-zinc-200 shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl border flex-shrink-0 ${
                item.type === 'project' ? 'bg-red-950/80 border-red-800 text-red-400' :
                item.type === 'task' ? 'bg-amber-950/80 border-amber-800 text-amber-400' :
                item.type === 'report' ? 'bg-purple-950/80 border-purple-800 text-purple-400' :
                'bg-blue-950/80 border-blue-800 text-blue-400'
              }`}>
                <Bell className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-body text-sm">{item.title}</span>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
                <p className="text-zinc-400 mt-0.5">{item.message}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{item.timestamp}</p>
              </div>
            </div>

            {!item.isRead && (
              <button
                onClick={() => {
                  sfx.playSubtleChime();
                  markNotificationRead(item.id);
                }}
                className="text-[11px] text-zinc-400 hover:text-white underline flex-shrink-0"
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
