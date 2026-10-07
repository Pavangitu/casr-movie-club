import React, { useState } from 'react';
import { Zone, Project, Task, User, ZoneId } from '../../types';
import { 
  Film, Clapperboard, Sparkles, Share2, Calendar, 
  Shield, UserCheck, CheckCircle2, Clock, Users, ArrowRight, Plus 
} from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  zone: Zone;
  projects: Project[];
  tasks: Task[];
  users: User[];
  onSelectProject: (p: Project) => void;
  onOpenSubmitIdea: (zoneId: ZoneId) => void;
  onOpenJoinWizard: () => void;
  onSelectUser: (u: User) => void;
}

export const ZoneWorkspace: React.FC<Props> = ({
  zone,
  projects,
  tasks,
  users,
  onSelectProject,
  onOpenSubmitIdea,
  onOpenJoinWizard,
  onSelectUser
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'responsibilities' | 'projects' | 'tasks' | 'team'>('overview');

  const zoneProjects = projects.filter(p => p.zoneId === zone.id);
  const zoneTasks = tasks.filter(t => t.zoneId === zone.id);
  const zoneMembers = users.filter(u => u.primaryZone === zone.id || u.secondaryZone === zone.id);

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

  const Icon = getZoneIcon(zone.icon);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Zone Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#111116]">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={zone.bannerImage}
            alt={zone.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent"></div>

          {/* Floating Zone Number */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700 text-red-400 font-mono font-black text-sm tracking-widest uppercase shadow-md">
              {zone.code}
            </span>
          </div>

          {/* Zone Title & Actions */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                {zone.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                {zone.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sfx.playClapper();
                  onOpenSubmitIdea(zone.id);
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-950/50"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Idea to {zone.name}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Leadership & Quick Stats Bar */}
        <div className="p-6 bg-zinc-950/90 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Coordinator */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-950 flex items-center justify-center text-red-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">LEAD COORDINATOR</span>
              <span className={`text-xs font-bold ${zone.coordinator === 'To Be Assigned' ? 'text-amber-400 italic' : 'text-white'}`}>
                {zone.coordinator}
              </span>
            </div>
          </div>

          {/* Sub Coordinator */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">SUB-COORDINATOR</span>
              <span className={`text-xs font-bold ${zone.subCoordinator === 'To Be Assigned' ? 'text-amber-400 italic' : 'text-white'}`}>
                {zone.subCoordinator}
              </span>
            </div>
          </div>

          {/* Active Projects */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-950 flex items-center justify-center text-purple-400">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">ACTIVE PIPELINES</span>
              <span className="text-xs font-bold text-white">{zoneProjects.length} Productions</span>
            </div>
          </div>

          {/* Team Strength */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">TEAM STRENGTH</span>
              <span className="text-xs font-bold text-white">{zoneMembers.length} Members</span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        {[
          { id: 'overview', label: 'Zone Overview' },
          { id: 'responsibilities', label: `10 Key Responsibilities (${zone.responsibilities.length})` },
          { id: 'projects', label: `Zone Projects (${zoneProjects.length})` },
          { id: 'tasks', label: `Active Tasks (${zoneTasks.length})` },
          { id: 'team', label: `Zone Roster (${zoneMembers.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sfx.playSubtleChime();
              setActiveTab(tab.id as unknown as typeof activeTab);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
              <h3 className="text-lg font-heading font-black text-white">Zone Mission & Scope</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {zone.description}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Operates with full autonomy under the guidance of <strong>{zone.coordinator}</strong>, adhering to our standardized 8-stage production pipeline and weekly reporting rhythm.
              </p>
            </div>

            {/* Responsibilities Teaser */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  Primary Mandates & Workflows
                </h4>
                <button 
                  onClick={() => setActiveTab('responsibilities')}
                  className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  View All 10 <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {zone.responsibilities.slice(0, 6).map((resp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="truncate">{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Projects Widget */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Current Active Productions
              </h4>
              {zoneProjects.length === 0 ? (
                <p className="text-xs text-zinc-500">No active projects currently in this zone.</p>
              ) : (
                <div className="space-y-3">
                  {zoneProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        sfx.playClapper();
                        onSelectProject(p);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/40 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{p.title}</span>
                        <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 rounded bg-red-950">
                          {p.currentStage.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{p.synopsis}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Join CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 to-zinc-950 border border-red-900/40 space-y-3">
              <h4 className="text-sm font-heading font-black text-white">Want to join {zone.name}?</h4>
              <p className="text-xs text-zinc-300">
                You can select {zone.name} as your primary or secondary zone during club registration.
              </p>
              <button
                onClick={() => {
                  sfx.playClapper();
                  onOpenJoinWizard();
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Apply for {zone.name}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: 10 Full Responsibilities */}
      {activeTab === 'responsibilities' && (
        <div className="p-8 rounded-3xl bg-[#111116] border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-2xl font-heading font-black text-white">
              Official Responsibilities Matrix: {zone.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Standard operating procedures and core deliverables assigned to this zone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zone.responsibilities.map((resp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center text-[11px] font-mono font-bold text-red-400 flex-shrink-0">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <p className="text-xs font-bold text-zinc-100">{resp}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Executed under coordinator supervision with cross-zone handoffs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zoneProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                sfx.playClapper();
                onSelectProject(project);
              }}
              className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 hover:border-red-500/50 cursor-pointer space-y-3 transition-all"
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-36 object-cover rounded-xl" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-black text-white">{project.title}</span>
                <span className="text-[10px] font-mono text-red-400">{project.currentStage}</span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">{project.synopsis}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          {zoneTasks.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-12">No active tasks in this zone.</p>
          ) : (
            zoneTasks.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-[#111116] border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{t.title}</p>
                  <p className="text-[11px] text-zinc-500">Assigned to: {t.assignedToName} • Deadline: {t.deadline}</p>
                </div>
                <span className={`px-2.5 py-1 rounded font-mono uppercase font-bold text-[10px] ${
                  t.status === 'completed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                }`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 5: Team */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {zoneMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => {
                sfx.playSubtleChime();
                onSelectUser(member);
              }}
              className="p-4 rounded-xl bg-[#111116] border border-zinc-800 hover:border-zinc-700 cursor-pointer flex items-center gap-3 transition-all"
            >
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="font-bold text-white text-xs truncate">{member.name}</p>
                <p className="text-[11px] text-zinc-500 truncate">{member.primarySkill}</p>
                <span className="text-[10px] font-mono text-red-400 font-bold">{member.role.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
