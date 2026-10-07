import React from 'react';
import { User, UserRole } from '../../types';
import { 
  Clapperboard, Plus, FileText, QrCode, BookOpen, 
  Lightbulb, Bell, Search, Sparkles, Volume2, VolumeX, Shield, ArrowLeft 
} from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  currentUser: User;
  onExitDashboard: () => void;
  onOpenCreateTask: () => void;
  onOpenSubmitReport: () => void;
  onOpenQrAttendance: () => void;
  onOpenSop: () => void;
  onOpenSubmitIdea: () => void;
  onOpenGlobalSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const DashboardHeader: React.FC<Props> = ({
  currentUser,
  onExitDashboard,
  onOpenCreateTask,
  onOpenSubmitReport,
  onOpenQrAttendance,
  onOpenSop,
  onOpenSubmitIdea,
  onOpenGlobalSearch,
  onOpenNotifications,
  unreadNotificationsCount
}) => {
  const [isAudioMuted, setIsAudioMuted] = React.useState(sfx.isMuted());

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'faculty_coordinator': return 'Faculty Coordinator';
      case 'overall_coordinator': return 'Overall Coordinator';
      case 'zone_coordinator': return 'Zone Coordinator';
      case 'sub_coordinator': return 'Sub-Coordinator';
      default: return 'Club Member';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0f]/90 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left branding & return to public */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onExitDashboard();
            }}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Return to Public Club Portal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Public Portal</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/50">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm text-white tracking-wider">
                  CaSR WORKSPACE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-950 text-red-400 border border-red-800/60">
                  {getRoleLabel(currentUser.role)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                Logged in as: <strong className="text-zinc-300">{currentUser.name}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Quick Action: New Task */}
          <button
            onClick={() => {
              sfx.playClapper();
              onOpenCreateTask();
            }}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Assign Task</span>
          </button>

          {/* Quick Action: Submit Weekly Report */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenSubmitReport();
            }}
            className="px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-800 font-bold text-xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Weekly Report</span>
          </button>

          {/* Quick Action: QR Attendance */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenQrAttendance();
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-bold text-xs flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Check-in</span>
          </button>

          {/* SOP Book */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenSop();
            }}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            title="Official SOP & Protocol"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Pitch Idea */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenSubmitIdea();
            }}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800"
            title="Pitch Creative Concept"
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenNotifications();
            }}
            className="relative p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            title="Club Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono font-bold text-[9px] flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Global Search */}
          <button
            onClick={() => {
              sfx.playSubtleChime();
              onOpenGlobalSearch();
            }}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
            title="Search Workspace (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const nextMuted = sfx.toggleMute();
              setIsAudioMuted(nextMuted);
            }}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            title="Toggle Cinematic Audio Effects"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

        </div>

      </div>
    </header>
  );
};
