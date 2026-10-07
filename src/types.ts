export * from './types/index';

// Supplementary helpers
export interface ClubNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'task' | 'project' | 'report' | 'announcement';
}
