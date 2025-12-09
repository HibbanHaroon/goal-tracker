import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ROUTES } from "../constants";
import Loader from "../pages/GoalTracker/components/Loader";

/**
 * Route guard for authenticated routes
 * Redirects to home if user is not logged in
 * Redirects to verify-email if email is not verified (for email/password users)
 * Shows loader while auth state is being determined
 */
const Protected = ({ children }) => {
  const { user, loading, isGuestUser } = UserAuth();

  // Show loader while checking auth state
  if (loading) {
    return <Loader />;
  }

  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Skip email verification check for guest users and Google users
  // Google users are automatically verified
  // Guest users don't have email to verify
  const isGoogleUser = user.providerData?.some(
    (provider) => provider.providerId === "google.com"
  );

  // If user signed up with email/password and hasn't verified email
  if (!isGuestUser && !isGoogleUser && !user.emailVerified) {
    return <Navigate to={ROUTES.VERIFY_EMAIL} replace />;
  }

  return children;
};

export default Protected;
