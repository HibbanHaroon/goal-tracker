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
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { googleSignIn, signInWithEmail, signInAsGuest } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    setLoading(true);
    try {
      const user = await signInWithEmail(email, password);
      if (!user.emailVerified) {
        navigate(ROUTES.VERIFY_EMAIL);
      }
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
    <HomeLayout>
      <div className="auth-form-section">
        <h1>Welcome back.</h1>

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
                autoComplete="current-password"
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

            <Link to={ROUTES.FORGOT_PASSWORD} className="text-link forgot-link">
              Forgot password?
            </Link>

            <button
              type="submit"
              className="auth-btn auth-btn-primary"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link to={ROUTES.SIGNUP} className="text-link">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Login;
