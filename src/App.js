import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./auth/Protected";
import PublicOnly from "./auth/PublicOnly";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import GoalTracker from "./pages/GoalTracker/GoalTracker";
import { ROUTES } from "./constants";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <AuthContextProvider navigate={navigate}>
      <Toaster position="top-right" />
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route
            path={ROUTES.HOME}
            element={
              <PublicOnly>
                <Home />
              </PublicOnly>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />
          <Route
            path={ROUTES.SIGNUP}
            element={
              <PublicOnly>
                <Signup />
              </PublicOnly>
            }
          />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={
              <PublicOnly>
                <ForgotPassword />
              </PublicOnly>
            }
          />

          {/* Verify email - accessible when logged in but not verified */}
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />

          {/* Protected routes */}
          <Route
            path={ROUTES.TRACKER}
            element={
              <Protected>
                <GoalTracker />
              </Protected>
            }
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
