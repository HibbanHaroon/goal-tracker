import Home from "./pages/Home/Home";
import GoalTracker from "./pages/GoalTracker/GoalTracker";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./auth/Protected";
import PublicOnly from "./auth/PublicOnly";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <AuthContextProvider navigate={navigate}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <PublicOnly>
                <Home />
              </PublicOnly>
            }
          />
          <Route
            path="/tracker"
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
