import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ROUTES } from "../constants";
import Loader from "../pages/GoalTracker/components/Loader";

/**
 * Route guard for public-only routes (login page, etc.)
 * Redirects to tracker if user is already logged in
 * Shows loader while auth state is being determined
 */
const PublicOnly = ({ children }) => {
  const { user, loading } = UserAuth();

  // Show loader while checking auth state
  if (loading) {
    return <Loader />;
  }

  // Redirect to tracker if already authenticated
  if (user) {
    return <Navigate to={ROUTES.TRACKER} replace />;
  }

  return children;
};

export default PublicOnly;
