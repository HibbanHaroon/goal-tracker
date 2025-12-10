import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/auth-utils";
import { showError, showSuccess } from "../../utils/toast-utils";
import { ROUTES } from "../../constants";
import HomeLayout from "../Home/components/HomeLayout";
import "./Auth.css";

function ForgotPassword() {
  const { resetPassword } = UserAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
      showSuccess("Password reset email sent!");
    } catch (error) {
      showError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout showBackButton={true}>
      <div className="auth-form-section">
        <h1>Reset your password.</h1>
        <p className="auth-form-description">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <div className="auth-form-container">
          {success ? (
            <div className="verify-email-content">
              <p>
                We've sent a password reset link to <strong>{email}</strong>.
                Click the link in the email to set a new password.
              </p>
              <div className="verify-email-actions">
                <Link to={ROUTES.LOGIN} className="auth-btn auth-btn-primary">
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  className="auth-btn auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Send Reset Link"}
                </button>
              </form>

              <div className="auth-footer">
                <Link to={ROUTES.LOGIN}>Back to Sign In</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
