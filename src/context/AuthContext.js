import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  linkWithPopup,
  linkWithRedirect,
  linkWithCredential,
  getRedirectResult,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
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

  /**
   * Signs in as a guest (anonymous) user
   * Guest users can use the app but their data is temporary
   * They can upgrade to a full account later using linkGuest functions
   */
  const signInAsGuest = useCallback(async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Guest sign in error:", error);
      throw error;
    }
  }, []);

  /**
   * Links a guest account with email/password credentials
   * Preserves the user's UID and all associated data
   * @param {string} email - User's email address
   * @param {string} password - User's chosen password
   */
  const linkGuestWithEmail = useCallback(
    async (email, password) => {
      try {
        const credential = EmailAuthProvider.credential(email, password);
        const result = await linkWithCredential(auth.currentUser, credential);
        handleUserChange(result.user);
        return result.user;
      } catch (error) {
        console.error("Link with email error:", error);
        throw error;
      }
    },
    [handleUserChange]
  );

  /**
   * Links a guest account with Google credentials
   * Preserves the user's UID and all associated data
   * Uses popup in dev, redirect in production
   */
  const linkGuestWithGoogle = useCallback(async () => {
    try {
      if (IS_DEV) {
        const result = await linkWithPopup(auth.currentUser, googleProvider);
        handleUserChange(result.user);
        return result.user;
      } else {
        await linkWithRedirect(auth.currentUser, googleProvider);
      }
    } catch (error) {
      console.error("Link with Google error:", error);
      throw error;
    }
  }, [handleUserChange]);

  /**
   * Creates a new account with email and password
   * Automatically sends a verification email after signup
   * @param {string} email - User's email address
   * @param {string} password - User's chosen password
   */
  const signUpWithEmail = useCallback(async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Send verification email immediately after signup
      await sendEmailVerification(result.user);
      return result.user;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  }, []);

  /**
   * Signs in with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   */
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }, []);

  /**
   * Sends a password reset email
   * @param {string} email - User's email address
   */
  const resetPassword = useCallback(async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  }, []);

  /**
   * Resends the verification email to the current user
   * Only works if user is signed in but not verified
   */
  const resendVerificationEmail = useCallback(async () => {
    try {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      throw error;
    }
  }, []);

  /**
   * Reloads the current user from Firebase to get fresh data
   * Useful for checking if email has been verified
   * @returns {boolean} - Whether the email is now verified
   */
  const checkEmailVerification = useCallback(async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        const freshUser = auth.currentUser;
        handleUserChange(freshUser);
        return freshUser.emailVerified;
      }
      return false;
    } catch (error) {
      console.error("Check verification error:", error);
      throw error;
    }
  }, [handleUserChange]);

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

  // Check if current user is a guest (anonymous)
  const isGuestUser = user?.isAnonymous ?? false;

  const value = {
    user,
    loading,
    isGuestUser,
    googleSignIn,
    logOut,
    signInAsGuest,
    linkGuestWithEmail,
    linkGuestWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    resetPassword,
    resendVerificationEmail,
    checkEmailVerification,
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
