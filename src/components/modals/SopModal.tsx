import React from 'react';
import { X, BookOpen, Clock, CheckCircle2, ShieldCheck, Film, Sparkles, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SopModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-[#111116] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">Official Club Constitution & SOP</h3>
              <p className="text-xs text-zinc-400 font-mono">CaSR Movie Club Governance & Meeting Protocol</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SOP Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[65vh] text-xs text-zinc-300">
          
          {/* Core Structure */}
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              1. Five-Zone Autonomous Architecture
            </h4>
            <p className="leading-relaxed text-zinc-400">
              CaSR Movie Club operates through five dedicated creative divisions: Zone 01 (Movie Making), Zone 02 (Short Film), Zone 03 (Reels & Viral), Zone 04 (Social Media & Branding), and Zone 05 (Event Management). Each zone is led by a Zone Coordinator and Sub-Coordinator responsible for task allocation, quality control, and weekly reporting.
            </p>
          </div>

          {/* Weekly Coordination Meeting SOP */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-black text-red-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                2. Weekly Executive Coordination Meeting Protocol (40 Mins)
              </h4>
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">MANDATORY SATURDAY</span>
            </div>
            
            <p className="text-zinc-300">
              The overarching mandate of every weekly meeting is strictly defined: <strong className="text-white">"WHO WILL DO WHAT BY WHEN?"</strong>
            </p>

            <div className="space-y-2 pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <span><strong>Segment 1 (5 Mins):</strong> Announcements & Administrative Directives</span>
                <span className="font-mono text-zinc-400">Faculty & Overall Coord</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <span><strong>Segment 2 (10 Mins):</strong> 5 Zone Reports (Strictly 2 mins per zone)</span>
                <span className="font-mono text-zinc-400">5 Zone Coordinators</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <span><strong>Segment 3 (10 Mins):</strong> Active Projects & Rough Cut Progress</span>
                <span className="font-mono text-zinc-400">Directors & Leads</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <span><strong>Segment 4 (10 Mins):</strong> Task Allocation ("Who will do what by when")</span>
                <span className="font-mono text-zinc-400">All Members</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <span><strong>Segment 5 (5 Mins):</strong> Problem Resolution & Emergency Support</span>
                <span className="font-mono text-zinc-400">Open Floor</span>
              </div>
            </div>
          </div>

          {/* 8-Stage Pipeline */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              3. The Standard 8-Stage Film Production Pipeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">01. IDEA (Concept Pitch)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">02. DISCUSSION (Table Read)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">03. APPROVAL (Script Lock)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">04. PRE-PROD (Casting & Recce)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">05. PROD (Principal Shoot)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">06. POST (Edit, Sound, Grade)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">07. REVIEW (Internal Cut)</div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">08. RELEASE (Screening / Web)</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">CaSR Constitution 2025 Edition</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold"
          >
            Close SOP Document
          </button>
        </div>
      </div>
    </div>
  );
};
