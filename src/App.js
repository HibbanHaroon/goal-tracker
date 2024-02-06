import Home from "./pages/Home/Home";
import GoalTracker from "./pages/GoalTracker/GoalTracker";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./auth/Protected";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <AuthContextProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/tracker"
            element={
              <Protected>
                <GoalTracker />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
