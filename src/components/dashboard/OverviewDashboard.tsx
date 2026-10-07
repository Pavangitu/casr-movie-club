import React from 'react';
import { Zone, Project, Task, User, ClubApplication, ZoneReport } from '../../types';
import { 
  Film, Clapperboard, Sparkles, Share2, Calendar, 
  CheckCircle2, Clock, Users, ArrowRight, AlertTriangle, ShieldCheck, ChevronRight, UserPlus 
} from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  zones: Zone[];
  projects: Project[];
  tasks: Task[];
  users: User[];
  applications: ClubApplication[];
  reports: ZoneReport[];
  onSelectProject: (p: Project) => void;
  onNavigateTab: (tab: string) => void;
  onApproveApplication: (appId: string) => void;
  onSelectZone: (zone: Zone) => void;
  onOpenCreateTask: () => void;
}

export const OverviewDashboard: React.FC<Props> = ({
  zones,
  projects,
  tasks,
  users,
  applications,
  reports,
  onSelectProject,
  onNavigateTab,
  onApproveApplication,
  onSelectZone,
  onOpenCreateTask
}) => {
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasksCount = tasks.filter(t => t.status === 'in_progress').length;
  const pendingApplications = applications.filter(a => a.status === 'Pending');

  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return Film;
      case 'Clapperboard': return Clapperboard;
      case 'Sparkles': return Sparkles;
      case 'Share2': return Share2;
      case 'Calendar': return Calendar;
      default: return Film;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-500 flex-shrink-0">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold block">ACTIVE PRODUCTIONS</span>
            <span className="text-2xl font-mono font-black text-white">{projects.length} Films</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold block">TASKS EXECUTED</span>
            <span className="text-2xl font-mono font-black text-white">{completedTasksCount} / {tasks.length}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold block">ACTIVE ROSTER</span>
            <span className="text-2xl font-mono font-black text-white">{users.length} Members</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold block">PENDING APPLICANTS</span>
            <span className="text-2xl font-mono font-black text-amber-400">{pendingApplications.length} In Review</span>
          </div>
        </div>

      </div>

      {/* 5-Zone Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white">5 Creative Zone Pipelines</h3>
            <p className="text-xs text-zinc-400">Autonomous workflow divisions & coordinator status</p>
          </div>
          <button
            onClick={() => onNavigateTab('zones')}
            className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 font-bold"
          >
            Manage Zones <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {zones.map((z) => {
            const Icon = getZoneIcon(z.icon);
            const zoneProjs = projects.filter(p => p.zoneId === z.id);
            const zoneTasks = tasks.filter(t => t.zoneId === z.id);

            return (
              <div
                key={z.id}
                onClick={() => {
                  sfx.playSubtleChime();
                  onSelectZone(z);
                }}
                className="group p-5 rounded-2xl bg-[#111116] border border-zinc-800 hover:border-red-500/50 cursor-pointer flex flex-col justify-between space-y-4 transition-all hover:shadow-xl duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/80 border border-red-900/50">
                      {z.code}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" />
                  </div>

                  <h4 className="text-sm font-heading font-black text-white mt-3 group-hover:text-red-400 transition-colors">
                    {z.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1">
                    {z.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 text-[11px] font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Lead:</span>
                    <span className="text-zinc-300 font-bold truncate max-w-[100px]">{z.coordinator.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Active:</span>
                    <span className="text-emerald-400 font-bold">{zoneProjs.length} Films • {zoneTasks.length} Tasks</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Weekly Meeting SOP Card + Pending Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Meeting SOP Widget */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111116] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-red-950 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                SATURDAY COORDINATION MEETING
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">● 40 MINUTE PROTOCOL</span>
            </div>

            <h4 className="text-xl font-heading font-black text-white mt-2">
              Next Executive Table Read & Review
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Location: Media Studio 204 • Saturday @ 17:30 IST • Faculty Chair Presiding
            </p>

            {/* Quick 5-Segment Breakdown */}
            <div className="mt-4 space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">01. Announcements (5m)</span>
                <span className="text-[10px] font-mono text-zinc-500">Faculty & Overall</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">02. 5 Zone Reports (10m)</span>
                <span className="text-[10px] font-mono text-zinc-500">2 min per zone</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">03. Rough Cut Review (10m)</span>
                <span className="text-[10px] font-mono text-zinc-500">The Silent Echo</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">04. Task Allocations (10m)</span>
                <span className="text-[10px] font-mono text-red-400 font-bold">Who Will Do What By When</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-500">All 5 Zone Coordinators Mandatory</span>
            <button
              onClick={() => onNavigateTab('reports')}
              className="font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              View Past Minutes <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pending Applications Widget */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111116] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                MEMBERSHIP REGISTRY
              </span>
              <button
                onClick={() => onNavigateTab('applications')}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold"
              >
                Full Registry ({applications.length}) →
              </button>
            </div>

            <h4 className="text-xl font-heading font-black text-white mt-2">
              Recent Membership Applications
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Review and onboard new creators into active creative zones.
            </p>

            <div className="mt-4 space-y-2">
              {pendingApplications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{app.fullName}</p>
                    <p className="text-[11px] font-mono text-zinc-400">
                      {app.section} • Prefers: <span className="text-red-400 font-bold uppercase">{app.primaryZone.replace('zone-', '')}</span>
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Skill: {app.primarySkill}</p>
                  </div>

                  <button
                    onClick={() => {
                      sfx.playClapper();
                      onApproveApplication(app.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approve</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Automatic induction into Zone Discord & Slack</span>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-zinc-400 hover:text-white"
            >
              Review All Applications
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
