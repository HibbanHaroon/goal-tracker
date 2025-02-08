import Home from "./pages/Home/Home";
import GoalTracker from "./pages/GoalTracker/GoalTracker";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<GoalTracker />} />
      </Routes>
    </div>
  );
}

export default App;
