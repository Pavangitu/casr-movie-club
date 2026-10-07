import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ClubProvider } from './context/ClubContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { FilmGrain } from './components/ui/FilmGrain';
import { CinematicParticles } from './components/ui/CinematicParticles';
import { CinematicLoader } from './components/ui/CinematicLoader';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';

// Pages
import { EntrancePage } from './pages/EntrancePage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ZonesPage } from './pages/ZonesPage';
import { ZoneDetailPage } from './pages/ZoneDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { TeamPage } from './pages/TeamPage';
import { TasksPage } from './pages/TasksPage';
import { ContactPage } from './pages/ContactPage';
import { JoinPage } from './pages/JoinPage';
import { LoginPage } from './pages/LoginPage';

// Dashboards
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { CoordinatorDashboard } from './pages/dashboard/CoordinatorDashboard';
import { MemberDashboard } from './pages/dashboard/MemberDashboard';

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route wrapper that conditionally displays the public Navbar and Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/admin') || 
                      pathname.startsWith('/coordinator') || 
                      pathname.startsWith('/dashboard');
  const isEntrance = pathname === '/';

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white relative">
      <FilmGrain />
      <CinematicParticles />
      <ScrollToTop />
      
      {!isDashboard && !isEntrance && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>

      {!isDashboard && !isEntrance && <Footer />}
    </div>
  );
};

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Global hotkey: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ClubProvider>
      {showSplash && <CinematicLoader onComplete={() => setShowSplash(false)} />}
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Entrance Page (Root) */}
            <Route path="/" element={<EntrancePage />} />
            <Route path="/home" element={<HomePage />} />
            
            {/* Public Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:zoneId" element={<ZoneDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/student" element={<LoginPage initialTab="student" />} />
            <Route path="/login/admin" element={<LoginPage initialTab="admin" />} />

            {/* Authenticated Dashboard Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/coordinator/*" element={<CoordinatorDashboard />} />
            <Route path="/dashboard/*" element={<MemberDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<EntrancePage />} />
          </Routes>

          {/* Global Search Modal */}
          <GlobalSearchModal />
        </AppLayout>
      </BrowserRouter>
    </ClubProvider>
  );
}

export default App;
