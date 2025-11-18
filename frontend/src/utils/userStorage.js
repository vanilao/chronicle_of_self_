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
  const keys = ['habits', 'habitCompletions', 'userSettings', 'achievements'];
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
