import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  Button,
  TextField,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel
} from '@mui/material';
import {
  DarkMode,
  Notifications,
  VolumeUp,
  Delete,
  Download,
  Logout,
  Save
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { getUserStorageKey, getCurrentUserId } from '../../utils/userStorage';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch {
        return {
          notifications: true,
          soundEffects: true,
          dailyReminder: true,
          reminderTime: '09:00'
        };
      }
    }
    return {
      notifications: true,
      soundEffects: true,
      dailyReminder: true,
      reminderTime: '09:00'
    };
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const settingsKey = getUserStorageKey(userId, 'userSettings');
      const storedSettings = localStorage.getItem(settingsKey);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    }
  }, []);

  // Auto-save settings when they change
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const settingsKey = getUserStorageKey(userId, 'userSettings');
      localStorage.setItem(settingsKey, JSON.stringify(settings));
    }
  }, [settings]);

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = () => {
    const userId = getCurrentUserId();
    if (userId) {
      const settingsKey = getUserStorageKey(userId, 'userSettings');
      // Save to localStorage
      localStorage.setItem(settingsKey, JSON.stringify(settings));
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleExportData = () => {
    const userData = {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      habits: JSON.parse(localStorage.getItem('habits') || '[]'),
      settings: settings
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chronicle-of-self-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMessage('Data exported successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    // Clear all data
    localStorage.clear();
    setDeleteDialogOpen(false);
    logout();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'VT323, monospace',
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.primary',
          mb: 6
        }}
      >
        SETTINGS
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Appearance */}
        <Grid size={12}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.25rem',
                  color: 'text.primary'
                }}
              >
                APPEARANCE
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 2,
                  border: '2px solid black'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <DarkMode sx={{ color: 'text.secondary' }} />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      Dark Mode
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: 'text.secondary'
                      }}
                    >
                      Toggle dark/light theme
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid size={12}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.25rem',
                  color: 'text.primary'
                }}
              >
                NOTIFICATIONS
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 2,
                  border: '2px solid black'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Notifications sx={{ color: 'text.secondary' }} />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      Push Notifications
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: 'text.secondary'
                      }}
                    >
                      Receive habit reminders
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={settings.notifications}
                  onChange={() => handleSettingChange('notifications')}
                  color="primary"
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 2,
                  border: '2px solid black'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VolumeUp sx={{ color: 'text.secondary' }} />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      Sound Effects
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: 'text.secondary'
                      }}
                    >
                      Play sounds on XP gain and level up
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={settings.soundEffects}
                  onChange={() => handleSettingChange('soundEffects')}
                  color="primary"
                />
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.dailyReminder}
                      onChange={() => handleSettingChange('dailyReminder')}
                      color="primary"
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: 'text.primary'
                      }}
                    >
                      Daily Reminder
                    </Typography>
                  }
                />
                <TextField
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => setSettings(prev => ({ ...prev, reminderTime: e.target.value }))}
                  size="small"
                  disabled={!settings.dailyReminder}
                  sx={{ width: 140 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Management */}
        <Grid size={12}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.25rem',
                  color: 'text.primary'
                }}
              >
                DATA MANAGEMENT
              </Typography>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Download />}
                onClick={handleExportData}
                fullWidth
                sx={{ justifyContent: 'flex-start', py: 1.5 }}
              >
                EXPORT DATA
              </Button>

              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Download all your habits and progress as a JSON file
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Actions */}
        <Grid size={12}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.25rem',
                  color: 'text.primary'
                }}
              >
                ACCOUNT
              </Typography>

              <Button
                variant="contained"
                startIcon={<Logout />}
                onClick={handleLogout}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'background.paper' }
                }}
              >
                LOG OUT
              </Button>

              <Divider />

              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={() => setDeleteDialogOpen(true)}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  bgcolor: '#ef4444',
                  color: 'white',
                  '&:hover': { bgcolor: '#dc2626' }
                }}
              >
                DELETE ACCOUNT
              </Button>

              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                This will permanently delete all your data. This action cannot be undone.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid size={12}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            fullWidth
            size="large"
            sx={{ py: 2 }}
          >
            SAVE SETTINGS
          </Button>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            border: '3px solid black',
            boxShadow: '8px 8px 0px rgba(0,0,0,1)'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem' }}>
          DELETE ACCOUNT?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Are you sure you want to delete your account? This will permanently remove all your habits, progress, and achievements. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.primary'
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              bgcolor: '#ef4444',
              '&:hover': { bgcolor: '#dc2626' }
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;
