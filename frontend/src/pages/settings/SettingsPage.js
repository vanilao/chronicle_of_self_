import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Alert
} from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings, DEFAULT_SETTINGS } from '../../contexts/SettingsContext';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import { getUserStorageKey, getCurrentUserId } from '../../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import {
  AppearanceCard,
  NotificationsCard,
  DataPrivacyCard,
  AccountActionsCard,
  DeleteAccountDialog,
  ResetSettingsDialog
} from './components';
import SoundSettings from '../../components/user/SoundSettings';
import SoundTest from '../../components/debug/SoundTest';
import SimpleSoundTest from '../../components/debug/SimpleSoundTest';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleThemeToggle = () => {
    soundManager.playThemeToggle();
    toggleTheme();
  };

  const handleSettingChange = (setting) => {
    updateSetting(setting, !settings[setting]);
  };

  const handleExportData = () => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        setErrorMessage('Unable to export data: User not found');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      // Get user data from global key
      const userData = JSON.parse(localStorage.getItem('user') || '{}');

      // Get user-specific data using proper keys
      const habitsKey = getUserStorageKey(userId, 'habits');
      const completionsKey = getUserStorageKey(userId, 'habitCompletions');
      const settingsKey = getUserStorageKey(userId, 'userSettings');
      const achievementsKey = getUserStorageKey(userId, 'achievements');

      const exportData = {
        exportDate: new Date().toISOString(),
        user: userData,
        habits: JSON.parse(localStorage.getItem(habitsKey) || '[]'),
        habitCompletions: JSON.parse(localStorage.getItem(completionsKey) || '{}'),
        settings: JSON.parse(localStorage.getItem(settingsKey) || JSON.stringify(DEFAULT_SETTINGS)),
        achievements: JSON.parse(localStorage.getItem(achievementsKey) || '[]')
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chronicle-of-self-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMessage('Data exported successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to export data. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDeleteAccount = () => {
    // logout() already calls clearUserData(userId) and removes the 'user' key
    // No need for localStorage.clear() which would wipe unrelated data
    setDeleteDialogOpen(false);
    logout();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetSettings = () => {
    resetSettings();
    setResetDialogOpen(false);
    setSuccessMessage('Settings reset to defaults!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Box className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'VT323, monospace',
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.primary',
          mb: 2
        }}
      >
        SETTINGS
      </Typography>

      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.75rem',
          color: 'text.secondary',
          mb: 4
        }}
      >
        Changes are saved automatically
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Appearance */}
        <Grid size={12}>
          <AppearanceCard theme={theme} toggleTheme={handleThemeToggle} />
        </Grid>

        {/* Notifications & Reminders */}
        <Grid size={12}>
          <NotificationsCard
            settings={settings}
            onSettingChange={handleSettingChange}
            onUpdateSetting={updateSetting}
          />
        </Grid>

        {/* Sound Settings */}
        <Grid size={12}>
          <SoundSettings />
        </Grid>

        {/* Simple Sound Debug */}
        <Grid size={12}>
          <SimpleSoundTest />
        </Grid>

        {/* Debug Sound Test */}
        <Grid size={12}>
          <SoundTest />
        </Grid>

        {/* Data & Privacy */}
        <Grid size={12}>
          <DataPrivacyCard
            onExportData={handleExportData}
            onResetSettings={() => setResetDialogOpen(true)}
          />
        </Grid>

        {/* Account & Security */}
        <Grid size={12}>
          <AccountActionsCard
            onLogout={handleLogout}
            onDeleteAccount={() => setDeleteDialogOpen(true)}
          />
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <DeleteAccountDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Reset Settings Confirmation Dialog */}
      <ResetSettingsDialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        onConfirm={handleResetSettings}
      />
    </Box>
  );
};

export default SettingsPage;
