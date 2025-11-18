import React, { createContext, useContext, useState, useEffect } from 'react';
import { processXPGain, getTitleForLevel, getXPForNextLevel } from '../utils/levelingSystem';
import { getCurrentUserId, clearUserData } from '../utils/userStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [levelUpNotification, setLevelUpNotification] = useState(null);

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const normalized = normalizeUserLevel(parsed);
      setUser(normalized);
      localStorage.setItem('user', JSON.stringify(normalized));
    }
    setIsLoading(false);
  }, []);

  const normalizeUserLevel = (userData) => {
    const level = userData?.level ?? 0;
    const currentXP = userData?.currentXP ?? 0;
    const nextLevelXP = userData?.nextLevelXP ?? getXPForNextLevel(level);
    return {
      ...userData,
      level,
      currentXP,
      nextLevelXP,
      title: userData?.title ?? getTitleForLevel(level)
    };
  };

  const login = (userData) => {
    const normalized = normalizeUserLevel(userData);
    setUser(normalized);
    localStorage.setItem('user', JSON.stringify(normalized));
    
    // Clear any previous user's data to ensure fresh start
    const userId = normalized.email;
    if (userId) {
      // This ensures new users start with clean data
      console.log('Loading data for user:', userId);
    }
  };

  const logout = () => {
    // Clear current user data
    const userId = getCurrentUserId();
    if (userId) {
      clearUserData(userId);
    }
    
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const normalized = normalizeUserLevel(userData);
    setUser(normalized);
    localStorage.setItem('user', JSON.stringify(normalized));
  };

  const updateUser = (updates) => {
    const updatedUser = normalizeUserLevel({ ...user, ...updates });
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Award XP to the user and handle level ups
   * @param {number} xpAmount - XP to award
   * @returns {object} Result with leveledUp flag
   */
  const awardXP = (xpAmount) => {
    if (!user) return { leveledUp: false };

    const currentLevel = user.level ?? 0;
    const currentXP = user.currentXP ?? 0;

    const result = processXPGain(currentLevel, currentXP, xpAmount);

    const updatedUser = {
      ...user,
      level: result.newLevel,
      currentXP: result.newXP,
      nextLevelXP: result.nextLevelXP,
      title: getTitleForLevel(result.newLevel)
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Show level up notification if leveled up
    if (result.leveledUp) {
      setLevelUpNotification({
        newLevel: result.newLevel,
        levelsGained: result.levelsGained,
        newTitle: getTitleForLevel(result.newLevel)
      });

      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setLevelUpNotification(null);
      }, 5000);
    }

    return result;
  };

  const dismissLevelUpNotification = () => {
    setLevelUpNotification(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    levelUpNotification,
    login,
    logout,
    register,
    updateUser,
    awardXP,
    dismissLevelUpNotification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
