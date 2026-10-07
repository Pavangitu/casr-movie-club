import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Users, UserCheck, UserPlus, Search, Filter, Plus, Trash2, 
  Edit3, CheckCircle2, Clock, Film, Share2, Calendar, Sparkles, 
  Shield, Eye, Download, Layers, Grid, List, X, Tag, AlertCircle,
  Hash, School, Check, ArrowUpDown
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { Participant, ActivityCategory } from '../../../types';
import { MOVIE_CLUB_MEMBERS } from '../../../data/movieClubMembers';
import { sfx } from '../../../utils/audio';

interface Props {
  viewOnly?: boolean;
}

const CATEGORY_CONFIG: Record<ActivityCategory, { 
  label: string; 
  singular: string;
  icon: React.ElementType; 
  color: string; 
  bg: string; 
  border: string;
  badge: string;
  presetActivities: string[];
}> = {
  short_film: {
    label: 'Short Films',
    singular: 'Short Film',
    icon: Film,
    color: 'text-red-400',
    bg: 'bg-red-950/30',
    border: 'border-red-800/40',
    badge: 'bg-red-950 border-red-800 text-red-300',
    presetActivities: [
      'Shadows of the Lens',
      'Campus Chronicles',
      'Echoes in Monologue',
      'Silent Horizon (Teaser)',
      'The Canvas of Mind',
      'Midnight Reflections'
    ]
  },
  social_media: {
    label: 'Social Media',
    singular: 'Social Media',
    icon: Share2,
    color: 'text-pink-400',
    bg: 'bg-pink-950/30',
    border: 'border-pink-800/40',
    badge: 'bg-pink-950 border-pink-800 text-pink-300',
    presetActivities: [
      'Behind the Scenes Reels',
      'Cast Spotlight Interview Series',
      'CineVibe Weekly Trends',
      'Teaser Premiere Countdown',
      'Viral Dialogue Dub Reels',
      'Campus Cinema Reactions'
    ]
  },
  event: {
    label: 'Events',
    singular: 'Event',
    icon: Calendar,
    color: 'text-amber-400',
    bg: 'bg-amber-950/30',
    border: 'border-amber-800/40',
    badge: 'bg-amber-950 border-amber-800 text-amber-300',
    presetActivities: [
      'CineFiesta Annual Film Festival',
      'Screenwriting & Direction Masterclass',
      'Campus 48-Hour Filmmaking Challenge',
      'Open Air Cinema Night',
      'CineAura 2026: Annual Film Gala',
      'Freshers Movie Orientation'
    ]
  },
  other: {
    label: 'Other Activities',
    singular: 'Other Activity',
    icon: Sparkles,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/30',
    border: 'border-emerald-800/40',
    badge: 'bg-emerald-950 border-emerald-800 text-emerald-300',
    presetActivities: [
      'Sound Design & Foley Lab Workshop',
      'Cinematography & Rig Workshop',
      'DaVinci Resolve Color Grading Boot Camp',
      'Audition Jury Panel & Candidate Screening',
      'Drone Pilot & Aerial Cinema Training',
      'Script Pitching & Table Reads'
    ]
  }
};

export const ParticipantsManagementView: React.FC<Props> = ({ viewOnly: propViewOnly }) => {
  const { 
    currentUser, 
    participants, 
    addParticipant, 
    updateParticipant, 
    removeParticipant 
  } = useClub();
  
  const location = useLocation();

  // Determine whether current session has admin privileges or view-only access
  const isMasterAdmin = currentUser.role === 'overall_coordinator' || currentUser.role === 'faculty_coordinator';
  const isCoordinator = currentUser.role === 'zone_coordinator' || currentUser.role === 'sub_coordinator';
  
  // View-only is strictly enforced for students or when viewOnly prop is passed
  const isViewOnly = propViewOnly ?? (!isMasterAdmin && !isCoordinator && !location.pathname.startsWith('/admin'));

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState<'all' | ActivityCategory>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [deletingParticipantId, setDeletingParticipantId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    activityCategory: 'short_film' as ActivityCategory,
    activityName: 'Shadows of the Lens',
    customActivityName: '',
    assignedRole: 'Participant',
    status: 'Confirmed' as 'Confirmed' | 'Active' | 'Completed' | 'Pending',
    department: 'CSE',
    contactEmail: '',
    notes: ''
  });

  const [studentDirectorySearch, setStudentDirectorySearch] = useState('');
  const [showDirectoryPicker, setShowDirectoryPicker] = useState(false);

  // Filtered student suggestions from MOVIE_CLUB_MEMBERS
  const memberSuggestions = useMemo(() => {
    if (!studentDirectorySearch.trim()) return MOVIE_CLUB_MEMBERS.slice(0, 10);
    const q = studentDirectorySearch.toLowerCase();
    return MOVIE_CLUB_MEMBERS.filter(m => 
      m.name.toLowerCase().includes(q) || m.regNo.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [studentDirectorySearch]);

  // Aggregate participant counts per category
  const counts = useMemo(() => {
    const total = participants.length;
    const short_film = participants.filter(p => p.activityCategory === 'short_film').length;
    const social_media = participants.filter(p => p.activityCategory === 'social_media').length;
    const event = participants.filter(p => p.activityCategory === 'event').length;
    const other = participants.filter(p => p.activityCategory === 'other').length;
    return { total, short_film, social_media, event, other };
  }, [participants]);

  // Unique activity names for secondary dropdown filter
  const availableActivities = useMemo(() => {
    const list = selectedCategory === 'all'
      ? participants.map(p => p.activityName)
      : participants.filter(p => p.activityCategory === selectedCategory).map(p => p.activityName);
    return Array.from(new Set(list)).sort();
  }, [participants, selectedCategory]);

  // Filtered participants list
  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.activityCategory !== selectedCategory) {
        return false;
      }
      // Activity filter
      if (selectedActivity !== 'all' && p.activityName !== selectedActivity) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && p.status !== statusFilter) {
        return false;
      }
      // Search query (matches Name, Reg No, Activity Name, Role)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesReg = p.registrationNumber.toLowerCase().includes(q);
        const matchesActivity = p.activityName.toLowerCase().includes(q);
        const matchesRole = (p.assignedRole || '').toLowerCase().includes(q);
        return matchesName || matchesReg || matchesActivity || matchesRole;
      }
      return true;
    });
  }, [participants, selectedCategory, selectedActivity, statusFilter, searchQuery]);

  // Participants grouped by activity name (for grouped card view or overview)
  const groupedByActivity = useMemo(() => {
    const map = new Map<string, { category: ActivityCategory; list: Participant[] }>();
    filteredParticipants.forEach(p => {
      if (!map.has(p.activityName)) {
        map.set(p.activityName, { category: p.activityCategory, list: [] });
      }
      map.get(p.activityName)!.list.push(p);
    });
    return Array.from(map.entries()).map(([activityName, { category, list }]) => ({
      activityName,
      category,
      count: list.length,
      participants: list
    }));
  }, [filteredParticipants]);

  // Open Add Modal
  const handleOpenAddModal = (presetCategory?: ActivityCategory, presetActivity?: string) => {
    sfx.playClapper();
    const cat = presetCategory || (selectedCategory !== 'all' ? selectedCategory : 'short_film');
    const defaultActivity = presetActivity || CATEGORY_CONFIG[cat].presetActivities[0];
    
    setFormData({
      name: '',
      registrationNumber: '',
      activityCategory: cat,
      activityName: defaultActivity,
      customActivityName: '',
      assignedRole: 'Participant',
      status: 'Confirmed',
      department: 'CSE',
      contactEmail: '',
      notes: ''
    });
    setStudentDirectorySearch('');
    setShowDirectoryPicker(false);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (p: Participant) => {
    sfx.playSubtleChime();
    setEditingParticipant(p);
    setFormData({
      name: p.name,
      registrationNumber: p.registrationNumber,
      activityCategory: p.activityCategory,
      activityName: p.activityName,
      customActivityName: '',
      assignedRole: p.assignedRole,
      status: p.status,
      department: p.department || '',
      contactEmail: p.contactEmail || '',
      notes: p.notes || ''
    });
  };

  // Select a member from the registered directory
  const handleSelectMember = (member: typeof MOVIE_CLUB_MEMBERS[0]) => {
    sfx.playSubtleChime();
    setFormData(prev => ({
      ...prev,
      name: member.name,
      registrationNumber: member.regNo,
      department: member.degree,
      contactEmail: member.email
    }));
    setShowDirectoryPicker(false);
  };

  // Handle Form Submit (Add or Edit)
  const handleSaveParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.registrationNumber.trim()) {
      alert('Please provide both the student Name and Registration Number.');
      return;
    }

    const finalActivityName = formData.activityName === '__custom__' 
      ? (formData.customActivityName.trim() || 'General Club Activity')
      : formData.activityName;

    if (editingParticipant) {
      updateParticipant(editingParticipant.id, {
        name: formData.name.trim(),
        registrationNumber: formData.registrationNumber.trim(),
        activityCategory: formData.activityCategory,
        activityName: finalActivityName,
        assignedRole: formData.assignedRole.trim() || 'Participant',
        status: formData.status,
        department: formData.department.trim(),
        contactEmail: formData.contactEmail.trim(),
        notes: formData.notes.trim()
      });
      setEditingParticipant(null);
    } else {
      addParticipant({
        name: formData.name.trim(),
        registrationNumber: formData.registrationNumber.trim(),
        activityCategory: formData.activityCategory,
        activityName: finalActivityName,
        assignedRole: formData.assignedRole.trim() || 'Participant',
        status: formData.status,
        department: formData.department.trim(),
        contactEmail: formData.contactEmail.trim(),
        notes: formData.notes.trim()
      });
      setIsAddModalOpen(false);
    }
  };

  // Export Roster to CSV
  const handleExportCSV = () => {
    sfx.playSubtleChime();
    const headers = ['Name', 'Registration Number', 'Activity Category', 'Activity Name', 'Assigned Role', 'Status', 'Department', 'Assigned Date'];
    const rows = filteredParticipants.map(p => [
      `"${p.name}"`,
      `"${p.registrationNumber}"`,
      `"${CATEGORY_CONFIG[p.activityCategory]?.label || p.activityCategory}"`,
      `"${p.activityName}"`,
      `"${p.assignedRole}"`,
      `"${p.status}"`,
      `"${p.department || ''}"`,
      `"${p.assignedAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `casr_participants_${selectedCategory}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#0e0e14] to-black border border-red-900/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-red-600/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Users className="w-3 h-3 text-red-400" />
                <span>CENTRAL ROSTER HUB</span>
              </span>
              <span className="text-zinc-500 font-mono text-xs">•</span>
              
              {/* Access Role Indicator Badge */}
              {isViewOnly ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>Student Portal (View-Only)</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-700 text-red-300 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span>Admin Management Portal</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide flex items-center gap-3">
              <span>Participant Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl">
              Centralized participant allocation system for Short Films, Social Media drops, Campus Events, and special creative labs.
              Track total enrolled students per activity and manage real-time cast & crew listings.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
              title="Export filtered roster as CSV"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Export Roster</span>
            </button>

            {!isViewOnly && (
              <button
                onClick={() => handleOpenAddModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950/70"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Assign Participant</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. VIEW-ONLY ACCESS BANNER FOR STUDENTS */}
      {isViewOnly && (
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-emerald-900/40 flex items-start gap-3 text-xs font-mono text-zinc-300">
          <Eye className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 flex-1">
            <p className="font-bold text-white flex items-center gap-2">
              <span>Student Read-Only Directory</span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-normal">
                Verified Roll
              </span>
            </p>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              You are viewing the official activity allocation roster. You can inspect participant names, registration numbers, roles, and total counts for each activity. Only administrators can add, edit, or remove participants.
            </p>
          </div>
        </div>
      )}

      {/* 3. ACTIVITY PARTICIPANT TOTAL COUNTERS (STAT CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Overall */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedCategory('all'); setSelectedActivity('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'all'
              ? 'bg-zinc-900 border-zinc-600 shadow-lg shadow-black/60 ring-1 ring-zinc-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400">Total Enrolled</span>
            <Users className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl font-black font-mono text-white mt-2">{counts.total}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Across all activities</p>
        </button>

        {/* Short Films */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedCategory('short_film'); setSelectedActivity('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'short_film'
              ? 'bg-red-950/40 border-red-600 shadow-lg shadow-red-950/50 ring-1 ring-red-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-red-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-red-300">Short Films</span>
            <Film className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-black font-mono text-red-400 mt-2">{counts.short_film}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Cast & crew members</p>
        </button>

        {/* Social Media */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedCategory('social_media'); setSelectedActivity('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'social_media'
              ? 'bg-pink-950/40 border-pink-600 shadow-lg shadow-pink-950/50 ring-1 ring-pink-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-pink-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-pink-300">Social Media</span>
            <Share2 className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-black font-mono text-pink-400 mt-2">{counts.social_media}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Creators, hosts & editors</p>
        </button>

        {/* Events */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedCategory('event'); setSelectedActivity('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'event'
              ? 'bg-amber-950/40 border-amber-600 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-amber-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-amber-300">Events</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black font-mono text-amber-400 mt-2">{counts.event}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Screenings & organizers</p>
        </button>

        {/* Other Activities */}
        <button
          type="button"
          onClick={() => { sfx.playSubtleChime(); setSelectedCategory('other'); setSelectedActivity('all'); }}
          className={`p-4 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
            selectedCategory === 'other'
              ? 'bg-emerald-950/40 border-emerald-600 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500'
              : 'bg-[#0e0e14] border-zinc-800 hover:border-emerald-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-emerald-300">Other Activities</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black font-mono text-emerald-400 mt-2">{counts.other}</p>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">Labs, audio & workshops</p>
        </button>
      </div>

      {/* 4. ACTIVITY FILTER TABS & SEARCH CONTROLS */}
      <div className="space-y-3">
        {/* Module Category Filter Tabs */}
        <div className="bg-[#0c0c11] p-1.5 rounded-2xl border border-zinc-800 shadow-xl grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-xs">
          {/* All */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedCategory('all'); setSelectedActivity('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedCategory === 'all'
                ? 'bg-zinc-800 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Activities</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.total}</span>
          </button>

          {/* Short Films */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedCategory('short_film'); setSelectedActivity('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedCategory === 'short_film'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Short Films</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.short_film}</span>
          </button>

          {/* Social Media */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedCategory('social_media'); setSelectedActivity('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedCategory === 'social_media'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Media</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.social_media}</span>
          </button>

          {/* Events */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedCategory('event'); setSelectedActivity('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              selectedCategory === 'event'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.event}</span>
          </button>

          {/* Other */}
          <button
            onClick={() => { sfx.playSubtleChime(); setSelectedCategory('other'); setSelectedActivity('all'); }}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all col-span-2 sm:col-span-1 ${
              selectedCategory === 'other'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Other Activities</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">{counts.other}</span>
          </button>
        </div>

        {/* Search, Activity Dropdown, Status filter, and View Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0e0e14] border border-zinc-800">
          
          {/* Search by Name or Reg No */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student Name, Reg. Number, Activity, or Role..."
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

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Specific Activity Dropdown */}
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500 max-w-[200px] truncate"
            >
              <option value="all">All Specific Activities ({availableActivities.length})</option>
              {availableActivities.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            {/* View Mode Toggle: Table or Grouped Cards */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
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
              <button
                type="button"
                onClick={() => { sfx.playSubtleChime(); setViewMode('cards'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'cards' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Grouped by Activity View"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MAIN CONTENT DISPLAY: ROSTER TABLE OR GROUPED CARDS */}
      {filteredParticipants.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0e0e14] border border-zinc-800 text-center space-y-3">
          <Users className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold font-heading text-white">No participants found</h3>
          <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
            {searchQuery || selectedActivity !== 'all' || statusFilter !== 'all'
              ? 'Try resetting your search query or activity filters.'
              : 'No students are currently enrolled in this activity section.'}
          </p>
          {!isViewOnly && (
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign First Participant</span>
            </button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="rounded-3xl bg-[#0e0e14] border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="p-4">Student Participant</th>
                  <th className="p-4">Registration No.</th>
                  <th className="p-4">Assigned Activity</th>
                  <th className="p-4">Activity Category</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Enrolled Date</th>
                  {!isViewOnly && <th className="p-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredParticipants.map((p) => {
                  const catConfig = CATEGORY_CONFIG[p.activityCategory] || CATEGORY_CONFIG.other;
                  const Icon = catConfig.icon;

                  return (
                    <tr key={p.id} className="hover:bg-zinc-900/50 transition-colors group">
                      {/* Name & Department */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${catConfig.bg} border ${catConfig.border} flex items-center justify-center flex-shrink-0 text-white font-bold font-mono text-xs shadow-sm`}>
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white font-body text-sm leading-tight">{p.name}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{p.department || 'Centurion Univ.'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Registration Number */}
                      <td className="p-4">
                        <span className="font-mono font-bold text-zinc-200 bg-zinc-900/80 px-2 py-1 rounded-md border border-zinc-700/60 text-xs">
                          {p.registrationNumber}
                        </span>
                      </td>

                      {/* Activity Name */}
                      <td className="p-4">
                        <div className="space-y-0.5 max-w-[220px]">
                          <p className="font-bold text-white truncate" title={p.activityName}>{p.activityName}</p>
                          {p.notes && (
                            <p className="text-[10px] text-zinc-500 truncate" title={p.notes}>{p.notes}</p>
                          )}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase ${catConfig.badge}`}>
                          <Icon className="w-3 h-3" />
                          <span>{catConfig.singular}</span>
                        </span>
                      </td>

                      {/* Role in Activity */}
                      <td className="p-4">
                        <span className="text-zinc-300 font-semibold">{p.assignedRole || 'Participant'}</span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase inline-flex items-center gap-1.5 ${
                          p.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          p.status === 'Active' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                          p.status === 'Completed' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                          'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.status === 'Confirmed' ? 'bg-emerald-400' :
                            p.status === 'Active' ? 'bg-blue-400' :
                            p.status === 'Completed' ? 'bg-purple-400' : 'bg-amber-400'
                          }`} />
                          <span>{p.status}</span>
                        </span>
                      </td>

                      {/* Enrolled Date */}
                      <td className="p-4 text-zinc-500 text-[11px]">
                        {p.assignedAt || '—'}
                      </td>

                      {/* Admin Actions */}
                      {!isViewOnly && (
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                              title="Edit Participant / Reassign Activity"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingParticipantId(p.id)}
                              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/80 text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-800 transition-colors"
                              title="Remove Participant"
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

          {/* Footer showing total count */}
          <div className="p-4 bg-zinc-950/80 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
            <div>
              Showing <span className="font-bold text-white">{filteredParticipants.length}</span> participant{filteredParticipants.length === 1 ? '' : 's'} in current view
            </div>
            <div className="text-[11px] text-zinc-500">
              Total system records: {participants.length}
            </div>
          </div>
        </div>
      ) : (
        /* GROUPED BY ACTIVITY VIEW */
        <div className="space-y-6">
          {groupedByActivity.map(group => {
            const catConfig = CATEGORY_CONFIG[group.category] || CATEGORY_CONFIG.other;
            const Icon = catConfig.icon;

            return (
              <div 
                key={group.activityName} 
                className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 shadow-xl space-y-4"
              >
                {/* Activity Header with Total Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${catConfig.badge}`}>
                        <Icon className="w-3 h-3 inline mr-1" />
                        {catConfig.singular}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">•</span>
                      <span className="text-xs font-mono text-zinc-400">
                        Total Enrolled: <strong className="text-white">{group.count}</strong>
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-black text-white">{group.activityName}</h3>
                  </div>

                  {!isViewOnly && (
                    <button
                      onClick={() => handleOpenAddModal(group.category, group.activityName)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Plus className="w-3 h-3 text-red-500" />
                      <span>Add to this Activity</span>
                    </button>
                  )}
                </div>

                {/* Participant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.participants.map(p => (
                    <div 
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 flex flex-col justify-between space-y-3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-white font-body text-sm">{p.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-xs font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/60">
                              {p.registrationNumber}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">{p.department}</span>
                          </div>
                        </div>

                        {!isViewOnly && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1 rounded text-zinc-500 hover:text-white"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingParticipantId(p.id)}
                              className="p-1 rounded text-zinc-500 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-300 font-semibold truncate max-w-[150px]">
                          {p.assignedRole}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.status === 'Confirmed' ? 'text-emerald-400' :
                          p.status === 'Active' ? 'text-blue-400' :
                          p.status === 'Completed' ? 'text-purple-400' : 'text-amber-400'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. MODAL: ADD / ENROLL PARTICIPANT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0f0f15] border border-zinc-700 rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg">Assign Student to Activity</h3>
                  <p className="text-xs font-mono text-zinc-400">Enter student details & assign to Short Film, Social Media, Event, etc.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Pick from Registered Student Directory */}
            <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-red-500" />
                  <span>Quick Pick from Centurion University Registered Members</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowDirectoryPicker(!showDirectoryPicker)}
                  className="text-[10px] font-mono text-red-400 hover:text-red-300 underline"
                >
                  {showDirectoryPicker ? 'Hide Directory' : 'Browse Directory'}
                </button>
              </div>

              {showDirectoryPicker && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <input
                    type="text"
                    value={studentDirectorySearch}
                    onChange={(e) => setStudentDirectorySearch(e.target.value)}
                    placeholder="Search registered members by name or reg no..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-500 font-mono focus:outline-none"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1 pr-1 divide-y divide-zinc-800/60">
                    {memberSuggestions.map(member => (
                      <button
                        key={member.regNo}
                        type="button"
                        onClick={() => handleSelectMember(member)}
                        className="w-full text-left p-2 rounded-lg hover:bg-zinc-800/70 text-xs font-mono flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                      >
                        <div>
                          <span className="font-bold text-white mr-2">{member.name}</span>
                          <span className="text-[10px] text-red-400">{member.regNo}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{member.degree}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveParticipant} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Name */}
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tumula Asish"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Registration Number */}
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="e.g. 240101120015"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 font-bold"
                  />
                </div>
              </div>

              {/* Activity Category Selection */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Activity Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(CATEGORY_CONFIG) as ActivityCategory[]).map(catKey => {
                    const cfg = CATEGORY_CONFIG[catKey];
                    const Icon = cfg.icon;
                    const isSelected = formData.activityCategory === catKey;

                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            activityCategory: catKey,
                            activityName: cfg.presetActivities[0],
                            customActivityName: ''
                          });
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? `${cfg.badge} shadow-md font-bold ring-1 ring-white/20`
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{cfg.singular}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Activity Name */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Assign to Specific Activity <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  {CATEGORY_CONFIG[formData.activityCategory].presetActivities.map(act => (
                    <option key={act} value={act}>{act}</option>
                  ))}
                  <option value="__custom__">+ Enter Custom Activity Name...</option>
                </select>

                {formData.activityName === '__custom__' && (
                  <input
                    type="text"
                    required
                    value={formData.customActivityName}
                    onChange={(e) => setFormData({ ...formData, customActivityName: e.target.value })}
                    placeholder="Enter custom activity title (e.g. Monsoon Short Film Project)"
                    className="w-full mt-2 bg-zinc-900 border border-red-800/80 rounded-xl px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none"
                  />
                )}
              </div>

              {/* Role in Activity & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Assigned Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.assignedRole}
                    onChange={(e) => setFormData({ ...formData, assignedRole: e.target.value })}
                    placeholder="e.g. Lead Actor, DOP, Editor, Anchor"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Participation Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Department / Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Department / Section
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. CSE-A / B.Tech"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Internal Notes / Remarks
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Attending morning shoot block"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>
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
                  <span>Assign to Activity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: EDIT PARTICIPANT */}
      {editingParticipant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0f0f15] border border-zinc-700 rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg">Update Participant Details</h3>
                  <p className="text-xs font-mono text-zinc-400">Edit participant details or reassign to another activity</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingParticipant(null)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveParticipant} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 font-bold"
                  />
                </div>
              </div>

              {/* Activity Category Selection */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Activity Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(CATEGORY_CONFIG) as ActivityCategory[]).map(catKey => {
                    const cfg = CATEGORY_CONFIG[catKey];
                    const Icon = cfg.icon;
                    const isSelected = formData.activityCategory === catKey;

                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            activityCategory: catKey,
                            activityName: cfg.presetActivities[0],
                            customActivityName: ''
                          });
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? `${cfg.badge} shadow-md font-bold ring-1 ring-white/20`
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{cfg.singular}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Activity Name */}
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px] font-bold">
                  Assigned Activity <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  {CATEGORY_CONFIG[formData.activityCategory].presetActivities.map(act => (
                    <option key={act} value={act}>{act}</option>
                  ))}
                  <option value="__custom__">+ Custom Activity Name...</option>
                </select>

                {formData.activityName === '__custom__' && (
                  <input
                    type="text"
                    required
                    value={formData.customActivityName}
                    onChange={(e) => setFormData({ ...formData, customActivityName: e.target.value })}
                    placeholder="Enter custom activity title"
                    className="w-full mt-2 bg-zinc-900 border border-red-800/80 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                )}
              </div>

              {/* Role in Activity & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Assigned Role
                  </label>
                  <input
                    type="text"
                    value={formData.assignedRole}
                    onChange={(e) => setFormData({ ...formData, assignedRole: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Participation Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Department & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Department / Section
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px] font-bold">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingParticipant(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-950/70"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MODAL: DELETE CONFIRMATION */}
      {deletingParticipantId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0f0f15] border border-red-900/60 rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading font-black text-white text-lg">Remove Participant?</h3>
            </div>
            
            <p className="text-xs font-mono text-zinc-300 leading-relaxed">
              Are you sure you want to remove this student participant from the activity roster?
              This action will unassign them from the activity.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeletingParticipantId(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeParticipant(deletingParticipantId);
                  setDeletingParticipantId(null);
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
