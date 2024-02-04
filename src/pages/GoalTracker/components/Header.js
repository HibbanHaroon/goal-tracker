import React from "react";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import "./styles/Header.css";

function Header() {
  return (
    <div className="main-header">
      <h1>Goal Tracker</h1>
      <button>
        <LogoutIcon width={18} height={18} /> Logout
      </button>
    </div>
  );
}

export default Header;
