import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import "./styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-header">
      <h1>Goal Tracker</h1>
      <button onClick={handleSignOut}>
        <LogoutIcon width={18} height={18} /> Logout
      </button>
    </div>
  );
}

export default Header;
