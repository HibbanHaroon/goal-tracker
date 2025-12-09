import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/auth-utils";
import { showError, showSuccess } from "../../utils/toast-utils";
import { ROUTES } from "../../constants";
import HomeLayout from "../Home/components/HomeLayout";
import "./Auth.css";

function VerifyEmail() {
  const navigate = useNavigate();
  const { user, resendVerificationEmail, checkEmailVerification, logOut } =
    UserAuth();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail();
      showSuccess("Verification email sent! Check your inbox.");
    } catch (error) {
      showError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      showError(getAuthErrorMessage(error));
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    try {
      const isVerified = await checkEmailVerification();
      if (isVerified) {
        showSuccess("Email verified!");
        navigate(ROUTES.TRACKER);
      } else {
        showError("Email not verified yet. Please check your inbox.");
      }
    } catch (error) {
      showError(getAuthErrorMessage(error));
    } finally {
      setChecking(false);
    }
  };

  return (
    <HomeLayout>
      <div className="auth-form-section">
        <h1>Verify your email.</h1>

        <div className="auth-form-container">
          <div className="verify-email-content">
            <p>
              We've sent a verification email to{" "}
              <strong>{user?.email || "your email"}</strong>. Please click the
              link in the email to verify your account.
            </p>

            <p>
              After verifying your email, click the button below to continue.
            </p>

            <div className="verify-email-actions">
              <button
                type="button"
                className="auth-btn auth-btn-primary"
                onClick={handleCheckVerification}
                disabled={checking}
              >
                {checking ? "Checking..." : "I've Verified My Email"}
              </button>

              <button
                type="button"
                className="auth-btn"
                onClick={handleResend}
                disabled={loading}
              >
                {loading ? "Sending..." : "Resend Verification Email"}
              </button>

              <button
                type="button"
                className="auth-btn"
                onClick={handleSignOut}
              >
                Use Different Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default VerifyEmail;
