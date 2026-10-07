import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Film, Shield, Key, ArrowRight, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { isMovieClubMember, MOVIE_CLUB_MEMBERS, MovieClubMember } from '../data/movieClubMembers';
import { sfx } from '../utils/audio';

interface Props {
  initialTab?: 'student' | 'admin';
}

export const LoginPage: React.FC<Props> = ({ initialTab = 'student' }) => {
  const { setCurrentUser } = useClub();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>(initialTab);

  // Student State
  const [studentId, setStudentId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentError, setStudentError] = useState('');
  const [matchedStudent, setMatchedStudent] = useState<MovieClubMember | null>(null);

  // Admin State
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Handle Student ID change & live validation preview
  const handleStudentIdChange = (val: string) => {
    setStudentId(val);
    setStudentError('');
    if (val.trim().length >= 5) {
      const match = isMovieClubMember(val);
      setMatchedStudent(match || null);
    } else {
      setMatchedStudent(null);
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    const cleanId = studentId.trim();
    const cleanPass = studentPassword.trim();

    // 1. Registered Student Member check: DIRECT ACCESS (NO password needed!)
    const member = isMovieClubMember(cleanId);
    if (member) {
      sfx.playClapper();
      setCurrentUser({
        id: `student-${member.regNo}`,
        name: member.name,
        registrationNumber: member.regNo,
        section: 'A',
        email: member.email,
        phone: member.regNo,
        role: 'member',
        primaryZone: 'zone-movie',
        primarySkill: 'Cinematography',
        secondarySkills: ['Direction', 'Editing'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        bio: `Movie Club Member (${member.degree})`,
        joinDate: '2024-08-01',
        status: 'Active',
        tasksCompleted: 5,
        tasksPending: 1
      });
      navigate('/dashboard');
      return;
    }

    // 2. Other students / members using unique ID 'St mc' and password 'St123'
    const isIdMatch =
      cleanId.toLowerCase() === 'st mc' ||
      cleanId.toLowerCase() === 'stmc';

    const isPassMatch =
      cleanPass.toLowerCase() === 'st123' ||
      cleanPass.toLowerCase() === 'st 123';

    if (isIdMatch) {
      if (!cleanPass) {
        setStudentError("Password required! Please enter your password.");
        sfx.playSubtleChime();
        return;
      }
      if (isPassMatch) {
        sfx.playClapper();
        setCurrentUser({
          id: 'student-st-mc',
          name: 'Student Member (St mc)',
          registrationNumber: 'St mc',
          section: 'A',
          email: 'student@casrmovieclub.edu',
          phone: 'St mc',
          role: 'member',
          primaryZone: 'zone-movie',
          primarySkill: 'Cinematography',
          secondarySkills: ['Direction', 'Editing'],
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          bio: 'Authorized Movie Club Student Member',
          joinDate: '2024-08-01',
          status: 'Active',
          tasksCompleted: 5,
          tasksPending: 1
        });
        navigate('/dashboard');
        return;
      } else {
        setStudentError("Invalid Password! Please check your credentials.");
        sfx.playSubtleChime();
        return;
      }
    }

    setStudentError(
      cleanId.length >= 5
        ? `Registration Number "${cleanId}" not found in registered records.`
        : "Please enter your Student Registration Number or Student ID."
    );
    sfx.playSubtleChime();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    const cleanId = adminId.trim();
    const cleanPass = adminPassword.trim();

    const isAdminIdMatch =
      cleanId.toLowerCase() === 'casr mc' ||
      cleanId.toLowerCase() === 'casrmc';

    const isAdminPassMatch =
      cleanPass.toLowerCase() === 'mc123' ||
      cleanPass.toLowerCase() === 'mc 123';

    if (isAdminIdMatch && isAdminPassMatch) {
      sfx.playClapper();
      setCurrentUser({
        id: 'admin-casr-mc',
        name: 'Overall Coordinator (CaSR mc)',
        registrationNumber: 'CaSR mc',
        section: 'Admin',
        email: 'admin@casrmovieclub.edu',
        phone: 'CaSR mc',
        role: 'overall_coordinator',
        primaryZone: 'zone-movie',
        primarySkill: 'Executive Direction',
        secondarySkills: ['Operations Management', 'Event Planning'],
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
        bio: 'Overall Admin Coordinator for CaSR Movie Club',
        joinDate: '2024-01-01',
        status: 'Active',
        tasksCompleted: 24,
        tasksPending: 2
      });
      navigate('/admin');
    } else {
      setAdminError("Invalid Credentials! Please check your Admin ID and password.");
      sfx.playSubtleChime();
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex items-center justify-center p-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-black p-0.5 mx-auto flex items-center justify-center shadow-2xl shadow-red-950/70 group">
            <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center">
              <Film className="w-7 h-7 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-heading font-black text-white tracking-wide">
            CaSR Movie Club Portal
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Official Member & Admin Authentication Terminal
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#0e0e14] border border-zinc-800 shadow-xl">
          <button
            onClick={() => {
              sfx.playSubtleChime();
              setActiveTab('student');
            }}
            className={`py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'student'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Login</span>
          </button>

          <button
            onClick={() => {
              sfx.playSubtleChime();
              setActiveTab('admin');
            }}
            className={`py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-zinc-800/90 shadow-2xl space-y-6">
          
          {/* STUDENT LOGIN FORM */}
          {activeTab === 'student' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {studentError && (
                <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800/80 text-xs text-red-200 font-mono flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{studentError}</span>
                </div>
              )}

              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                    Student Registration Number / Student ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => handleStudentIdChange(e.target.value)}
                      placeholder="e.g. 240101120015"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono tracking-wider"
                    />
                    {matchedStudent && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Direct Access</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Password field: ONLY required for non-registered students / CaSR mc */}
                {matchedStudent ? (
                  <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/70 space-y-1 animate-in zoom-in-95 duration-150">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{matchedStudent.name} verified!</span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      {matchedStudent.degree} • No password required for registered members. Click below to enter directly.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                      Student Password
                    </label>
                    <input
                      type="password"
                      required={!matchedStudent}
                      value={studentPassword}
                      onChange={(e) => {
                        setStudentPassword(e.target.value);
                        setStudentError('');
                      }}
                      placeholder="Enter password"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/70 transition-all active:scale-[0.99]"
                >
                  <Key className="w-4 h-4" />
                  <span>{matchedStudent ? 'Direct Log In & Enter' : 'Authenticate Student Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Sample Reg Numbers Quick Dropdown */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
                  Verified Movie Club Members (Direct Access - No Password):
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {MOVIE_CLUB_MEMBERS.slice(0, 4).map((m) => (
                    <button
                      key={m.regNo}
                      type="button"
                      onClick={() => {
                        handleStudentIdChange(m.regNo);
                        setStudentPassword('');
                      }}
                      className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-left text-xs transition-colors"
                    >
                      <p className="text-white font-bold text-[11px] truncate">{m.name}</p>
                      <p className="text-[10px] font-mono text-emerald-400">{m.regNo} (Direct)</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ADMIN LOGIN FORM */}
          {activeTab === 'admin' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Admin Terminal Authentication</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Enter Admin ID and password to access the Overall Coordinator Console.
                </p>
              </div>

              {adminError && (
                <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800/80 text-xs text-red-200 font-mono flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{adminError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                    Admin ID
                  </label>
                  <input
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="Enter Admin ID"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-bold">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Admin Password"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/70 transition-all active:scale-[0.99]"
                >
                  <Key className="w-4 h-4" />
                  <span>Authenticate Admin Console</span>
                </button>
              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
