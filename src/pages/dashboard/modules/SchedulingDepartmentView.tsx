import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, Film, Share2, Clock, Plus, MapPin, Users, 
  CheckCircle2, AlertCircle, Video, Clapperboard, Sparkles, 
  Sliders, ArrowRight, Eye, CalendarDays, Bell, Camera, 
  Layers, ChevronRight, Filter, Radio
} from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { sfx } from '../../../utils/audio';

export type SchedulingModuleTab = 'short-film' | 'social-media' | 'events';

interface ShortFilmShoot {
  id: string;
  projectName: string;
  shootDay: string;
  date: string;
  callTime: string;
  wrapTime: string;
  location: string;
  scenes: string;
  director: string;
  cinematographer: string;
  castCount: number;
  crewCount: number;
  equipment: string[];
  status: 'Confirmed' | 'Scheduled' | 'In Progress' | 'Wrapped';
  notes: string;
}

const INITIAL_SHORT_FILM_SHOOTS: ShortFilmShoot[] = [
  {
    id: 'shoot-1',
    projectName: 'Shadows of the Lens',
    shootDay: 'Day 1 — Principal Photography',
    date: '2026-03-22',
    callTime: '06:00 AM',
    wrapTime: '02:00 PM',
    location: 'Campus Gate 2 & Heritage Lawn',
    scenes: 'Scene 1 (Intro) & Scene 3 (Tracking Walk)',
    director: 'Pavan Datta Gedila',
    cinematographer: 'Tumula Asish',
    castCount: 3,
    crewCount: 8,
    equipment: ['Sony FX3 Cinema Rig', 'DJI RS3 Pro Gimbal', 'Wireless Rode Go II', '50mm f/1.4 GM'],
    status: 'Confirmed',
    notes: 'Natural golden hour sunrise lighting required. Drone flight clearance approved by Campus Security.'
  },
  {
    id: 'shoot-2',
    projectName: 'Campus Chronicles',
    shootDay: 'Day 3 — Night Climax Shoot',
    date: '2026-03-24',
    callTime: '06:30 PM',
    wrapTime: '11:00 PM',
    location: 'Open Air Amphitheatre',
    scenes: 'Scene 14 (Confrontation) & Scene 15 (Climax)',
    director: 'K. Sai Varun',
    cinematographer: 'Neyyila Chandu',
    castCount: 6,
    crewCount: 12,
    equipment: ['Blackmagic 6K Pro', 'Godox SL-150W Keylights', 'Fog Machine', 'Boom Pole NTG-3'],
    status: 'Scheduled',
    notes: 'Power extension cables booked from electrical maintenance. Heavy fog effect scene.'
  },
  {
    id: 'shoot-3',
    projectName: 'Echoes in Monologue',
    shootDay: 'Day 2 — Studio Dialogue Block',
    date: '2026-03-26',
    callTime: '10:00 AM',
    wrapTime: '04:30 PM',
    location: 'Media Studio Lab 03 (Soundproof)',
    scenes: 'Scene 4, 5 & 6 (Interrogation Room)',
    director: 'Jami Jabili',
    cinematographer: 'Tumula Asish',
    castCount: 2,
    crewCount: 5,
    equipment: ['Sony FX3 Rig', 'Aputure Amaran 200d', 'Sennheiser MKH 416', 'Sound Blankets'],
    status: 'In Progress',
    notes: 'Strict silent floor policy. AC turned off during sound takes.'
  },
  {
    id: 'shoot-4',
    projectName: 'Silent Horizon (Teaser)',
    shootDay: 'Teaser & Poster Promo Shoot',
    date: '2026-03-28',
    callTime: '04:00 PM',
    wrapTime: '07:30 PM',
    location: 'Campus Lake Viewpoint',
    scenes: 'Hero Silhouette Shots & Macro Eye Closeups',
    director: 'P. Supriya Rani Patro',
    cinematographer: 'Pavan Datta',
    castCount: 1,
    crewCount: 4,
    equipment: ['Sony FX3', 'Anamorphic Lens Set', 'Reflector Gold/Silver', 'ND Filters'],
    status: 'Scheduled',
    notes: 'Sunset golden hour window: 17:45 to 18:20 PM sharp.'
  }
];

export const SchedulingDepartmentView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { events, socialPosts, projects, users, addEvent, addSocialPost, participants, socialAccounts } = useClub();
  const currentBase = location.pathname.split('/scheduling')[0] || '/admin';

  // Determine active tab from URL or internal state
  const getTabFromPath = (): SchedulingModuleTab => {
    if (location.pathname.includes('/short-film')) return 'short-film';
    if (location.pathname.includes('/social-media') || location.pathname.includes('/social')) return 'social-media';
    if (location.pathname.includes('/events')) return 'events';
    return 'short-film';
  };

  const [activeTab, setActiveTab] = useState<SchedulingModuleTab>(getTabFromPath());
  const [shortFilmShoots, setShortFilmShoots] = useState<ShortFilmShoot[]>(INITIAL_SHORT_FILM_SHOOTS);

  // Sync tab with route changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  // Form states
  const [isAddingShoot, setIsAddingShoot] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // New Shoot Form State
  const [shootForm, setShootForm] = useState({
    projectName: projects[0]?.title || 'Shadows of the Lens',
    shootDay: 'Day 1 — Shoot Call',
    date: '2026-03-25',
    callTime: '07:00 AM',
    wrapTime: '02:00 PM',
    location: 'Central Campus Lawn',
    scenes: 'Scene 2 & Scene 4',
    director: users[0]?.name || 'Pavan Datta Gedila',
    cinematographer: 'Tumula Asish',
    castCount: 4,
    crewCount: 6,
    equipment: ['Sony FX3 Rig', 'Gimbal', 'Lav Mics'],
    notes: 'Script breakdown approved.'
  });

  // New Social Form State
  const [socialForm, setSocialForm] = useState({
    title: '',
    postType: 'Official Poster' as const,
    platform: 'Instagram' as const,
    scheduledDate: '2026-03-25',
    scheduledTime: '18:00',
    caption: '',
    hashtags: '#CaSRMovieClub, #ShortFilmSchedule, #CampusCinema'
  });

  // New Event Form State
  const [eventForm, setEventForm] = useState({
    name: '',
    type: 'Screening',
    date: '2026-03-30',
    time: '18:00 - 20:30',
    venue: 'Central Auditorium',
    concept: 'Official Short Film Premiere & Director Showcase',
    expectedAudience: 200
  });

  const handleTabChange = (tab: SchedulingModuleTab) => {
    sfx.playSubtleChime();
    setActiveTab(tab);
    // Determine base path to keep navigation clean
    const currentBase = location.pathname.split('/scheduling')[0];
    navigate(`${currentBase}/scheduling/${tab}`);
  };

  const handleCreateShoot = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    const newShoot: ShortFilmShoot = {
      id: `shoot-${Date.now()}`,
      projectName: shootForm.projectName,
      shootDay: shootForm.shootDay,
      date: shootForm.date,
      callTime: shootForm.callTime,
      wrapTime: shootForm.wrapTime,
      location: shootForm.location,
      scenes: shootForm.scenes,
      director: shootForm.director,
      cinematographer: shootForm.cinematographer,
      castCount: Number(shootForm.castCount),
      crewCount: Number(shootForm.crewCount),
      equipment: shootForm.equipment,
      status: 'Confirmed',
      notes: shootForm.notes
    };
    setShortFilmShoots([newShoot, ...shortFilmShoots]);
    setIsAddingShoot(false);
  };

  const handleCreateSocial = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    const tagList = socialForm.hashtags.split(',').map(s => s.trim()).filter(Boolean);
    addSocialPost({
      title: socialForm.title,
      topic: socialForm.title,
      postType: socialForm.postType,
      contentType: socialForm.postType,
      platform: socialForm.platform,
      scheduledDate: socialForm.scheduledDate,
      scheduledTime: socialForm.scheduledTime,
      caption: socialForm.caption,
      hashtags: tagList,
      tags: tagList,
      status: 'Scheduled',
      approvalStatus: 'Approved'
    });
    setIsAddingSocial(false);
    setSocialForm({
      title: '',
      postType: 'Official Poster',
      platform: 'Instagram',
      scheduledDate: '2026-03-25',
      scheduledTime: '18:00',
      caption: '',
      hashtags: '#CaSRMovieClub, #ShortFilmSchedule'
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    addEvent({
      name: eventForm.name,
      type: eventForm.type,
      date: eventForm.date,
      time: eventForm.time,
      venue: eventForm.venue,
      concept: eventForm.concept,
      coordinatorName: users[0]?.name || 'Pavan Datta Gedila',
      expectedAudience: eventForm.expectedAudience,
      supportingTeam: ['Zone 01 Crew', 'Zone 04 PR Team'],
      activities: ['Introduction', 'Screening', 'Q&A Discussion'],
      schedule: [
        { time: eventForm.time.split('-')[0].trim(), activity: 'Audience Seating & Opening', lead: 'Event Ops' },
        { time: '18:30', activity: 'Film Showcase', lead: 'Projectionist' },
        { time: '19:45', activity: 'Q&A Panel', lead: 'Director' }
      ],
      status: 'upcoming'
    });
    setIsAddingEvent(false);
    setEventForm({
      name: '',
      type: 'Screening',
      date: '2026-03-30',
      time: '18:00 - 20:30',
      venue: 'Central Auditorium',
      concept: 'Official Short Film Premiere',
      expectedAudience: 200
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* DEPARTMENT HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#0e0e14] to-black border border-red-900/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-60 h-60 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-red-400" />
                <span>Central Timetable Hub</span>
              </span>
              <span className="text-zinc-500 font-mono text-xs">•</span>
              <span className="text-zinc-400 font-mono text-xs">Scheduling Department</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide">
              Production & Operations Scheduling
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Master schedule command center for Short Film shoot call-sheets, Social Media promotional drops, and Campus Cinema screenings.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 font-mono text-center">
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <p className="text-xs text-zinc-400">Shoots</p>
              <p className="text-lg font-bold text-red-400">{shortFilmShoots.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <p className="text-xs text-zinc-400">Social Drops</p>
              <p className="text-lg font-bold text-pink-400">{socialPosts.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <p className="text-xs text-zinc-400">Events</p>
              <p className="text-lg font-bold text-amber-400">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* THREE MODULE BARS (MODULE SWITCHER) */}
      <div className="bg-[#0c0c11] p-1.5 rounded-2xl border border-zinc-800 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-1.5">
        
        {/* Module Bar 1: Short Film */}
        <button
          onClick={() => handleTabChange('short-film')}
          className={`py-3.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2.5 transition-all ${
            activeTab === 'short-film'
              ? 'bg-red-600 text-white shadow-xl shadow-red-950/70 border border-red-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
          }`}
        >
          <Film className="w-4 h-4 flex-shrink-0" />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span>Short Film</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                activeTab === 'short-film' ? 'bg-black/40 text-red-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {shortFilmShoots.length}
              </span>
            </div>
          </div>
        </button>

        {/* Module Bar 2: Social Media */}
        <button
          onClick={() => handleTabChange('social-media')}
          className={`py-3.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2.5 transition-all ${
            activeTab === 'social-media'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl shadow-pink-950/70 border border-pink-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
          }`}
        >
          <Share2 className="w-4 h-4 flex-shrink-0" />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span>Social Media</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                activeTab === 'social-media' ? 'bg-black/40 text-pink-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {socialPosts.length}
              </span>
            </div>
          </div>
        </button>

        {/* Module Bar 3: Events */}
        <button
          onClick={() => handleTabChange('events')}
          className={`py-3.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2.5 transition-all ${
            activeTab === 'events'
              ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-xl shadow-amber-950/70 border border-amber-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
          }`}
        >
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span>Events</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                activeTab === 'events' ? 'bg-black/40 text-amber-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {events.length}
              </span>
            </div>
          </div>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: SHORT FILM SCHEDULING */}
      {/* ========================================================================= */}
      {activeTab === 'short-film' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Clapperboard className="w-5 h-5 text-red-500" />
                <span>Short Film Call-Sheets & Shoot Schedule</span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Call times, scene breakdowns, equipment bookings & cast/crew logistics
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sfx.playSubtleChime();
                  navigate(`${currentBase}/participants`);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Users className="w-3.5 h-3.5 text-red-400" />
                <span>Short Film Participants ({participants.filter(p => p.activityCategory === 'short_film').length})</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClapper();
                  setIsAddingShoot(!isAddingShoot);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/60 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingShoot ? 'Close Form' : 'Schedule New Shoot'}</span>
              </button>
            </div>
          </div>

          {/* Add Shoot Form */}
          {isAddingShoot && (
            <form onSubmit={handleCreateShoot} className="p-6 rounded-3xl bg-[#0e0e14] border border-red-900/50 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-sm font-mono font-bold text-red-400 uppercase flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <span>Create Call-Sheet / Shoot Booking</span>
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">Zone 01 Production</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Short Film Project *</label>
                  <input
                    type="text"
                    required
                    value={shootForm.projectName}
                    onChange={(e) => setShootForm({ ...shootForm, projectName: e.target.value })}
                    placeholder="e.g. Shadows of the Lens"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Shoot Day / Phase *</label>
                  <input
                    type="text"
                    required
                    value={shootForm.shootDay}
                    onChange={(e) => setShootForm({ ...shootForm, shootDay: e.target.value })}
                    placeholder="e.g. Day 1 — Principal Photography"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={shootForm.date}
                    onChange={(e) => setShootForm({ ...shootForm, date: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Call Time *</label>
                  <input
                    type="text"
                    required
                    value={shootForm.callTime}
                    onChange={(e) => setShootForm({ ...shootForm, callTime: e.target.value })}
                    placeholder="e.g. 06:00 AM"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Wrap Time</label>
                  <input
                    type="text"
                    value={shootForm.wrapTime}
                    onChange={(e) => setShootForm({ ...shootForm, wrapTime: e.target.value })}
                    placeholder="e.g. 02:00 PM"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Location / Set *</label>
                  <input
                    type="text"
                    required
                    value={shootForm.location}
                    onChange={(e) => setShootForm({ ...shootForm, location: e.target.value })}
                    placeholder="e.g. Block 3 Media Studio"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Scenes to Film *</label>
                  <input
                    type="text"
                    required
                    value={shootForm.scenes}
                    onChange={(e) => setShootForm({ ...shootForm, scenes: e.target.value })}
                    placeholder="e.g. Scene 2 (Dialogue) & Scene 4"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Director</label>
                  <input
                    type="text"
                    value={shootForm.director}
                    onChange={(e) => setShootForm({ ...shootForm, director: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Cinematographer</label>
                  <input
                    type="text"
                    value={shootForm.cinematographer}
                    onChange={(e) => setShootForm({ ...shootForm, cinematographer: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Production Notes & Safety Protocol</label>
                <textarea
                  rows={2}
                  value={shootForm.notes}
                  onChange={(e) => setShootForm({ ...shootForm, notes: e.target.value })}
                  placeholder="Battery packs charged, drone safety check, lighting setup details..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingShoot(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-950/70"
                >
                  Save Call-Sheet & Notify Crew
                </button>
              </div>
            </form>
          )}

          {/* Shoots List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortFilmShoots.map((shoot) => (
              <div 
                key={shoot.id}
                className="p-5 rounded-3xl bg-[#0e0e14] border border-zinc-800/80 hover:border-red-900/40 transition-all space-y-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 font-bold uppercase">
                      {shoot.shootDay}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      {shoot.projectName}
                    </h4>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                    shoot.status === 'Confirmed'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : shoot.status === 'In Progress'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {shoot.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span>{shoot.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{shoot.callTime} – {shoot.wrapTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="truncate">{shoot.location}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-zinc-400 font-mono text-[11px]">
                    <span className="text-zinc-500">Scenes:</span> <strong className="text-zinc-200">{shoot.scenes}</strong>
                  </p>
                  <p className="text-zinc-400 font-mono text-[11px]">
                    <span className="text-zinc-500">Director:</span> {shoot.director} • <span className="text-zinc-500">DOP:</span> {shoot.cinematographer}
                  </p>
                </div>

                {/* Equipment Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {shoot.equipment.map((eq, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1"
                    >
                      <Camera className="w-2.5 h-2.5 text-red-400" />
                      <span>{eq}</span>
                    </span>
                  ))}
                </div>

                {shoot.notes && (
                  <p className="text-[11px] font-mono text-zinc-500 italic bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/50">
                    💡 {shoot.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: SOCIAL MEDIA SCHEDULING */}
      {/* ========================================================================= */}
      {activeTab === 'social-media' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-pink-500" />
                <span>Social Media & Promotion Drop Calendar</span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Official poster reveals, teaser drops, trailer launches & reels • Coordinated by Subham Rout (Student Social Media Coordinator)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sfx.playSubtleChime();
                  navigate(`${currentBase}/participants`);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Users className="w-3.5 h-3.5 text-pink-400" />
                <span>Participants ({participants.filter(p => p.activityCategory === 'social_media').length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sfx.playSubtleChime();
                  navigate(`${currentBase}/social-accounts`);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-400" />
                <span>Official Accounts ({socialAccounts.length})</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClapper();
                  setIsAddingSocial(!isAddingSocial);
                }}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-pink-950/60 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingSocial ? 'Close Form' : 'Schedule Social Post'}</span>
              </button>
            </div>
          </div>

          {/* Add Social Form */}
          {isAddingSocial && (
            <form onSubmit={handleCreateSocial} className="p-6 rounded-3xl bg-[#0e0e14] border border-pink-900/50 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-sm font-mono font-bold text-pink-400 uppercase flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Draft Scheduled Social Media Release</span>
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">Zone 04 PR & Content</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Release Title / Topic *</label>
                  <input
                    type="text"
                    required
                    value={socialForm.title}
                    onChange={(e) => setSocialForm({ ...socialForm, title: e.target.value })}
                    placeholder="e.g. Official Teaser Drop — 'Shadows of the Lens'"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Asset Format *</label>
                  <select
                    value={socialForm.postType}
                    onChange={(e) => setSocialForm({ ...socialForm, postType: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  >
                    <option value="Official Poster">Official Poster</option>
                    <option value="Teaser Drop">Teaser Drop</option>
                    <option value="BTS Carousel">BTS Carousel</option>
                    <option value="Story Countdowns">Story Countdown</option>
                    <option value="Member Spotlight">Member Spotlight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Platform *</label>
                  <select
                    value={socialForm.platform}
                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Both">Both (Insta + YouTube)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Scheduled Date *</label>
                  <input
                    type="date"
                    required
                    value={socialForm.scheduledDate}
                    onChange={(e) => setSocialForm({ ...socialForm, scheduledDate: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Scheduled Time *</label>
                  <input
                    type="text"
                    required
                    value={socialForm.scheduledTime}
                    onChange={(e) => setSocialForm({ ...socialForm, scheduledTime: e.target.value })}
                    placeholder="e.g. 18:00 (Prime Engagement)"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Hashtags</label>
                  <input
                    type="text"
                    value={socialForm.hashtags}
                    onChange={(e) => setSocialForm({ ...socialForm, hashtags: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Creative Caption</label>
                <textarea
                  rows={2}
                  value={socialForm.caption}
                  onChange={(e) => setSocialForm({ ...socialForm, caption: e.target.value })}
                  placeholder="Cinematic hook text and credits to be posted..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingSocial(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold shadow-lg shadow-pink-950/70"
                >
                  Lock In Scheduled Drop
                </button>
              </div>
            </form>
          )}

          {/* Social Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-3xl bg-[#0e0e14] border border-zinc-800 hover:border-pink-900/40 transition-all space-y-3.5 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-950/80 border border-pink-800 text-[10px] font-mono font-bold text-pink-300">
                    {post.postType || post.contentType || 'Social Post'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {post.platform}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                  {post.title || post.topic || 'Social Asset'}
                </h4>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>{post.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>{post.scheduledTime}</span>
                  </div>
                </div>

                {post.caption && (
                  <p className="text-[11px] font-mono text-zinc-400 line-clamp-2">
                    "{post.caption}"
                  </p>
                )}

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Status: {post.status || post.approvalStatus || (post.posted ? 'Published' : 'Scheduled')}</span>
                  </span>
                  <span className="text-zinc-500">{(post.hashtags || post.tags || []).slice(0, 2).join(' ')}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: EVENTS SCHEDULING */}
      {/* ========================================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>Auditorium Screenings, Masterclasses & Festival Timetable</span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Premieres, workshops, campus competitions, run-sheets & RSVP venue schedules
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sfx.playSubtleChime();
                  navigate(`${currentBase}/participants`);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Event Participants ({participants.filter(p => p.activityCategory === 'event').length})</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClapper();
                  setIsAddingEvent(!isAddingEvent);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/60 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingEvent ? 'Close Form' : 'Schedule Club Event'}</span>
              </button>
            </div>
          </div>

          {/* Add Event Form */}
          {isAddingEvent && (
            <form onSubmit={handleCreateEvent} className="p-6 rounded-3xl bg-[#0e0e14] border border-amber-900/50 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Cinema Event & Auditorium Slot</span>
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">Zone 03 & 04 Operations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.name}
                    onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                    placeholder="e.g. CaSR Annual Short Film Premiere 2026"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Event Type *</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  >
                    <option value="Screening">Film Screening</option>
                    <option value="Workshop">Hands-on Workshop</option>
                    <option value="Masterclass">Guest Masterclass</option>
                    <option value="Film Festival">Film Festival</option>
                    <option value="Audition">Audition & Casting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Time Slot *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="e.g. 17:30 – 20:30"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Venue / Auditorium *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    placeholder="e.g. Central Auditorium"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Event Concept & Agenda</label>
                <textarea
                  rows={2}
                  value={eventForm.concept}
                  onChange={(e) => setEventForm({ ...eventForm, concept: e.target.value })}
                  placeholder="Outline key activities, directors attending, audience targets..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold shadow-lg shadow-amber-950/70"
                >
                  Confirm Event Timetable
                </button>
              </div>
            </form>
          )}

          {/* Events List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-3xl bg-[#0e0e14] border border-zinc-800 hover:border-amber-900/40 transition-all space-y-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold uppercase">
                      {evt.type}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {evt.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    RSVP: {evt.expectedAudience}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                {evt.concept && (
                  <p className="text-xs text-zinc-400 font-body">
                    {evt.concept}
                  </p>
                )}

                {/* Event Schedule Run-sheet */}
                {evt.schedule && evt.schedule.length > 0 && (
                  <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
                      Run-Sheet Timeline:
                    </p>
                    <div className="space-y-1">
                      {evt.schedule.map((slot, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-lg">
                          <span className="text-amber-400 font-bold">{slot.time}</span>
                          <span className="truncate px-2">{slot.activity}</span>
                          <span className="text-zinc-500 text-[10px]">{slot.lead}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
