import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HabitsProvider } from './contexts/HabitsContext';
import { TimeTravelProvider } from './contexts/TimeTravelContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import UserNavbar from './components/user/UserNavbar';
import Footer from './components/layout/Footer';

// Notification Components
import LevelUpNotification from './components/notifications/LevelUpNotification';
import XPToast from './components/notifications/XPToast';

// Dev Tools
import TimeTravelPanel from './components/dev/TimeTravelPanel';

// Public Pages
import LandingPage from './pages/landing/LandingPage';
import FeaturesPage from './pages/features/FeaturesPage';
import PricingPage from './pages/pricing/PricingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import ArchetypeSelectionPage from './pages/auth/ArchetypeSelectionPage';

// Protected Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import HabitsPage from './pages/habits/HabitsPage';
import ProgressPage from './pages/progress/ProgressPage';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout wrapper that chooses navbar based on auth state
const AppLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Pages that should not show any navbar/footer
  const authPages = ['/login', '/register', '/forgot-password', '/verify-email', '/select-archetype'];
  const isAuthPage = authPages.includes(location.pathname);

  // Show different navbar based on auth state
  const showPublicNavbar = !isAuthenticated && !isAuthPage;
  const showUserNavbar = isAuthenticated && !isAuthPage;

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 flex flex-col">
      {showPublicNavbar && <Navbar />}
      {showUserNavbar && <UserNavbar />}

      <main className="flex-grow">
        {children}
      </main>

      {!isAuthPage && <Footer />}

      {/* Global Notifications */}
      <LevelUpNotification />
      <XPToast />

      {/* Time Travel Panel - Only show when authenticated */}
      {isAuthenticated && <TimeTravelPanel />}
    </div>
  );
};

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/select-archetype" element={<ArchetypeSelectionPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/habits" element={<ProtectedRoute><HabitsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TimeTravelProvider>
        <AuthProvider>
          <HabitsProvider>
            <Router>
              <AppRoutes />
            </Router>
          </HabitsProvider>
        </AuthProvider>
      </TimeTravelProvider>
    </ThemeProvider>
  );
}

export default App;
