import { STORAGE_KEYS } from "../constants";

/**
 * Extracts and saves user data to localStorage
 * @param {Object|null} user - Firebase user object or null
 */
export const saveUserToStorage = (user) => {
  if (user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

/**
 * Retrieves user data from localStorage
 * @returns {Object|null} - User data object or null
 */
export const getUserFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  return stored ? JSON.parse(stored) : null;
};

/**
 * Clears user data from localStorage
 */
export const clearUserFromStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};
