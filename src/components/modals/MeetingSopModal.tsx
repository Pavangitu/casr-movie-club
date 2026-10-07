import React from 'react';
import { X, FileText, Clock, CheckCircle2, AlertTriangle, Shield, Award, Users } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';

interface MeetingSopModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const MeetingSopModal: React.FC<MeetingSopModalProps> = ({ isOpen: propsIsOpen, onClose: propsOnClose }) => {
  const { isSopModalOpen, setIsSopModalOpen } = useClub();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isSopModalOpen;
  const handleClose = () => {
    if (propsOnClose) propsOnClose();
    setIsSopModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#0e0e13] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800/60 text-red-400 font-mono text-[10px] font-bold">
                  SOP-DOC-001
                </span>
                <span className="text-zinc-500 text-xs font-mono">CaSR GOVERNANCE</span>
              </div>
              <h3 className="text-xl font-heading font-black text-white">
                Weekly Coordination Meeting SOP
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playSubtleChime();
              handleClose();
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-body">
          
          {/* Executive Mandate Box */}
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-red-200 leading-relaxed">
              <span className="font-bold text-white font-mono uppercase block mb-1">
                The Golden Rule of CaSR Production Meetings:
              </span>
              Every meeting must conclude with unambiguous consensus on:{' '}
              <strong className="text-white bg-red-900/60 px-1.5 py-0.5 rounded font-mono">
                "WHO WILL DO WHAT BY WHEN?"
              </strong>
            </div>
          </div>

          {/* Agenda Breakdown */}
          <div>
            <h4 className="text-sm font-bold uppercase font-mono text-zinc-300 tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" /> Standard 40-Minute Agenda Structure
            </h4>

            <div className="space-y-2.5">
              {[
                { time: '05 Min', title: '1. Opening, Announcements & Milestone Wins', lead: 'Overall Coordinator & Faculty', desc: 'Acknowledge top-performing zone contributions and announce campus notices.' },
                { time: '10 Min', title: '2. Zone Performance Reports (2m per zone)', lead: 'All Zone Coordinators', desc: 'Strict 120s updates on what was completed vs what was planned in the previous cycle.' },
                { time: '10 Min', title: '3. Upcoming Productions & Screenings', lead: 'Directors & Event Leads', desc: 'Status checks on active shoot dates, reel schedules, and festival submissions.' },
                { time: '10 Min', title: '4. Task Allocation & Direct Assignment', lead: 'Sub-Coordinators & Leads', desc: 'Direct mapping of tasks into the digital task engine with hard deadlines.' },
                { time: '05 Min', title: '5. Roadblocks, Support & Executive Approvals', lead: 'Entire Leadership Board', desc: 'Equipment clearance, budget approvals, and urgent problem solving.' },
              ].map((slot, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{slot.title}</span>
                      <span className="text-[10px] font-mono text-zinc-400">({slot.lead})</span>
                    </div>
                    <p className="text-xs text-zinc-400">{slot.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-black border border-zinc-800 text-red-400 font-mono font-bold text-xs flex-shrink-0">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Report Requirements */}
          <div>
            <h4 className="text-sm font-bold uppercase font-mono text-zinc-300 tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 8 Mandatory Weekly Report Sections
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                '1. Week Number & Date',
                '2. Zone & Reporting Coordinator',
                '3. Work Completed This Week',
                '4. Ongoing Work & Active Shoots',
                '5. Upcoming Work & Targets',
                '6. Member Follow-up Required',
                '7. Problems, Delays & Blockers',
                '8. Support Needed From Other Zones'
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-zinc-300 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">Governed by CaSR Constitution</span>
          <button
            onClick={() => {
              sfx.playClapper();
              handleClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
