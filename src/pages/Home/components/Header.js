import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import "./styles/Header.css";

function Header({ showBackButton = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header">
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
    </div>
  );
}

export default Header;
