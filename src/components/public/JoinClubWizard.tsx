import React, { useState } from 'react';
import { ZoneId, ClubApplication } from '../../types';
import { 
  X, Check, Sparkles, Film, Clapperboard, Share2, 
  Calendar, UserCheck, ArrowRight, ArrowLeft, CheckCircle2, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (app: ClubApplication) => void;
}

export const JoinClubWizard: React.FC<Props> = ({ isOpen, onClose, onSubmitApplication }) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [section, setSection] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [primaryZone, setPrimaryZone] = useState<ZoneId>('zone-shortfilm');
  const [secondaryZone, setSecondaryZone] = useState<ZoneId>('zone-reels');
  const [primarySkill, setPrimarySkill] = useState('Video Editing (Premiere / DaVinci)');
  const [secondarySkills, setSecondarySkills] = useState<string[]>(['Scriptwriting', 'Cinematography']);
  const [experience, setExperience] = useState('');
  const [learningInterests, setLearningInterests] = useState<string[]>(['Color Grading', 'Direction']);
  const [portfolioLink, setPortfolioLink] = useState('');

  if (!isOpen) return null;

  const handleToggleSecondarySkill = (skill: string) => {
    if (secondarySkills.includes(skill)) {
      setSecondarySkills(secondarySkills.filter(s => s !== skill));
    } else {
      setSecondarySkills([...secondarySkills, skill]);
    }
  };

  const handleToggleInterest = (interest: string) => {
    if (learningInterests.includes(interest)) {
      setLearningInterests(learningInterests.filter(i => i !== interest));
    } else {
      setLearningInterests([...learningInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playCinematicBoom();

    const newApp: ClubApplication = {
      id: `app-${Date.now()}`,
      fullName: fullName || 'New Applicant',
      regNumber: regNumber || '2401019999',
      section: section || 'CSE-A',
      phone: phone || '+91 98000 00000',
      email: email || 'applicant@casr.org',
      primaryZone,
      secondaryZone,
      primarySkill,
      secondarySkills,
      experience: experience || 'Passionate student eager to learn and collaborate with CaSR Movie Club team.',
      learningInterests,
      portfolioLink,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending'
    };

    onSubmitApplication(newApp);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback if canvas confetti fails
    }
  };

  const zonesList: { id: ZoneId; code: string; name: string; icon: string }[] = [
    { id: 'zone-movie', code: '01', name: 'Movie Making', icon: 'Film' },
    { id: 'zone-shortfilm', code: '02', name: 'Short Film', icon: 'Clapperboard' },
    { id: 'zone-reels', code: '03', name: 'Reels & Viral', icon: 'Sparkles' },
    { id: 'zone-social', code: '04', name: 'Social & Branding', icon: 'Share2' },
    { id: 'zone-events', code: '05', name: 'Event Management', icon: 'Calendar' }
  ];

  const skillOptions = [
    'Scriptwriting & Story Architecture',
    'Film Direction & Blocking',
    'Cinematography & Camera Rigs',
    'Video Editing (Premiere / DaVinci)',
    'Sound Design & Foley Mixing',
    'Color Grading & Color Science',
    'Poster Art & Graphic Design',
    'Social Media Copy & Strategy',
    'On-Camera Acting & Dialogue',
    'Event Logistics & Host / Emcee'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#111116] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-11 h-11 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Frame Era Movie Club"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">Join Frame Era Movie Club</h3>
              <p className="text-xs text-zinc-400 font-mono">CaSR CUTM • Official Membership Application</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {!isSubmitted && (
          <div className="px-6 py-3 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  step === num 
                    ? 'bg-red-600 text-white ring-2 ring-red-500/50' 
                    : step > num 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {step > num ? <Check className="w-3.5 h-3.5" /> : num}
                </div>
                <span className="hidden sm:inline text-[11px] font-mono text-zinc-400">
                  {num === 1 && 'Personal'}
                  {num === 2 && 'Zones'}
                  {num === 3 && 'Skills'}
                  {num === 4 && 'Story'}
                  {num === 5 && 'Goals'}
                  {num === 6 && 'Review'}
                </span>
                {num < 6 && <div className="hidden sm:block w-4 h-0.5 bg-zinc-800"></div>}
              </div>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[60vh]">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-heading font-black text-white">Application Submitted!</h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying, <strong className="text-white">{fullName || 'Creator'}</strong>! Your application has been logged into the CaSR Movie Club registry.
              </p>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 max-w-md mx-auto text-left space-y-1">
                <p>• Primary Zone Selected: <strong className="text-red-400 uppercase">{primaryZone.replace('zone-', '')}</strong></p>
                <p>• Registration: <strong className="text-zinc-200">{regNumber || '2401019999'}</strong></p>
                <p>• Status: <strong className="text-amber-400">Pending Review by Coordinators</strong></p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide shadow-lg"
              >
                Close Application Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-red-400">
                    Step 1: Your Personal & College Information
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Debasish Swain"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Registration Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2401019150"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Branch & Section *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CSE-A"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. student@casr.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Zone Preferences */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-red-400 mb-1">
                      Step 2: Choose Your Creative Zones
                    </h4>
                    <p className="text-xs text-zinc-400">Select where your core passion and secondary interests lie.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-zinc-200">PRIMARY ZONE (Your Main Focus) *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {zonesList.map((z) => (
                        <div
                          key={z.id}
                          onClick={() => {
                            sfx.playSubtleChime();
                            setPrimaryZone(z.id);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                            primaryZone === z.id
                              ? 'bg-red-950/80 border-red-500 text-white shadow-md'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-red-400">Zone {z.code}</span>
                          <span className="text-xs font-bold text-zinc-100">{z.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-zinc-800">
                    <label className="block text-xs font-bold text-zinc-200">SECONDARY ZONE (Optional Cross-Zone Interest)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {zonesList.map((z) => (
                        <div
                          key={z.id}
                          onClick={() => {
                            sfx.playSubtleChime();
                            setSecondaryZone(z.id);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                            secondaryZone === z.id
                              ? 'bg-purple-950/80 border-purple-500 text-white shadow-md'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-purple-400">Zone {z.code}</span>
                          <span className="text-xs font-bold text-zinc-100">{z.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Skills */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-red-400 mb-1">
                      Step 3: What Skills Do You Bring?
                    </h4>
                    <p className="text-xs text-zinc-400">No prior professional experience required — we value enthusiasm and willingness to learn!</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-2">PRIMARY SKILL</label>
                    <select
                      value={primarySkill}
                      onChange={(e) => setPrimarySkill(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      {skillOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-2">ADDITIONAL SKILLS (Click to multi-select)</label>
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.map((opt) => {
                        const isSelected = secondarySkills.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => handleToggleSecondarySkill(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                              isSelected
                                ? 'bg-red-600 text-white font-bold shadow-sm'
                                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Experience */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-red-400 mb-1">
                      Step 4: Your Creative Experience
                    </h4>
                    <p className="text-xs text-zinc-400">Tell us briefly about any past films, videos, design, or writing you have done.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Past Experience or Projects</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. I have edited short reels for my school fest, written two short stories, and know the basics of DaVinci Resolve color grading..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Portfolio / Drive / YouTube Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/@yourchannel or drive link"
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Goals */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-red-400 mb-1">
                      Step 5: What Do You Want to Learn at CaSR?
                    </h4>
                    <p className="text-xs text-zinc-400">Select topics you want hands-on club training in.</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      'Anamorphic Cinematography',
                      'Directing Actors on Set',
                      'Screenplay Formatting',
                      'Multi-Track Audio Mixing',
                      'DaVinci Resolve Color Science',
                      'Gimbal & Motion Control',
                      'Viral Reel Algorithms',
                      'Key Art Poster Typography',
                      'Stage & AV Coordination',
                      'Film Festival Submission SOP'
                    ].map((interest) => {
                      const isSelected = learningInterests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => handleToggleInterest(interest)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{interest}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Review & Submit */}
              {step === 6 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Step 6: Review Your Application
                    </h4>
                    <p className="text-xs text-zinc-400">Please verify your details before submitting to the executive board.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs font-mono">
                    <p><strong className="text-zinc-400">Full Name:</strong> <span className="text-white font-bold">{fullName || 'Not specified'}</span></p>
                    <p><strong className="text-zinc-400">Reg & Section:</strong> <span className="text-white">{regNumber || 'N/A'} ({section || 'N/A'})</span></p>
                    <p><strong className="text-zinc-400">Email / Phone:</strong> <span className="text-white">{email} • {phone}</span></p>
                    <p><strong className="text-zinc-400">Primary Zone:</strong> <span className="text-red-400 font-bold uppercase">{primaryZone.replace('zone-', '')}</span></p>
                    <p><strong className="text-zinc-400">Primary Skill:</strong> <span className="text-amber-400 font-bold">{primarySkill}</span></p>
                    <p><strong className="text-zinc-400">Secondary Skills:</strong> <span className="text-zinc-300">{secondarySkills.join(', ') || 'None selected'}</span></p>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playSubtleChime();
                      setStep(step - 1);
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClapper();
                      setStep(step + 1);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-950/40"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Membership Application</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
