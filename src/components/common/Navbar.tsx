import React, { useState } from 'react';
import { 
  Clapperboard, Search, Bell, Menu, X, 
  Sparkles, ShieldCheck, Film, Layers, UserPlus, 
  Calendar, Users, Mail, LayoutDashboard, ChevronRight, CheckSquare
} from 'lucide-react';
import { User, NotificationItem } from '../../types';
import { sfx } from '../../utils/audio';

interface Props {
  currentUser: User;
  activePublicTab: string;
  onSelectPublicTab: (tab: string) => void;
  isDashboardOpen: boolean;
  onToggleDashboard: () => void;
  onOpenSearch: () => void;
  onOpenJoinWizard: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentUser,
  activePublicTab,
  onSelectPublicTab,
  isDashboardOpen,
  onToggleDashboard,
  onOpenSearch,
  onOpenJoinWizard,
  notifications,
  onOpenNotifications
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Film },
    { id: 'zones', label: '5 Zones', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Clapperboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'about', label: 'About', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    sfx.playSubtleChime();
    if (isDashboardOpen) {
      onToggleDashboard();
    }
    onSelectPublicTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative shrink-0 w-11 h-11 rounded-2xl bg-black border border-white/15 p-1 shadow-lg shadow-red-950/40 group-hover:scale-105 group-hover:border-red-500/50 transition-all duration-300">
              <img
                src="/logo.png"
                alt="Frame Era Movie Club"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black tracking-widest text-lg sm:text-xl text-white group-hover:text-red-400 transition-colors">
                  FRAME ERA
                </span>
                <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 uppercase font-semibold">
                  Movie Club
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono tracking-wider hidden sm:block">
                CASR CUTM • CREATE • CAPTURE • COLLABORATE
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = !isDashboardOpen && activePublicTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-zinc-800/90 text-red-400 border border-red-500/30 shadow-inner'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Dashboard Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={() => {
                sfx.playSubtleChime();
                onOpenSearch();
              }}
              title="Search (Cmd+K)"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[11px]">Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] bg-zinc-800 rounded border border-zinc-700 text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => {
                sfx.playSubtleChime();
                onOpenNotifications();
              }}
              title="Notifications"
              className="relative p-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Join Club Button */}
            <button
              onClick={() => {
                sfx.playClapper();
                onOpenJoinWizard();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-colors shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5 text-red-500" />
              <span>Join Club</span>
            </button>

            {/* Dashboard / Workspace Button */}
            <button
              onClick={() => {
                sfx.playClapper();
                onToggleDashboard();
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold tracking-wide transition-all shadow-md ${
                isDashboardOpen
                  ? 'bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-950/40 border border-red-500/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isDashboardOpen ? 'Exit Dashboard' : 'Club Dashboard'}
              </span>
              <span className="sm:hidden">
                {isDashboardOpen ? 'Exit' : 'Dashboard'}
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#09090b]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !isDashboardOpen && activePublicTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30 font-semibold'
                      : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                sfx.playClapper();
                onOpenJoinWizard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700"
            >
              <UserPlus className="w-4 h-4 text-red-500" />
              <span>Join CaSR Movie Club</span>
            </button>

            <button
              onClick={() => {
                sfx.playClapper();
                onToggleDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-950/40"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{isDashboardOpen ? 'Switch to Public Website' : 'Open Production Dashboard'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
