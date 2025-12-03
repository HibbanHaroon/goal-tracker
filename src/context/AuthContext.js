import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { IS_DEV, ROUTES } from "../constants";
import {
  saveUserToStorage,
  getUserFromStorage,
  clearUserFromStorage,
} from "../utils/storage-utils";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(getUserFromStorage);
  const [loading, setLoading] = useState(true);

  /**
   * Handles user state update and storage sync
   */
  const handleUserChange = useCallback((firebaseUser) => {
    setUser(firebaseUser);
    saveUserToStorage(firebaseUser);
  }, []);

  /**
   * Initiates Google sign-in
   * Uses popup in development (redirect has cross-origin issues on localhost)
   * Uses redirect in production (better UX, no popup blockers)
   */
  const googleSignIn = useCallback(async () => {
    try {
      if (IS_DEV) {
        await signInWithPopup(auth, googleProvider);
      } else {
        await signInWithRedirect(auth, googleProvider);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }, []);

  /**
   * Signs out the current user and redirects to home
   */
  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      clearUserFromStorage();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }, [navigate]);

  useEffect(() => {
    /**
     * Handle redirect result (production only)
     * When user returns from Google's OAuth page, this captures the result
     */
    const handleRedirectResult = async () => {
      if (IS_DEV) return;

      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          handleUserChange(result.user);
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };

    handleRedirectResult();

    /**
     * Subscribe to auth state changes
     * - Fires on login, logout, and token refresh
     * - Handles session persistence across page reloads
     * - Returns unsubscribe function to cleanup listener on unmount
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      handleUserChange(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [handleUserChange]);

  const value = {
    user,
    loading,
    googleSignIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
