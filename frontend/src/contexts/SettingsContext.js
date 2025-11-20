import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserStorageKey, getCurrentUserId } from '../utils/userStorage';

const SettingsContext = createContext();

export const DEFAULT_SETTINGS = {
  notifications: true,
  soundEffects: true,
  dailyReminder: true,
  reminderTime: '09:00'
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      const userId = getCurrentUserId();
      if (userId) {
        const settingsKey = getUserStorageKey(userId, 'userSettings');
        const storedSettings = localStorage.getItem(settingsKey);
        if (storedSettings) {
          try {
            const parsed = JSON.parse(storedSettings);
            setSettings({ ...DEFAULT_SETTINGS, ...parsed });
          } catch {
            setSettings(DEFAULT_SETTINGS);
          }
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
      setIsLoaded(true);
    };

    loadSettings();

    // Listen for storage changes (e.g., when user logs in/out)
    const handleStorageChange = () => {
      loadSettings();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-save settings when they change
  useEffect(() => {
    if (!isLoaded) return;

    const userId = getCurrentUserId();
    if (userId) {
      try {
        const settingsKey = getUserStorageKey(userId, 'userSettings');
        localStorage.setItem(settingsKey, JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  }, [settings, isLoaded]);

  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Reload settings (useful after login)
  const reloadSettings = () => {
    const userId = getCurrentUserId();
    if (userId) {
      const settingsKey = getUserStorageKey(userId, 'userSettings');
      const storedSettings = localStorage.getItem(settingsKey);
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch {
          setSettings(DEFAULT_SETTINGS);
        }
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  };

  const value = {
    settings,
    isLoaded,
    updateSettings,
    updateSetting,
    resetSettings,
    reloadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
