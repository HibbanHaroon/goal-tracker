import React from "react";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { UserAuth } from "../../../context/AuthContext";
import "./styles/Header.css";

function Header() {
  const { logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
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
