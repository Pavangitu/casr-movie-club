import React, { useState } from 'react';
import { Calendar, Film, Share2, Sparkles, CheckCircle2, ArrowRight, Video, FileText, Camera, Scissors, Check, Send } from 'lucide-react';
import { sfx } from '../../utils/audio';

const WORKFLOW_STEPS = [
  {
    id: 'event-req',
    zone: 'Zone 05: Event Management',
    zoneColor: 'border-emerald-700 bg-emerald-950/70 text-emerald-300',
    title: '1. Event Need Identified',
    role: 'Event Coordinator (Chinmayee)',
    icon: Calendar,
    desc: 'Event team raises Pre-Event Reel request with theme, guest list & target date.'
  },
  {
    id: 'reel-pitch',
    zone: 'Zone 03: Reels & Viral',
    zoneColor: 'border-amber-700 bg-amber-950/70 text-amber-300',
    title: '2. Reel Concept & Hook',
    role: 'Reels Lead (Spyro)',
    icon: Sparkles,
    desc: 'Viral team develops high-energy student hook, audio track & 30s storyboard.'
  },
  {
    id: 'script-story',
    zone: 'Zone 01 / 02: Script Cell',
    zoneColor: 'border-red-700 bg-red-950/70 text-red-300',
    title: '3. Script & Storyboard',
    role: 'Writers & Directors',
    icon: FileText,
    desc: 'Draft dialogue lines, framing shots & promotional call-to-action.'
  },
  {
    id: 'camera-shoot',
    zone: 'Zone 03: Production Crew',
    zoneColor: 'border-purple-700 bg-purple-950/70 text-purple-300',
    title: '4. Campus Production Shoot',
    role: 'Camera Crew & Cast',
    icon: Camera,
    desc: 'Shooting on-location with stabilizer, lighting & student cast members.'
  },
  {
    id: 'post-edit',
    zone: 'Zone 03: Post-Production',
    zoneColor: 'border-blue-700 bg-blue-950/70 text-blue-300',
    title: '5. Fast-Turnaround Edit',
    role: 'Lead Video Editors',
    icon: Scissors,
    desc: 'Rough cut, sound sync, color grade, on-screen kinetic typography.'
  },
  {
    id: 'social-caption',
    zone: 'Zone 04: Social & Branding',
    zoneColor: 'border-pink-700 bg-pink-950/70 text-pink-300',
    title: '6. Caption, Tags & Graphics',
    role: 'Social Media Lead (Kruti)',
    icon: Share2,
    desc: 'Crafting algorithmic captions, hashtags, custom thumbnail poster & tag list.'
  },
  {
    id: 'exec-approval',
    zone: 'Executive Oversight',
    zoneColor: 'border-red-700 bg-red-950/90 text-red-200',
    title: '7. Final Executive Review',
    role: 'Overall Coordinator (Pavan)',
    icon: CheckCircle2,
    desc: 'Standard quality gate check and copyright/branding verification.'
  },
  {
    id: 'publish-live',
    zone: 'Multi-Channel Distribution',
    zoneColor: 'border-emerald-600 bg-emerald-900/90 text-white font-bold',
    title: '8. Coordinated Release',
    role: 'Instagram / YouTube / WhatsApp',
    icon: Send,
    desc: 'Scheduled drop across @casrmovieclub handle with crew collaboration tags.'
  }
];

export const CrossZoneWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-[#0c0c10] border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Film className="w-3.5 h-3.5" />
            CROSS-ZONE PRODUCTION PROTOCOL
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
            Pre-Event Reel & Viral Campaign Pipeline
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 max-w-2xl mt-1">
            Standard operating lifecycle demonstrating how Event Management, Reels, Filmmaking, and Social Media collaborate seamlessly.
          </p>
        </div>

        {/* Step index badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">ACTIVE STAGE:</span>
          <span className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-red-400 font-mono font-bold text-xs">
            Step {activeStep + 1} of {WORKFLOW_STEPS.length}
          </span>
        </div>
      </div>

      {/* Flow Steps Horizontal / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;
          const isCompleted = idx < activeStep;

          return (
            <div
              key={step.id}
              onClick={() => {
                sfx.playSubtleChime();
                setActiveStep(idx);
              }}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/90 border-red-500 shadow-lg shadow-red-950/50 scale-[1.02]'
                  : isCompleted
                  ? 'bg-zinc-950/70 border-zinc-700 hover:border-zinc-500 opacity-90'
                  : 'bg-[#111116] border-zinc-800/80 hover:border-zinc-700 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${step.zoneColor}`}>
                    {step.zone.split(':')[0]}
                  </span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono">
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className={isSelected ? 'text-red-400' : 'text-zinc-500'}>0{idx + 1}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-red-400' : 'text-zinc-400'}`} />
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                    {step.title}
                  </h4>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="truncate">{step.role}</span>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Inspector Banner */}
      <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase text-red-400">
              {WORKFLOW_STEPS[activeStep].zone}
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            {WORKFLOW_STEPS[activeStep].title} — {WORKFLOW_STEPS[activeStep].role}
          </h4>
          <p className="text-xs text-zinc-300">
            {WORKFLOW_STEPS[activeStep].desc}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            onClick={() => {
              sfx.playSubtleChime();
              setActiveStep(prev => Math.max(0, prev - 1));
            }}
            disabled={activeStep === 0}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 disabled:opacity-30 border border-zinc-700 text-xs font-mono text-zinc-300"
          >
            ← Prev Step
          </button>
          <button
            onClick={() => {
              sfx.playClapper();
              setActiveStep(prev => Math.min(WORKFLOW_STEPS.length - 1, prev + 1));
            }}
            disabled={activeStep === WORKFLOW_STEPS.length - 1}
            className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white text-xs font-bold font-mono shadow-md shadow-red-950/50"
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};
