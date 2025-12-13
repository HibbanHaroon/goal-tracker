import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import UserIcon from "../../assets/icons/UserIcon";
import EyeIcon from "../../assets/icons/EyeIcon";
import EyeClosedIcon from "../../assets/icons/EyeClosedIcon";
import { UserAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../utils/auth-utils";
import { showError } from "../../utils/toast-utils";
import { ROUTES } from "../../constants";
import HomeLayout from "../Home/components/HomeLayout";
import SEO from "../../components/SEO";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const { googleSignIn, signUpWithEmail, signInAsGuest } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      await signUpWithEmail(email, password);
      navigate(ROUTES.VERIFY_EMAIL);
    } catch (error) {
      showError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      showError(getAuthErrorMessage(error));
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
      await signInAsGuest();
    } catch (error) {
      showError(getAuthErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <>
      <SEO />
      <HomeLayout showBackButton={true}>
        <div className="auth-form-section">
          <h1>Start tracking today.</h1>

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
                {loading ? "Please wait..." : "Create Account"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-alternatives">
              <button
                type="button"
                className="auth-btn"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <GoogleIcon width={18} height={18} />
                Continue with Google
              </button>

              <button
                type="button"
                className="auth-btn"
                onClick={handleGuestSignIn}
                disabled={loading}
              >
                <UserIcon width={18} height={18} />
                Continue as Guest
              </button>
            </div>

            <p className="guest-notice">
              Guest data is temporary and will be lost if you sign out.
            </p>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="text-link">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default Signup;
