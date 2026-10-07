import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Film, Sparkles, ArrowRight, Video, Calendar, 
  Users, CheckCircle2, Clapperboard, Share2, Award, ChevronRight, Eye, Heart, Flame, Star, Volume2,
  Shield, Lock, GraduationCap, Youtube, Instagram, ExternalLink, Mail, Phone
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { CinematicParticles } from '../components/ui/CinematicParticles';
import { CinematicLightSweep } from '../components/ui/CinematicLightSweep';
import { CinematicTextReveal } from '../components/ui/CinematicTextReveal';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { HorizontalZoneScroller } from '../components/ui/HorizontalZoneScroller';
import { ImageReveal } from '../components/ui/ImageReveal';
import { CrossZoneWorkflow } from '../components/ui/CrossZoneWorkflow';
import { sfx } from '../utils/audio';

export const HomePage: React.FC = () => {
  const { zones, projects, reels, events, users, leadership, socialAccounts } = useClub();
  const [selectedZoneTab, setSelectedZoneTab] = useState(zones[0]?.id || 'zone-movie');
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  // Core Leadership Coordinators
  const pavanLeader = leadership.find(m => m.isPermanent || m.name.toLowerCase().includes('pavan datta'));
  const facultyLeader = leadership.find(m => m.roleType === 'faculty_coordinator' || m.name.toLowerCase().includes('nihal'));
  const krutiLeader = leadership.find(m => m.name.toLowerCase().includes('krutisundar'));
  const subhamLeader = leadership.find(m => m.roleType === 'social_media_coordinator' || m.name.toLowerCase().includes('subham rout'));

  // Official Channels
  const officialYt = socialAccounts.find(a => a.platform === 'youtube' && (a.status === 'Primary' || a.id === 'soc-yt-01')) || socialAccounts.find(a => a.platform === 'youtube');
  const officialIg = socialAccounts.find(a => a.platform === 'instagram' && (a.status === 'Primary' || a.id === 'soc-ig-01')) || socialAccounts.find(a => a.platform === 'instagram');

  // Hero entrance animation timeline state
  const [heroStep, setHeroStep] = useState(0);

  useEffect(() => {
    // Exact requested timeline:
    // 0.0s: black screen
    // 0.3s: grain appears
    // 0.6s: light sweep appears
    // 0.9s: small text fades in
    // 1.2s: main heading reveals
    // 1.8s: supporting description
    // 2.1s: CTA buttons slide upward
    // 2.4s: background elements moving
    const timers = [
      setTimeout(() => setHeroStep(1), 300),   // 0.3s Grain
      setTimeout(() => setHeroStep(2), 600),   // 0.6s Light Sweep
      setTimeout(() => setHeroStep(3), 900),   // 0.9s Small Text
      setTimeout(() => setHeroStep(4), 1200),  // 1.2s Main Heading
      setTimeout(() => setHeroStep(5), 1800),  // 1.8s Description
      setTimeout(() => setHeroStep(6), 2100),  // 2.1s CTA
      setTimeout(() => setHeroStep(7), 2400),  // 2.4s Ambient moving
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const activeZone = zones.find(z => z.id === selectedZoneTab) || zones[0];
  const featuredProjects = projects.slice(0, 3);
  const featuredReels = reels.slice(0, 4);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 relative overflow-hidden">
      
      {/* 1. CINEMATIC HERO SECTION (0.0s - 2.4s Entrance Sequence) */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        
        {/* 0.6s Light sweep & ambient spotlight */}
        {heroStep >= 2 && (
          <CinematicLightSweep className="transition-opacity duration-1000" opacity={0.65} />
        )}

        {/* 2.4s Background Cinematic Particles */}
        {heroStep >= 7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <CinematicParticles count={48} />
          </motion.div>
        )}

        {/* Film Strip Border Accents */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-zinc-950/90 border-b border-zinc-800 flex justify-between px-4 overflow-hidden z-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2 h-2.5 bg-zinc-800/80 rounded-xs my-auto" />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          {/* 0.9s Small eyebrow badge */}
          <div className="min-h-[36px] flex items-center justify-center">
            {heroStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/90 border border-white/20 text-white text-xs font-mono font-bold tracking-widest uppercase shadow-xl shadow-red-950/40 hover:border-red-500/50 transition-colors"
              >
                <img src="/logo.png" alt="Frame Era" className="w-5 h-5 object-contain" />
                <span>FRAME ERA MOVIE CLUB • CASR CUTM</span>
              </motion.div>
            )}
          </div>

          {/* 1.2s Main Heading Reveal Line-by-Line */}
          <div className="py-2">
            {heroStep >= 4 ? (
              <div className="space-y-1">
                <CinematicTextReveal
                  lines={['CREATE.', 'CAPTURE.', 'COLLABORATE.']}
                  lineClassName="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white leading-[1.05]"
                />
              </div>
            ) : (
              <div className="h-28 sm:h-44" />
            )}
          </div>

          {/* 1.8s Supporting Description */}
          <div className="min-h-[48px]">
            {heroStep >= 5 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
              >
                One Club. Five Specialized Zones. One Cinematic Vision. Transforming student stories into festival-grade short films and viral digital media.
              </motion.p>
            )}
          </div>

          {/* 2.1s Hero CTAs Slide Upward */}
          <div className="min-h-[56px] pt-3">
            {heroStep >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  to="/join"
                  data-cursor-text="JOIN"
                  onClick={() => sfx.playClapper()}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-2xl shadow-red-950/90 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>JOIN CLUB</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/zones"
                  data-cursor-text="ZONES"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-7 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-red-500/50 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>EXPLORE ZONES</span>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </Link>

                <button
                  data-cursor-text="PLAY"
                  onClick={() => {
                    sfx.playCinematicBoom();
                    setIsPlayingTrailer(true);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>WATCH SHOWREEL</span>
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* 2. THE VISION / IMPACT METRICS SECTION (07 — ABOUT & STATS ANIMATIONS) */}
      <section className="py-20 bg-[#09090d] border-y border-zinc-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
              THE VISION
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Built for Groundbreaking Storytelling
            </h2>
            <p className="text-sm text-zinc-400">
              CaSR unites visionary writers, cinematographers, editors, social creators, and event producers under a single synchronized production house.
            </p>
          </div>

          {/* Animated Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800/80 text-center hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30">
              <p className="text-4xl sm:text-5xl font-heading font-black text-white">
                <AnimatedCounter target={5} suffix="" />
              </p>
              <p className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mt-2">
                05 CREATIVE ZONES
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Movie, Shorts, Reels, Social Media, Events
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800/80 text-center hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30">
              <p className="text-4xl sm:text-5xl font-heading font-black text-white">
                <AnimatedCounter target={100} suffix="%" />
              </p>
              <p className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mt-2">
                100% TEAMWORK
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Collaborative cross-zone production standard
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800/80 text-center hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30">
              <p className="text-4xl sm:text-5xl font-heading font-black text-white">
                <AnimatedCounter target="∞" suffix="" />
              </p>
              <p className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mt-2">
                ∞ CREATIVE IDEAS
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Unlimited student scripts and productions
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FIVE CREATIVE ZONES SHOWCASE (Interactive Tabs + Scroller) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            THE 5 ZONES
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
            Specialized Production Cells
          </h2>
          <p className="text-sm text-zinc-400">
            Each zone is equipped with dedicated leadership, specialized workflows, and clear deliverables.
          </p>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {zones.map((zone) => {
            const isSelected = zone.id === selectedZoneTab;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  sfx.playSubtleChime();
                  setSelectedZoneTab(zone.id);
                }}
                className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/60 scale-105'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="opacity-70">{zone.number}</span>
                <span>{zone.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Zone Spotlight Card */}
        <motion.div
          key={activeZone.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-[#0e0e14] border border-zinc-800/90 shadow-2xl items-center"
        >
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-red-950 text-red-300 border border-red-800/50 font-mono text-xs font-bold">
                {activeZone.number}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                {activeZone.name}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeZone.description}
            </p>

            {/* Leadership Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Zone Coordinator</p>
                <p className="text-sm font-bold text-white mt-0.5">{activeZone.coordinator}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Sub-Coordinator</p>
                <p className="text-sm font-bold text-white mt-0.5">{activeZone.subCoordinator}</p>
              </div>
            </div>

            {/* Core Mandates */}
            <div>
              <p className="text-xs font-mono text-zinc-400 font-bold uppercase mb-2">Key Focus Areas:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {activeZone.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <Link
                to={`/zones/${activeZone.id}`}
                data-cursor-text="ZONE"
                onClick={() => sfx.playClapper()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-zinc-700 hover:border-red-500 transition-colors"
              >
                <span>Explore Full Zone Roster & Projects</span>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </Link>
            </div>
          </div>

          {/* Media Visual with Reveal Curtain */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl group relative">
            <ImageReveal
              src={activeZone.bannerImage}
              alt={activeZone.name}
              aspectRatio="aspect-[4/3]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-20">
              <span className="px-2.5 py-1 rounded bg-black/80 border border-zinc-700 text-zinc-200">
                {activeZone.activeProjectsCount} Active Productions
              </span>
              <span className="px-2.5 py-1 rounded bg-red-950/90 border border-red-800 text-red-300">
                {activeZone.totalMembersCount} Crew Members
              </span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Filmstrip Scroller Component */}
        <div className="pt-8">
          <HorizontalZoneScroller zones={zones} />
        </div>

      </section>

      {/* 4. FEATURED PRODUCTIONS (FILM SHOWCASE) */}
      <section className="py-20 bg-[#09090d] border-t border-zinc-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
                CINEMATIC PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-2">
                Featured Productions
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Short films, mid-length movies, and documentary cuts crafted by CaSR students.
              </p>
            </div>

            <Link
              to="/projects"
              data-cursor-text="ALL"
              onClick={() => sfx.playSubtleChime()}
              className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 self-start md:self-auto group"
            >
              <span>View All Productions ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-cursor-text="FILM"
                className="rounded-3xl bg-[#0e0e14] border border-zinc-800/90 overflow-hidden group hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40" />
                    
                    {/* Stage pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-red-400 text-[10px] font-mono font-bold uppercase">
                      Stage: {project.currentStage}
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-300 text-[10px] font-mono">
                      {project.type}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.synopsis}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-800/60">
                      <span>Dir: {project.director}</span>
                      <span>Cin: {project.cinematographer}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={() => sfx.playClapper()}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 group-hover:bg-red-600 text-zinc-200 group-hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-zinc-800 group-hover:border-red-500/40 transition-all"
                  >
                    <span>Production Dossier & Script</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIRAL REELS REEL TRACKER TEASER */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/40 text-amber-400 font-mono text-xs font-bold uppercase">
                ZONE 03 PIPELINE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-2">
                Reels & Viral Content Factory
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                High-frequency vertical video formats: Campus Stories, BTS, and Cinematic Spotlights.
              </p>
            </div>

            <Link
              to="/admin/reels"
              data-cursor-text="PIPELINE"
              onClick={() => sfx.playSubtleChime()}
              className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group"
            >
              <span>Explore 7-Stage Reel Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredReels.map((reel) => (
              <div
                key={reel.id}
                data-cursor-text="REEL"
                className="p-5 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-950/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] font-bold">
                      {reel.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/40 text-amber-300 font-mono text-[10px] font-bold">
                      {reel.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5 line-clamp-2">
                    {reel.concept}
                  </h4>

                  <p className="text-[11px] font-mono text-zinc-400 mb-3">
                    Format: {reel.type}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{reel.views || 'In Prod'}</span>
                  </div>
                  <span>Ed: {reel.editorName}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CROSS-ZONE WORKFLOW PROTOCOL DIAGRAM */}
      <section className="py-20 bg-[#09090d] border-t border-zinc-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CrossZoneWorkflow />
      </section>

      {/* 7. UPCOMING SCREENINGS & EVENTS */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-mono text-xs font-bold uppercase">
                ZONE 05 OPERATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-2">
                Screenings, Festivals & Masterclasses
              </h2>
            </div>

            <Link
              to="/events"
              data-cursor-text="EVENTS"
              onClick={() => sfx.playSubtleChime()}
              className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 group"
            >
              <span>View All Events ({events.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                data-cursor-text="EVENT"
                className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800/50 text-emerald-300 font-mono text-xs font-bold">
                      {event.type}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {event.date} • {event.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white">
                    {event.name}
                  </h3>

                  <p className="text-xs text-zinc-400">
                    {event.objective}
                  </p>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>Venue: {event.venue}</span>
                    <span className="text-emerald-400 font-bold">Audience: {event.expectedAudience}</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Lead: {event.coordinatorName}</span>
                  <Link
                    to={`/events/${event.id}`}
                    onClick={() => sfx.playClapper()}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold"
                  >
                    View Schedule
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7.5 MOVIE CLUB LEADERSHIP SECTION */}
      <section className="py-20 bg-[#08080c] border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>EXECUTIVE GOVERNANCE</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-2">
                Movie Club Leadership
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                The core pillars directing university cinema, viral vertical storytelling, brand identity, and student film showcases.
              </p>
            </div>

            <Link
              to="/team"
              onClick={() => sfx.playSubtleChime()}
              className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 group shrink-0"
            >
              <span>View Full Leadership & Crew</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Faculty Coordinator: Mr. R. Nihal */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#14101e] via-[#0f0d17] to-[#0a0a0f] border border-purple-900/50 flex flex-col justify-between space-y-4 hover:border-purple-600/60 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-800/80 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-purple-400" />
                    <span>Faculty Coordinator</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Patron</span>
                </div>

                <div className="pt-1">
                  <h3 className="text-base font-bold text-white">
                    {facultyLeader?.name || 'Mr. R. Nihal'}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 font-semibold mt-0.5">
                    Faculty Coordinator
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Centurion University
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {facultyLeader?.bio || 'Faculty Coordinator providing institutional patronage, academic mentorship, and strategic advisory for student cinema.'}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                <span>nihal.r@cutm.ac.in</span>
              </div>
            </div>

            {/* 2. Overall MC Student Coordinator: G. Pavan Datta (Permanent & Protected) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1d0e12] via-[#140c10] to-[#0a0a0f] border-2 border-red-600/70 flex flex-col justify-between space-y-4 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-red-950/40 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-700/80 text-red-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Lock className="w-3 h-3 text-red-400" />
                    <span>Permanent Overall Lead</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/90 border border-red-700 text-[9px] font-mono text-red-400 font-bold uppercase">
                    Protected
                  </span>
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-base font-black text-white">
                      {pavanLeader?.name || 'G. Pavan Datta'}
                    </h3>
                    <span title="Permanent and protected Overall MC Student Coordinator">
                      <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    </span>
                  </div>
                  <p className="text-xs font-mono text-red-400 font-bold mt-0.5">
                    Overall MC Student Coordinator
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Reg: 2201019001 • CSE
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {pavanLeader?.bio || 'Permanent & Protected Overall MC Student Coordinator driving the creative and operational vision of CaSR Movie Club across all five production zones.'}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                <span>pavandattagedila@gmail.com</span>
              </div>
            </div>

            {/* 3. Student Coordinator: Krutisundar Behera */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#18120c] via-[#120e0a] to-[#0a0a0f] border border-amber-900/50 flex flex-col justify-between space-y-4 hover:border-amber-600/60 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-800/80 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>Student Coordinator</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Coordinator</span>
                </div>

                <div className="pt-1">
                  <h3 className="text-base font-bold text-white">
                    {krutiLeader?.name || 'Krutisundar Behera'}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 font-semibold mt-0.5">
                    Student Coordinator
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Reg: 2201019077 • CSE
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {krutiLeader?.bio || 'Student Coordinator directing social branding, multi-zone campaign execution, and creative member engagement.'}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                <span>krutisundar@casr.org</span>
              </div>
            </div>

            {/* 4. Student Social Media Coordinator: Subham Rout */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1b1016] via-[#130d12] to-[#0a0a0f] border border-pink-900/50 flex flex-col justify-between space-y-4 hover:border-pink-600/60 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-950/90 border border-pink-800/80 text-pink-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Share2 className="w-3 h-3 text-pink-400" />
                    <span>Social Media Coordinator</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Coordinator</span>
                </div>

                <div className="pt-1">
                  <h3 className="text-base font-bold text-white">
                    {subhamLeader?.name || 'Subham Rout'}
                  </h3>
                  <p className="text-xs font-mono text-pink-400 font-semibold mt-0.5">
                    Student Social Media Coordinator
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Reg: 2201019018 • CSE
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-900/40 text-[10px] text-pink-200/90 font-mono leading-relaxed">
                  📱 Responsible for coordinating and managing student social media activities across YouTube & Instagram.
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {subhamLeader?.bio || 'Student Social Media Coordinator responsible for coordinating and managing student social media activities, vertical reels, and official accounts.'}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                <span>subham.rout@casr.org</span>
              </div>
            </div>

          </div>

          {/* OFFICIAL SOCIAL MEDIA ACCOUNTS DISPLAY */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950/30 via-[#0e0e14] to-pink-950/30 border border-red-900/30 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>OFFICIAL DIGITAL OUTREACH</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Official Social Media Accounts
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  Subscribe to our official YouTube channel and follow our Instagram for campus films, trailers, reels, behind-the-scenes footage, and premiere countdowns.
                  Coordinated by <strong className="text-white">Subham Rout</strong>, Student Social Media Coordinator.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={officialYt?.url || 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-xl shadow-red-950/70 transition-all hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                  <span>FRAMES ERA CASR CUTM PKD – YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={officialIg?.url || 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2 shadow-xl shadow-pink-950/70 transition-all hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                  <span>CUTM Frame Era Vibes – Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. GRAND CALL TO ACTION / AUDITION BANNER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-red-950/80 via-zinc-900 to-black border border-red-800/60 shadow-2xl relative">
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-red-900/60 border border-red-600/40 text-red-300 font-mono text-xs font-bold uppercase tracking-wider">
              FALL AUDITIONS NOW OPEN
            </span>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready to See Your Name in the Credits?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Whether you write screenplays, operate gimbal rigs, act on camera, edit sound in 5.1, or design viral campaigns — CaSR Movie Club is your launchpad.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/join"
                data-cursor-text="AUDITION"
                onClick={() => sfx.playClapper()}
                className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-red-950/80 transition-all hover:scale-105 active:scale-95 group flex items-center gap-2"
              >
                <span>Apply for Club Membership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/team"
                onClick={() => sfx.playSubtleChime()}
                className="px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-200 font-mono text-xs font-bold"
              >
                Browse Crew Directory
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Showreel Trailer Modal */}
      {isPlayingTrailer && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl"
          >
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400">CaSR MOVIE CLUB 2026 SHOWREEL</span>
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="text-zinc-400 hover:text-white font-mono text-xs px-2 py-1 bg-zinc-800 rounded"
              >
                ✕ Close Player
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80"
                alt="Showreel Trailer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-600 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-2xl font-heading font-black text-white">
                  "Cinematic Horizon: 2026 Anthology"
                </h3>
                <p className="text-xs font-mono text-zinc-400 max-w-md">
                  Original 4K Campus Reel showcasing best directing, camera choreography, and sound design.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
