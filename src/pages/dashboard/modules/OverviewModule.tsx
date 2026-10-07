import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Film, Camera, Clapperboard, Video, Image, 
  Sparkles, Eye, X, ChevronRight, Award, Play,
  Shield, Lock, GraduationCap, Share2, Youtube, Instagram, ExternalLink
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { CreateTaskModal } from '../../../components/modals/CreateTaskModal';
import { CreateProjectModal } from '../../../components/modals/CreateProjectModal';
import { sfx } from '../../../utils/audio';

interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  zone: string;
  image: string;
  description: string;
  photographer: string;
  date: string;
}

export const OverviewModule: React.FC = () => {
  const { currentUser, leadership, socialAccounts } = useClub();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  // Leadership references
  const pavanLeader = leadership.find(m => m.isPermanent || m.name.toLowerCase().includes('pavan datta'));
  const facultyLeader = leadership.find(m => m.roleType === 'faculty_coordinator' || m.name.toLowerCase().includes('nihal'));
  const krutiLeader = leadership.find(m => m.name.toLowerCase().includes('krutisundar'));
  const subhamLeader = leadership.find(m => m.roleType === 'social_media_coordinator' || m.name.toLowerCase().includes('subham rout'));

  // Official Channels
  const officialYt = socialAccounts.find(a => a.platform === 'youtube' && (a.status === 'Primary' || a.id === 'soc-yt-01')) || socialAccounts.find(a => a.platform === 'youtube');
  const officialIg = socialAccounts.find(a => a.platform === 'instagram' && (a.status === 'Primary' || a.id === 'soc-ig-01')) || socialAccounts.find(a => a.platform === 'instagram');

  const clubGallery: GalleryPhoto[] = [
    {
      id: 'p1',
      title: 'Annual Campus Short Film Gala premiere',
      category: 'Screening & Premiere',
      zone: 'Zone 05 — Event Operations',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      description: 'Over 400+ film enthusiasts gathered at the Central Auditorium for the premiere screening of student-directed short thrillers.',
      photographer: 'PR & Media Cell',
      date: 'Feb 2025'
    },
    {
      id: 'p2',
      title: 'On-Set Cinematography for "Kaalchakra"',
      category: 'Behind The Scenes',
      zone: 'Zone 02 — Short Film Production',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      description: 'Director Pavan Datta and DP executing a night sequence with anamorphic lenses and dynamic lighting rigs.',
      photographer: 'Cinematography Team',
      date: 'Jan 2025'
    },
    {
      id: 'p3',
      title: 'Color Grading & 5.1 Surround Sound Suite',
      category: 'Post-Production',
      zone: 'Zone 01 — Feature Movie Cell',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      description: 'Editors finalizing color scopes and Foley sound design for "The Silent Echo" in the studio post-lab.',
      photographer: 'VFX & Sound Cell',
      date: 'Feb 2025'
    },
    {
      id: 'p4',
      title: 'Viral Content Shoot & Vertical Rigging',
      category: 'Reels & Media',
      zone: 'Zone 03 — Reels & Short Form',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
      description: 'Zone 03 creators crafting engaging 60-second reels and behind-the-scenes teasers for Instagram & YouTube Shorts.',
      photographer: 'Social Media Team',
      date: 'Mar 2025'
    },
    {
      id: 'p5',
      title: 'Director Script Table Read & Storyboard',
      category: 'Pre-Production',
      zone: 'Zone 01 — Feature Movie Cell',
      image: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=1200&q=80',
      description: 'Writers and lead cast analyzing character arcs and scene beats during the weekend table read session.',
      photographer: 'Script Cell',
      date: 'Jan 2025'
    },
    {
      id: 'p6',
      title: 'CineAura 2025 Festival Trophy Ceremony',
      category: 'Red Carpet & Awards',
      zone: 'Zone 05 — Event Operations',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
      description: 'Celebrating student achievement with Best Director, Best Editing, and Audience Favorite awards.',
      photographer: 'Executive Council',
      date: 'Feb 2025'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/70 via-zinc-900 to-black border border-red-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-black border border-white/20 p-1.5 shadow-xl shadow-black/80 flex items-center justify-center">
            <img src="/logo.png" alt="Frame Era" className="w-full h-full object-contain" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-red-400 font-bold uppercase">
                FRAME ERA TERMINAL • {currentUser.primaryZone.replace('zone-', 'Zone ')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Welcome back, {currentUser.name}
            </h2>
            <p className="text-xs text-zinc-300">
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              sfx.playClapper();
              setIsTaskModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/60 transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Allocate Task</span>
          </button>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsProjectModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Greenlight Film</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE LEADERSHIP & OFFICIAL SOCIAL MEDIA CHANNELS WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leadership Pillar Quick Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#120d15] via-[#0d0d12] to-black border border-red-900/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-heading font-black text-white text-base">Movie Club Leadership</h3>
                <span className="text-[10px] font-mono text-zinc-400">Core Executive Coordinators</span>
              </div>
            </div>
            <Link
              to="/admin/leadership"
              className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1 group"
            >
              <span>Manage Roster</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {/* Faculty */}
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-purple-900/40 space-y-1">
              <span className="text-[9px] text-purple-400 font-bold uppercase block">Faculty Coordinator</span>
              <p className="text-white font-bold truncate">{facultyLeader?.name || 'Mr. R. Nihal'}</p>
              <span className="text-[10px] text-zinc-500 block truncate">Centurion University</span>
            </div>

            {/* Overall MC Student Coordinator */}
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-red-800/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-red-400 font-bold uppercase block">Overall Lead</span>
                <span title="Permanent Protected">
                  <Lock className="w-2.5 h-2.5 text-red-400" />
                </span>
              </div>
              <p className="text-white font-black truncate">{pavanLeader?.name || 'G. Pavan Datta'}</p>
              <span className="text-[10px] text-zinc-500 block truncate">Overall MC Student Coordinator</span>
            </div>

            {/* Student Coordinator */}
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-amber-900/40 space-y-1">
              <span className="text-[9px] text-amber-400 font-bold uppercase block">Student Coordinator</span>
              <p className="text-white font-bold truncate">{krutiLeader?.name || 'Krutisundar Behera'}</p>
              <span className="text-[10px] text-zinc-500 block truncate">CSE • Zone Ops</span>
            </div>

            {/* Social Coordinator */}
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-pink-900/40 space-y-1">
              <span className="text-[9px] text-pink-400 font-bold uppercase block">Social Media Lead</span>
              <p className="text-white font-bold truncate">{subhamLeader?.name || 'Subham Rout'}</p>
              <span className="text-[10px] text-zinc-500 block truncate">Social Media Coordinator</span>
            </div>
          </div>
        </div>

        {/* Official Channels Quick Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#150d12] via-[#0d0d12] to-black border border-pink-900/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-pink-950 border border-pink-800 text-pink-400 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-heading font-black text-white text-base">Official Social Media</h3>
                <span className="text-[10px] font-mono text-zinc-400">Coordinated by Subham Rout</span>
              </div>
            </div>
            <Link
              to="/admin/social-accounts"
              className="text-xs font-mono font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 group"
            >
              <span>Manage Accounts</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* YouTube */}
            <a
              href={officialYt?.url || 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com'}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-zinc-950/80 border border-red-900/40 hover:border-red-600/80 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-950 text-red-500 border border-red-800 flex items-center justify-center">
                  <Youtube className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-white font-bold block group-hover:text-red-400 transition-colors">
                    FRAMES ERA CASR CUTM PKD – YouTube
                  </span>
                  <span className="text-[10px] text-zinc-500">{officialYt?.handle || '@FRAMES_ERA_CASR_CUTM_PKD'} • {officialYt?.followerCount || '34.8K'}</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* Instagram */}
            <a
              href={officialIg?.url || 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com'}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-zinc-950/80 border border-pink-900/40 hover:border-pink-600/80 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-950 text-pink-500 border border-pink-800 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-white font-bold block group-hover:text-pink-400 transition-colors">
                    CUTM Frame Era Vibes – Instagram
                  </span>
                  <span className="text-[10px] text-zinc-500">{officialIg?.handle || '@cutm_frame_era_vibes'} • {officialIg?.followerCount || '24.6K'}</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* CaSR Studio Official Gallery Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
        <div>
          <h3 className="text-xl font-heading font-black text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500" />
            <span>CaSR Studio — Official Movie Club Gallery</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">
            Behind the scenes, auditorium premieres, camera shoots, and production moments
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs font-bold">
          {clubGallery.length} Production Stills
        </span>
      </div>

      {/* Gallery Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubGallery.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              sfx.playSubtleChime();
              setActivePhoto(photo);
            }}
            className="group relative rounded-3xl bg-[#0e0e14] border border-zinc-800 overflow-hidden cursor-pointer hover:border-red-500/60 transition-all shadow-xl flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent opacity-80" />

              {/* Category Tag */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-red-400 font-mono text-[10px] font-bold uppercase">
                {photo.category}
              </span>

              {/* View Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-950">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-1">
                  {photo.zone}
                </span>
                <h4 className="text-base font-heading font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                  {photo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>By {photo.photographer}</span>
                <span className="text-red-400">{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#0e0e14] border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl space-y-0">
            <div className="relative aspect-video bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-red-950 border border-red-800 text-red-300 font-mono text-xs font-bold uppercase">
                  {activePhoto.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">{activePhoto.date}</span>
              </div>

              <h3 className="text-xl font-heading font-bold text-white">
                {activePhoto.title}
              </h3>

              <p className="text-sm text-zinc-300">
                {activePhoto.description}
              </p>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>{activePhoto.zone}</span>
                <span className="text-white font-bold">Credit: {activePhoto.photographer}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

    </div>
  );
};
