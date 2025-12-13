import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import { ROUTES } from "../../../constants";
import "./styles/Header.css";

function Header({
  showBackButton = false,
  showGetStarted = false,
  className = "",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`header ${className}`}>
      {showBackButton && (
        <button
          className="back-button"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeftIcon width={24} height={24} />
        </button>
      )}
      <div className="left">
        <h1>Goal</h1>
      </div>
      <div className="right">
        <h1>Tracker</h1>
      </div>
      {showGetStarted && (
        <Link to={ROUTES.SIGNUP} className="get-started-btn">
          Get Started
        </Link>
      )}
    </div>
  );
}

export default Header;
