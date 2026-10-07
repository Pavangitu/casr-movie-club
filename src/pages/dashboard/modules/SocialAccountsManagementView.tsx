import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Share2, Youtube, Instagram, Facebook, ExternalLink, Copy, Check, 
  CheckCircle2, Shield, Eye, Plus, Edit3, Trash2, Users, Radio, 
  Globe, Sparkles, Filter, Search, X, AlertCircle, Grid, List,
  TrendingUp, Award, ArrowUpRight, Lock
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { SocialAccount, SocialAccountPlatform } from '../../../types';
import { sfx } from '../../../utils/audio';

interface Props {
  viewOnly?: boolean;
}

const PLATFORM_CONFIG: Record<SocialAccountPlatform, {
  name: string;
  icon: React.ElementType;
  badgeColor: string;
  borderColor: string;
  hoverBorder: string;
  accentBg: string;
  brandColor: string;
  gradient: string;
  urlPrefix: string;
  metricLabel: string;
}> = {
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    badgeColor: 'bg-red-950/80 text-red-300 border-red-800',
    borderColor: 'border-red-900/40',
    hoverBorder: 'hover:border-red-600',
    accentBg: 'bg-red-950/30',
    brandColor: 'text-red-500',
    gradient: 'from-red-600 to-red-900',
    urlPrefix: 'https://youtube.com/@',
    metricLabel: 'Subscribers'
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    badgeColor: 'bg-pink-950/80 text-pink-300 border-pink-800',
    borderColor: 'border-pink-900/40',
    hoverBorder: 'hover:border-pink-600',
    accentBg: 'bg-pink-950/30',
    brandColor: 'text-pink-400',
    gradient: 'from-pink-600 via-purple-600 to-amber-600',
    urlPrefix: 'https://instagram.com/',
    metricLabel: 'Followers'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-800',
    borderColor: 'border-blue-900/40',
    hoverBorder: 'hover:border-blue-600',
    accentBg: 'bg-blue-950/30',
    brandColor: 'text-blue-400',
    gradient: 'from-blue-600 to-indigo-800',
    urlPrefix: 'https://facebook.com/',
    metricLabel: 'Followers'
  }
};

export const SocialAccountsManagementView: React.FC<Props> = ({ viewOnly: propViewOnly }) => {
  const { 
    currentUser, 
    socialAccounts, 
    leadership,
    addSocialAccount, 
    updateSocialAccount, 
    removeSocialAccount, 
    toggleSocialAccountStatus 
  } = useClub();
  
  const location = useLocation();

  // Student Social Media Coordinator: Subham Rout
  const subhamCoordinator = leadership?.find(m => m.roleType === 'social_media_coordinator' || m.name.toLowerCase().includes('subham rout'));
  const officialYoutube = socialAccounts.find(a => a.platform === 'youtube' && (a.status === 'Primary' || a.id === 'soc-yt-01')) || socialAccounts.find(a => a.platform === 'youtube');
  const officialInstagram = socialAccounts.find(a => a.platform === 'instagram' && (a.status === 'Primary' || a.id === 'soc-ig-01')) || socialAccounts.find(a => a.platform === 'instagram');

  // Role verification: Master Admin and Coordinators get full admin privileges
  const isMasterAdmin = currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator';
  const isCoordinator = currentUser.role === 'zone_coordinator' || currentUser.role === 'sub_coordinator';
  const isViewOnly = propViewOnly ?? (!isMasterAdmin && !isCoordinator && !location.pathname.startsWith('/admin'));

  // Filtering & View states
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | SocialAccountPlatform>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SocialAccount | null>(null);
  const [deletingAccountId, setDeletingAccountId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    platform: 'youtube' as SocialAccountPlatform,
    accountName: '',
    handle: '',
    url: '',
    followerCount: '',
    status: 'Active' as SocialAccount['status'],
    category: 'Main Brand' as SocialAccount['category'],
    description: '',
    managedBy: '',
    contactEmail: ''
  });

  // Calculate counts per platform
  const counts = useMemo(() => {
    const total = socialAccounts.length;
    const youtube = socialAccounts.filter(a => a.platform === 'youtube').length;
    const instagram = socialAccounts.filter(a => a.platform === 'instagram').length;
    const facebook = socialAccounts.filter(a => a.platform === 'facebook').length;
    return { total, youtube, instagram, facebook };
  }, [socialAccounts]);

  // Filtered accounts list
  const filteredAccounts = useMemo(() => {
    return socialAccounts.filter(acc => {
      if (selectedPlatform !== 'all' && acc.platform !== selectedPlatform) return false;
      if (selectedCategory !== 'all' && acc.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = acc.accountName.toLowerCase().includes(q);
        const matchesHandle = acc.handle.toLowerCase().includes(q);
        const matchesDesc = acc.description.toLowerCase().includes(q);
        const matchesManager = (acc.managedBy || '').toLowerCase().includes(q);
        return matchesName || matchesHandle || matchesDesc || matchesManager;
      }
      return true;
    });
  }, [socialAccounts, selectedPlatform, selectedCategory, searchQuery]);

  // Handle Copy to Clipboard
  const handleCopyLink = (url: string, id: string) => {
    sfx.playSubtleChime();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Add Modal
  const handleOpenAddModal = (presetPlatform?: SocialAccountPlatform) => {
    sfx.playClapper();
    const plat = presetPlatform || (selectedPlatform !== 'all' ? selectedPlatform : 'youtube');
    setFormData({
      platform: plat,
      accountName: '',
      handle: plat === 'youtube' ? '@casr' : plat === 'instagram' ? '@casr.' : 'casr.',
      url: plat === 'youtube' ? 'https://www.youtube.com/@' : plat === 'instagram' ? 'https://www.instagram.com/' : 'https://www.facebook.com/',
      followerCount: '1.0K',
      status: 'Active',
      category: 'Main Brand',
      description: '',
      managedBy: `${currentUser.name} (${currentUser.role.replace('_', ' ')})`,
      contactEmail: 'social@casrmovieclub.edu'
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (acc: SocialAccount) => {
    sfx.playSubtleChime();
    setEditingAccount(acc);
    setFormData({
      platform: acc.platform,
      accountName: acc.accountName,
      handle: acc.handle,
      url: acc.url,
      followerCount: acc.followerCount,
      status: acc.status,
      category: acc.category,
      description: acc.description,
      managedBy: acc.managedBy || '',
      contactEmail: acc.contactEmail || ''
    });
  };

  // Submit Add or Edit
  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accountName.trim() || !formData.url.trim()) {
      alert('Please fill out the Account Name and valid URL.');
      return;
    }

    if (editingAccount) {
      updateSocialAccount(editingAccount.id, {
        platform: formData.platform,
        accountName: formData.accountName.trim(),
        handle: formData.handle.trim(),
        url: formData.url.trim(),
        followerCount: formData.followerCount.trim() || '—',
        status: formData.status,
        category: formData.category,
        description: formData.description.trim(),
        managedBy: formData.managedBy.trim(),
        contactEmail: formData.contactEmail.trim()
      });
      setEditingAccount(null);
    } else {
      addSocialAccount({
        platform: formData.platform,
        accountName: formData.accountName.trim(),
        handle: formData.handle.trim(),
        url: formData.url.trim(),
        followerCount: formData.followerCount.trim() || '—',
        status: formData.status,
        category: formData.category,
        description: formData.description.trim(),
        managedBy: formData.managedBy.trim(),
        contactEmail: formData.contactEmail.trim()
      });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#0e0e14] to-black border border-red-900/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Share2 className="w-3 h-3 text-red-400" />
                <span>OFFICIAL DIGITAL OUTREACH HUB</span>
              </span>
              <span className="text-zinc-500 font-mono text-xs">•</span>
              
              {isViewOnly ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>Student Portal (View-Only)</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-700 text-red-300 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span>Admin Management Console</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Frame Era" className="w-full h-full object-contain" />
              </div>
              <span>Social Media Account Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl">
              Complete administrative control over CaSR Movie Club’s official <strong>YouTube</strong>, <strong>Instagram</strong>, and <strong>Facebook</strong> accounts.
              Students have transparent view access to verified handles, channel URLs, subscriber counts, and media content releases.
            </p>
          </div>

          {/* Action button for admin */}
          {!isViewOnly && (
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <button
                onClick={() => handleOpenAddModal()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950/70"
              >
                <Plus className="w-4 h-4" />
                <span>+ Connect New Account</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. STUDENT VIEW-ONLY ACCESS BANNER */}
      {isViewOnly && (
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-emerald-900/40 flex items-start gap-3 text-xs font-mono text-zinc-300">
          <Eye className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 flex-1">
            <p className="font-bold text-white flex items-center gap-2">
              <span>Student Read-Only Directory</span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-normal">
                Verified Organization Channels
              </span>
            </p>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Explore the official YouTube, Instagram, and Facebook handles of CaSR Movie Club. Direct channel links, follower counts, and verified accounts are listed below. Only club administrators can modify account URLs or credentials.
            </p>
          </div>
        </div>
      )}

      {/* 2.5 STUDENT SOCIAL MEDIA COORDINATOR SPOTLIGHT & OFFICIAL CHANNELS QUICK-ACCESS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Subham Rout Coordinator Card */}
        <div className="lg:col-span-1 p-5 rounded-3xl bg-gradient-to-br from-[#1b1017] via-[#140d13] to-[#0c0c12] border border-pink-900/50 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-950/90 border border-pink-800/80 text-pink-300 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Share2 className="w-3 h-3 text-pink-400" />
                <span>STUDENT SOCIAL MEDIA COORDINATOR</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-zinc-400 font-mono text-[9px] border border-pink-900/40">
                Lead
              </span>
            </div>

            <div className="pt-1">
              <h3 className="font-heading font-black text-white text-base truncate">
                {subhamCoordinator?.name || 'Subham Rout'}
              </h3>
              <p className="text-xs font-mono text-pink-400 font-bold truncate mt-0.5">
                {subhamCoordinator?.designation || 'Student Social Media Coordinator'}
              </p>
              <p className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                {subhamCoordinator?.department || 'Computer Science & Engineering'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-pink-950/30 border border-pink-900/40 text-[11px] font-mono text-pink-200/90 leading-relaxed">
              📱 <strong className="text-white">Designated Mandate:</strong> Subham Rout, as the Student Social Media Coordinator, is responsible for coordinating and managing student social media activities across official YouTube and Instagram accounts.
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {subhamCoordinator?.bio || 'Coordinating viral campaign ideation, YouTube premieres, Instagram video carousels, and student social media outreach.'}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="truncate">{subhamCoordinator?.email || 'subham.rout@casr.org'}</span>
            <span className="text-zinc-500">{subhamCoordinator?.phone || '+91 98619 54321'}</span>
          </div>
        </div>

        {/* Official Channels Live Control Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* YouTube Official Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1a0c0e] via-[#120a0b] to-[#0c0c12] border border-red-900/50 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold tracking-wider">OFFICIAL YOUTUBE</span>
                    <span className="block text-[9px] font-mono text-zinc-500">Public Live Channel</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 text-[9px] font-mono font-bold uppercase">
                  Primary
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-white text-base flex items-center gap-1.5">
                  <span>{officialYoutube?.accountName || 'FRAMES ERA CASR CUTM PKD'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </h4>
                <p className="text-xs font-mono text-red-400 font-bold mt-0.5">
                  {officialYoutube?.handle || '@FRAMES_ERA_CASR_CUTM_PKD'}
                </p>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {officialYoutube?.description || 'Official YouTube broadcast channel of CaSR Movie Club Centurion University PKD.'}
              </p>

              <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span className="text-zinc-500">Audience:</span>
                <span className="text-red-400 font-bold">{officialYoutube?.followerCount || '34.8K Subscribers'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
              <a
                href={officialYoutube?.url || 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-red-950/60"
              >
                <span>FRAMES ERA CASR CUTM PKD – YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {!isViewOnly && officialYoutube && (
                <button
                  onClick={() => handleOpenEditModal(officialYoutube)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1"
                  title="Admin edit YouTube details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Instagram Official Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1b0d18] via-[#120a11] to-[#0c0c12] border border-pink-900/50 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-950 border border-pink-800 flex items-center justify-center text-pink-500">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-wider">OFFICIAL INSTAGRAM</span>
                    <span className="block text-[9px] font-mono text-zinc-500">Public Live Profile</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-800 text-[9px] font-mono font-bold uppercase">
                  Primary
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-white text-base flex items-center gap-1.5">
                  <span>{officialInstagram?.accountName || 'CUTM Frame Era Vibes'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </h4>
                <p className="text-xs font-mono text-pink-400 font-bold mt-0.5">
                  {officialInstagram?.handle || '@cutm_frame_era_vibes'}
                </p>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {officialInstagram?.description || 'Official Instagram page of CaSR Movie Club Centurion University featuring campus cinema vibes and reels.'}
              </p>

              <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span className="text-zinc-500">Followers:</span>
                <span className="text-pink-400 font-bold">{officialInstagram?.followerCount || '24.6K Followers'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
              <a
                href={officialInstagram?.url || 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-pink-950/60"
              >
                <span>CUTM Frame Era Vibes – Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {!isViewOnly && officialInstagram && (
                <button
                  onClick={() => handleOpenEditModal(officialInstagram)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1"
                  title="Admin edit Instagram details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PLATFORM METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Channels */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedPlatform === 'all'
              ? 'bg-zinc-900 border-zinc-600 shadow-lg ring-1 ring-zinc-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Total Accounts</span>
            <Globe className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl font-black font-mono text-white mt-2">{counts.total}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Across 3 platforms</p>
        </button>

        {/* YouTube */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('youtube'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedPlatform === 'youtube'
              ? 'bg-red-950/40 border-red-600 shadow-lg shadow-red-950/50 ring-1 ring-red-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-red-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-red-300">YouTube</span>
            <Youtube className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-black font-mono text-red-400 mt-2">{counts.youtube}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Channels & Live Hubs</p>
        </button>

        {/* Instagram */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('instagram'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedPlatform === 'instagram'
              ? 'bg-pink-950/40 border-pink-600 shadow-lg shadow-pink-950/50 ring-1 ring-pink-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-pink-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-pink-300">Instagram</span>
            <Instagram className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-black font-mono text-pink-400 mt-2">{counts.instagram}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Handles & Reels</p>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('facebook'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedPlatform === 'facebook'
              ? 'bg-blue-950/40 border-blue-600 shadow-lg shadow-blue-950/50 ring-1 ring-blue-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-blue-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-blue-300">Facebook</span>
            <Facebook className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black font-mono text-blue-400 mt-2">{counts.facebook}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Pages & Community</p>
        </button>
      </div>

      {/* 4. PLATFORM SWITCHER TABS & CONTROLS */}
      <div className="space-y-3">
        {/* Module Switcher Tabs */}
        <div className="bg-[#0c0c11] p-1.5 rounded-2xl border border-zinc-800 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
          {/* All */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedPlatform === 'all'
                ? 'bg-zinc-800 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All Platforms</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.total}</span>
          </button>

          {/* YouTube */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('youtube'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedPlatform === 'youtube'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube ({counts.youtube})</span>
          </button>

          {/* Instagram */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('instagram'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram ({counts.instagram})</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedPlatform('facebook'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedPlatform === 'facebook'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook ({counts.facebook})</span>
          </button>
        </div>

        {/* Search, Category Filter & View Mode */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0e0e14] border border-zinc-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search account by channel name, handle, or manager..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-zinc-500 font-mono focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
            >
              <option value="all">All Categories</option>
              <option value="Main Brand">Main Brand</option>
              <option value="Short Films & Premieres">Short Films & Premieres</option>
              <option value="Behind The Scenes">Behind The Scenes</option>
              <option value="Events & Live">Events & Live</option>
              <option value="Community">Community</option>
            </select>

            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => { sfx.playSubtleChime(); setViewMode('grid'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Grid Cards"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => { sfx.playSubtleChime(); setViewMode('table'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ACCOUNTS DISPLAY: GRID CARDS OR TABLE */}
      {filteredAccounts.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0e0e14] border border-zinc-800 text-center space-y-3">
          <Share2 className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold font-heading text-white">No social media accounts found</h3>
          <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search criteria or category filter.'
              : 'No accounts are currently registered in this section.'}
          </p>
          {!isViewOnly && (
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect First Account</span>
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map(account => {
            const config = PLATFORM_CONFIG[account.platform];
            const Icon = config.icon;
            const isCopied = copiedId === account.id;

            return (
              <div
                key={account.id}
                className={`p-5 rounded-3xl bg-[#0e0e14] border ${config.borderColor} ${config.hoverBorder} transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xl hover:shadow-2xl relative group`}
              >
                {/* Top Badge & Platform */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl ${config.accentBg} border ${config.borderColor} flex items-center justify-center shadow-md ${config.brandColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${config.brandColor}`}>
                          {config.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase border ${
                            account.status === 'Primary' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                            account.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                            'bg-zinc-900 text-zinc-400 border-zinc-700'
                          }`}>
                            {account.status}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">• {account.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Edit/Delete Actions */}
                    {!isViewOnly && (
                      <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditModal(account)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                          title="Edit Account Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingAccountId(account.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-800 transition-colors"
                          title="Remove Account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Account Name & Handle */}
                  <div>
                    <h3 className="font-heading font-black text-white text-base leading-tight">
                      {account.accountName}
                    </h3>
                    <p className="font-mono text-xs text-red-400 font-bold mt-0.5 flex items-center gap-1.5">
                      <span>{account.handle}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 inline" />
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {account.description}
                  </p>
                </div>

                {/* Bottom Details & Links */}
                <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">{config.metricLabel}:</span>
                    <strong className="text-white font-bold">{account.followerCount}</strong>
                  </div>

                  {account.managedBy && (
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 truncate">
                      <span>In-Charge:</span>
                      <span className="text-zinc-300 truncate max-w-[170px]" title={account.managedBy}>{account.managedBy}</span>
                    </div>
                  )}

                  {/* Actions: Visit & Copy Link */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(account.url, account.id)}
                      className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
                      title="Copy URL"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-2 px-3 rounded-xl text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                        account.platform === 'youtube' ? 'bg-red-600 hover:bg-red-500 shadow-red-950/60' :
                        account.platform === 'instagram' ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 shadow-pink-950/60' :
                        'bg-blue-600 hover:bg-blue-500 shadow-blue-950/60'
                      }`}
                    >
                      <span>Visit Channel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-3xl bg-[#0e0e14] border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="p-4">Platform & Account</th>
                  <th className="p-4">Official Handle</th>
                  <th className="p-4">Audience Metrics</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Manager</th>
                  <th className="p-4 text-right">Destination</th>
                  {!isViewOnly && <th className="p-4 text-right">Admin Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredAccounts.map(account => {
                  const config = PLATFORM_CONFIG[account.platform];
                  const Icon = config.icon;
                  const isCopied = copiedId === account.id;

                  return (
                    <tr key={account.id} className="hover:bg-zinc-900/50 transition-colors">
                      {/* Platform & Account Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${config.accentBg} border ${config.borderColor} flex items-center justify-center flex-shrink-0 ${config.brandColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-white font-body text-sm leading-tight">{account.accountName}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{config.name} Channel</p>
                          </div>
                        </div>
                      </td>

                      {/* Handle */}
                      <td className="p-4">
                        <span className="font-mono font-bold text-red-400 bg-red-950/40 px-2 py-1 rounded-md border border-red-900/60 text-xs">
                          {account.handle}
                        </span>
                      </td>

                      {/* Follower Count */}
                      <td className="p-4">
                        <span className="font-bold text-white">{account.followerCount}</span>
                      </td>

                      {/* Category */}
                      <td className="p-4 text-zinc-300">
                        {account.category}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          account.status === 'Primary' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          account.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          'bg-zinc-900 text-zinc-400 border border-zinc-700'
                        }`}>
                          {account.status}
                        </span>
                      </td>

                      {/* Manager */}
                      <td className="p-4 text-zinc-400 text-[11px] truncate max-w-[150px]">
                        {account.managedBy || '—'}
                      </td>

                      {/* Visit Link & Copy */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(account.url, account.id)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
                            title="Copy Channel Link"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <a
                            href={account.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 inline-flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </a>
                        </div>
                      </td>

                      {/* Admin Actions */}
                      {!isViewOnly && (
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(account)}
                              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingAccountId(account.id)}
                              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-800"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. MODAL: ADD / CONNECT SOCIAL ACCOUNT (ADMIN ONLY) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0f0f15] border border-zinc-700 rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg">Connect Social Media Account</h3>
                  <p className="text-xs font-mono text-zinc-400">Add an official YouTube, Instagram, or Facebook account</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs font-mono">
              {/* Platform Selector (YouTube, Instagram, Facebook) */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Select Platform <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['youtube', 'instagram', 'facebook'] as SocialAccountPlatform[]).map(plat => {
                    const cfg = PLATFORM_CONFIG[plat];
                    const Icon = cfg.icon;
                    const isSelected = formData.platform === plat;

                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            platform: plat,
                            handle: plat === 'youtube' ? '@casr' : plat === 'instagram' ? '@casr.' : 'casr.',
                            url: plat === 'youtube' ? 'https://www.youtube.com/@' : plat === 'instagram' ? 'https://www.instagram.com/' : 'https://www.facebook.com/'
                          }));
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? `${cfg.badgeColor} shadow-lg ring-1 ring-white/20 font-bold`
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{cfg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Account Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Account / Channel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="e.g. CaSR Movie Club Official"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Official Handle / Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    placeholder="e.g. @casrmovieclub"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white font-bold placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Official URL */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Direct Channel / Page URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://www.youtube.com/@casrmovieclub"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Followers & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Subscribers / Followers
                  </label>
                  <input
                    type="text"
                    value={formData.followerCount}
                    onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                    placeholder="e.g. 35K Subscribers"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Active">Active</option>
                    <option value="Verified">Verified</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Category Focus
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Main Brand">Main Brand</option>
                    <option value="Short Films & Premieres">Short Films & Premieres</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                    <option value="Events & Live">Events & Live</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              {/* Manager & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Account Manager / Lead
                  </label>
                  <input
                    type="text"
                    value={formData.managedBy}
                    onChange={(e) => setFormData({ ...formData, managedBy: e.target.value })}
                    placeholder="e.g. Yamini Patnaik (Zone 04)"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="social@casrmovieclub.edu"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Channel Description / Bio
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of what content gets published on this channel..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-950/70"
                >
                  <Check className="w-4 h-4" />
                  <span>Connect Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: EDIT SOCIAL ACCOUNT (ADMIN ONLY) */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0f0f15] border border-zinc-700 rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg">Edit Social Account Details</h3>
                  <p className="text-xs font-mono text-zinc-400">Update channel URL, handle, or manager assignments</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingAccount(null)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Account / Channel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Official Handle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Subscribers / Followers
                  </label>
                  <input
                    type="text"
                    value={formData.followerCount}
                    onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Direct URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Active">Active</option>
                    <option value="Verified">Verified</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Category Focus
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Main Brand">Main Brand</option>
                    <option value="Short Films & Premieres">Short Films & Premieres</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                    <option value="Events & Live">Events & Live</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Managed By
                  </label>
                  <input
                    type="text"
                    value={formData.managedBy}
                    onChange={(e) => setFormData({ ...formData, managedBy: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-950/70"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MODAL: DELETE CONFIRMATION (ADMIN ONLY) */}
      {deletingAccountId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0f0f15] border border-red-900/60 rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading font-black text-white text-lg">Remove Social Account?</h3>
            </div>
            
            <p className="text-xs font-mono text-zinc-300 leading-relaxed">
              Are you sure you want to disconnect this official social media account?
              Students will no longer see this handle in the official directory.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeletingAccountId(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeSocialAccount(deletingAccountId);
                  setDeletingAccountId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/80"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Removal</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
