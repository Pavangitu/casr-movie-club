import React, { useState } from 'react';
import { 
  Shield, Award, Lock, Plus, Search, Edit3, Trash2, Mail, Phone, 
  ExternalLink, CheckCircle2, AlertTriangle, UserCheck, Star, 
  Sparkles, GraduationCap, X, ChevronRight, User, Share2, Youtube, Instagram
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { LeadershipMember, LeadershipRoleType } from '../../../types';
import { sfx } from '../../../utils/audio';

interface Props {
  viewOnly?: boolean;
}

export const LeadershipManagementView: React.FC<Props> = ({ viewOnly = false }) => {
  const { leadership, addLeadershipMember, updateLeadershipMember, removeLeadershipMember } = useClub();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<LeadershipMember | null>(null);
  const [activeTab, setActiveTab] = useState<'grid' | 'table'>('grid');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Student Coordinator',
    roleType: 'student_coordinator' as LeadershipRoleType,
    department: 'Computer Science & Engineering',
    registrationNumber: '',
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: '',
    status: 'Active' as LeadershipMember['status'],
    term: '2024 - Present',
    order: 4
  });

  const resetForm = () => {
    setFormData({
      name: '',
      designation: 'Student Coordinator',
      roleType: 'student_coordinator',
      department: 'Computer Science & Engineering',
      registrationNumber: '',
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: '',
      status: 'Active',
      term: '2024 - Present',
      order: leadership.length + 1
    });
  };

  const handleOpenAddModal = () => {
    sfx.playClapper();
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (member: LeadershipMember) => {
    sfx.playSubtleChime();
    setEditingMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      roleType: member.roleType,
      department: member.department || '',
      registrationNumber: member.registrationNumber || '',
      email: member.email || '',
      phone: member.phone || '',
      avatar: member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: member.bio || '',
      status: member.status,
      term: member.term || '',
      order: member.order
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) return;

    addLeadershipMember({
      name: formData.name.trim(),
      designation: formData.designation.trim(),
      roleType: formData.roleType,
      department: formData.department.trim(),
      registrationNumber: formData.registrationNumber.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      avatar: formData.avatar.trim(),
      bio: formData.bio.trim(),
      status: formData.status,
      term: formData.term.trim(),
      order: Number(formData.order) || (leadership.length + 1)
    });

    setIsAddModalOpen(false);
    resetForm();
    setActionSuccessMsg(`Appointed "${formData.name}" to Leadership successfully!`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    const isPavanEditing = editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta';

    updateLeadershipMember(editingMember.id, {
      name: isPavanEditing ? 'G. Pavan Datta' : formData.name.trim(),
      designation: isPavanEditing ? 'Overall MC Student Coordinator' : formData.designation.trim(),
      roleType: isPavanEditing ? 'overall_student_coordinator' : formData.roleType,
      department: formData.department.trim(),
      registrationNumber: formData.registrationNumber.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      avatar: formData.avatar.trim(),
      bio: formData.bio.trim(),
      status: formData.status,
      term: formData.term.trim(),
      order: Number(formData.order)
    });

    const finalName = isPavanEditing ? 'G. Pavan Datta' : formData.name.trim();
    setEditingMember(null);
    setActionSuccessMsg(`Updated leadership details for "${finalName}" successfully!`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;
    
    // Strict block for protected leaders
    if (memberToDelete.isPermanent || memberToDelete.name.toLowerCase().includes('pavan datta')) {
      sfx.playErrorTone();
      alert('Permanent leadership protection active: G. Pavan Datta cannot be removed or deleted.');
      setMemberToDelete(null);
      return;
    }

    const success = removeLeadershipMember(memberToDelete.id);
    if (success) {
      setActionSuccessMsg(`Removed "${memberToDelete.name}" from Leadership directory.`);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
    setMemberToDelete(null);
  };

  // Filtered members list sorted by order
  const filteredLeadership = leadership
    .filter(m => {
      const q = search.toLowerCase();
      const matchesSearch = !q || 
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        (m.department && m.department.toLowerCase().includes(q)) ||
        (m.registrationNumber && m.registrationNumber.toLowerCase().includes(q));
      
      const matchesRole = roleFilter === 'all' || m.roleType === roleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  // Find G. Pavan Datta, Mr. R. Nihal, Krutisundar Behera, and Subham Rout
  const pavanLeader = leadership.find(m => m.isPermanent || m.name.toLowerCase().includes('pavan datta'));
  const facultyLeader = leadership.find(m => m.roleType === 'faculty_coordinator' || m.name.toLowerCase().includes('nihal'));
  const krutiLeader = leadership.find(m => m.name.toLowerCase().includes('krutisundar'));
  const subhamLeader = leadership.find(m => m.roleType === 'social_media_coordinator' || m.name.toLowerCase().includes('subham rout'));

  const getRoleBadge = (roleType: LeadershipRoleType, isPermanent?: boolean) => {
    if (isPermanent) {
      return {
        label: 'Permanent Overall Coordinator',
        bg: 'bg-red-950/90 text-red-300 border-red-700/80',
        icon: Lock
      };
    }
    switch (roleType) {
      case 'faculty_coordinator':
        return {
          label: 'Faculty Coordinator',
          bg: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
          icon: GraduationCap
        };
      case 'overall_student_coordinator':
        return {
          label: 'Overall MC Student Coordinator',
          bg: 'bg-red-950/80 text-red-300 border-red-800/60',
          icon: Shield
        };
      case 'student_coordinator':
        return {
          label: 'Student Coordinator',
          bg: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
          icon: Award
        };
      case 'social_media_coordinator':
        return {
          label: 'Student Social Media Coordinator',
          bg: 'bg-pink-950/80 text-pink-300 border-pink-800/60',
          icon: Share2
        };
      case 'coordinator':
        return {
          label: 'Coordinator',
          bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
          icon: UserCheck
        };
      default:
        return {
          label: 'Core Lead',
          bg: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
          icon: Star
        };
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Leadership</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-mono text-xs flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Pavan Datta Protected</span>
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Frame Era" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Movie Club Leadership
            </h1>
          </div>
          <p className="text-sm text-zinc-400 max-w-2xl mt-1">
            Governing authority and executive coordinators of CaSR Movie Club. Faculty patron, overall student leadership, and division coordinators.
          </p>
        </div>

        {!viewOnly && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Appoint Coordinator</span>
            </button>
          </div>
        )}
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-mono flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FOUR MAIN LEADERSHIP PILLARS SHOWCASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Faculty Coordinator: Mr. R. Nihal */}
        <div className="rounded-3xl bg-gradient-to-b from-[#13101c] to-[#0c0c12] border border-purple-900/40 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-purple-600/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-[11px] font-mono font-bold uppercase flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Faculty Coordinator</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Pillar 01</span>
            </div>

            <div className="pt-1">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {facultyLeader?.name || 'Mr. R. Nihal'}
              </h3>
              <p className="text-xs font-mono text-purple-400 font-semibold mt-0.5">
                {facultyLeader?.designation || 'Faculty Coordinator'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Centurion University
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
              {facultyLeader?.bio || 'Faculty Coordinator providing institutional patronage, academic mentorship, and strategic advisory for student cinema.'}
            </p>

            <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span className="truncate">{facultyLeader?.email || 'nihal.r@cutm.ac.in'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>{facultyLeader?.phone || '+91 94370 11223'}</span>
              </div>
            </div>
          </div>

          {!viewOnly && facultyLeader && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEditModal(facultyLeader)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Overall MC Student Coordinator: G. Pavan Datta (Permanent & Protected) */}
        <div className="rounded-3xl bg-gradient-to-b from-[#1a0e12] via-[#120d11] to-[#0c0c12] border-2 border-red-600/70 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-red-950/40 group hover:border-red-500 transition-all scale-[1.01]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-red-950 text-red-300 border border-red-600/80 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-md">
                <Lock className="w-3.5 h-3.5 text-red-400" />
                <span>Permanent Overall Coordinator</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-black/80 border border-red-800/80 text-[9px] font-mono text-red-400 font-bold uppercase">
                Protected
              </span>
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-black text-white group-hover:text-red-300 transition-colors truncate">
                  {pavanLeader?.name || 'G. Pavan Datta'}
                </h3>
                <span title="Permanent & Protected Overall MC Student Coordinator">
                  <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                </span>
              </div>
              <p className="text-xs font-mono text-red-400 font-bold truncate mt-0.5">
                {pavanLeader?.designation || 'Overall MC Student Coordinator'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                Reg: {pavanLeader?.registrationNumber || '2201019001'} • CSE
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-[10px] text-red-200/90 leading-relaxed font-mono">
              🔒 <strong className="text-white">Permanent Status:</strong> Protected Overall MC Student Coordinator. Deletion is prohibited by policy.
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {pavanLeader?.bio || 'Overall MC Student Coordinator leading the vision, cinematic productions, crew coordination, and inter-zone synergy across all divisions of CaSR Movie Club.'}
            </p>

            <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span className="truncate">{pavanLeader?.email || 'pavandattagedila@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>{pavanLeader?.phone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>

          {!viewOnly && pavanLeader && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-red-400" />
                <span>Protected</span>
              </span>
              <button
                onClick={() => handleOpenEditModal(pavanLeader)}
                className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700/80 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-red-300" />
                <span>Edit Coordinator</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Student Coordinator: Krutisundar Behera */}
        <div className="rounded-3xl bg-gradient-to-b from-[#18130e] to-[#0c0c12] border border-amber-900/40 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-amber-600/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-[11px] font-mono font-bold uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Student Coordinator</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Pillar 03</span>
            </div>

            <div className="pt-1">
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                {krutiLeader?.name || 'Krutisundar Behera'}
              </h3>
              <p className="text-xs font-mono text-amber-400 font-semibold truncate mt-0.5">
                {krutiLeader?.designation || 'Student Coordinator'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                Reg: {krutiLeader?.registrationNumber || '2201019077'} • CSE
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
              {krutiLeader?.bio || 'Student Coordinator directing social branding, multi-zone campaign execution, and production logistics across club events.'}
            </p>

            <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">{krutiLeader?.email || 'krutisundar@casr.org'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{krutiLeader?.phone || '+91 94391 87654'}</span>
              </div>
            </div>
          </div>

          {!viewOnly && krutiLeader && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEditModal(krutiLeader)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Student Social Media Coordinator: Subham Rout */}
        <div className="rounded-3xl bg-gradient-to-b from-[#1b1016] via-[#140d12] to-[#0c0c12] border border-pink-900/50 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-pink-600/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-pink-950/80 border border-pink-800/60 text-pink-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>Social Coordinator</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Pillar 04</span>
            </div>

            <div className="pt-1">
              <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors truncate">
                {subhamLeader?.name || 'Subham Rout'}
              </h3>
              <p className="text-xs font-mono text-pink-400 font-semibold truncate mt-0.5">
                {subhamLeader?.designation || 'Student Social Media Coordinator'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                Reg: {subhamLeader?.registrationNumber || '2201019018'} • CSE
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-900/40 text-[10px] text-pink-200/90 leading-relaxed font-mono">
              📱 <strong className="text-white">Role:</strong> Responsible for coordinating and managing student social media activities across YouTube & Instagram.
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {subhamLeader?.bio || 'Student Social Media Coordinator responsible for coordinating and managing student social media activities, vertical reels, and official accounts.'}
            </p>

            <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span className="truncate">{subhamLeader?.email || 'subham.rout@casr.org'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-400" />
                <span>{subhamLeader?.phone || '+91 98619 54321'}</span>
              </div>
            </div>

            {/* Direct Official Social Links */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2">
              <a
                href="https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-2 py-1 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 text-red-300 text-[10px] font-mono flex items-center justify-center gap-1 transition-colors"
              >
                <Youtube className="w-3 h-3 text-red-500" />
                <span className="truncate">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-2 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900/80 border border-pink-800/60 text-pink-300 text-[10px] font-mono flex items-center justify-center gap-1 transition-colors"
              >
                <Instagram className="w-3 h-3 text-pink-500" />
                <span className="truncate">Instagram</span>
              </a>
            </div>
          </div>

          {!viewOnly && subhamLeader && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEditModal(subhamLeader)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* FILTER & DIRECTORY CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coordinators by name, role, reg no..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
            >
              <option value="all">All Roles ({leadership.length})</option>
              <option value="faculty_coordinator">Faculty Coordinator</option>
              <option value="overall_student_coordinator">Overall MC Student Coordinator</option>
              <option value="student_coordinator">Student Coordinator</option>
              <option value="coordinator">Coordinator</option>
              <option value="core_lead">Core Lead</option>
            </select>

            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'grid' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'table' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Directory
              </button>
            </div>
          </div>
        </div>

        {/* LIST / GRID VIEW */}
        {activeTab === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeadership.map((member) => {
              const badge = getRoleBadge(member.roleType, member.isPermanent);
              const BadgeIcon = badge.icon;
              const isProtected = member.isPermanent || member.name.toLowerCase().includes('pavan datta');

              return (
                <div
                  key={member.id}
                  className={`rounded-2xl bg-[#0e0e14] border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${
                    isProtected 
                      ? 'border-red-600/60 hover:border-red-500 shadow-lg shadow-red-950/20' 
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase flex items-center gap-1 ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>

                      {isProtected ? (
                        <span className="px-2 py-0.5 rounded bg-red-950 border border-red-700 text-[10px] font-mono text-red-300 font-bold flex items-center gap-1" title="Protected Permanent Coordinator">
                          <Lock className="w-3 h-3 text-red-400" />
                          <span>Protected</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                          {member.status}
                        </span>
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-bold text-white truncate">
                          {member.name}
                        </h4>
                        {isProtected && <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                      </div>
                      <p className="text-xs font-mono text-red-400 font-semibold truncate mt-0.5">
                        {member.designation}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {member.department || 'Centurion University'}
                      </p>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    <div className="pt-2 border-t border-zinc-800/80 space-y-1 text-[11px] font-mono text-zinc-400">
                      {member.registrationNumber && (
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Reg No:</span>
                          <span className="text-zinc-300">{member.registrationNumber}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Email:</span>
                          <span className="text-zinc-300 truncate max-w-[180px]">{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Contact:</span>
                          <span className="text-zinc-300">{member.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!viewOnly && (
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditModal(member)}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {isProtected ? (
                        <span 
                          className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-500 text-xs font-mono flex items-center gap-1.5 cursor-not-allowed"
                          title="G. Pavan Datta is permanent and protected. Cannot be removed."
                        >
                          <Lock className="w-3.5 h-3.5 text-red-500" />
                          <span>Cannot Remove</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setMemberToDelete(member)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-700 hover:border-red-800 text-zinc-400 hover:text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0e0e14]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-900/90 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Coordinator</th>
                  <th className="py-3 px-4">Designation & Role</th>
                  <th className="py-3 px-4">Department / Reg No</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status & Protection</th>
                  {!viewOnly && <th className="py-3 px-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredLeadership.map((member) => {
                  const isProtected = member.isPermanent || member.name.toLowerCase().includes('pavan datta');

                  return (
                    <tr key={member.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white">
                            <span>{member.name}</span>
                            {isProtected && (
                              <span title="Protected Permanent Coordinator">
                                <Lock className="w-3.5 h-3.5 text-red-400" />
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500">{member.term || 'Active Term'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-red-400 font-bold">{member.designation}</div>
                        <div className="text-[10px] text-zinc-500 uppercase">{member.roleType.replace('_', ' ')}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{member.department || 'Centurion University'}</div>
                        {member.registrationNumber && (
                          <div className="text-[10px] text-zinc-400">Reg: {member.registrationNumber}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 space-y-0.5">
                        <div className="text-zinc-300">{member.email || '—'}</div>
                        <div className="text-zinc-500 text-[10px]">{member.phone || '—'}</div>
                      </td>
                      <td className="py-3 px-4">
                        {isProtected ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950 border border-red-700 text-red-300 font-bold text-[10px]">
                            <Lock className="w-3 h-3 text-red-400" />
                            Permanent & Protected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            {member.status}
                          </span>
                        )}
                      </td>
                      {!viewOnly && (
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(member)}
                              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                              title="Edit Coordinator"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {isProtected ? (
                              <button
                                disabled
                                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed"
                                title="Permanent coordinator cannot be deleted"
                              >
                                <Lock className="w-3.5 h-3.5 text-red-600" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setMemberToDelete(member)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition-colors"
                                title="Remove Coordinator"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD COORDINATOR MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101016] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-mono font-bold uppercase">
                Admin Management
              </span>
              <h3 className="text-xl font-heading font-black text-white">
                Appoint Coordinator / Leader
              </h3>
              <p className="text-xs text-zinc-400">
                Add an additional coordinator, faculty patron, or leadership member to CaSR Movie Club.
              </p>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Subham Rout"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Designation Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Student Coordinator, Zone Lead"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Role Classification</label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value as LeadershipRoleType })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="student_coordinator">Student Coordinator</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="core_lead">Core Lead</option>
                    <option value="faculty_coordinator">Faculty Coordinator</option>
                    <option value="overall_student_coordinator">Overall MC Student Coordinator</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Registration Number (if student)</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="e.g. 2201019055"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="coordinator@casr.org"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Term / Period</label>
                  <input
                    type="text"
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                    placeholder="e.g. 2024 - Present"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Profile Photo URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Biography / Responsibilities</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Describe key responsibilities and leadership contributions..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono shadow-lg shadow-red-950/50"
                >
                  Appoint Coordinator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COORDINATOR MODAL */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101016] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-mono font-bold uppercase">
                  Edit Leadership
                </span>
                {(editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta')) && (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Permanent Coordinator
                  </span>
                )}
              </div>
              <h3 className="text-xl font-heading font-black text-white">
                Edit {editingMember.name}
              </h3>
              <p className="text-xs text-zinc-400">
                Update leadership profile, contact information, and role designation.
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono">
              {editingMember && (editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta') && (
                <div className="p-3 rounded-2xl bg-red-950/50 border border-red-700/80 text-red-200 text-xs flex items-start gap-2.5 shadow-lg">
                  <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Protected Permanent Leadership Policy:</strong>
                    <span>G. Pavan Datta must remain a permanent and protected Overall MC Student Coordinator. The admin does not have permission to remove or delete his name. You can update his biography, photo, and contact details below.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1 flex items-center gap-1.5">
                    <span>Full Name *</span>
                    {editingMember && (editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta') && (
                      <span className="px-1.5 py-0.2 rounded bg-black border border-red-700 text-[9px] font-bold text-red-400 inline-flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> PROTECTED
                      </span>
                    )}
                  </label>
                  {editingMember && (editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta') ? (
                    <div>
                      <input
                        type="text"
                        readOnly
                        value="G. Pavan Datta"
                        className="w-full bg-zinc-950 border border-red-800/80 rounded-xl px-3 py-2 text-white font-bold cursor-not-allowed select-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                        Permanent Overall MC Student Coordinator (Protected)
                      </span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  )}
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 flex items-center gap-1.5">
                    <span>Designation Title *</span>
                    {editingMember && (editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta') && (
                      <span className="px-1.5 py-0.2 rounded bg-black border border-red-700 text-[9px] font-bold text-red-400 inline-flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> FIXED
                      </span>
                    )}
                  </label>
                  {editingMember && (editingMember.isPermanent || editingMember.name.toLowerCase().includes('pavan datta') || editingMember.id === 'lead-overall-pavan-datta') ? (
                    <div>
                      <input
                        type="text"
                        readOnly
                        value="Overall MC Student Coordinator"
                        className="w-full bg-zinc-950 border border-red-800/80 rounded-xl px-3 py-2 text-red-300 font-bold cursor-not-allowed select-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                        Core executive leadership title
                      </span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Profile Photo URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Biography / Responsibilities</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono shadow-lg shadow-red-950/50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {memberToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101016] border border-red-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800/80 text-red-500 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Remove Coordinator?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
              Are you sure you want to remove <strong className="text-white">"{memberToDelete.name}"</strong> from the Leadership directory? They will no longer appear on the public team page or leadership roster.
            </p>

            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
