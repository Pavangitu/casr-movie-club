export type UserRole = 
  | 'faculty_coordinator' 
  | 'overall_coordinator' 
  | 'zone_coordinator' 
  | 'sub_coordinator' 
  | 'club_member'
  | 'member';

export type ZoneId = 
  | 'zone-movie' 
  | 'zone-shortfilm' 
  | 'zone-reels' 
  | 'zone-social' 
  | 'zone-events';

export interface User {
  id: string;
  name: string;
  registrationNumber: string;
  regNumber?: string;
  section: string;
  email: string;
  phone: string;
  role: UserRole;
  primaryZone: ZoneId;
  secondaryZone?: ZoneId;
  primarySkill: string;
  secondarySkills: string[];
  avatar: string;
  bio: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Alumni';
  tasksCompleted: number;
  tasksPending: number;
  isCoordinatorOf?: ZoneId;
  isSubCoordinatorOf?: ZoneId;
}

export interface Zone {
  id: ZoneId;
  code: string;
  number: string;
  name: string;
  coordinator: string;
  subCoordinator: string;
  description: string;
  tagline?: string;
  responsibilities: string[];
  icon: string;
  color: string;
  accentGradient: string;
  bannerImage: string;
  activeProjectsCount: number;
  totalMembersCount: number;
  completedTasksCount: number;
  stats: {
    label: string;
    value: string;
  }[];
}

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'not_started' | 'in_progress' | 'review' | 'completed' | 'delayed' | 'on_hold';

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  projectName?: string;
  zoneId: ZoneId;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  supportingMembers: string[];
  assignedDate: string;
  deadline: string;
  priority: TaskPriority;
  status: TaskStatus;
  remarks?: string;
  attachmentsCount: number;
  category: 'Script' | 'Shoot' | 'Editing' | 'Social' | 'Event' | 'Management' | 'Design' | 'Sound';
}

export type ProjectStage = 
  | 'IDEA' 
  | 'DISCUSSION' 
  | 'APPROVAL' 
  | 'PRE_PRODUCTION' 
  | 'PRODUCTION' 
  | 'POST_PRODUCTION' 
  | 'REVIEW' 
  | 'FINAL_APPROVAL' 
  | 'RELEASE';

export interface Project {
  id: string;
  title: string;
  type: 'Movie' | 'Short Film' | 'Reel Series' | 'Social Media Campaign' | 'Event';
  zoneId: ZoneId;
  description: string;
  concept: string;
  synopsis: string;
  status: 'Active' | 'In Review' | 'Completed' | 'Upcoming';
  currentStage: ProjectStage;
  stageProgress: number; // 0 to 100
  startDate: string;
  deadline: string;
  director: string;
  productionLead: string;
  cinematographer: string;
  editor: string;
  soundDesigner: string;
  cast: string[];
  crew: {
    userId: string;
    name: string;
    role: string;
  }[];
  coverImage: string;
  videoUrl?: string;
  budget?: string;
  location?: string;
}

export type ReelStage = 'IDEA' | 'SCRIPT' | 'SHOOT' | 'EDITING' | 'REVIEW' | 'APPROVED' | 'POSTED';
export type ReelStatus = 'Idea' | 'Script' | 'Shoot' | 'Editing' | 'Review' | 'Approved' | 'Posted';

export interface ReelItem {
  id: string;
  title: string;
  concept: string;
  stage: ReelStage;
  creatorId: string;
  creatorName: string;
  platform: 'Instagram' | 'YouTube Shorts' | 'Both';
  trendingAudio: string;
  hookText: string;
  postedDate: string;
  views: string;
  likes: string;
  shares: string;
}

export interface SocialPost {
  id: string;
  title: string;
  postType: 'Official Poster' | 'BTS Carousel' | 'Teaser Drop' | 'Story Countdowns' | 'Member Spotlight';
  platform: 'Instagram' | 'YouTube' | 'Both';
  scheduledDate: string;
  scheduledTime: string;
  caption: string;
  hashtags: string[];
  status: 'Draft' | 'Approved' | 'Scheduled' | 'Published';
}

export interface Reel {
  id: string;
  code?: string;
  concept: string;
  type?: 'Campus Story' | 'Behind The Scenes' | 'Event Promo' | 'Humor' | 'Cinematic Spotlight' | 'Trending' | 'Student Life';
  scriptStatus?: 'Pending' | 'Drafted' | 'Approved';
  shootStatus?: 'Planned' | 'Scheduled' | 'Completed';
  editorName?: string;
  deadline?: string;
  status?: ReelStatus;
  duration?: string;
  postedUrl?: string;
  views?: string;
  likes?: string;
  audioTrack?: string;
  targetEventId?: string;
  title?: string;
  stage?: ReelStage;
  creatorId?: string;
  creatorName?: string;
  platform?: 'Instagram' | 'YouTube Shorts' | 'Both' | string;
  trendingAudio?: string;
  hookText?: string;
  postedDate?: string;
  shares?: string;
}

export type SocialContentType = 'Poster' | 'Announcement' | 'Reel' | 'Event Promotion' | 'Story' | 'Photography' | 'Short Film' | 'Movie Content';
export type SocialApprovalStatus = 'Pending' | 'Under Review' | 'Approved' | 'Revision Required';

export interface SocialMediaPost {
  id: string;
  contentType?: SocialContentType;
  topic?: string;
  caption: string;
  createdByName?: string;
  designerName?: string;
  approvalStatus?: SocialApprovalStatus;
  scheduledDate: string;
  scheduledTime: string;
  platform: 'Instagram' | 'YouTube' | 'LinkedIn' | 'X' | 'Both' | string;
  posted?: boolean;
  postUrl?: string;
  mediaPreview?: string;
  tags?: string[];
  title?: string;
  postType?: 'Official Poster' | 'BTS Carousel' | 'Teaser Drop' | 'Story Countdowns' | 'Member Spotlight' | string;
  hashtags?: string[];
  status?: 'Draft' | 'Approved' | 'Scheduled' | 'Published' | string;
}

export interface ClubEvent {
  id: string;
  name: string;
  type: 'Screening' | 'Workshop' | 'Film Festival' | 'Reel Premiere' | 'Competition' | 'Annual Showcase' | 'Masterclass' | 'Meeting' | string;
  concept: string;
  objective?: string;
  date: string;
  time: string;
  venue: string;
  duration?: string;
  coordinatorName: string;
  subCoordinatorName?: string;
  supportingTeam?: string[];
  status: 'Idea' | 'Planning' | 'Approved' | 'In Progress' | 'Completed' | 'upcoming' | string;
  schedule?: {
    time: string;
    activity: string;
    lead: string;
  }[];
  activities?: string[];
  preEventReelRequired?: boolean;
  reelStatus?: 'Not Planned' | 'In Production' | 'Ready' | 'Published' | 'Drafted' | string;
  socialMediaPromotionRequired?: boolean;
  socialStatus?: 'Not Started' | 'In Progress' | 'Campaign Live' | 'Completed' | 'Drafted' | string;
  expectedAudience: string | number;
  bannerImage?: string;
}

export interface ZoneReport {
  id: string;
  weekNumber: string;
  zoneId: ZoneId;
  zoneName: string;
  coordinatorName: string;
  dateSubmitted: string;
  workCompleted?: string;
  ongoingWork?: string;
  upcomingWork?: string;
  activeProjects?: string[];
  membersFollowUp?: string;
  problems?: string;
  supportRequired?: string;
  zoneStatus?: 'good' | 'needs_attention' | 'delayed';
  remarks?: string;
  submittedByName?: string;
  submissionDate?: string;
  status?: string;
  tasksCompleted?: string[];
  tasksInProgress?: string[];
  delayedTasks?: string[];
  planForNextWeek?: string[];
  supportNeeded?: string;
  attendanceSummary?: string;
  starContributor?: string;
  keyHighlight?: string;
}

export interface MeetingAgendaItem {
  timeSlot?: string;
  duration?: string;
  topic: string;
  lead?: string;
  timeWindow?: string;
  owner?: string;
}

export interface MeetingActionItem {
  id?: string;
  task?: string;
  assignedTo?: string;
  deadline?: string;
  zoneId?: ZoneId;
  status?: 'Pending' | 'Created As Task' | string;
  who?: string;
  what?: string;
  byWhen?: string;
  isConvertedToTask?: boolean;
}

export interface MeetingRecord {
  id: string;
  title: string;
  type?: string;
  date: string;
  time: string;
  location?: string;
  venue?: string;
  status?: 'Upcoming' | 'Completed' | string;
  agendaBreakdown?: MeetingAgendaItem[];
  agenda: MeetingAgendaItem[];
  actionItems: MeetingActionItem[];
}

export interface ClubFile {
  id: string;
  name: string;
  folder: 'Administration' | 'Movie Making' | 'Short Film' | 'Reels' | 'Social Media' | 'Event Management' | 'Projects' | 'Reports' | 'Final Content' | string;
  size: string;
  fileType?: 'PDF' | 'DOCX' | 'MP4' | 'PNG' | 'JPG' | 'ZIP' | 'XLSX' | string;
  type?: 'PDF' | 'DOCX' | 'MP4' | 'PNG' | 'JPG' | 'ZIP' | 'XLSX' | string;
  uploadedBy: string;
  uploadedDate?: string;
  uploadedAt?: string;
  permissions?: ('All' | 'Coordinators' | 'Admin')[];
  url?: string;
  fileUrl?: string;
  isApproved?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'task' | 'project' | 'deadline' | 'meeting' | 'report' | 'event' | 'system' | 'idea' | 'announcement';
  targetTab?: string;
  targetId?: string;
}

export interface CreativeIdea {
  id: string;
  title: string;
  description: string;
  zoneId: ZoneId;
  category: string;
  submittedBy: string;
  submittedById: string;
  submittedDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface ClubApplication {
  id: string;
  fullName: string;
  regNumber: string;
  section: string;
  phone: string;
  email: string;
  primaryZone: ZoneId;
  secondaryZone: ZoneId;
  primarySkill: string;
  secondarySkills: string[];
  experience: string;
  learningInterests: string[];
  portfolioLink?: string;
  submittedAt: string;
  status: 'Pending' | 'Accepted' | 'Waitlisted';
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  zoneId?: ZoneId;
  category: 'Task' | 'Project' | 'Reel' | 'Social' | 'Event' | 'Report' | 'Member';
}

export type ActivityCategory = 'short_film' | 'social_media' | 'event' | 'other';

export interface Participant {
  id: string;
  name: string;
  registrationNumber: string;
  activityCategory: ActivityCategory;
  activityName: string;
  assignedRole: string;
  status: 'Confirmed' | 'Active' | 'Completed' | 'Pending';
  department?: string;
  contactEmail?: string;
  notes?: string;
  assignedAt: string;
}

export type SocialAccountPlatform = 'youtube' | 'facebook' | 'instagram';

export interface SocialAccount {
  id: string;
  platform: SocialAccountPlatform;
  accountName: string;
  handle: string;
  url: string;
  followerCount: string;
  status: 'Primary' | 'Active' | 'Verified' | 'Inactive';
  description: string;
  category: 'Main Brand' | 'Short Films & Premieres' | 'Behind The Scenes' | 'Events & Live' | 'Community';
  managedBy?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt?: string;
}

export type LeadershipRoleType = 
  | 'faculty_coordinator' 
  | 'overall_student_coordinator' 
  | 'student_coordinator' 
  | 'social_media_coordinator'
  | 'coordinator' 
  | 'core_lead';

export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  roleType: LeadershipRoleType;
  department?: string;
  registrationNumber?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  isPermanent?: boolean;
  order: number;
  status: 'Active' | 'Emeritus' | 'Honorary';
  term?: string;
  addedAt: string;
  updatedAt?: string;
}



