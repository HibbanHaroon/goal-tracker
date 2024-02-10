import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Loader from "../pages/GoalTracker/components/Loader";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 2700);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {showLoader && <Loader />}
      {children}
    </>
  );
};

export default Protected;
