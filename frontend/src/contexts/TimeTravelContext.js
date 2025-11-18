import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getUserStorageKey, getCurrentUserId } from '../utils/userStorage';

const TimeTravelContext = createContext();

export const TimeTravelProvider = ({ children }) => {
  const [offsetDays, setOffsetDays] = useState(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const storageKey = getUserStorageKey(userId, 'timeTravelOffsetDays');
      const stored = localStorage.getItem(storageKey);
      return stored ? Number(stored) || 0 : 0;
    }
    return 0;
  });

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const storageKey = getUserStorageKey(userId, 'timeTravelOffsetDays');
      localStorage.setItem(storageKey, String(offsetDays));
    }
  }, [offsetDays]);

  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offsetDays);
    return date;
  }, [offsetDays]);

  const currentDateString = useMemo(() => currentDate.toISOString().split('T')[0], [currentDate]);

  const advanceDay = useCallback(() => {
    setOffsetDays((prev) => prev + 1);
  }, []);

  const rewindDay = useCallback(() => {
    setOffsetDays((prev) => prev - 1);
  }, []);

  const resetDay = useCallback(() => {
    setOffsetDays(0);
  }, []);

  const value = {
    currentDate,
    currentDateString,
    offsetDays,
    isTimeTraveling: offsetDays !== 0,
    advanceDay,
    rewindDay,
    resetDay
  };

  return (
    <TimeTravelContext.Provider value={value}>
      {children}
    </TimeTravelContext.Provider>
  );
};

export const useTimeTravel = () => {
  const context = useContext(TimeTravelContext);
  if (!context) {
    throw new Error('useTimeTravel must be used within a TimeTravelProvider');
  }
  return context;
};
