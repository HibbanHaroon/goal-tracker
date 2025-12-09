import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import EyeIcon from "../../assets/icons/EyeIcon";
import EyeClosedIcon from "../../assets/icons/EyeClosedIcon";
import { UserAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/auth-utils";
import { showError, showSuccess } from "../../utils/toast-utils";
import { ROUTES } from "../../constants";
import HomeLayout from "../Home/components/HomeLayout";
import "./Auth.css";

function UpgradeAccount() {
  const navigate = useNavigate();
  const { isGuestUser, linkGuestWithEmail, linkGuestWithGoogle } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect non-guest users to tracker
  if (!isGuestUser) {
    return <Navigate to={ROUTES.TRACKER} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showError("Please enter your email.");
      return;
    }
    if (!password) {
      showError("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await linkGuestWithEmail(email, password);
      showSuccess("Account upgraded successfully!");
      navigate(ROUTES.TRACKER);
    } catch (error) {
      showError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLink = async () => {
    setLoading(true);
    try {
      await linkGuestWithGoogle();
      showSuccess("Account upgraded successfully!");
      navigate(ROUTES.TRACKER);
    } catch (error) {
      showError(getAuthErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="auth-form-section">
        <h1>Upgrade your account.</h1>
        <p className="auth-form-description">
          Link your guest account to keep your data permanently.
        </p>

        <div className="auth-form-container">
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

            <div className="input-group input-group-password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeClosedIcon width={20} height={20} />
                ) : (
                  <EyeIcon width={20} height={20} />
                )}
              </button>
            </div>

            <div className="input-group input-group-password">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeClosedIcon width={20} height={20} />
                ) : (
                  <EyeIcon width={20} height={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="auth-btn auth-btn-primary"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Upgrade with Email"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-alternatives">
            <button
              type="button"
              className="auth-btn"
              onClick={handleGoogleLink}
              disabled={loading}
            >
              <GoogleIcon width={18} height={18} />
              Upgrade with Google
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default UpgradeAccount;
