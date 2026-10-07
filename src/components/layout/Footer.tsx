import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Instagram, Youtube, Sparkles, Shield, QrCode, FileText, ArrowUpRight } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';

export const Footer: React.FC = () => {
  const { zones, socialAccounts, leadership, setIsSopModalOpen, setIsQrModalOpen } = useClub();

  const officialYoutube = socialAccounts.find(a => a.platform === 'youtube' && (a.status === 'Primary' || a.id === 'soc-yt-01')) || socialAccounts.find(a => a.platform === 'youtube');
  const officialInstagram = socialAccounts.find(a => a.platform === 'instagram' && (a.status === 'Primary' || a.id === 'soc-ig-01')) || socialAccounts.find(a => a.platform === 'instagram');

  const ytUrl = officialYoutube?.url || 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com';
  const igUrl = officialInstagram?.url || 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com';

  return (
    <footer className="bg-[#050507] border-t border-zinc-800/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Accent Spotlight Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Cinematic Big Text Banner in Footer (Requirement 26) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-zinc-800/60 text-center">
        <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-200 to-zinc-600 select-none opacity-40 hover:opacity-80 transition-opacity duration-500">
          CREATE. CAPTURE. COLLABORATE.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onClick={() => sfx.playSubtleChime()}
              className="flex items-center gap-3 group"
            >
              <div className="relative shrink-0 w-12 h-12 rounded-2xl bg-black border border-white/15 p-1 shadow-xl shadow-red-950/40 flex items-center justify-center group-hover:scale-105 group-hover:border-red-500/50 transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="Frame Era Movie Club"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-white text-lg tracking-wider group-hover:text-red-400 transition-colors">
                  FRAME ERA MOVIE CLUB
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block -mt-1">
                  CASR CUTM • ONE CLUB • FIVE ZONES
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier cinematic student production community fostering scriptwriting, cinematography, short films, viral reels, and campus entertainment events.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              {/* YouTube: FRAMES ERA CASR CUTM PKD */}
              <a
                href={ytUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-red-700 hover:border-red-600 flex items-center justify-center transition-all duration-200"
                title="FRAMES ERA CASR CUTM PKD – YouTube"
              >
                <Youtube className="w-4 h-4 text-red-500" />
              </a>
              {/* Instagram: CUTM Frame Era Vibes */}
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 flex items-center justify-center transition-all duration-200"
                title="CUTM Frame Era Vibes – Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/casrmovieclub"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 flex items-center justify-center transition-all duration-200"
                title="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/casrmovieclub"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-sky-700 hover:border-sky-600 flex items-center justify-center transition-all duration-200"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Official Social Media Direct Links */}
            <div className="pt-2 space-y-1 text-[11px] font-mono">
              <a
                href={ytUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                <span className="text-zinc-300 group-hover:text-white font-medium">FRAMES ERA CASR CUTM PKD – YouTube</span>
              </a>
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-pink-400 flex items-center gap-1.5 transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 group-hover:scale-125 transition-transform" />
                <span className="text-zinc-300 group-hover:text-white font-medium">CUTM Frame Era Vibes – Instagram</span>
              </a>
            </div>
          </div>

          {/* Zones Col */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Creative Zones
            </p>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              {zones.map((zone) => (
                <li key={zone.id}>
                  <Link
                    to={`/zones/${zone.id}`}
                    onClick={() => sfx.playSubtleChime()}
                    className="hover:text-red-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{zone.number}</span>
                    <span className="text-zinc-300 group-hover:text-white">{zone.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & 3 Pillars
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Production Showcase
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Screenings & Events
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-red-400 transition-colors">
                  Leadership & Team Directory
                </Link>
              </li>
              <li>
                <Link to="/join" className="hover:text-red-400 transition-colors font-bold text-zinc-200 flex items-center gap-1">
                  <span>Join Auditions</span>
                  <ArrowUpRight className="w-3 h-3 text-red-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Tools */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Governance & Tools
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  sfx.playClapper();
                  setIsSopModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Meeting SOP & Rules</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClapper();
                  setIsQrModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scan QR Attendance</span>
              </button>

              <Link
                to="/login/student"
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors block"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Student Member Login</span>
              </Link>

              <Link
                to="/login/admin"
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors block"
              >
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span>Admin Terminal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Leadership Details Banner */}
        <div className="py-5 border-b border-zinc-800/60 flex flex-col xl:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center xl:justify-start">
            <span className="px-2.5 py-0.5 rounded-full bg-red-950/90 border border-red-800/60 text-red-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Movie Club Leadership</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300">
              <strong className="text-white">Faculty Coordinator:</strong> Mr. R. Nihal
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">
              <strong className="text-white">Overall MC Student Coordinator:</strong> G. Pavan Datta
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">
              <strong className="text-white">Student Coordinator:</strong> Krutisundar Behera
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">
              <strong className="text-white">Student Social Media Coordinator:</strong> Subham Rout
            </span>
          </div>
          <Link
            to="/team"
            className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 text-[11px] shrink-0"
          >
            <span>Meet Full Leadership & Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} CaSR Movie Club. Built for student filmmakers & digital creators.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-bold">CREATE. CAPTURE. COLLABORATE.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
