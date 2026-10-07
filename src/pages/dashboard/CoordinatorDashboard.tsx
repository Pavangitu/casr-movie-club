import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { OverviewModule } from './modules/OverviewModule';
import { TasksView } from './modules/TasksView';
import { ProjectsView } from './modules/ProjectsView';
import { ReelsTrackerView } from './modules/ReelsTrackerView';
import { SocialCalendarView } from './modules/SocialCalendarView';
import { EventsView } from './modules/EventsView';
import { ReportsView } from './modules/ReportsView';
import { MeetingsView } from './modules/MeetingsView';
import { FilesWorkspaceView } from './modules/FilesWorkspaceView';
import { MembersManagementView } from './modules/MembersManagementView';
import { AuditLogView } from './modules/AuditLogView';
import { IdeasView } from './modules/IdeasView';
import { SchedulingDepartmentView } from './modules/SchedulingDepartmentView';
import { ParticipantsManagementView } from './modules/ParticipantsManagementView';
import { SocialAccountsManagementView } from './modules/SocialAccountsManagementView';
import { LeadershipManagementView } from './modules/LeadershipManagementView';

export const CoordinatorDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<OverviewModule />} />
        <Route path="tasks" element={<TasksView />} />
        <Route path="projects" element={<ProjectsView />} />
        <Route path="scheduling/*" element={<SchedulingDepartmentView />} />
        <Route path="participants" element={<ParticipantsManagementView />} />
        <Route path="social-accounts" element={<SocialAccountsManagementView />} />
        <Route path="social-media" element={<SocialAccountsManagementView />} />
        <Route path="leadership" element={<LeadershipManagementView />} />
        <Route path="reels" element={<ReelsTrackerView />} />
        <Route path="social" element={<SocialCalendarView />} />
        <Route path="events" element={<EventsView />} />
        <Route path="reports" element={<ReportsView />} />
        <Route path="meetings" element={<MeetingsView />} />
        <Route path="files" element={<FilesWorkspaceView />} />
        <Route path="members" element={<MembersManagementView />} />
        <Route path="audit" element={<AuditLogView />} />
        <Route path="logs" element={<AuditLogView />} />
        <Route path="ideas" element={<IdeasView />} />
      </Routes>
    </DashboardLayout>
  );
};
