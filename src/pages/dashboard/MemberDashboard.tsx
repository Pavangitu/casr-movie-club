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
import { IdeasView } from './modules/IdeasView';
import { SchedulingDepartmentView } from './modules/SchedulingDepartmentView';
import { ParticipantsManagementView } from './modules/ParticipantsManagementView';
import { SocialAccountsManagementView } from './modules/SocialAccountsManagementView';
import { LeadershipManagementView } from './modules/LeadershipManagementView';

export const MemberDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<OverviewModule />} />
        <Route path="tasks" element={<TasksView />} />
        <Route path="projects" element={<ProjectsView />} />
        <Route path="scheduling/*" element={<SchedulingDepartmentView />} />
        <Route path="participants" element={<ParticipantsManagementView viewOnly={true} />} />
        <Route path="social-accounts" element={<SocialAccountsManagementView viewOnly={true} />} />
        <Route path="social-media" element={<SocialAccountsManagementView viewOnly={true} />} />
        <Route path="leadership" element={<LeadershipManagementView viewOnly={true} />} />
        <Route path="reels" element={<ReelsTrackerView />} />
        <Route path="social" element={<SocialCalendarView />} />
        <Route path="events" element={<EventsView />} />
        <Route path="reports" element={<ReportsView />} />
        <Route path="meetings" element={<MeetingsView />} />
        <Route path="files" element={<FilesWorkspaceView />} />
        <Route path="ideas" element={<IdeasView />} />
      </Routes>
    </DashboardLayout>
  );
};
