import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Film, CheckCircle2, ArrowRight, ArrowLeft, 
  Sparkles, Camera, Scissors, PenTool, Share2, Award, Heart, HelpCircle 
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ZoneId } from '../types';
import { sfx } from '../utils/audio';

export const JoinPage: React.FC = () => {
  const { zones, submitApplication } = useClub();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    section: 'Section B',
    phone: '',
    email: '',
    primaryZone: 'zone-shortfilm' as ZoneId,
    secondaryZone: 'zone-reels' as ZoneId,
    primarySkill: 'Cinematographer (Sony FX3 / DSLR)',
    secondarySkills: ['DaVinci Resolve Colorist', 'Sound Recording'] as string[],
    experience: '',
    learningInterests: ['Gimbal Operation', 'Screenplay Structuring'] as string[],
    portfolioLink: ''
  });

  const availableSkills = [
    'Screenplay Writer', 'Director', 'Cinematographer (Sony FX3 / DSLR)',
    'Gaffer / Lighting Lead', 'Sound Recordist / Boom Operator',
    'Video Editor (Premiere / DaVinci)', 'VFX / Motion Graphics (After Effects)',
    'Actor / Performer', 'Social Media Strategist', 'Graphic Designer (Photoshop / Canva)',
    'Event Operations Lead', 'Production Manager'
  ];

  const availableInterests = [
    'Gimbal & Multi-Cam Operation', 'Screenplay Structuring & Beats',
    'DaVinci Resolve Color Grading', '5.1 Surround Sound Design',
    'Viral Hook Scripting for Reels', 'Auditorium Projection & Audio Rigs',
    'Film Festival Strategy'
  ];

  const handleNext = () => {
    sfx.playClapper();
    setStep(prev => Math.min(6, prev + 1));
  };

  const handleBack = () => {
    sfx.playSubtleChime();
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playCinematicBoom();

    submitApplication({
      fullName: formData.fullName,
      regNumber: formData.regNumber,
      section: formData.section,
      phone: formData.phone,
      email: formData.email,
      primaryZone: formData.primaryZone,
      secondaryZone: formData.secondaryZone,
      primarySkill: formData.primarySkill,
      secondarySkills: formData.secondarySkills,
      experience: formData.experience || 'First-time passionate filmmaker eager to learn.',
      learningInterests: formData.learningInterests,
      portfolioLink: formData.portfolioLink
    });

    setIsSuccess(true);
  };

  const toggleSecondarySkill = (skill: string) => {
    sfx.playSubtleChime();
    setFormData(prev => ({
      ...prev,
      secondarySkills: prev.secondarySkills.includes(skill)
        ? prev.secondarySkills.filter(s => s !== skill)
        : [...prev.secondarySkills, skill]
    }));
  };

  const toggleInterest = (interest: string) => {
    sfx.playSubtleChime();
    setFormData(prev => ({
      ...prev,
      learningInterests: prev.learningInterests.includes(interest)
        ? prev.learningInterests.filter(i => i !== interest)
        : [...prev.learningInterests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            MEMBERSHIP AUDITIONS 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
            Join the CaSR Production Family
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Complete the 6-step recruitment dossier to audition for directing, technical crew, viral reels, or creative marketing.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="rounded-3xl bg-[#0e0e14] border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {isSuccess ? (
            <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-heading font-black text-white">
                  Audition Application Filed!
                </h3>
                <p className="text-sm font-mono text-zinc-300 max-w-md mx-auto">
                  Welcome to the queue, <strong className="text-red-400">{formData.fullName}</strong>. Your profile is routed to the Coordinator of <strong className="text-white">{zones.find(z => z.id === formData.primaryZone)?.name}</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto text-left font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Registration ID:</span>
                  <span className="text-white font-bold">{formData.regNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Primary Cell:</span>
                  <span className="text-red-400 font-bold">{formData.primaryZone.replace('zone-', '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Primary Skill:</span>
                  <span className="text-white font-bold truncate">{formData.primarySkill}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to="/"
                  onClick={() => sfx.playSubtleChime()}
                  className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-zinc-700"
                >
                  Return to Home
                </Link>
                <Link
                  to="/admin/members"
                  onClick={() => sfx.playClapper()}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/60"
                >
                  View in Admin Audition Queue →
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper Header */}
              <div className="mb-8 pb-6 border-b border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-red-400 font-bold">
                    STEP 0{step} OF 06: {
                      step === 1 ? 'PERSONAL DOSSIER' :
                      step === 2 ? 'CREATIVE ZONE SELECTION' :
                      step === 3 ? 'SKILLS & CRAFT' :
                      step === 4 ? 'EXPERIENCE & PORTFOLIO' :
                      step === 5 ? 'LEARNING GOALS' : 'FINAL REVIEW & SUBMIT'
                    }
                  </span>
                  <span className="text-zinc-500">{Math.round((step / 6) * 100)}% COMPLETE</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Personal Dossier */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    01. Personal Identity & Academic Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Rohan Verma"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Registration / Roll No. *</label>
                      <input
                        type="text"
                        required
                        value={formData.regNumber}
                        onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                        placeholder="e.g., 22BCSE104"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Section / Batch *</label>
                      <input
                        type="text"
                        required
                        value={formData.section}
                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                        placeholder="e.g., Section A (3rd Year)"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rohan@casr.edu"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Zone Selection */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white">
                    02. Choose Your Primary & Secondary Creative Zone
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      PRIMARY ZONE (Where you will spend 70% of your production time) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {zones.map((z) => (
                        <div
                          key={z.id}
                          onClick={() => {
                            sfx.playSubtleChime();
                            setFormData({ ...formData, primaryZone: z.id });
                          }}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.primaryZone === z.id
                              ? 'bg-red-950/80 border-red-500 shadow-lg shadow-red-950/50'
                              : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-red-400 font-bold">{z.number}</span>
                            <span className="text-[10px] font-mono text-zinc-500">Lead: {z.coordinator}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{z.name}</h4>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{z.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      SECONDARY / CROSS-ZONE INTEREST
                    </label>
                    <select
                      value={formData.secondaryZone}
                      onChange={(e) => setFormData({ ...formData, secondaryZone: e.target.value as ZoneId })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    >
                      {zones.map(z => (
                        <option key={z.id} value={z.id}>{z.number} — {z.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Craft */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white">
                    03. Core Skillset & Proficiencies
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      PRIMARY EXPERTISE *
                    </label>
                    <select
                      value={formData.primarySkill}
                      onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    >
                      {availableSkills.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      SUPPORTING SKILLS (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableSkills.map((skill) => {
                        const isSelected = formData.secondarySkills.includes(skill);
                        return (
                          <div
                            key={skill}
                            onClick={() => toggleSecondarySkill(skill)}
                            className={`p-3 rounded-xl border text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-red-950/80 border-red-500 text-white'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Experience & Portfolio */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white">
                    04. Experience & Creative Links
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Tell us about your creative background or why you want to make films *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g., Made 3 short reels for campus fest, edited on Premiere Pro for 1 year, wrote a 5-page thriller script..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Portfolio / YouTube / Instagram / Google Drive Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                      placeholder="https://instagram.com/my_portfolio or https://drive.google.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Learning Interests */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white">
                    05. What do you want to learn & master in CaSR?
                  </h3>

                  <p className="text-xs text-zinc-400">
                    We host regular internal masterclasses. Select workshops you wish to attend:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableInterests.map((interest) => {
                      const isSelected = formData.learningInterests.includes(interest);
                      return (
                        <div
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-3.5 rounded-xl border text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-950/80 border-amber-500 text-white'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span>{interest}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {step === 6 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-xl font-heading font-bold text-white">
                    06. Review Your Recruitment Dossier
                  </h3>

                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
                      <div>
                        <span className="text-zinc-500 block">NAME:</span>
                        <span className="text-white font-bold">{formData.fullName || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">REG NO:</span>
                        <span className="text-white font-bold">{formData.regNumber || 'Not provided'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
                      <div>
                        <span className="text-zinc-500 block">PRIMARY ZONE:</span>
                        <span className="text-red-400 font-bold">{formData.primaryZone.replace('zone-', '')}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">PRIMARY SKILL:</span>
                        <span className="text-white font-bold">{formData.primarySkill}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-500 block">SECONDARY SKILLS:</span>
                      <span className="text-zinc-300">{formData.secondarySkills.join(', ') || 'None selected'}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block">STATEMENT / EXPERIENCE:</span>
                      <span className="text-zinc-300 line-clamp-2">{formData.experience || 'Eager learner'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-8 mt-6 border-t border-zinc-800 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 && (!formData.fullName.trim() || !formData.regNumber.trim())}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/60"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-red-950/80"
                  >
                    <span>Submit Audition Dossier</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
