// User-specific data storage utilities
export const getUserStorageKey = (userId, key) => {
  return `user_${userId}_${key}`;
};

export const setUserSpecificData = (userId, key, data) => {
  const storageKey = getUserStorageKey(userId, key);
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getUserSpecificData = (userId, key) => {
  const storageKey = getUserStorageKey(userId, key);
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : null;
};

export const clearUserData = (userId) => {
  const keys = [
    'habits',
    'habitCompletions',
    'userSettings',
    'achievements',
    'timeTravelOffsetDays'
  ];
  keys.forEach(key => {
    const storageKey = getUserStorageKey(userId, key);
    localStorage.removeItem(storageKey);
  });
};

// Get current user ID from stored user data
export const getCurrentUserId = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    return user.email; // Use email as unique identifier
  }
  return null;
};

// Migrate user data from old email to new email
export const migrateUserData = (oldEmail, newEmail) => {
  const keysToMigrate = [
    'habits',
    'habitCompletions',
    'userSettings',
    'achievements',
    'timeTravelOffsetDays'
  ];

  const migrationResults = {
    success: true,
    migratedKeys: [],
    errors: []
  };

  keysToMigrate.forEach(key => {
    try {
      const oldKey = getUserStorageKey(oldEmail, key);
      const newKey = getUserStorageKey(newEmail, key);

      const data = localStorage.getItem(oldKey);
      if (data !== null) {
        // Write to new key
        localStorage.setItem(newKey, data);
        // Remove old key
        localStorage.removeItem(oldKey);
        migrationResults.migratedKeys.push(key);
      }
    } catch (error) {
      migrationResults.success = false;
      migrationResults.errors.push({ key, error: error.message });
    }
  });

  return migrationResults;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
