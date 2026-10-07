import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, UserRole, Zone, ZoneId, Task, TaskStatus, TaskPriority,
  Project, ProjectStage, Reel, ReelStatus, SocialMediaPost, SocialApprovalStatus,
  ClubEvent, ZoneReport, MeetingRecord, ClubFile, NotificationItem,
  CreativeIdea, ClubApplication, ActivityLog, Participant, ActivityCategory,
  SocialAccount, SocialAccountPlatform, LeadershipMember
} from '../types';
import {
  INITIAL_USERS, INITIAL_ZONES, INITIAL_PROJECTS, INITIAL_TASKS,
  INITIAL_REELS, INITIAL_SOCIAL_POSTS, INITIAL_EVENTS, INITIAL_REPORTS,
  INITIAL_MEETINGS, INITIAL_FILES, INITIAL_NOTIFICATIONS, INITIAL_IDEAS,
  INITIAL_APPLICATIONS, INITIAL_ACTIVITY_LOGS, INITIAL_PARTICIPANTS,
  INITIAL_SOCIAL_ACCOUNTS, INITIAL_LEADERSHIP
} from '../data/initialData';
import { sfx } from '../utils/audio';

interface ClubContextType {
  // Authentication & Role
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  login: (credential: string, role?: UserRole) => boolean;
  logout: () => void;
  
  // Data Collections
  zones: Zone[];
  projects: Project[];
  tasks: Task[];
  reels: Reel[];
  socialPosts: SocialMediaPost[];
  events: ClubEvent[];
  reports: ZoneReport[];
  meetings: MeetingRecord[];
  files: ClubFile[];
  notifications: NotificationItem[];
  ideas: CreativeIdea[];
  applications: ClubApplication[];
  activityLogs: ActivityLog[];
  participants: Participant[];
  socialAccounts: SocialAccount[];
  leadership: LeadershipMember[];

  // Mutations
  // Tasks
  createTask: (taskData: Omit<Task, 'id' | 'assignedDate' | 'attachmentsCount'>) => Task;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  deleteTask: (taskId: string) => void;

  // Projects
  createProject: (projectData: Omit<Project, 'id' | 'currentStage' | 'stageProgress'>) => Project;
  advanceProjectStage: (projectId: string, nextStage: ProjectStage) => void;
  updateProjectProgress: (projectId: string, progress: number) => void;

  // Reels
  createReel: (reelData: Omit<Reel, 'id' | 'code' | 'status'> | any) => Reel;
  addReel: (reelData: any) => Reel;
  updateReelStatus: (reelId: string, status: ReelStatus) => void;
  advanceReelStage: (reelId: string, stage: any) => void;

  // Social
  createSocialPost: (postData: Omit<SocialMediaPost, 'id' | 'approvalStatus' | 'posted'> | any) => SocialMediaPost;
  addSocialPost: (postData: any) => SocialMediaPost;
  updateSocialApproval: (postId: string, status: SocialApprovalStatus) => void;
  updateSocialStatus: (postId: string, status: any) => void;

  // Events
  createEvent: (eventData: Omit<ClubEvent, 'id'> | any) => ClubEvent;
  addEvent: (eventData: any) => ClubEvent;
  updateEventStatus: (eventId: string, status: ClubEvent['status']) => void;

  // Meetings
  addMeeting: (meetingData: any) => MeetingRecord;

  // Reports
  submitWeeklyReport: (reportData: Omit<ZoneReport, 'id' | 'dateSubmitted'>) => ZoneReport;

  // Ideas / Pitches
  submitIdea: (ideaData: Omit<CreativeIdea, 'id' | 'submittedDate' | 'status'>) => CreativeIdea;
  reviewIdea: (ideaId: string, status: CreativeIdea['status'], notes?: string) => void;

  // Applications
  submitApplication: (appData: Omit<ClubApplication, 'id' | 'submittedAt' | 'status'>) => ClubApplication;
  approveApplication: (appId: string) => void;
  rejectApplication: (appId: string) => void;

  // Participants
  addParticipant: (participantData: Omit<Participant, 'id' | 'assignedAt'>) => Participant;
  updateParticipant: (id: string, updatedData: Partial<Omit<Participant, 'id'>>) => void;
  removeParticipant: (id: string) => void;
  assignStudentToActivity: (data: {
    name: string;
    registrationNumber: string;
    activityCategory: ActivityCategory;
    activityName: string;
    assignedRole?: string;
    status?: 'Confirmed' | 'Active' | 'Completed' | 'Pending';
    department?: string;
    contactEmail?: string;
    notes?: string;
  }) => Participant;

  // Social Media Accounts Management
  addSocialAccount: (accountData: Omit<SocialAccount, 'id' | 'createdAt'>) => SocialAccount;
  updateSocialAccount: (id: string, updatedData: Partial<Omit<SocialAccount, 'id'>>) => void;
  removeSocialAccount: (id: string) => void;
  toggleSocialAccountStatus: (id: string) => void;

  // Leadership Management
  addLeadershipMember: (memberData: Omit<LeadershipMember, 'id' | 'addedAt'>) => LeadershipMember;
  updateLeadershipMember: (id: string, updatedData: Partial<Omit<LeadershipMember, 'id'>>) => void;
  removeLeadershipMember: (id: string) => boolean;

  // Files
  uploadFile: (fileData: Omit<ClubFile, 'id' | 'uploadedDate'> | any) => ClubFile;
  addFile: (fileData: any) => ClubFile;
  deleteFile: (fileId: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;

  // Meeting Action items conversion
  convertActionItemToTask: (meetingId: string, itemIndexOrId: number | string) => void;

  // UI state helpers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAudioMuted: boolean;
  toggleAudioMute: () => boolean;
  isSopModalOpen: boolean;
  setIsSopModalOpen: (open: boolean) => void;
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default user: G. Pavan Datta (Overall MC Student Coordinator)
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>(INITIAL_SOCIAL_POSTS);
  const [events, setEvents] = useState<ClubEvent[]>(INITIAL_EVENTS);
  const [reports, setReports] = useState<ZoneReport[]>(INITIAL_REPORTS);
  const [meetings, setMeetings] = useState<MeetingRecord[]>(INITIAL_MEETINGS);
  const [files, setFiles] = useState<ClubFile[]>(INITIAL_FILES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [ideas, setIdeas] = useState<CreativeIdea[]>(INITIAL_IDEAS);
  const [applications, setApplications] = useState<ClubApplication[]>(INITIAL_APPLICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  
  // Participants State with localStorage persistence
  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const saved = localStorage.getItem('casr_participants');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load participants from localStorage', e);
    }
    return INITIAL_PARTICIPANTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('casr_participants', JSON.stringify(participants));
    } catch (e) {
      console.error('Failed to persist participants to localStorage', e);
    }
  }, [participants]);

  // Social Accounts State with localStorage persistence
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem('casr_social_accounts');
      if (saved) {
        const parsed: SocialAccount[] = JSON.parse(saved);
        // Ensure official FRAMES ERA YouTube and CUTM Frame Era Vibes Instagram are synced
        const updated = parsed.map(acc => {
          if (acc.platform === 'youtube' && (acc.status === 'Primary' || acc.id === 'soc-yt-01')) {
            return {
              ...acc,
              accountName: 'FRAMES ERA CASR CUTM PKD',
              handle: '@FRAMES_ERA_CASR_CUTM_PKD',
              url: 'https://www.youtube.com/@FRAMES_ERA_CASR_CUTM_PKD?utm_source=chatgpt.com',
              managedBy: 'Subham Rout (Student Social Media Coordinator)'
            };
          }
          if (acc.platform === 'instagram' && (acc.status === 'Primary' || acc.id === 'soc-ig-01')) {
            return {
              ...acc,
              accountName: 'CUTM Frame Era Vibes',
              handle: '@cutm_frame_era_vibes',
              url: 'https://www.instagram.com/cutm_frame_era_vibes?stkn=MWxtcGZ2ZG00bTFqYQ%3D%3D&utm_source=chatgpt.com',
              managedBy: 'Subham Rout (Student Social Media Coordinator)'
            };
          }
          return acc;
        });
        return updated;
      }
    } catch (e) {
      console.error('Failed to load social accounts from localStorage', e);
    }
    return INITIAL_SOCIAL_ACCOUNTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('casr_social_accounts', JSON.stringify(socialAccounts));
    } catch (e) {
      console.error('Failed to persist social accounts to localStorage', e);
    }
  }, [socialAccounts]);

  // Leadership State with localStorage persistence & G. Pavan Datta Permanent Protection
  const [leadership, setLeadership] = useState<LeadershipMember[]>(() => {
    try {
      const saved = localStorage.getItem('casr_leadership');
      if (saved) {
        let parsed: LeadershipMember[] = JSON.parse(saved);
        
        // 1. Ensure G. Pavan Datta is ALWAYS present, protected, and cannot be lost or renamed
        const hasPavan = parsed.some(m => m.isPermanent || m.name.toLowerCase().includes('pavan datta') || m.id === 'lead-overall-pavan-datta');
        if (!hasPavan) {
          const pavanDefault = INITIAL_LEADERSHIP.find(m => m.isPermanent) || INITIAL_LEADERSHIP[1];
          parsed = [pavanDefault, ...parsed];
        } else {
          parsed = parsed.map(m => (m.name.toLowerCase().includes('pavan datta') || m.id === 'lead-overall-pavan-datta') ? { 
            ...m, 
            name: 'G. Pavan Datta', 
            designation: 'Overall MC Student Coordinator',
            roleType: 'overall_student_coordinator' as const,
            isPermanent: true 
          } : m);
        }

        // 2. Ensure Faculty Coordinator (Mr. R. Nihal) is present
        const hasNihal = parsed.some(m => m.roleType === 'faculty_coordinator' || m.name.toLowerCase().includes('nihal'));
        if (!hasNihal) {
          const nihalDefault = INITIAL_LEADERSHIP.find(m => m.roleType === 'faculty_coordinator');
          if (nihalDefault) parsed = [nihalDefault, ...parsed];
        }

        // 3. Ensure Student Coordinator (Krutisundar Behera) is present
        const hasKruti = parsed.some(m => m.name.toLowerCase().includes('krutisundar'));
        if (!hasKruti) {
          const krutiDefault = INITIAL_LEADERSHIP.find(m => m.name.toLowerCase().includes('krutisundar'));
          if (krutiDefault) parsed = [...parsed, krutiDefault];
        }

        // 4. Ensure Student Social Media Coordinator (Subham Rout) is present
        const hasSubham = parsed.some(m => m.name.toLowerCase().includes('subham rout') || m.roleType === 'social_media_coordinator');
        if (!hasSubham) {
          const subhamDefault = INITIAL_LEADERSHIP.find(m => m.name.toLowerCase().includes('subham rout'));
          if (subhamDefault) parsed = [...parsed, subhamDefault];
        }

        return parsed;
      }
    } catch (e) {
      console.error('Failed to load leadership from localStorage', e);
    }
    return INITIAL_LEADERSHIP;
  });

  useEffect(() => {
    try {
      localStorage.setItem('casr_leadership', JSON.stringify(leadership));
    } catch (e) {
      console.error('Failed to persist leadership to localStorage', e);
    }
  }, [leadership]);

  // UI State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(sfx.isMuted());
  const [isSopModalOpen, setIsSopModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addActivity = (action: string, category: ActivityLog['category'], zoneId?: ZoneId) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      action,
      user: currentUser.name,
      timestamp: 'Just now',
      category,
      zoneId
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'], targetTab?: string, targetId?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      title,
      message,
      timestamp: 'Just now',
      isRead: false,
      type,
      targetTab,
      targetId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleAudioMute = () => {
    const nextState = sfx.toggleMute();
    setIsAudioMuted(nextState);
    return nextState;
  };

  const login = (credential: string, role?: UserRole) => {
    sfx.playClapper();
    const found = users.find(u => 
      u.email.toLowerCase() === credential.toLowerCase() ||
      u.registrationNumber.toLowerCase() === credential.toLowerCase() ||
      (role && u.role === role)
    );
    if (found) {
      setCurrentUser(found);
      addActivity(`Logged into CaSR command terminal`, 'Member', found.primaryZone);
      return true;
    }
    // Fallback: switch to specified role or member
    const roleMatch = users.find(u => u.role === role);
    if (roleMatch) {
      setCurrentUser(roleMatch);
      return true;
    }
    return false;
  };

  const logout = () => {
    sfx.playSubtleChime();
    setCurrentUser(INITIAL_USERS[0]); // default to faculty or first
  };

  // Tasks Management
  const createTask = (taskData: Omit<Task, 'id' | 'assignedDate' | 'attachmentsCount'>): Task => {
    sfx.playClapper();
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      assignedDate: new Date().toISOString().slice(0, 10),
      attachmentsCount: 1
    };
    setTasks(prev => [newTask, ...prev]);
    
    // Update zone stats
    setZones(prev => prev.map(z => z.id === taskData.zoneId ? { ...z, completedTasksCount: z.completedTasksCount } : z));
    
    addActivity(`Assigned task "${newTask.title}" to ${newTask.assignedToName}`, 'Task', newTask.zoneId);
    addNotification(`New Task Assigned`, `Task "${newTask.title}" assigned to ${newTask.assignedToName} (Deadline: ${newTask.deadline})`, 'task', 'tasks', newTask.id);
    
    return newTask;
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    sfx.playClapper();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = { ...t, status: newStatus };
        addActivity(`Changed task status of "${t.title}" to ${newStatus.toUpperCase()}`, 'Task', t.zoneId);
        if (newStatus === 'completed') {
          addNotification('Task Completed', `"${t.title}" was marked as completed by ${currentUser.name}`, 'task');
        }
        return updated;
      }
      return t;
    }));
  };

  const deleteTask = (taskId: string) => {
    sfx.playSubtleChime();
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addActivity(`Removed task #${taskId}`, 'Task');
  };

  // Projects Management
  const createProject = (projectData: Omit<Project, 'id' | 'currentStage' | 'stageProgress'>): Project => {
    sfx.playClapper();
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      currentStage: 'IDEA',
      stageProgress: 10
    };
    setProjects(prev => [newProj, ...prev]);
    setZones(prev => prev.map(z => z.id === projectData.zoneId ? { ...z, activeProjectsCount: z.activeProjectsCount + 1 } : z));
    
    addActivity(`Initiated project "${newProj.title}" under ${newProj.director}`, 'Project', newProj.zoneId);
    addNotification(`New Production Greenlit`, `"${newProj.title}" has entered stage IDEA`, 'system', 'projects', newProj.id);
    return newProj;
  };

  const advanceProjectStage = (projectId: string, nextStage: ProjectStage) => {
    sfx.playClapper();
    const stageOrder: ProjectStage[] = [
      'IDEA', 'DISCUSSION', 'APPROVAL', 'PRE_PRODUCTION',
      'PRODUCTION', 'POST_PRODUCTION', 'REVIEW', 'FINAL_APPROVAL', 'RELEASE'
    ];
    const index = stageOrder.indexOf(nextStage);
    const progress = Math.min(100, Math.round(((index + 1) / stageOrder.length) * 100));

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        addActivity(`Advanced project "${p.title}" to stage ${nextStage}`, 'Project', p.zoneId);
        addNotification(`Project Progress Update`, `"${p.title}" reached stage: ${nextStage} (${progress}%)`, 'system', 'projects', p.id);
        return {
          ...p,
          currentStage: nextStage,
          stageProgress: progress,
          status: nextStage === 'RELEASE' ? 'Completed' : 'Active'
        };
      }
      return p;
    }));
  };

  const updateProjectProgress = (projectId: string, progress: number) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, stageProgress: progress } : p));
  };

  // Reels Tracker
  const createReel = (reelData: any): Reel => {
    sfx.playClapper();
    const count = reels.length + 1;
    const newReel: Reel = {
      ...reelData,
      id: `reel-${Date.now()}`,
      code: reelData.code || `REEL-${String(count).padStart(3, '0')}`,
      status: reelData.status || 'Idea',
      stage: reelData.stage || 'IDEA'
    };
    setReels(prev => [newReel, ...prev]);
    addActivity(`Drafted reel concept "${newReel.title || newReel.concept}"`, 'Reel', 'zone-reels');
    addNotification('New Reel in Pipeline', `Reel ${newReel.code} logged: ${newReel.title || newReel.concept}`, 'system', 'reels');
    return newReel;
  };

  const addReel = (reelData: any) => createReel(reelData);

  const updateReelStatus = (reelId: string, status: ReelStatus) => {
    sfx.playClapper();
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        addActivity(`Updated Reel ${r.code || r.id} to status "${status}"`, 'Reel', 'zone-reels');
        return { ...r, status };
      }
      return r;
    }));
  };

  const advanceReelStage = (reelId: string, stage: any) => {
    sfx.playClapper();
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        addActivity(`Updated Reel ${r.code || r.id} to stage "${stage}"`, 'Reel', 'zone-reels');
        return { ...r, stage, status: stage === 'POSTED' ? 'Posted' : r.status };
      }
      return r;
    }));
  };

  // Social Posts
  const createSocialPost = (postData: any): SocialMediaPost => {
    sfx.playClapper();
    const newPost: SocialMediaPost = {
      ...postData,
      id: `post-${Date.now()}`,
      title: postData.title || postData.topic || 'Social Post',
      topic: postData.topic || postData.title || 'Social Post',
      postType: postData.postType || postData.contentType || 'Social Post',
      contentType: postData.contentType || postData.postType || 'Social Post',
      hashtags: postData.hashtags || postData.tags || [],
      tags: postData.tags || postData.hashtags || [],
      approvalStatus: postData.approvalStatus || 'Under Review',
      posted: postData.posted ?? false,
      status: postData.status || 'Draft'
    };
    setSocialPosts(prev => [newPost, ...prev]);
    addActivity(`Scheduled social media post: "${newPost.title || newPost.topic}"`, 'Social', 'zone-social');
    return newPost;
  };

  const addSocialPost = (postData: any) => createSocialPost(postData);

  const updateSocialApproval = (postId: string, status: SocialApprovalStatus) => {
    sfx.playClapper();
    setSocialPosts(prev => prev.map(p => {
      if (p.id === postId) {
        addActivity(`Marked social content "${p.title || p.topic}" as ${status}`, 'Social', 'zone-social');
        return { ...p, approvalStatus: status, posted: status === 'Approved' ? p.posted : false };
      }
      return p;
    }));
  };

  const updateSocialStatus = (postId: string, status: any) => {
    sfx.playClapper();
    setSocialPosts(prev => prev.map(p => {
      if (p.id === postId) {
        addActivity(`Updated social post status to "${status}"`, 'Social', 'zone-social');
        return { ...p, status, approvalStatus: status === 'Published' ? 'Approved' : p.approvalStatus };
      }
      return p;
    }));
  };

  // Events
  const createEvent = (eventData: any): ClubEvent => {
    sfx.playClapper();
    const newEv: ClubEvent = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    setEvents(prev => [newEv, ...prev]);
    addActivity(`Created new event schedule: "${newEv.name}"`, 'Event', 'zone-events');
    addNotification('New Event Scheduled', `${newEv.name} on ${newEv.date} at ${newEv.venue}`, 'event', 'events');
    return newEv;
  };

  const addEvent = (eventData: any) => createEvent(eventData);

  const updateEventStatus = (eventId: string, status: ClubEvent['status']) => {
    sfx.playClapper();
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        addActivity(`Updated event "${e.name}" status to ${status}`, 'Event', 'zone-events');
        return { ...e, status };
      }
      return e;
    }));
  };

  // Meetings
  const addMeeting = (meetingData: any): MeetingRecord => {
    sfx.playClapper();
    const newMeet: MeetingRecord = {
      ...meetingData,
      id: `meet-${Date.now()}`,
      agenda: meetingData.agenda || meetingData.agendaBreakdown || [],
      actionItems: meetingData.actionItems || []
    };
    setMeetings(prev => [newMeet, ...prev]);
    addActivity(`Scheduled meeting "${newMeet.title}"`, 'Task');
    return newMeet;
  };

  // Weekly Reports
  const submitWeeklyReport = (reportData: Omit<ZoneReport, 'id' | 'dateSubmitted'>): ZoneReport => {
    sfx.playClapper();
    const newRep: ZoneReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      dateSubmitted: new Date().toISOString().slice(0, 10)
    };
    setReports(prev => [newRep, ...prev]);
    addActivity(`Submitted weekly report for ${newRep.zoneName} (${newRep.weekNumber})`, 'Report', newRep.zoneId);
    addNotification('Weekly Zone Report Filed', `${newRep.coordinatorName} submitted report for ${newRep.zoneName}`, 'report', 'reports');
    return newRep;
  };

  // Ideas & Pitches
  const submitIdea = (ideaData: Omit<CreativeIdea, 'id' | 'submittedDate' | 'status'>): CreativeIdea => {
    sfx.playClapper();
    const newIdea: CreativeIdea = {
      ...ideaData,
      id: `idea-${Date.now()}`,
      submittedDate: new Date().toISOString().slice(0, 10),
      status: 'Submitted'
    };
    setIdeas(prev => [newIdea, ...prev]);
    addActivity(`Submitted creative pitch "${newIdea.title}"`, 'Project', newIdea.zoneId);
    addNotification('New Pitch in Queue', `"${newIdea.title}" submitted by ${newIdea.submittedBy}`, 'idea');
    return newIdea;
  };

  const reviewIdea = (ideaId: string, status: CreativeIdea['status'], notes?: string) => {
    sfx.playClapper();
    setIdeas(prev => prev.map(i => {
      if (i.id === ideaId) {
        addActivity(`Reviewed pitch "${i.title}": ${status}`, 'Project', i.zoneId);
        return { ...i, status, notes: notes || i.notes };
      }
      return i;
    }));
  };

  // Applications
  const submitApplication = (appData: Omit<ClubApplication, 'id' | 'submittedAt' | 'status'>): ClubApplication => {
    sfx.playClapper();
    const newApp: ClubApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending'
    };
    setApplications(prev => [newApp, ...prev]);
    addActivity(`New candidate applied: ${newApp.fullName} (${newApp.primarySkill})`, 'Member', newApp.primaryZone);
    addNotification('New Audition Application', `${newApp.fullName} applied for ${newApp.primaryZone.replace('zone-', 'Zone ')}`, 'system');
    return newApp;
  };

  const approveApplication = (appId: string) => {
    sfx.playClapper();
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Accepted' } : a));
    const target = applications.find(a => a.id === appId);
    if (target) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: target.fullName,
        registrationNumber: target.regNumber,
        section: target.section,
        email: target.email,
        phone: target.phone,
        role: 'member',
        status: 'Active',
        primaryZone: target.primaryZone,
        secondaryZone: target.secondaryZone,
        primarySkill: target.primarySkill,
        secondarySkills: target.secondarySkills,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        joinDate: new Date().toISOString().slice(0, 10),
        tasksCompleted: 0,
        tasksPending: 0,
        bio: target.experience || 'Inducted filmmaker in CaSR Movie Club.'
      };
      setUsers(prev => [...prev, newUser]);
      addActivity(`Inducted new member ${target.fullName} into ${target.primaryZone}`, 'Member', target.primaryZone);
      addNotification('Member Inducted', `${target.fullName} is now an active member of CaSR Movie Club.`, 'system');
    }
  };

  const rejectApplication = (appId: string) => {
    sfx.playSubtleChime();
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Waitlisted' } : a));
  };

  // Files
  const uploadFile = (fileData: any): ClubFile => {
    sfx.playClapper();
    const newFile: ClubFile = {
      ...fileData,
      id: `file-${Date.now()}`,
      uploadedDate: fileData.uploadedDate || fileData.uploadedAt || new Date().toISOString().slice(0, 10),
      fileType: fileData.fileType || fileData.type || 'PDF',
      url: fileData.url || fileData.fileUrl || '#'
    };
    setFiles(prev => [newFile, ...prev]);
    addActivity(`Uploaded file "${newFile.name}" to folder /${newFile.folder}`, 'Project');
    return newFile;
  };

  // Participant Management
  const addParticipant = (participantData: Omit<Participant, 'id' | 'assignedAt'>): Participant => {
    sfx.playClapper();
    const newParticipant: Participant = {
      ...participantData,
      id: `part-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      assignedAt: new Date().toISOString().slice(0, 10)
    };
    setParticipants(prev => [newParticipant, ...prev]);
    addActivity(`Enrolled participant ${newParticipant.name} (${newParticipant.registrationNumber}) in ${newParticipant.activityName}`, 'Member');
    addNotification('Participant Assigned', `${newParticipant.name} (${newParticipant.registrationNumber}) assigned to ${newParticipant.activityName}`, 'system');
    return newParticipant;
  };

  const updateParticipant = (id: string, updatedData: Partial<Omit<Participant, 'id'>>) => {
    sfx.playSubtleChime();
    setParticipants(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedData };
        addActivity(`Updated participant record for ${updated.name} (${updated.registrationNumber})`, 'Member');
        return updated;
      }
      return p;
    }));
  };

  const removeParticipant = (id: string) => {
    sfx.playSubtleChime();
    const target = participants.find(p => p.id === id);
    setParticipants(prev => prev.filter(p => p.id !== id));
    if (target) {
      addActivity(`Removed participant ${target.name} from ${target.activityName}`, 'Member');
      addNotification('Participant Removed', `${target.name} removed from ${target.activityName}`, 'system');
    }
  };

  const assignStudentToActivity = (data: {
    name: string;
    registrationNumber: string;
    activityCategory: ActivityCategory;
    activityName: string;
    assignedRole?: string;
    status?: 'Confirmed' | 'Active' | 'Completed' | 'Pending';
    department?: string;
    contactEmail?: string;
    notes?: string;
  }): Participant => {
    return addParticipant({
      name: data.name,
      registrationNumber: data.registrationNumber,
      activityCategory: data.activityCategory,
      activityName: data.activityName,
      assignedRole: data.assignedRole || 'Participant',
      status: data.status || 'Confirmed',
      department: data.department || '',
      contactEmail: data.contactEmail || '',
      notes: data.notes || ''
    });
  };

  // Social Media Account Management Mutations
  const addSocialAccount = (accountData: Omit<SocialAccount, 'id' | 'createdAt'>): SocialAccount => {
    sfx.playClapper();
    const newAccount: SocialAccount = {
      ...accountData,
      id: `soc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    setSocialAccounts(prev => [newAccount, ...prev]);
    addActivity(`Added official ${newAccount.platform.toUpperCase()} account "${newAccount.accountName}" (${newAccount.handle})`, 'Social');
    addNotification('Social Account Connected', `${newAccount.platform.toUpperCase()} account ${newAccount.handle} added to club registry`, 'announcement');
    return newAccount;
  };

  const updateSocialAccount = (id: string, updatedData: Partial<Omit<SocialAccount, 'id'>>) => {
    sfx.playSubtleChime();
    setSocialAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const updated: SocialAccount = { 
          ...acc, 
          ...updatedData, 
          updatedAt: new Date().toISOString().slice(0, 10) 
        };
        addActivity(`Updated ${updated.platform.toUpperCase()} account "${updated.accountName}"`, 'Social');
        return updated;
      }
      return acc;
    }));
  };

  const removeSocialAccount = (id: string) => {
    sfx.playSubtleChime();
    const target = socialAccounts.find(a => a.id === id);
    setSocialAccounts(prev => prev.filter(a => a.id !== id));
    if (target) {
      addActivity(`Removed ${target.platform.toUpperCase()} account "${target.accountName}"`, 'Social');
      addNotification('Social Account Removed', `Removed ${target.platform.toUpperCase()} account ${target.handle}`, 'system');
    }
  };

  const toggleSocialAccountStatus = (id: string) => {
    sfx.playSubtleChime();
    setSocialAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const nextStatus: SocialAccount['status'] = acc.status === 'Active' ? 'Inactive' : 'Active';
        return { ...acc, status: nextStatus, updatedAt: new Date().toISOString().slice(0, 10) };
      }
      return acc;
    }));
  };

  // Movie Club Leadership Management Mutations
  const addLeadershipMember = (memberData: Omit<LeadershipMember, 'id' | 'addedAt'>): LeadershipMember => {
    sfx.playClapper();
    const newMember: LeadershipMember = {
      ...memberData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      addedAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      isPermanent: false
    };
    setLeadership(prev => [...prev, newMember]);
    addActivity(`Appointed ${newMember.name} as ${newMember.designation}`, 'Member');
    addNotification('Leadership Appointed', `${newMember.name} added as ${newMember.designation}`, 'announcement');
    return newMember;
  };

  const updateLeadershipMember = (id: string, updatedData: Partial<Omit<LeadershipMember, 'id'>>) => {
    sfx.playSubtleChime();
    setLeadership(prev => prev.map(m => {
      if (m.id === id) {
        // Enforce that G. Pavan Datta's permanent status and name can NEVER be stripped or renamed
        const isProtected = m.isPermanent || m.name.toLowerCase().includes('pavan datta') || id === 'lead-overall-pavan-datta';
        const updated: LeadershipMember = {
          ...m,
          ...updatedData,
          name: isProtected ? 'G. Pavan Datta' : (updatedData.name?.trim() || m.name),
          designation: isProtected ? 'Overall MC Student Coordinator' : (updatedData.designation?.trim() || m.designation),
          roleType: isProtected ? 'overall_student_coordinator' : (updatedData.roleType || m.roleType),
          isPermanent: isProtected ? true : (updatedData.isPermanent ?? false),
          updatedAt: new Date().toISOString().slice(0, 10)
        };
        addActivity(`Updated leadership profile for ${updated.name} (${updated.designation})`, 'Member');
        return updated;
      }
      return m;
    }));
  };

  const removeLeadershipMember = (id: string): boolean => {
    const target = leadership.find(m => m.id === id);
    if (!target) return false;

    // Hard protection: G. Pavan Datta is permanent & protected!
    if (target.isPermanent || target.name.toLowerCase().includes('pavan datta') || id === 'lead-overall-pavan-datta') {
      sfx.playErrorTone();
      addNotification(
        'Action Prohibited',
        'G. Pavan Datta is a permanent and protected Overall MC Student Coordinator. Deletion or removal is strictly prohibited.',
        'system'
      );
      return false;
    }

    sfx.playSubtleChime();
    setLeadership(prev => prev.filter(m => m.id !== id));
    addActivity(`Removed ${target.name} from ${target.designation}`, 'Member');
    addNotification('Leadership Member Removed', `${target.name} removed from leadership directory`, 'system');
    return true;
  };

  const addFile = (fileData: any) => uploadFile(fileData);

  const deleteFile = (fileId: string) => {
    sfx.playSubtleChime();
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markNotificationRead = (id: string) => markNotificationAsRead(id);

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Action Items in Meetings -> Task creation
  const convertActionItemToTask = (meetingId: string, itemIndexOrId: number | string) => {
    sfx.playClapper();
    const meeting = meetings.find(m => m.id === meetingId);
    if (!meeting) return;

    let itemIndex: number;
    if (typeof itemIndexOrId === 'number') {
      itemIndex = itemIndexOrId;
    } else {
      itemIndex = meeting.actionItems.findIndex(i => i.id === itemIndexOrId);
    }

    if (itemIndex === -1 || !meeting.actionItems[itemIndex]) return;
    const item = meeting.actionItems[itemIndex];
    if (item.status === 'Created As Task' || item.isConvertedToTask) return;

    const assignedName = item.assignedTo || item.who || 'Unassigned';
    const assignedUser = users.find(u => u.name.toLowerCase().includes(assignedName.toLowerCase())) || users[0];

    createTask({
      title: item.task || item.what || 'Action Item',
      description: `Generated from meeting "${meeting.title}" on ${meeting.date}. Mandatory action item.`,
      zoneId: item.zoneId || 'zone-movie',
      assignedToId: assignedUser.id,
      assignedToName: assignedUser.name,
      assignedById: currentUser.id,
      assignedByName: currentUser.name,
      supportingMembers: [],
      deadline: item.deadline || item.byWhen || 'TBD',
      priority: 'high',
      status: 'not_started',
      category: 'Management',
      remarks: `Origin: Weekly Coordination Meeting Action Item #${itemIndex + 1}`
    });

    // Update meeting record
    setMeetings(prev => prev.map(m => {
      if (m.id === meetingId) {
        const newActions = [...m.actionItems];
        newActions[itemIndex] = { ...newActions[itemIndex], status: 'Created As Task', isConvertedToTask: true };
        return { ...m, actionItems: newActions };
      }
      return m;
    }));
  };

  return (
    <ClubContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        login,
        logout,
        zones,
        projects,
        tasks,
        reels,
        socialPosts,
        events,
        reports,
        meetings,
        files,
        notifications,
        ideas,
        applications,
        activityLogs,
        participants,
        socialAccounts,
        leadership,
        addParticipant,
        updateParticipant,
        removeParticipant,
        assignStudentToActivity,
        addSocialAccount,
        updateSocialAccount,
        removeSocialAccount,
        toggleSocialAccountStatus,
        addLeadershipMember,
        updateLeadershipMember,
        removeLeadershipMember,
        createTask,
        updateTaskStatus,
        deleteTask,
        createProject,
        advanceProjectStage,
        updateProjectProgress,
        createReel,
        addReel,
        updateReelStatus,
        advanceReelStage,
        createSocialPost,
        addSocialPost,
        updateSocialApproval,
        updateSocialStatus,
        createEvent,
        addEvent,
        updateEventStatus,
        addMeeting,
        submitWeeklyReport,
        submitIdea,
        reviewIdea,
        submitApplication,
        approveApplication,
        rejectApplication,
        uploadFile,
        addFile,
        deleteFile,
        markNotificationAsRead,
        markNotificationRead,
        markAllNotificationsAsRead,
        clearNotifications,
        unreadCount,
        convertActionItemToTask,
        isSearchOpen,
        setIsSearchOpen,
        isAudioMuted,
        toggleAudioMute,
        isSopModalOpen,
        setIsSopModalOpen,
        isQrModalOpen,
        setIsQrModalOpen
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};
