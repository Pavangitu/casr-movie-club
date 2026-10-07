import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Film, LayoutDashboard, CheckSquare, Clapperboard, Video, 
  Share2, Calendar, FileText, FolderKanban, Users, Bell, 
  Search, Shield, Volume2, VolumeX, LogOut, ArrowLeft, 
  Menu, X, Sparkles, Plus, QrCode, Sliders, Activity, UserCheck,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';
import { UserRole } from '../../types';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { 
    currentUser, setCurrentUser, users, unreadCount, 
    isAudioMuted, toggleAudioMute, setIsSearchOpen, 
    setIsSopModalOpen, setIsQrModalOpen 
  } = useClub();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSchedulingFoldOpen, setIsSchedulingFoldOpen] = useState(
    location.pathname.includes('/scheduling')
  );

  useEffect(() => {
    if (location.pathname.includes('/scheduling')) {
      setIsSchedulingFoldOpen(true);
    }
  }, [location.pathname]);

  // Define sidebar navigation items based on current role or dashboard mode
  const isMasterAdmin = currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator';
  const isCoordinator = currentUser.role === 'zone_coordinator' || currentUser.role === 'sub_coordinator';

  const basePath = isMasterAdmin ? '/admin' : isCoordinator ? '/coordinator' : '/dashboard';

  const navItems = [
    { label: 'Overview', path: basePath, icon: LayoutDashboard },
    { label: 'Task Engine', path: `${basePath}/tasks`, icon: CheckSquare },
    { 
      label: 'Scheduling', 
      path: `${basePath}/scheduling`, 
      icon: Calendar,
      isFold: true,
      subItems: [
        { label: 'Short Film', path: `${basePath}/scheduling/short-film`, icon: Film },
        { label: 'Social Media', path: `${basePath}/scheduling/social-media`, icon: Share2 },
        { label: 'Events', path: `${basePath}/scheduling/events`, icon: Calendar },
      ]
    },
    { label: 'Participants', path: `${basePath}/participants`, icon: UserCheck },
    { label: 'Social Accounts', path: `${basePath}/social-accounts`, icon: Share2 },
    { label: 'Leadership', path: `${basePath}/leadership`, icon: Shield },
    ...(isMasterAdmin || isCoordinator
      ? [
          { label: 'Audit Logs', path: `${basePath}/logs`, icon: Activity },
        ]
      : []),
  ];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'faculty_coordinator':
        return { label: 'Faculty Coordinator', color: 'bg-purple-950 text-purple-300 border-purple-800' };
      case 'overall_coordinator':
        return { label: 'Overall Coordinator', color: 'bg-red-950 text-red-300 border-red-800' };
      case 'zone_coordinator':
        return { label: 'Zone Coordinator', color: 'bg-amber-950 text-amber-300 border-amber-800' };
      case 'sub_coordinator':
        return { label: 'Sub-Coordinator', color: 'bg-blue-950 text-blue-300 border-blue-800' };
      default:
        return { label: 'Club Member', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  const badge = getRoleBadge(currentUser.role);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getPageTitle = () => {
    if (location.pathname.includes('/social-accounts') || location.pathname.includes('/social-media')) {
      return 'Social Media Account Management';
    }
    if (location.pathname.includes('/participants')) {
      return 'Participant Management';
    }
    if (location.pathname.includes('/leadership')) {
      return 'Movie Club Leadership & Coordinators';
    }
    if (location.pathname.includes('/scheduling')) {
      if (location.pathname.includes('/short-film')) return 'Scheduling Department — Short Film';
      if (location.pathname.includes('/social-media') || location.pathname.includes('/social')) return 'Scheduling Department — Social Media';
      if (location.pathname.includes('/events')) return 'Scheduling Department — Events';
      return 'Scheduling Department';
    }
    const last = location.pathname.split('/').filter(Boolean).pop();
    if (!last || last === 'admin' || last === 'coordinator' || last === 'dashboard') {
      return 'Overview & Command Studio';
    }
    const match = navItems.find(i => i.path.endsWith(`/${last}`));
    if (match) return match.label;
    return last.replace('-', ' ');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-body">
      
      {/* Top Simulator Banner for seamless role switching */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-black border-b border-red-900/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-zinc-400">ACTIVE TERMINAL:</span>
          <span className="font-bold text-white font-mono">{currentUser.name}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${badge.color}`}>
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5"
            >
              <span>Switch User Role ▾</span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-[#111116] border border-zinc-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-mono text-zinc-500 px-2 py-1 uppercase">Select Mock Persona:</p>
                {users.slice(0, 7).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      sfx.playClapper();
                      setCurrentUser(u);
                      setIsRoleDropdownOpen(false);
                      if (u.role === 'overall_coordinator' || u.role === 'faculty_coordinator') {
                        navigate('/admin');
                      } else if (u.role === 'zone_coordinator' || u.role === 'sub_coordinator') {
                        navigate('/coordinator');
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      currentUser.id === u.id
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span className="truncate">{u.name}</span>
                    <span className="text-[10px] font-mono opacity-80">{u.role.replace('_', ' ')}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsSopModalOpen(true);
            }}
            className="text-zinc-400 hover:text-purple-400 font-mono text-xs flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>Meeting SOP</span>
          </button>
          
          <button
            onClick={() => {
              sfx.playClapper();
              setIsQrModalOpen(true);
            }}
            className="text-zinc-400 hover:text-emerald-400 font-mono text-xs flex items-center gap-1"
          >
            <QrCode className="w-3 h-3" />
            <span>QR Check-in</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-row">
        
        {/* Left Sidebar */}
        <aside
          className={`bg-[#0a0a0e] border-r border-zinc-800/80 flex flex-col justify-between transition-all duration-300 hidden md:flex ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Top Brand */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
            <Link
              to="/"
              className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}
            >
              <div className="relative shrink-0 w-9 h-9 rounded-xl bg-black border border-white/15 p-0.5 flex items-center justify-center shadow-lg shadow-black/80">
                <img
                  src="/logo.png"
                  alt="Frame Era Movie Club"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <h3 className="font-heading font-black text-white text-sm tracking-wider">
                    FRAME ERA
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Command Console
                  </p>
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hidden lg:block"
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSchedulingFold = item.isFold;
              const isSchedulingActive = location.pathname.includes('/scheduling');

              if (isSchedulingFold) {
                return (
                  <div key={item.path} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.playSubtleChime();
                        setIsSchedulingFoldOpen(!isSchedulingFoldOpen);
                        if (!location.pathname.includes('/scheduling')) {
                          navigate(item.path);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isSchedulingActive
                          ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                      } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                      title={item.label}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isSchedulingActive ? 'text-white' : 'text-zinc-400'}`} />
                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isSidebarCollapsed && (
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            isSchedulingActive ? 'bg-black/40 text-red-200' : 'bg-zinc-900 text-zinc-500'
                          }`}>
                            3
                          </span>
                          {isSchedulingFoldOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-zinc-300" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Scheduling Fold: Three Module Bars */}
                    {!isSidebarCollapsed && isSchedulingFoldOpen && (
                      <div className="pl-3 py-1 space-y-1 border-l-2 border-red-900/60 ml-5 animate-in slide-in-from-top-2 duration-150">
                        {item.subItems?.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = location.pathname === sub.path || 
                            (sub.path.includes('/short-film') && location.pathname === `${basePath}/scheduling`);

                          return (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => sfx.playSubtleChime()}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11px] font-mono transition-all ${
                                isSubActive
                                  ? 'bg-zinc-900 text-red-400 font-bold border border-red-800/60 shadow-sm'
                                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <SubIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isSubActive ? 'text-red-400' : 'text-zinc-500'}`} />
                                <span>{sub.label}</span>
                              </div>
                              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                isSubActive ? 'bg-red-400 shadow-sm shadow-red-500/80' : 'bg-zinc-700'
                              }`} />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === item.path || (item.path !== basePath && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => sfx.playSubtleChime()}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Bottom Profile and Return */}
          <div className="p-4 border-t border-zinc-800/80 space-y-3">
            {!isSidebarCollapsed && (
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-zinc-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] font-mono text-zinc-400 truncate">{currentUser.primaryZone.replace('zone-', '')}</p>
                </div>
              </div>
            )}

            <Link
              to="/"
              onClick={() => sfx.playSubtleChime()}
              className={`w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-2 border border-zinc-800 ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {!isSidebarCollapsed && <span>Return to Entrance</span>}
            </Link>
          </div>
        </aside>

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Bar for Dashboard */}
          <header className="h-16 border-b border-zinc-800/80 bg-[#09090d]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-heading font-black text-white capitalize">
                {getPageTitle()}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => {
                  sfx.playSubtleChime();
                  setIsSearchOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search Console</span>
                <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-zinc-500 border border-zinc-800 hidden sm:inline">⌘K</kbd>
              </button>

              {/* Sound */}
              <button
                onClick={() => {
                  const muted = toggleAudioMute();
                  if (!muted) sfx.playSubtleChime();
                }}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title={isAudioMuted ? 'Unmute SFX' : 'Mute SFX'}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-red-400" />}
              </button>

              {/* Notification icon */}
              <button
                onClick={() => {
                  sfx.playSubtleChime();
                  navigate(`${basePath}`);
                }}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
            {children}
          </main>

        </div>

      </div>

      {/* Mobile Bottom Navigation for quick navigation */}
      <div className="md:hidden sticky bottom-0 bg-[#09090d]/95 backdrop-blur-xl border-t border-zinc-800 p-2 flex items-center justify-around z-40">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.isFold && location.pathname.includes(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => sfx.playSubtleChime()}
              className={`p-2.5 rounded-xl flex flex-col items-center gap-1 ${
                isActive ? 'text-red-500 font-bold' : 'text-zinc-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-mono">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
};
