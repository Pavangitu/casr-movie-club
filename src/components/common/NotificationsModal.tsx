import React from 'react';
import { Bell, CheckCircle2, Clock, Calendar, Sparkles, X, Trash2 } from 'lucide-react';
import { NotificationItem } from '../../types';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#111116] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] mt-12 sm:mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-500" />
            <h3 className="font-heading font-bold text-sm text-zinc-100">Club Notifications</h3>
            <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-400 text-xs font-mono font-bold">
              {notifications.filter(n => !n.isRead).length} New
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-zinc-950/60 border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <button 
            onClick={() => {
              sfx.playSubtleChime();
              onMarkAllAsRead();
            }}
            className="hover:text-red-400 transition-colors"
          >
            Mark all as read
          </button>
          <button 
            onClick={() => {
              sfx.playSubtleChime();
              onClearNotifications();
            }}
            className="hover:text-zinc-200 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear all
          </button>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto flex-1 space-y-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-zinc-600" />
              <p className="text-sm">No new notifications</p>
              <p className="text-xs text-zinc-600 mt-1">You are all caught up with club tasks and meetings!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  sfx.playSubtleChime();
                  onSelectNotification(n);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  n.isRead 
                    ? 'bg-zinc-900/40 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800/50' 
                    : 'bg-zinc-900/90 border-red-500/30 text-zinc-200 hover:border-red-500/60 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-xs font-bold ${n.isRead ? 'text-zinc-300' : 'text-white'}`}>
                    {n.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-center text-[10px] font-mono text-zinc-500">
          CaSR Movie Club Real-Time Alerts
        </div>
      </div>
    </div>
  );
};
