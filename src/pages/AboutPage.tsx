import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Award, Shield, Users, Sparkles, CheckCircle2, Clapperboard, Heart, Video, ArrowRight } from 'lucide-react';
import { sfx } from '../utils/audio';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-black border border-white/20 p-2 shadow-2xl shadow-red-950/60 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Frame Era Movie Club"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRAME ERA MOVIE CLUB • CASR CUTM</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white leading-tight">
            Crafting Vision, Empowering Creators
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Frame Era Movie Club (CaSR CUTM) was founded to bridge the gap between creative campus storytelling and professional film production standards.
          </p>
        </div>

        {/* 3 Core Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              pillar: 'Pillar 01',
              title: 'Scriptwriting & Direction',
              desc: 'From initial writer room loglines to character arcs, table reads, and scene direction. We prioritize narrative depth over empty flash.',
              icon: Film,
              color: 'border-red-800/60 bg-red-950/20 text-red-400'
            },
            {
              pillar: 'Pillar 02',
              title: 'Cinematography & Post',
              desc: 'Mastering cinema cameras, lighting ratios, sound spatialization, color timing in DaVinci Resolve, and VFX compositing.',
              icon: Clapperboard,
              color: 'border-amber-800/60 bg-amber-950/20 text-amber-400'
            },
            {
              pillar: 'Pillar 03',
              title: 'Distribution & Community',
              desc: 'Connecting our films with campus audiences, international festivals, YouTube premieres, and large-scale auditorium screenings.',
              icon: Award,
              color: 'border-purple-800/60 bg-purple-950/20 text-purple-400'
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-600 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase">{item.pillar}</span>
                    <div className={`p-3 rounded-2xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Decentralized Zone Governance */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0d0d12] border border-zinc-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs font-bold uppercase">
              STRUCTURE & GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              The 5-Zone Operating Model
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Rather than a chaotic open club, CaSR operates with military creative precision. Every member belongs to a primary creative cell:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { num: '01', title: 'Movie Making', role: 'Full-length & complex narratives' },
              { num: '02', title: 'Short Film', role: 'Festival-targeted 5-15m cuts' },
              { num: '03', title: 'Reels & Viral', role: 'Vertical high-impact trends' },
              { num: '04', title: 'Social & Branding', role: 'Posters, marketing & PR' },
              { num: '05', title: 'Event Ops', role: 'Auditorium screenings & galas' },
            ].map((z, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-lg font-mono font-black text-red-500">{z.num}</span>
                <h4 className="text-sm font-bold text-white">{z.title}</h4>
                <p className="text-[11px] text-zinc-400">{z.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Constitution & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-heading font-bold text-white">The Filmmaker's Pledge</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Zero gatekeeping — junior students learn hands-on with camera rigs from day one.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Strict adherence to production safety, copyright laws, and respectful campus conduct.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Every crew member is credited publicly in film rolling credits and digital archives.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <h3 className="text-xl font-heading font-bold text-white">Join the Family</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No previous film set experience is required — only passion, dedication to rehearsals, and eagerness to collaborate under pressure.
            </p>
            <div className="pt-2">
              <Link
                to="/join"
                onClick={() => sfx.playClapper()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/60"
              >
                <span>Submit Audition Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Leadership & Official Accounts Summary */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/30 via-[#0e0e14] to-pink-950/30 border border-zinc-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-xs font-bold uppercase">
                EXECUTIVE PILLARS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-2">
                Movie Club Leadership & Digital Channels
              </h2>
            </div>
            <Link
              to="/team"
              className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5"
            >
              <span>Explore Full Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-900/40 space-y-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Faculty Coordinator</span>
              <h4 className="text-sm font-bold text-white">Mr. R. Nihal</h4>
              <p className="text-[11px] text-zinc-400">Institutional Advisor & Mentor</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-red-800/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase">Overall Coordinator</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-black border border-red-700 text-red-400 font-bold">PROTECTED</span>
              </div>
              <h4 className="text-sm font-black text-white">G. Pavan Datta</h4>
              <p className="text-[11px] text-zinc-400">Permanent Overall MC Student Coordinator</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-900/40 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Student Coordinator</span>
              <h4 className="text-sm font-bold text-white">Krutisundar Behera</h4>
              <p className="text-[11px] text-zinc-400">Campaigns & Creative Operations</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-pink-900/40 space-y-1">
              <span className="text-[10px] font-mono text-pink-400 font-bold uppercase">Social Media Coordinator</span>
              <h4 className="text-sm font-bold text-white">Subham Rout</h4>
              <p className="text-[11px] text-zinc-400">Student Social Media Activities & Outreach</p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-zinc-400">
              Official Media Channels (Managed by Subham Rout):
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>FRAMES ERA CASR CUTM PKD – YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>CUTM Frame Era Vibes – Instagram</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
