import { 
  User, Zone, Task, Project, Reel, SocialMediaPost, 
  ClubEvent, ZoneReport, MeetingRecord, ClubFile, 
  NotificationItem, CreativeIdea, ClubApplication, ActivityLog,
  Participant, SocialAccount, LeadershipMember
} from '../types';

export const INITIAL_ZONES: Zone[] = [
  {
    id: 'zone-movie',
    code: 'ZONE 01',
    number: '01',
    name: 'Movie Making',
    coordinator: 'To Be Assigned',
    subCoordinator: 'To Be Assigned',
    description: 'The flagship cinematic division responsible for full-scale feature films, deep narrative exploration, comprehensive script-to-screen pipelines, and masterclass filmmaking.',
    responsibilities: [
      'Story & Concept Development',
      'Script Writing & Screenplay Architecture',
      'Storyboarding & Visual Directing',
      'Production Logistics & Crew Management',
      'Cinematography & Lighting Design',
      'Cast Auditions & Character Direction',
      'Budget Planning & Resource Allocation',
      'Shoot Scheduling & Multi-Day Production',
      'Post-Production, Color Grading & Sound Mixing',
      'Teaser, Trailer & Master Review Pipeline'
    ],
    icon: 'Film',
    color: '#e50914',
    accentGradient: 'from-red-600/20 via-red-950/40 to-transparent',
    bannerImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    activeProjectsCount: 2,
    totalMembersCount: 14,
    completedTasksCount: 38,
    stats: [
      { label: 'Feature Concepts', value: '03' },
      { label: 'Active Pipeline', value: '02' },
      { label: 'Crew Strength', value: '14' },
      { label: 'Screenings', value: '04' }
    ]
  },
  {
    id: 'zone-shortfilm',
    code: 'ZONE 02',
    number: '02',
    name: 'Short Film',
    coordinator: 'Sagar Panda',
    subCoordinator: 'Aman Baidya',
    description: 'High-impact short narrative films, festival-tier storytelling, character-driven fiction, social thrillers, and rapid creative production cycles.',
    responsibilities: [
      'Short Film Ideas & High-Concept Brainstorming',
      'Concept Development & Theme Finalization',
      'Script Writing & Dialogue Polish',
      'Peer Discussion, Table Reads & Script Review',
      'Direction, Shot Listing & Blocking',
      'Production, Cast & Crew Coordination',
      'On-Location Shooting & Sound Capture',
      'Post-Production Editing & Audio Sweetening',
      'Film Screening, Review & Festival Submissions'
    ],
    icon: 'Clapperboard',
    color: '#ff3344',
    accentGradient: 'from-rose-600/20 via-rose-950/40 to-transparent',
    bannerImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    activeProjectsCount: 4,
    totalMembersCount: 19,
    completedTasksCount: 52,
    stats: [
      { label: 'Shorts Made', value: '12' },
      { label: 'In Production', value: '04' },
      { label: 'Awards & Honors', value: '06' },
      { label: 'Active Writers', value: '08' }
    ]
  },
  {
    id: 'zone-reels',
    code: 'ZONE 03',
    number: '03',
    name: 'Reels & Viral Content',
    coordinator: 'Subham Rout (Spyro)',
    subCoordinator: 'To Be Assigned',
    description: 'Fast-paced vertical cinema, campus humor, relatable student life stories, cinematic micro-documentaries, event teasers, and algorithm-optimized storytelling.',
    responsibilities: [
      'Reel Ideas & Trending Format Ideation',
      'Concept Development & Hook Optimization',
      'Script Writing & Micro-Storyboards',
      'Acting & Dynamic On-Camera Talent',
      'Vertical Shooting, Gimbal Moves & Lighting',
      'Fast-Paced Video Editing & Beat-Sync',
      'Trend Research & Audio Track Discovery',
      'College & Campus Culture Content',
      'Event-Related Reels & Teaser Production',
      'Pre-Event Reel Production & Campaign Synergy'
    ],
    icon: 'Sparkles',
    color: '#f59e0b',
    accentGradient: 'from-amber-600/20 via-amber-950/40 to-transparent',
    bannerImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    activeProjectsCount: 6,
    totalMembersCount: 22,
    completedTasksCount: 84,
    stats: [
      { label: 'Reels Created', value: '45+' },
      { label: 'Total Views', value: '850K+' },
      { label: 'Active Weekly', value: '06' },
      { label: 'Average Viral Rate', value: '68%' }
    ]
  },
  {
    id: 'zone-social',
    code: 'ZONE 04',
    number: '04',
    name: 'Social Media & Branding',
    coordinator: 'Krutisundar Behera',
    subCoordinator: 'Spyro',
    description: 'The visual voice, design identity, digital distribution, and aesthetic curation of CaSR Movie Club across Instagram, YouTube, and digital platforms.',
    responsibilities: [
      'Official Instagram & Channel Management',
      'Strategic Content Planning & Grid Aesthetics',
      'Posters, Key Art & Motion Graphics Design',
      'Captions, Copywriting & Hashtag Optimization',
      'Social Media Content Calendar Execution',
      'Release Promotions & Digital PR',
      'Scheduled Publishing & Community Engagement',
      'Social Media Strategy & Growth Hacking',
      'Event Photography Selection & Retouching',
      'Social Media Analytics & Reach Reports'
    ],
    icon: 'Share2',
    color: '#8b5cf6',
    accentGradient: 'from-purple-600/20 via-purple-950/40 to-transparent',
    bannerImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    activeProjectsCount: 5,
    totalMembersCount: 16,
    completedTasksCount: 91,
    stats: [
      { label: 'Instagram Reach', value: '120K' },
      { label: 'Posters Published', value: '64' },
      { label: 'Content Posts', value: '110+' },
      { label: 'Engagement Rate', value: '12.4%' }
    ]
  },
  {
    id: 'zone-events',
    code: 'ZONE 05',
    number: '05',
    name: 'Event Management',
    coordinator: 'Chinmayee Bisoi',
    subCoordinator: 'Tejaswini Ghosh',
    description: 'Orchestrating unforgettable on-ground screenings, film workshops, premiere nights, interactive games, guest masterclasses, and annual showcases.',
    responsibilities: [
      'Event Brainstorming & Theme Finalization',
      'Comprehensive Event Planning & Permitting',
      'Theme & Stage Concept Architecture',
      'Minute-by-Minute Event Scheduling & Run of Show',
      'Volunteer Team Recruitment & Management',
      'Film Trivia, Interactive Games & Activities',
      'Stage, AV & Program Coordination',
      'Cross-Zone Pre-Event Reels & Promo Alignment',
      'Post-Event Audience Feedback & Analytics',
      'Comprehensive Event Report & Documentation'
    ],
    icon: 'Calendar',
    color: '#10b981',
    accentGradient: 'from-emerald-600/20 via-emerald-950/40 to-transparent',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    activeProjectsCount: 3,
    totalMembersCount: 20,
    completedTasksCount: 47,
    stats: [
      { label: 'Events Hosted', value: '15' },
      { label: 'Total Attendees', value: '2.5K+' },
      { label: 'Active Crew', value: '20' },
      { label: 'Satisfaction Rate', value: '98%' }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-pavan',
    name: 'G. Pavan Datta',
    registrationNumber: '2201019001',
    section: 'CSE-A',
    email: 'pavandattagedila@gmail.com',
    phone: '+91 98765 43210',
    role: 'overall_coordinator',
    primaryZone: 'zone-movie',
    primarySkill: 'Club Management & Film Direction',
    secondarySkills: ['Cinematography', 'Post-Production', 'Team Leadership'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Permanent & Protected Overall MC Student Coordinator driving the creative and operational vision of CaSR Movie Club across all five production zones.',
    joinDate: '2023-08-15',
    status: 'Active',
    tasksCompleted: 42,
    tasksPending: 3
  },
  {
    id: 'user-faculty',
    name: 'Mr. R. Nihal',
    registrationNumber: 'FAC-7821',
    section: 'Faculty Coordinator',
    email: 'nihal.r@cutm.ac.in',
    phone: '+91 94370 11223',
    role: 'faculty_coordinator',
    primaryZone: 'zone-movie',
    primarySkill: 'Creative Mentorship & Administrative Guidance',
    secondarySkills: ['Film Studies', 'Ethics & Guidelines', 'Event Patronage'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Faculty Coordinator and institutional advisor guiding student storytellers and cinematic projects across Centurion University.',
    joinDate: '2022-07-01',
    status: 'Active',
    tasksCompleted: 28,
    tasksPending: 1
  },
  {
    id: 'user-sagar',
    name: 'Sagar Panda',
    registrationNumber: '2201019045',
    section: 'CSE-B',
    email: 'sagar.panda@casr.org',
    phone: '+91 98612 34567',
    role: 'zone_coordinator',
    primaryZone: 'zone-shortfilm',
    isCoordinatorOf: 'zone-shortfilm',
    primarySkill: 'Short Film Direction & Storytelling',
    secondarySkills: ['Screenwriting', 'Cinematography', 'Actor Direction'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Coordinator for Zone 02 (Short Film). Passionate about gritty suspense thrillers, dialogue pacing, and festival shorts.',
    joinDate: '2023-09-01',
    status: 'Active',
    tasksCompleted: 35,
    tasksPending: 4
  },
  {
    id: 'user-aman',
    name: 'Aman Baidya',
    registrationNumber: '2301019112',
    section: 'IT-A',
    email: 'aman.baidya@casr.org',
    phone: '+91 97781 23456',
    role: 'sub_coordinator',
    primaryZone: 'zone-shortfilm',
    isSubCoordinatorOf: 'zone-shortfilm',
    primarySkill: 'Post-Production & Video Editing',
    secondarySkills: ['Color Grading (DaVinci)', 'Sound Mixing', 'Production Assistance'],
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    bio: 'Sub-Coordinator for Zone 02 (Short Film). Specialist in pace editing, SFX placement, and on-set camera operation.',
    joinDate: '2023-10-15',
    status: 'Active',
    tasksCompleted: 29,
    tasksPending: 2
  },
  {
    id: 'user-spyro',
    name: 'Subham Rout (Spyro)',
    registrationNumber: '2201019088',
    section: 'ECE-A',
    email: 'spyro.rout@casr.org',
    phone: '+91 99372 98765',
    role: 'zone_coordinator',
    primaryZone: 'zone-reels',
    secondaryZone: 'zone-social',
    isCoordinatorOf: 'zone-reels',
    isSubCoordinatorOf: 'zone-social',
    primarySkill: 'Viral Content Strategy & Fast Cuts',
    secondarySkills: ['On-Camera Acting', 'Cinematography', 'Audio Beat-Sync'],
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    bio: 'Coordinator for Zone 03 (Reels) & Sub-Coordinator for Zone 04 (Social Media). Creating high-energy campus viral reels.',
    joinDate: '2023-08-20',
    status: 'Active',
    tasksCompleted: 56,
    tasksPending: 5
  },
  {
    id: 'user-kruti',
    name: 'Krutisundar Behera',
    registrationNumber: '2201019077',
    section: 'CSE-C',
    email: 'krutisundar@casr.org',
    phone: '+91 94391 87654',
    role: 'zone_coordinator',
    primaryZone: 'zone-social',
    isCoordinatorOf: 'zone-social',
    primarySkill: 'Social Media Management & Poster Design',
    secondarySkills: ['Brand Strategy', 'Typography', 'Content Copywriting'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    bio: 'Coordinator for Zone 04 (Social Media & Branding). Designing stunning movie posters and managing official digital channels.',
    joinDate: '2023-08-22',
    status: 'Active',
    tasksCompleted: 48,
    tasksPending: 3
  },
  {
    id: 'user-chinmayee',
    name: 'Chinmayee Bisoi',
    registrationNumber: '2201019033',
    section: 'EE-A',
    email: 'chinmayee.bisoi@casr.org',
    phone: '+91 93370 54321',
    role: 'zone_coordinator',
    primaryZone: 'zone-events',
    isCoordinatorOf: 'zone-events',
    primarySkill: 'Event Planning & Stage Management',
    secondarySkills: ['Crowd Coordination', 'Host/Anchor', 'Logistics Planning'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Coordinator for Zone 05 (Event Management). Curating seamless on-ground screenings, film festivals, and interactive club events.',
    joinDate: '2023-08-25',
    status: 'Active',
    tasksCompleted: 39,
    tasksPending: 2
  },
  {
    id: 'user-tejaswini',
    name: 'Tejaswini Ghosh',
    registrationNumber: '2301019201',
    section: 'CSE-B',
    email: 'tejaswini.ghosh@casr.org',
    phone: '+91 91234 56789',
    role: 'sub_coordinator',
    primaryZone: 'zone-events',
    isSubCoordinatorOf: 'zone-events',
    primarySkill: 'Event Logistics & Volunteer Management',
    secondarySkills: ['Program Coordination', 'Interactive Games', 'Hospitality'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Sub-Coordinator for Zone 05 (Event Management). Ensuring flawlessness in event execution and audience experience.',
    joinDate: '2023-11-01',
    status: 'Active',
    tasksCompleted: 24,
    tasksPending: 3
  },
  {
    id: 'user-rohan',
    name: 'Rohan Sharma',
    registrationNumber: '2301019315',
    section: 'CSE-A',
    email: 'rohan.editor@casr.org',
    phone: '+91 98111 22334',
    role: 'member',
    primaryZone: 'zone-shortfilm',
    secondaryZone: 'zone-reels',
    primarySkill: 'Video Editing (Premiere Pro & After Effects)',
    secondarySkills: ['Sound FX', 'Motion Graphics', 'Transitions'],
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    bio: 'Member & Video Editor across Short Films and Reels. Dedicated to narrative rhythm and audio-visual synchronization.',
    joinDate: '2024-01-10',
    status: 'Active',
    tasksCompleted: 18,
    tasksPending: 2
  },
  {
    id: 'user-priya',
    name: 'Priya Dash',
    registrationNumber: '2301019440',
    section: 'ECE-B',
    email: 'priya.camera@casr.org',
    phone: '+91 98222 33445',
    role: 'member',
    primaryZone: 'zone-movie',
    secondaryZone: 'zone-shortfilm',
    primarySkill: 'Cinematography & Gimbal Operation',
    secondarySkills: ['Lighting Setup', 'Composition', 'Color Science'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Cinematographer capturing cinematic frames on Sony Alpha cameras with high dynamic range and anamorphic flair.',
    joinDate: '2024-01-12',
    status: 'Active',
    tasksCompleted: 14,
    tasksPending: 1
  },
  {
    id: 'user-ananya',
    name: 'Ananya Verma',
    registrationNumber: '2301019550',
    section: 'ME-A',
    email: 'ananya.scripts@casr.org',
    phone: '+91 98333 44556',
    role: 'member',
    primaryZone: 'zone-shortfilm',
    secondaryZone: 'zone-movie',
    primarySkill: 'Scriptwriting & Story Architecture',
    secondarySkills: ['Character Development', 'Dialogue Punching', 'Storyboarding'],
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    bio: 'Screenwriter crafting nuanced storylines, gripping plots, and impactful dialogue for club projects.',
    joinDate: '2024-02-01',
    status: 'Active',
    tasksCompleted: 11,
    tasksPending: 2
  },
  {
    id: 'user-ayush',
    name: 'Ayush Mohapatra',
    registrationNumber: '2301019620',
    section: 'CSE-D',
    email: 'ayush.design@casr.org',
    phone: '+91 98444 55667',
    role: 'member',
    primaryZone: 'zone-social',
    primarySkill: 'Graphic Design & Key Art (Photoshop/Illustrator)',
    secondarySkills: ['Typography', 'Minimalist Posters', 'Social Carousels'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    bio: 'Poster designer giving each film and event an unforgettable visual identity and aesthetic polish.',
    joinDate: '2024-02-15',
    status: 'Active',
    tasksCompleted: 21,
    tasksPending: 1
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'The Silent Echo (ନିଃଶବ୍ଦ ପ୍ରତିଧ୍ୱନି)',
    type: 'Short Film',
    zoneId: 'zone-shortfilm',
    description: 'A psychological drama exploring the unspoken tensions between two roommates during finals week when an unexplained diary is discovered.',
    concept: 'Memory, isolation, and moral dilemmas in a student dormitory.',
    synopsis: 'When Kabir finds an anonymous diary hidden behind the dormitory library wall, every entry predicts the future events of that very evening. As the clock ticks toward midnight, he must choose between stopping an impending tragedy or confronting his own deepest secret.',
    status: 'Active',
    currentStage: 'POST_PRODUCTION',
    stageProgress: 75,
    startDate: '2025-01-10',
    deadline: '2025-03-15',
    director: 'Sagar Panda',
    productionLead: 'Aman Baidya',
    cinematographer: 'Priya Dash',
    editor: 'Rohan Sharma',
    soundDesigner: 'Vikramaditya Sen',
    cast: ['Aditya Narayan', 'Sneha Tripathy', 'Deepak Sahu'],
    crew: [
      { userId: 'user-sagar', name: 'Sagar Panda', role: 'Director' },
      { userId: 'user-aman', name: 'Aman Baidya', role: 'Production & Color' },
      { userId: 'user-priya', name: 'Priya Dash', role: 'Director of Photography' },
      { userId: 'user-rohan', name: 'Rohan Sharma', role: 'Lead Editor' },
      { userId: 'user-ananya', name: 'Ananya Verma', role: 'Original Screenplay' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    budget: '₹14,500',
    location: 'Central Campus Library & Boys Hostel-3'
  },
  {
    id: 'proj-02',
    title: 'Project Kaalchakra: Time Loop Odyssey',
    type: 'Movie',
    zoneId: 'zone-movie',
    description: 'An ambitious full-scale cinematic indie sci-fi drama about a physics student caught in a recurring 90-minute temporal anomaly.',
    concept: 'Quantum paradox wrapped in an emotional character journey.',
    synopsis: 'During an eclipse over the campus observatory, an experimental tachyon generator misfires, locking research scholar Arjun in a temporal loop. With only 90 minutes to save his mentor and break the cycle, every reset costs him a vital personal memory.',
    status: 'Active',
    currentStage: 'PRE_PRODUCTION',
    stageProgress: 40,
    startDate: '2025-02-01',
    deadline: '2025-05-30',
    director: 'Pavan Datta',
    productionLead: 'Sagar Panda',
    cinematographer: 'Priya Dash',
    editor: 'Rohan Sharma',
    soundDesigner: 'Vikramaditya Sen',
    cast: ['Subham Rout', 'Meera Pattnaik', 'Rishi Mohanty'],
    crew: [
      { userId: 'user-pavan', name: 'Pavan Datta', role: 'Director' },
      { userId: 'user-sagar', name: 'Sagar Panda', role: 'Associate Director' },
      { userId: 'user-priya', name: 'Priya Dash', role: 'Cinematography' },
      { userId: 'user-ayush', name: 'Ayush Mohapatra', role: 'Concept Art & Storyboards' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    budget: '₹35,000',
    location: 'Physics Dept Lab, Rooftop Observatory & City Ghats'
  },
  {
    id: 'proj-03',
    title: 'Hostel Chronicles: Reel Series Season 2',
    type: 'Reel Series',
    zoneId: 'zone-reels',
    description: 'A viral 6-episode sketch reel comedy series highlighting the relatable struggles of midnight canteen runs, exam-eve cramming, and hostel roommates.',
    concept: 'Relatable student humor optimized for Instagram algorithm & TikTok.',
    synopsis: 'A rapid-fire comedy series featuring authentic college humor, witty dialogues, and relatable student moments that turn ordinary campus situations into hilarious cinematic sketches.',
    status: 'Active',
    currentStage: 'PRODUCTION',
    stageProgress: 60,
    startDate: '2025-02-15',
    deadline: '2025-03-20',
    director: 'Subham Rout (Spyro)',
    productionLead: 'Spyro',
    cinematographer: 'Priya Dash',
    editor: 'Rohan Sharma',
    soundDesigner: 'Subham Rout',
    cast: ['Spyro', 'Krutisundar', 'Aman Baidya', 'Tejaswini'],
    crew: [
      { userId: 'user-spyro', name: 'Subham Rout (Spyro)', role: 'Director & Lead' },
      { userId: 'user-rohan', name: 'Rohan Sharma', role: 'Editor' },
      { userId: 'user-kruti', name: 'Krutisundar Behera', role: 'Social Lead' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    budget: '₹4,000',
    location: 'Hostel Corridors & Canteen'
  },
  {
    id: 'proj-04',
    title: 'CineAura 2025: Annual Film Festival',
    type: 'Event',
    zoneId: 'zone-events',
    description: 'The flagship inter-college film festival featuring film screenings, director Q&A, red carpet photography, and 48-Hour Filmmaking Challenge.',
    concept: 'Campus-wide celebration of cinema, storytelling and visual arts.',
    synopsis: 'A three-day extravaganza bringing together over 800 film enthusiasts, featuring 20+ short films, industry masterclasses, interactive film quizzes, and an awards gala.',
    status: 'Active',
    currentStage: 'PRE_PRODUCTION',
    stageProgress: 45,
    startDate: '2025-01-20',
    deadline: '2025-04-10',
    director: 'Chinmayee Bisoi',
    productionLead: 'Tejaswini Ghosh',
    cinematographer: 'Priya Dash',
    editor: 'Rohan Sharma',
    soundDesigner: 'Vikramaditya Sen',
    cast: [],
    crew: [
      { userId: 'user-chinmayee', name: 'Chinmayee Bisoi', role: 'Event Director' },
      { userId: 'user-tejaswini', name: 'Tejaswini Ghosh', role: 'Logistics Head' },
      { userId: 'user-kruti', name: 'Krutisundar Behera', role: 'Marketing & Promo' },
      { userId: 'user-spyro', name: 'Subham Rout (Spyro)', role: 'Teaser Reels Head' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    budget: '₹48,000',
    location: 'Main Auditorium & Open Air Amphitheater'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-01',
    title: 'Finalize Sound Mix and Foley for The Silent Echo',
    description: 'Complete dialogue denoising, ambient hall reverb, footsteps foley, and score sync for the 14-minute master cut in DaVinci Fairlight.',
    projectId: 'proj-01',
    projectName: 'The Silent Echo',
    zoneId: 'zone-shortfilm',
    assignedToId: 'user-rohan',
    assignedToName: 'Rohan Sharma',
    assignedById: 'user-sagar',
    assignedByName: 'Sagar Panda',
    supportingMembers: ['Aman Baidya', 'Vikramaditya Sen'],
    assignedDate: '2025-02-20',
    deadline: '2025-03-02',
    priority: 'high',
    status: 'in_progress',
    remarks: 'Rough cut approved by Sagar; currently balancing bass frequencies on dialogue tracks.',
    attachmentsCount: 3,
    category: 'Sound'
  },
  {
    id: 'task-02',
    title: 'Design Official Poster and Instagram Carousel for CineAura 2025',
    description: 'Create high-res vertical and 1:1 key art featuring retro film camera aesthetic, neon accents, sponsor placeholders, and submission dates.',
    projectId: 'proj-04',
    projectName: 'CineAura 2025',
    zoneId: 'zone-social',
    assignedToId: 'user-ayush',
    assignedToName: 'Ayush Mohapatra',
    assignedById: 'user-kruti',
    assignedByName: 'Krutisundar Behera',
    supportingMembers: ['Krutisundar Behera'],
    assignedDate: '2025-02-22',
    deadline: '2025-03-01',
    priority: 'high',
    status: 'in_progress',
    remarks: 'First draft reviewed. Need to tweak typography hierarchy for chief guest names.',
    attachmentsCount: 4,
    category: 'Design'
  },
  {
    id: 'task-03',
    title: 'Shoot Pre-Event Promo Reel: "5 Types of People in Film Club"',
    description: 'Execute comedic 45-second vertical shoot in college corridor focusing on director, cameraman, snack eater, and dialogue expert personas.',
    projectId: 'proj-03',
    projectName: 'Hostel Chronicles S2',
    zoneId: 'zone-reels',
    assignedToId: 'user-spyro',
    assignedToName: 'Subham Rout (Spyro)',
    assignedById: 'user-pavan',
    assignedByName: 'Pavan Datta',
    supportingMembers: ['Priya Dash', 'Aman Baidya'],
    assignedDate: '2025-02-24',
    deadline: '2025-03-03',
    priority: 'medium',
    status: 'not_started',
    remarks: 'Script finalized and approved. Props gathered for tomorrow 4 PM shoot.',
    attachmentsCount: 1,
    category: 'Shoot'
  },
  {
    id: 'task-04',
    title: 'Submit Auditorium Requisition & Stage Technical Specifications',
    description: 'File official university permission form for Main Audi projection system, 5.1 surround sound setup, and 8 collar mics for guest panel.',
    projectId: 'proj-04',
    projectName: 'CineAura 2025',
    zoneId: 'zone-events',
    assignedToId: 'user-tejaswini',
    assignedToName: 'Tejaswini Ghosh',
    assignedById: 'user-chinmayee',
    assignedByName: 'Chinmayee Bisoi',
    supportingMembers: ['Chinmayee Bisoi'],
    assignedDate: '2025-02-18',
    deadline: '2025-02-28',
    priority: 'high',
    status: 'completed',
    remarks: 'Requisition signed by Faculty Advisor Dr. S. K. Mahapatra and Dean Students Welfare.',
    attachmentsCount: 2,
    category: 'Management'
  },
  {
    id: 'task-05',
    title: 'Complete Location Scouting and Lighting Chart for Kaalchakra',
    description: 'Document sunrise angles at the university observatory, power outlets availability for 300W COB LED lights, and acoustic echo levels.',
    projectId: 'proj-02',
    projectName: 'Project Kaalchakra',
    zoneId: 'zone-movie',
    assignedToId: 'user-priya',
    assignedToName: 'Priya Dash',
    assignedById: 'user-pavan',
    assignedByName: 'Pavan Datta',
    supportingMembers: ['Sagar Panda'],
    assignedDate: '2025-02-19',
    deadline: '2025-03-05',
    priority: 'medium',
    status: 'in_progress',
    remarks: 'Observatory visited. Need permission from Physics HOD for after-hours access.',
    attachmentsCount: 5,
    category: 'Shoot'
  },
  {
    id: 'task-06',
    title: 'Draft Script Treatment for "Chasing Shadows" Short Thriller',
    description: 'Write 8-page screenplay with tight beats, character breakdowns, and shot suggestions for upcoming zone pitch.',
    zoneId: 'zone-shortfilm',
    assignedToId: 'user-ananya',
    assignedToName: 'Ananya Verma',
    assignedById: 'user-sagar',
    assignedByName: 'Sagar Panda',
    supportingMembers: ['Aman Baidya'],
    assignedDate: '2025-02-15',
    deadline: '2025-02-26',
    priority: 'medium',
    status: 'completed',
    remarks: 'Script submitted and added to zone discussion board.',
    attachmentsCount: 2,
    category: 'Script'
  }
];

export const INITIAL_REELS: Reel[] = [
  {
    id: 'reel-01',
    code: 'REEL-25-01',
    concept: 'POV: You are directing a scene with 0 budget',
    type: 'Humor',
    scriptStatus: 'Approved',
    shootStatus: 'Completed',
    editorName: 'Rohan Sharma',
    deadline: '2025-02-28',
    status: 'Editing',
    duration: '0:38',
    views: '48.2K',
    likes: '4.8K',
    audioTrack: 'Trending Cinematic Orchestra Remix'
  },
  {
    id: 'reel-02',
    code: 'REEL-25-02',
    concept: 'CineAura 2025 Teaser: Unleash the Filmmaker in You',
    type: 'Event Promo',
    scriptStatus: 'Approved',
    shootStatus: 'Scheduled',
    editorName: 'Subham Rout (Spyro)',
    deadline: '2025-03-04',
    status: 'Shoot',
    duration: '0:45',
    targetEventId: 'event-01',
    audioTrack: 'Hans Zimmer - Inception Synth Bass'
  },
  {
    id: 'reel-03',
    code: 'REEL-25-03',
    concept: 'Behind the Scenes: How We Shot the Library Mystery Scene',
    type: 'Behind The Scenes',
    scriptStatus: 'Approved',
    shootStatus: 'Completed',
    editorName: 'Aman Baidya',
    deadline: '2025-03-01',
    status: 'Review',
    duration: '0:52',
    audioTrack: 'Interstellar Organ Beat-Sync'
  },
  {
    id: 'reel-04',
    code: 'REEL-25-04',
    concept: 'When the Audio File is Corrupted 1 Hour Before Screening',
    type: 'Campus Story',
    scriptStatus: 'Drafted',
    shootStatus: 'Planned',
    editorName: 'Rohan Sharma',
    deadline: '2025-03-10',
    status: 'Script',
    duration: '0:30',
    audioTrack: 'Dramatic Screaming Meme Sound'
  },
  {
    id: 'reel-05',
    code: 'REEL-25-05',
    concept: 'Color Grading Transformation: RAW vs Cinematic Rec.709',
    type: 'Cinematic Spotlight',
    scriptStatus: 'Approved',
    shootStatus: 'Completed',
    editorName: 'Aman Baidya',
    deadline: '2025-02-20',
    status: 'Posted',
    duration: '0:42',
    postedUrl: 'https://instagram.com/casrmovieclub',
    views: '112.5K',
    likes: '14.2K',
    audioTrack: 'synthwave cyberpunk audio'
  }
];

export const INITIAL_SOCIAL_POSTS: SocialMediaPost[] = [
  {
    id: 'post-01',
    title: 'CineAura 2025 Official Date Announcement',
    topic: 'CineAura 2025 Official Date Announcement',
    contentType: 'Event Promotion',
    postType: 'Event Promotion',
    caption: 'Roll the cameras! 🎬 CineAura 2025 is back with bigger screens, raw talent, and unforgettable stories. Tag your film crew in the comments below! #CaSRMovieClub #CineAura2025 #Filmmaking',
    createdByName: 'Krutisundar Behera',
    designerName: 'Ayush Mohapatra',
    approvalStatus: 'Approved',
    status: 'Approved',
    scheduledDate: '2025-03-01',
    scheduledTime: '18:00',
    platform: 'Instagram',
    posted: false,
    mediaPreview: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    tags: ['#CaSRMovieClub', '#FilmFestival', '#StudentFilmmakers', '#Cinematography'],
    hashtags: ['#CaSRMovieClub', '#FilmFestival', '#StudentFilmmakers', '#Cinematography']
  },
  {
    id: 'post-02',
    title: 'Official First Look Poster: The Silent Echo',
    topic: 'Official First Look Poster: The Silent Echo',
    contentType: 'Poster',
    postType: 'Official Poster',
    caption: 'Some secrets should stay buried. Presenting the official first look of "The Silent Echo", a short psychological thriller by Zone 02. Premiere date drops this Sunday! 📽️ #TheSilentEcho #ShortFilm',
    createdByName: 'Krutisundar Behera',
    designerName: 'Ayush Mohapatra',
    approvalStatus: 'Approved',
    status: 'Approved',
    scheduledDate: '2025-03-03',
    scheduledTime: '19:30',
    platform: 'Instagram',
    posted: false,
    mediaPreview: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    tags: ['#ShortFilm', '#PsychologicalThriller', '#IndieCinema', '#Zone02'],
    hashtags: ['#ShortFilm', '#PsychologicalThriller', '#IndieCinema', '#Zone02']
  },
  {
    id: 'post-03',
    title: 'Call for Scripts: Monsoon Short Film Festival 2025',
    topic: 'Call for Scripts: Monsoon Short Film Festival 2025',
    contentType: 'Announcement',
    postType: 'Announcement',
    caption: 'Got an extraordinary story waiting to be told? We are accepting 5-15 page original screenplays across drama, sci-fi, and thriller genres. Link in bio to submit! ✍️',
    createdByName: 'Krutisundar Behera',
    designerName: 'Krutisundar Behera',
    approvalStatus: 'Under Review',
    status: 'Scheduled',
    scheduledDate: '2025-03-06',
    scheduledTime: '12:00',
    platform: 'Instagram',
    posted: false,
    tags: ['#ScriptCall', '#WritersRoom', '#Storytelling', '#CaSRMovieClub'],
    hashtags: ['#ScriptCall', '#WritersRoom', '#Storytelling', '#CaSRMovieClub']
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'event-01',
    name: 'CineAura 2025: Annual Film Gala & Showcase',
    type: 'Film Festival',
    concept: 'Celebrating college filmmaking through screenings, panel discussions with local indie directors, and premiering club projects.',
    objective: 'Provide a cinematic platform for student filmmakers, screen all in-house shorts, and foster creative collaboration.',
    date: '2025-04-12',
    time: '16:00 - 21:00',
    venue: 'Main University Auditorium',
    duration: '5 Hours',
    coordinatorName: 'Chinmayee Bisoi',
    subCoordinatorName: 'Tejaswini Ghosh',
    supportingTeam: ['Subham Rout (Spyro)', 'Krutisundar Behera', 'Sagar Panda', 'Aman Baidya'],
    status: 'Planning',
    schedule: [
      { time: '16:00 - 16:30', activity: 'Red Carpet Entry & Photography', lead: 'Tejaswini Ghosh' },
      { time: '16:30 - 17:00', activity: 'Inaugural Address & Showreel Screening', lead: 'Dr. S. K. Mahapatra & Pavan Datta' },
      { time: '17:00 - 18:30', activity: 'Short Film Screenings (Zone 01 & 02)', lead: 'Sagar Panda' },
      { time: '18:30 - 19:15', activity: 'Director Q&A & Interactive Film Trivia', lead: 'Chinmayee Bisoi' },
      { time: '19:15 - 20:00', activity: 'Reels Showcase & Audience Choice Awards', lead: 'Subham Rout (Spyro)' },
      { time: '20:00 - 21:00', activity: 'Awards Ceremony & Networking Dinner', lead: 'All Coordinators' }
    ],
    activities: [
      'Red Carpet Photography & Step-and-Repeat Backdrop',
      '4K DCP Projection Screenings with 5.1 Surround Sound',
      'Live Audience Voting via QR Code for Best Picture',
      'Film Trivia Quiz with Cine-Merch Giveaways',
      'Director & Cinematographer Panel Discussion'
    ],
    preEventReelRequired: true,
    reelStatus: 'In Production',
    socialMediaPromotionRequired: true,
    socialStatus: 'Campaign Live',
    expectedAudience: '600+ Students & Faculty',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'event-02',
    name: 'Masterclass: Anamorphic Lenses & Low-Light Cinematography',
    type: 'Masterclass',
    concept: 'Hands-on practical lighting and camera rig workshop led by professional indie cinematographers.',
    objective: 'Upskill club members in 3-point cinematic lighting, negative fill, focus pulling, and camera stabilization.',
    date: '2025-03-08',
    time: '14:00 - 17:30',
    venue: 'Media Studio Lab 204',
    duration: '3.5 Hours',
    coordinatorName: 'Chinmayee Bisoi',
    subCoordinatorName: 'Priya Dash',
    supportingTeam: ['Sagar Panda', 'Aman Baidya'],
    status: 'Approved',
    schedule: [
      { time: '14:00 - 14:45', activity: 'Understanding Dynamic Range & Exposure Stops', lead: 'Priya Dash' },
      { time: '14:45 - 16:00', activity: 'Live Lighting Setup: Moody Suspense Scene', lead: 'Priya & Sagar' },
      { time: '16:00 - 17:00', activity: 'Gimbal Balancing & Tracking Practice', lead: 'Aman Baidya' },
      { time: '17:00 - 17:30', activity: 'Q&A and Hands-on Equipment Session', lead: 'All Leads' }
    ],
    activities: [
      'Live 300W Bowens Mount Lighting Rigging',
      'Sony FX3 / A7IV Anamorphic Rig Hands-on',
      'Wireless Video Transmitter & Director Monitor Setup'
    ],
    preEventReelRequired: true,
    reelStatus: 'Ready',
    socialMediaPromotionRequired: true,
    socialStatus: 'Campaign Live',
    expectedAudience: '50 Selected Members',
    bannerImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_REPORTS: ZoneReport[] = [
  {
    id: 'rep-01',
    weekNumber: 'Week 08 (Feb 17 - Feb 23)',
    zoneId: 'zone-shortfilm',
    zoneName: 'Short Film (Zone 02)',
    coordinatorName: 'Sagar Panda',
    dateSubmitted: '2025-02-23',
    workCompleted: 'Completed 100% of principal photography for "The Silent Echo". Locked picture edit on rough cut (16 mins down to 13.5 mins). Dialogue cleaned in iZotope RX.',
    ongoingWork: 'Foley sound effects sync and original background score composition by Vikramaditya Sen. Color grading sessions scheduled in Lab.',
    upcomingWork: 'Final master screening for Overall Coordinator and Faculty Advisor. Teaser cut preparation for Zone 04.',
    activeProjects: ['The Silent Echo', 'Chasing Shadows Script'],
    membersFollowUp: 'Rohan Sharma active on editing. Priya Dash completed camera gear return. Ananya Verma submitted draft 2 of new script.',
    problems: 'Need extra 2 hours access to Media Lab on Thursday for 5.1 surround sound test.',
    supportRequired: 'Faculty recommendation letter to lab in-charge.',
    zoneStatus: 'good',
    remarks: 'Zone is operating on schedule. Morale is high.'
  },
  {
    id: 'rep-02',
    weekNumber: 'Week 08 (Feb 17 - Feb 23)',
    zoneId: 'zone-reels',
    zoneName: 'Reels (Zone 03)',
    coordinatorName: 'Subham Rout (Spyro)',
    dateSubmitted: '2025-02-24',
    workCompleted: 'Published Reel #05 (Color grading transformation) which reached 112K views. Scripted 3 new sketches for Hostel Chronicles Season 2.',
    ongoingWork: 'Shooting episode 2 in hostel corridor today. Editing BTS reel for CineAura promotion.',
    upcomingWork: 'Collaborating with Zone 05 (Events) on the promotional teaser reel for CineAura 2025.',
    activeProjects: ['Hostel Chronicles S2', 'CineAura Promo Reel'],
    membersFollowUp: 'Sub-coordinator assignment needed to distribute editing load among junior editors.',
    problems: 'Mic lapel transmitter battery drained during outdoor shoot; ordered replacement rechargeable batteries.',
    supportRequired: 'Club fund approval of ₹800 for wireless mic batteries & diffuser clamp.',
    zoneStatus: 'good',
    remarks: 'Viral metrics are exceeding target monthly projections.'
  },
  {
    id: 'rep-03',
    weekNumber: 'Week 08 (Feb 17 - Feb 23)',
    zoneId: 'zone-social',
    zoneName: 'Social Media (Zone 04)',
    coordinatorName: 'Krutisundar Behera',
    dateSubmitted: '2025-02-24',
    workCompleted: 'Published 4 feed posts and 12 daily stories. Instagram follower count grew by 420. Designed 3 poster concepts for CineAura.',
    ongoingWork: 'Finalizing the official key art for CineAura 2025 with Ayush Mohapatra.',
    upcomingWork: 'Launch Instagram countdown campaign for The Silent Echo premiere.',
    activeProjects: ['CineAura Branding', 'The Silent Echo Campaign'],
    membersFollowUp: 'Ayush Mohapatra delivered poster drafts ahead of schedule. Excellent typography work.',
    problems: 'Need high-resolution raw stills from on-set photographers on the same evening of shoots.',
    supportRequired: 'Ensure cinematographers upload raw photos to the cloud shared drive within 24h.',
    zoneStatus: 'good'
  },
  {
    id: 'rep-04',
    weekNumber: 'Week 08 (Feb 17 - Feb 23)',
    zoneId: 'zone-events',
    zoneName: 'Event Management (Zone 05)',
    coordinatorName: 'Chinmayee Bisoi',
    dateSubmitted: '2025-02-23',
    workCompleted: 'Secured official Dean approval for Main Auditorium date (April 12). Completed Masterclass venue booking and guest speaker coordination.',
    ongoingWork: 'Finalizing budget line items for CineAura trophies, certificates, and guest hospitality.',
    upcomingWork: 'Volunteer recruitment drive for stage managers, red carpet anchors, and AV technicians.',
    activeProjects: ['CineAura 2025', 'Cinematography Masterclass'],
    membersFollowUp: 'Tejaswini Ghosh managed university administration paper flow seamlessly.',
    problems: 'Auditorium projector lens requires cleaning from technical staff prior to April 12.',
    supportRequired: 'Reminder note to Estates & AV office.',
    zoneStatus: 'good'
  }
];

export const INITIAL_MEETINGS: MeetingRecord[] = [
  {
    id: 'meet-01',
    title: 'Weekly Executive Coordination Meeting #09',
    date: '2025-03-01',
    time: '17:30 - 18:30 (40 Mins)',
    location: 'Media Lab 102 & Google Meet',
    status: 'Upcoming',
    agenda: [
      { timeSlot: '17:30 - 17:35', duration: '5 Mins', topic: 'Faculty Announcements & Core Updates', lead: 'Dr. S. K. Mahapatra & Pavan Datta' },
      { timeSlot: '17:35 - 17:45', duration: '10 Mins', topic: 'Zone Progress Reports (2 mins each zone)', lead: 'All 5 Zone Coordinators' },
      { timeSlot: '17:45 - 17:55', duration: '10 Mins', topic: 'CineAura 2025 & Short Film Premiere Reviews', lead: 'Chinmayee Bisoi & Sagar Panda' },
      { timeSlot: '17:55 - 18:05', duration: '10 Mins', topic: 'Cross-Zone Task Allocation & Deadlines ("Who Will Do What By When")', lead: 'Pavan Datta' },
      { timeSlot: '18:05 - 18:10', duration: '5 Mins', topic: 'Logistics, Problems & Support Resolution', lead: 'All Attendees' }
    ],
    actionItems: [
      { task: 'Release CineAura Official Key Art on Instagram', assignedTo: 'Krutisundar Behera', deadline: '2025-03-02', zoneId: 'zone-social', status: 'Created As Task' },
      { task: 'Deliver Sound Mix Master for The Silent Echo', assignedTo: 'Rohan Sharma', deadline: '2025-03-02', zoneId: 'zone-shortfilm', status: 'Created As Task' },
      { task: 'Publish CineAura Teaser Reel #01', assignedTo: 'Subham Rout (Spyro)', deadline: '2025-03-04', zoneId: 'zone-reels', status: 'Pending' }
    ]
  }
];

export const INITIAL_FILES: ClubFile[] = [
  {
    id: 'file-01',
    name: 'The_Silent_Echo_Screenplay_Final_Draft.pdf',
    folder: 'Short Film',
    size: '1.8 MB',
    fileType: 'PDF',
    uploadedBy: 'Ananya Verma',
    uploadedDate: '2025-02-15',
    permissions: ['All']
  },
  {
    id: 'file-02',
    name: 'CineAura_2025_Master_Budget_and_Sponsorship_Deck.xlsx',
    folder: 'Event Management',
    size: '3.4 MB',
    fileType: 'XLSX',
    uploadedBy: 'Chinmayee Bisoi',
    uploadedDate: '2025-02-20',
    permissions: ['Coordinators', 'Admin']
  },
  {
    id: 'file-03',
    name: 'CaSR_Movie_Club_Official_Constitution_and_SOP.pdf',
    folder: 'Administration',
    size: '4.2 MB',
    fileType: 'PDF',
    uploadedBy: 'Pavan Datta',
    uploadedDate: '2025-01-10',
    permissions: ['All']
  },
  {
    id: 'file-04',
    name: 'CineAura_Poster_KeyArt_Layered_Master.zip',
    folder: 'Social Media',
    size: '184 MB',
    fileType: 'ZIP',
    uploadedBy: 'Ayush Mohapatra',
    uploadedDate: '2025-02-24',
    permissions: ['Coordinators', 'Admin']
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'New Task Assigned: Sound Mix and Foley',
    message: 'Sagar Panda assigned you a high-priority task for "The Silent Echo". Deadline: March 2, 2025.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'task',
    targetTab: 'tasks',
    targetId: 'task-01'
  },
  {
    id: 'notif-02',
    title: 'Weekly Executive Coordination Meeting #09',
    message: 'Scheduled for Saturday at 5:30 PM in Media Lab 102. Agenda includes CineAura 2025 reviews.',
    timestamp: '5 hours ago',
    isRead: false,
    type: 'meeting',
    targetTab: 'meetings'
  },
  {
    id: 'notif-03',
    title: 'Zone Report Approved',
    message: 'Your Week 08 report for Zone 02 has been reviewed and approved by Overall Coordinator Pavan Datta.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'report',
    targetTab: 'reports'
  },
  {
    id: 'notif-04',
    title: 'Reel Crossed 100K Views! 🎉',
    message: 'Reel #05 "Color Grading Transformation" has officially crossed 112,500 views on Instagram.',
    timestamp: '2 days ago',
    isRead: true,
    type: 'system',
    targetTab: 'reels'
  }
];

export const INITIAL_IDEAS: CreativeIdea[] = [
  {
    id: 'idea-01',
    title: 'One-Take Continuous Shot Short Film',
    description: 'A 6-minute real-time continuous tracking shot following a student racing across campus to hand in an assignment before the portal closes at 11:59 PM.',
    zoneId: 'zone-shortfilm',
    category: 'Narrative Short',
    submittedBy: 'Rohan Sharma',
    submittedById: 'user-rohan',
    submittedDate: '2025-02-21',
    status: 'Approved',
    notes: 'Great concept. Can be planned as our 48-Hour Film Festival entry.'
  },
  {
    id: 'idea-02',
    title: 'Retro 90s Bollywood Campus Spoof',
    description: 'Parodying 90s dramatic zoom-ins, wind machines, and over-the-top dialogues in modern engineering college scenarios.',
    zoneId: 'zone-reels',
    category: 'Comedy Reel',
    submittedBy: 'Subham Rout (Spyro)',
    submittedById: 'user-spyro',
    submittedDate: '2025-02-22',
    status: 'Under Review'
  },
  {
    id: 'idea-03',
    title: 'Campus Midnight Cine-Drive in Amphitheater',
    description: 'An open-air night film screening with fairy lights, portable popcorn stalls, and indie short film marathons.',
    zoneId: 'zone-events',
    category: 'Event Concept',
    submittedBy: 'Tejaswini Ghosh',
    submittedById: 'user-tejaswini',
    submittedDate: '2025-02-20',
    status: 'Approved'
  }
];

export const INITIAL_APPLICATIONS: ClubApplication[] = [
  {
    id: 'app-01',
    fullName: 'Debasish Swain',
    regNumber: '2401019150',
    section: 'CSE-E',
    phone: '+91 99887 76655',
    email: 'debasish.swain@casr.org',
    primaryZone: 'zone-shortfilm',
    secondaryZone: 'zone-reels',
    primarySkill: 'Cinematography & Gimbal Camera',
    secondarySkills: ['DaVinci Resolve', 'Color Grading', 'Lighting'],
    experience: 'Shot 3 independent school documentary films and run a YouTube channel with 5K subscribers focused on camera tech reviews.',
    learningInterests: ['Anamorphic lenses', 'High frame rate action choreography', 'Directing actors'],
    portfolioLink: 'https://youtube.com/@debasishfilms',
    submittedAt: '2025-02-24 14:30',
    status: 'Pending'
  },
  {
    id: 'app-02',
    fullName: 'Shreya Mohanty',
    regNumber: '2401019280',
    section: 'IT-B',
    phone: '+91 98760 12345',
    email: 'shreya.mohanty@casr.org',
    primaryZone: 'zone-social',
    secondaryZone: 'zone-events',
    primarySkill: 'Poster Art & Typography Design',
    secondarySkills: ['Figma', 'Adobe Photoshop', 'Social Media Copy'],
    experience: 'Designed social media carousels and festival posters for high school literary society.',
    learningInterests: ['Motion posters', 'Film branding', 'Event stage graphics'],
    portfolioLink: 'https://behance.net/shreyamohanty',
    submittedAt: '2025-02-23 18:15',
    status: 'Accepted'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-01',
    action: 'Approved Stage 07 (Review) for project "The Silent Echo"',
    user: 'Sagar Panda (Zone 02)',
    timestamp: '1 hour ago',
    zoneId: 'zone-shortfilm',
    category: 'Project'
  },
  {
    id: 'log-02',
    action: 'Created task "Finalize Sound Mix and Foley" assigned to Rohan Sharma',
    user: 'Sagar Panda',
    timestamp: '2 hours ago',
    zoneId: 'zone-shortfilm',
    category: 'Task'
  },
  {
    id: 'log-03',
    action: 'Submitted Week 08 Zone Report for Zone 03 (Reels)',
    user: 'Subham Rout (Spyro)',
    timestamp: '4 hours ago',
    zoneId: 'zone-reels',
    category: 'Report'
  },
  {
    id: 'log-04',
    action: 'Added new Event "CineAura 2025: Annual Film Gala"',
    user: 'Chinmayee Bisoi',
    timestamp: '1 day ago',
    zoneId: 'zone-events',
    category: 'Event'
  },
  {
    id: 'log-05',
    action: 'Published Reel #05 "Color Grading Transformation"',
    user: 'Subham Rout & Krutisundar',
    timestamp: '2 days ago',
    zoneId: 'zone-reels',
    category: 'Reel'
  }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  // Short Film Activities
  {
    id: 'part-01',
    name: 'Pavan Datta',
    registrationNumber: '2201019001',
    activityCategory: 'short_film',
    activityName: 'Shadows of the Lens',
    assignedRole: 'Lead Director & Screenplay',
    status: 'Confirmed',
    department: 'CSE-A',
    contactEmail: 'pavandattagedila@gmail.com',
    notes: 'Directing Day 1 shoot sequence at Campus Gate 2.',
    assignedAt: '2026-03-10'
  },
  {
    id: 'part-02',
    name: 'Tumula Asish',
    registrationNumber: '240101120015',
    activityCategory: 'short_film',
    activityName: 'Shadows of the Lens',
    assignedRole: 'Director of Photography (DOP)',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: '240101120015@centurionuniv.edu.in',
    notes: 'Operating Sony FX3 Cinema Rig + Gimbal.',
    assignedAt: '2026-03-10'
  },
  {
    id: 'part-03',
    name: 'REGALA YUGANDHAR',
    registrationNumber: '240101120017',
    activityCategory: 'short_film',
    activityName: 'Shadows of the Lens',
    assignedRole: 'Boom Operator & Audio Recordist',
    status: 'Confirmed',
    department: 'BTech CSE',
    contactEmail: '240101120017@centurionuniv.edu.in',
    notes: 'Managing Rode Wireless Go II & NTG-3 mic rig.',
    assignedAt: '2026-03-11'
  },
  {
    id: 'part-04',
    name: 'K. Sai Varun',
    registrationNumber: '2201019003',
    activityCategory: 'short_film',
    activityName: 'Campus Chronicles',
    assignedRole: 'Director & Production Lead',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: 'saivarun@gmail.com',
    notes: 'Supervising Night Climax shoot at Open Air Amphitheatre.',
    assignedAt: '2026-03-12'
  },
  {
    id: 'part-05',
    name: 'Neyyila Chandu',
    registrationNumber: '240101120016',
    activityCategory: 'short_film',
    activityName: 'Campus Chronicles',
    assignedRole: 'Lead Actor & Cinematographer',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: '240101120016@centurionuniv.edu.in',
    notes: 'Dual role: Scene 14 performance & Blackmagic 6K capture.',
    assignedAt: '2026-03-12'
  },
  {
    id: 'part-06',
    name: 'M. Shivaprasad',
    registrationNumber: '240101120022',
    activityCategory: 'short_film',
    activityName: 'Campus Chronicles',
    assignedRole: 'Supporting Actor',
    status: 'Confirmed',
    department: 'B.Tech',
    contactEmail: 'sivap1807@gmail.com',
    notes: 'Character confrontation sequence dialogue delivery.',
    assignedAt: '2026-03-13'
  },
  {
    id: 'part-07',
    name: 'Jami Jabili',
    registrationNumber: '240101120031',
    activityCategory: 'short_film',
    activityName: 'Echoes in Monologue',
    assignedRole: 'Director & Scriptwriter',
    status: 'Active',
    department: 'CSE',
    contactEmail: '240101120031@centurionuniv.edu.in',
    notes: 'Studio dialogue block in Media Studio Lab 03.',
    assignedAt: '2026-03-14'
  },
  {
    id: 'part-08',
    name: 'P. Supriya Rani Patro',
    registrationNumber: '240101120012',
    activityCategory: 'short_film',
    activityName: 'Silent Horizon (Teaser)',
    assignedRole: 'Director & Storyboard Lead',
    status: 'Active',
    department: 'B.Tech CSE',
    contactEmail: '240101120012@centurionuniv.edu.in',
    notes: 'Golden hour silhouette shoot at Campus Lake Viewpoint.',
    assignedAt: '2026-03-15'
  },

  // Social Media Activities
  {
    id: 'part-09',
    name: 'Yamini Patnaik',
    registrationNumber: '240101120020',
    activityCategory: 'social_media',
    activityName: 'Behind the Scenes Reels',
    assignedRole: 'Content Creator & Video Host',
    status: 'Confirmed',
    department: 'B.Tech CSE',
    contactEmail: '240101120020@centurionuniv.edu.in',
    notes: 'Hosting BTS bloopers & Director quick-takes for Instagram Reels.',
    assignedAt: '2026-03-10'
  },
  {
    id: 'part-10',
    name: 'Jami Charitha',
    registrationNumber: '240101120011',
    activityCategory: 'social_media',
    activityName: 'Cast Spotlight Interview Series',
    assignedRole: 'Interviewer & Reel Editor',
    status: 'Active',
    department: 'B.Tech CSE',
    contactEmail: 'jamicharitha@gmail.com',
    notes: 'Editing 60-second rapid-fire cast interviews for YouTube Shorts.',
    assignedAt: '2026-03-11'
  },
  {
    id: 'part-11',
    name: 'Vanshika Korada',
    registrationNumber: '240101120055',
    activityCategory: 'social_media',
    activityName: 'CineVibe Weekly Trends',
    assignedRole: 'Social Media Manager & Copywriter',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: '240101120055@centurionuniv.edu.in',
    notes: 'Crafting cinema memes, aesthetic carousels & weekly engagement polls.',
    assignedAt: '2026-03-12'
  },
  {
    id: 'part-12',
    name: 'Sagar Panda',
    registrationNumber: '2201019004',
    activityCategory: 'social_media',
    activityName: 'Teaser Premiere Countdown',
    assignedRole: 'Motion Graphics & Poster Specialist',
    status: 'Active',
    department: 'ECE',
    contactEmail: 'sagarpanda@gmail.com',
    notes: 'Designing countdown motion posters & typography stickers.',
    assignedAt: '2026-03-13'
  },
  {
    id: 'part-13',
    name: 'Subham Rout (Spyro)',
    registrationNumber: '2201019006',
    activityCategory: 'social_media',
    activityName: 'Viral Dialogue Dub Reels',
    assignedRole: 'Lead Reel Editor & Sound Mixer',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: 'subhamrout@gmail.com',
    notes: 'Syncing cinema dialogue audios with club behind-the-scenes.',
    assignedAt: '2026-03-14'
  },

  // Events Activities
  {
    id: 'part-14',
    name: 'Aman Baidya',
    registrationNumber: '2201019005',
    activityCategory: 'event',
    activityName: 'CineFiesta Annual Film Festival',
    assignedRole: 'Overall Event Coordinator',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: 'amanbaidya@gmail.com',
    notes: 'Managing auditorium permits, guest hospitality & program schedule.',
    assignedAt: '2026-03-08'
  },
  {
    id: 'part-15',
    name: 'Dr. S. K. Mahapatra',
    registrationNumber: 'FAC-2018-091',
    activityCategory: 'event',
    activityName: 'Screenwriting & Direction Masterclass',
    assignedRole: 'Faculty Mentor & Keynote Speaker',
    status: 'Confirmed',
    department: 'School of Media & Comms',
    contactEmail: 'skmahapatra@cutm.ac.in',
    notes: 'Delivering masterclass on three-act screenplay architecture.',
    assignedAt: '2026-03-09'
  },
  {
    id: 'part-16',
    name: 'Pavan Datta Gedila',
    registrationNumber: '2201019001',
    activityCategory: 'event',
    activityName: 'Campus 48-Hour Filmmaking Challenge',
    assignedRole: 'Head of Jury & Technical Operations',
    status: 'Active',
    department: 'CSE-A',
    contactEmail: 'pavandattagedila@gmail.com',
    notes: 'Setting genre prompts, judging rules & deadline verification.',
    assignedAt: '2026-03-10'
  },
  {
    id: 'part-17',
    name: 'Tumula Asish',
    registrationNumber: '240101120015',
    activityCategory: 'event',
    activityName: 'Open Air Cinema Night',
    assignedRole: 'Projection & AV In-Charge',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: '240101120015@centurionuniv.edu.in',
    notes: 'Calibrating 4K projector and surround sound setup at Amphitheatre.',
    assignedAt: '2026-03-12'
  },
  {
    id: 'part-18',
    name: 'Neyyila Chandu',
    registrationNumber: '240101120016',
    activityCategory: 'event',
    activityName: 'CineFiesta Annual Film Festival',
    assignedRole: 'Stage & Crowd Anchor',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: '240101120016@centurionuniv.edu.in',
    notes: 'Hosting the awards ceremony and guest introductions on main stage.',
    assignedAt: '2026-03-14'
  },
  {
    id: 'part-19',
    name: 'Chinmayee Bisoi',
    registrationNumber: '2201019007',
    activityCategory: 'event',
    activityName: 'CineAura 2026: Annual Film Gala',
    assignedRole: 'Hospitality & Delegate Manager',
    status: 'Confirmed',
    department: 'CSE',
    contactEmail: 'chinmayee@gmail.com',
    notes: 'Managing chief guest felicitations and VIP seating arrangements.',
    assignedAt: '2026-03-15'
  },

  // Other Activities
  {
    id: 'part-20',
    name: 'REGALA YUGANDHAR',
    registrationNumber: '240101120017',
    activityCategory: 'other',
    activityName: 'Sound Design & Foley Lab Workshop',
    assignedRole: 'Audio Engineering Trainee',
    status: 'Active',
    department: 'BTech CSE',
    contactEmail: '240101120017@centurionuniv.edu.in',
    notes: 'Hands-on sound recording with contact mics and synthesizers.',
    assignedAt: '2026-03-16'
  },
  {
    id: 'part-21',
    name: 'Yamini Patnaik',
    registrationNumber: '240101120020',
    activityCategory: 'other',
    activityName: 'Cinematography & Rig Workshop',
    assignedRole: 'Assistant Camera Technician',
    status: 'Confirmed',
    department: 'B.Tech CSE',
    contactEmail: '240101120020@centurionuniv.edu.in',
    notes: 'Balancing mechanical gimbals and wireless follow focus rigs.',
    assignedAt: '2026-03-16'
  },
  {
    id: 'part-22',
    name: 'M. Shivaprasad',
    registrationNumber: '240101120022',
    activityCategory: 'other',
    activityName: 'DaVinci Resolve Color Grading Boot Camp',
    assignedRole: 'Colorist Trainee',
    status: 'Active',
    department: 'B.Tech',
    contactEmail: 'sivap1807@gmail.com',
    notes: 'Node tree workflows, LUT creation and ACES color science training.',
    assignedAt: '2026-03-17'
  },
  {
    id: 'part-23',
    name: 'Jami Charitha',
    registrationNumber: '240101120011',
    activityCategory: 'other',
    activityName: 'Audition Jury Panel & Candidate Screening',
    assignedRole: 'Audition Screening Coordinator',
    status: 'Completed',
    department: 'B tech CSE',
    contactEmail: 'jamicharitha@gmail.com',
    notes: 'Assessing acting monologues and script reading auditions.',
    assignedAt: '2026-03-05'
  }
];

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  // 1. YouTube Accounts
  {
    id: 'soc-yt-01',
    platform: 'youtube',
    accountName: 'FRAMES ERA CASR CUTM PKD',
    handle: '@FRAMES_ERA_CASR_CUTM_PKD',
    url: 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com',
    followerCount: '34.8K Subscribers',
    status: 'Primary',
    category: 'Short Films & Premieres',
    description: 'Official YouTube broadcast channel of CaSR Movie Club Centurion University PKD featuring original short films, trailers, director interviews, festival screenings, and student cinematic showcases.',
    managedBy: 'Subham Rout (Student Social Media Coordinator)',
    contactEmail: 'youtube@casrmovieclub.edu',
    createdAt: '2023-09-01',
    updatedAt: '2026-03-15'
  },
  {
    id: 'soc-yt-02',
    platform: 'youtube',
    accountName: 'CaSR Studio Archive & Masterclasses',
    handle: '@casr-cinema-archive',
    url: 'https://www.youtube.com/@casr-cinema-archive',
    followerCount: '12.4K Subscribers',
    status: 'Active',
    category: 'Events & Live',
    description: 'Dedicated archive for full-length guest filmmaking masterclasses, screenplay workshops, equipment bootcamps, and technical lecture series.',
    managedBy: 'Mr. R. Nihal & Subham Rout',
    contactEmail: 'archive@casrmovieclub.edu',
    createdAt: '2024-01-15',
    updatedAt: '2026-03-10'
  },

  // 2. Instagram Accounts
  {
    id: 'soc-ig-01',
    platform: 'instagram',
    accountName: 'CUTM Frame Era Vibes',
    handle: '@cutm_frame_era_vibes',
    url: 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com',
    followerCount: '24.6K Followers',
    status: 'Primary',
    category: 'Main Brand',
    description: 'Official Instagram page of CaSR Movie Club Centurion University featuring campus cinema vibes, shoot reels, cast spotlights, aesthetic behind-the-scenes carousels, and premiere countdowns.',
    managedBy: 'Subham Rout (Student Social Media Coordinator)',
    contactEmail: 'instagram@casrmovieclub.edu',
    createdAt: '2023-08-15',
    updatedAt: '2026-03-20'
  },
  {
    id: 'soc-ig-02',
    platform: 'instagram',
    accountName: 'CaSR Reels & Cast Spotlight',
    handle: '@casr.reels',
    url: 'https://www.instagram.com/casr.reels',
    followerCount: '18.2K Followers',
    status: 'Active',
    category: 'Behind The Scenes',
    description: '60-second micro-stories, viral dialogue lip-syncs, cinematography breakdowns, camera rig reels, and humorous on-set blooper reels.',
    managedBy: 'Subham Rout (Spyro) & Jami Charitha',
    contactEmail: 'reels@casrmovieclub.edu',
    createdAt: '2024-02-10',
    updatedAt: '2026-03-18'
  },

  // 3. Facebook Accounts
  {
    id: 'soc-fb-01',
    platform: 'facebook',
    accountName: 'CaSR Movie Club - Centurion University',
    handle: 'facebook.com/casrmovieclub',
    url: 'https://www.facebook.com/casrmovieclub',
    followerCount: '16.5K Followers',
    status: 'Primary',
    category: 'Community',
    description: 'Official university social network page. Annual film gala event photo galleries, alumni connections, regional festival participation, and press releases.',
    managedBy: 'Chinmayee Bisoi & Neyyila Chandu',
    contactEmail: 'facebook@casrmovieclub.edu',
    createdAt: '2023-08-20',
    updatedAt: '2026-03-12'
  },
  {
    id: 'soc-fb-02',
    platform: 'facebook',
    accountName: 'CaSR Film Festival & CineFiesta Forum',
    handle: 'facebook.com/groups/casrcinefiesta',
    url: 'https://www.facebook.com/groups/casrcinefiesta',
    followerCount: '9.3K Members',
    status: 'Active',
    category: 'Events & Live',
    description: 'Official interactive community group for university filmmakers, script exchanges, short film discussions, and inter-college festival announcements.',
    managedBy: 'Aman Baidya (Events Lead)',
    contactEmail: 'cinefiesta@casrmovieclub.edu',
    createdAt: '2024-03-01',
    updatedAt: '2026-03-05'
  }
];

// ==========================================
// 12. MOVIE CLUB LEADERSHIP
// ==========================================
export const INITIAL_LEADERSHIP: LeadershipMember[] = [
  {
    id: 'lead-faculty-nihal',
    name: 'Mr. R. Nihal',
    designation: 'Faculty Coordinator',
    roleType: 'faculty_coordinator',
    department: 'Department of Media & Cinema / Centurion University',
    email: 'nihal.r@cutm.ac.in',
    phone: '+91 94370 11223',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Faculty Coordinator providing institutional mentorship, academic patronage, and strategic oversight for all CaSR Movie Club initiatives and university productions.',
    isPermanent: false,
    order: 1,
    status: 'Active',
    term: '2024 - Present',
    addedAt: '2023-08-01'
  },
  {
    id: 'lead-overall-pavan-datta',
    name: 'G. Pavan Datta',
    designation: 'Overall MC Student Coordinator',
    roleType: 'overall_student_coordinator',
    department: 'Computer Science & Engineering',
    registrationNumber: '2201019001',
    email: 'pavandattagedila@gmail.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Permanent & Protected Overall MC Student Coordinator orchestrating cross-departmental operations, directing flagship productions, and leading the CaSR Movie Club vision across all 5 zones.',
    isPermanent: true, // G. Pavan Datta is permanent & protected! Cannot be removed or deleted.
    order: 2,
    status: 'Active',
    term: 'Permanent / Core Founder',
    addedAt: '2023-08-01'
  },
  {
    id: 'lead-student-krutisundar',
    name: 'Krutisundar Behera',
    designation: 'Student Coordinator',
    roleType: 'student_coordinator',
    department: 'Computer Science & Engineering',
    registrationNumber: '2201019077',
    email: 'krutisundar@casr.org',
    phone: '+91 94391 87654',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Student Coordinator driving social branding, multi-zone campaign execution, and creative member engagement across university channels.',
    isPermanent: false,
    order: 3,
    status: 'Active',
    term: '2023 - Present',
    addedAt: '2023-08-01'
  },
  {
    id: 'lead-social-subham-rout',
    name: 'Subham Rout',
    designation: 'Student Social Media Coordinator',
    roleType: 'social_media_coordinator',
    department: 'Computer Science & Engineering',
    registrationNumber: '2201019018',
    email: 'subham.rout@casr.org',
    phone: '+91 98619 54321',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: 'Student Social Media Coordinator responsible for coordinating and managing student social media activities, viral video reels, and official YouTube & Instagram accounts.',
    isPermanent: false,
    order: 4,
    status: 'Active',
    term: '2023 - Present',
    addedAt: '2023-08-01'
  }
];

// Convenient lowercase export aliases
export const initialZones = INITIAL_ZONES;
export const initialUsers = INITIAL_USERS;
export const initialProjects = INITIAL_PROJECTS;
export const initialTasks = INITIAL_TASKS;
export const initialEvents = INITIAL_EVENTS;
export const initialReports = INITIAL_REPORTS;
export const initialApplications = INITIAL_APPLICATIONS;
export const initialIdeas = INITIAL_IDEAS;
export const initialNotifications = INITIAL_NOTIFICATIONS;
export const initialParticipants = INITIAL_PARTICIPANTS;
export const initialSocialAccounts = INITIAL_SOCIAL_ACCOUNTS;
export const initialLeadership = INITIAL_LEADERSHIP;



