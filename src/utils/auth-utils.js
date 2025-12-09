/**
 * Get user-friendly error message from Firebase auth error
 * @param {Error} error - Firebase auth error
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (error) => {
  const errorCode = error.code;
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return error.message || "Something went wrong. Please try again.";
  }
};
