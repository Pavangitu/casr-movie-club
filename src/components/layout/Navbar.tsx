import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Film, Sparkles, Volume2, VolumeX, Search, Bell,
  Menu, X, Shield, ArrowRight, UserCheck, LogIn, LayoutDashboard
} from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const {
    currentUser, unreadCount, isAudioMuted, toggleAudioMute,
    setIsSearchOpen, setIsSopModalOpen, setIsQrModalOpen
  } = useClub();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Zones', path: '/zones' },
    { label: 'Projects', path: '/projects' },
    { label: 'Task Management', path: '/tasks' },
    { label: 'Events & Schedule', path: '/events' },
    { label: 'Contact Team', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator') {
      return '/admin';
    }
    if (currentUser.role === 'zone_coordinator' || currentUser.role === 'sub_coordinator') {
      return '/coordinator';
    }
    return '/dashboard';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-[#070709]/85 backdrop-blur-xl border-b border-zinc-800/80 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo & Brand */}
          <Link
            to="/"
            onClick={() => sfx.playSubtleChime()}
            className="flex items-center gap-3 group"
          >
            <div className="relative shrink-0 w-11 h-11 rounded-2xl bg-black border border-white/15 p-1 shadow-xl shadow-red-950/40 flex items-center justify-center group-hover:scale-105 group-hover:border-red-500/50 transition-all duration-300">
              <img
                src="/logo.png"
                alt="Frame Era Movie Club"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-white text-lg tracking-wider group-hover:text-red-400 transition-colors">
                  FRAME ERA
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-400 font-bold">
                  CASR
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block -mt-1">
                MOVIE CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/70 border border-zinc-800/90 px-3.5 py-1.5 rounded-full backdrop-blur-md relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => sfx.playSubtleChime()}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all relative ${isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-red-600 rounded-full shadow-md shadow-red-950/60 -z-10 animate-in fade-in zoom-in-95 duration-200" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Bar (Search, Sound, Dashboard/Login, Join) */}
          <div className="hidden sm:flex items-center gap-2.5">

            {/* Global Search shortcut button */}
            <button
              onClick={() => {
                sfx.playSubtleChime();
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors"
              title="Search everything (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-zinc-400 border border-zinc-800">
                ⌘K
              </kbd>
            </button>

            {/* Audio SFX Toggle */}
            <button
              onClick={() => {
                const isMuted = toggleAudioMute();
                if (!isMuted) sfx.playSubtleChime();
              }}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title={isAudioMuted ? 'Unmute cinematic audio SFX' : 'Mute audio SFX'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            </button>

            {/* Dashboard / Login Action */}
            <Link
              to="/login"
              onClick={() => sfx.playClapper()}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-red-400" />
              <span>Login</span>
            </Link>

            {/* Join Club Button */}
            <Link
              to="/join"
              onClick={() => sfx.playClapper()}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-950/60 transition-all active:scale-95"
            >
              <span>Join Club</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between sm:hidden animate-in fade-in duration-200">
          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase text-red-500 tracking-widest font-bold">
              NAVIGATION PORTAL
            </p>
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    sfx.playSubtleChime();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-base font-bold text-zinc-200 hover:text-white flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-800">
            <Link
              to={getDashboardPath()}
              onClick={() => {
                sfx.playClapper();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-red-400" />
              <span>Open Authenticated Dashboard</span>
            </Link>

            <Link
              to="/join"
              onClick={() => {
                sfx.playClapper();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-950/60"
            >
              <span>Join CaSR Movie Club</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
