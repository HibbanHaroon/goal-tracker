import React from "react";
import "./styles/Header.css";

function Header() {
  return (
    <div className="header">
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
