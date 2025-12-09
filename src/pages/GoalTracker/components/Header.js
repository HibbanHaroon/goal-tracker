import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { UserAuth } from "../../../context/AuthContext";
import { ROUTES } from "../../../constants";
import "./styles/Header.css";

function Header() {
  const { logOut, isGuestUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToUpgradeAccount = () => {
    navigate(ROUTES.UPGRADE_ACCOUNT);
  };

  return (
    <div className="main-header">
      <h1>Goal Tracker</h1>
      <div className="header-actions">
        {isGuestUser && (
          <button onClick={handleNavigateToUpgradeAccount}>
            Create Account
          </button>
        )}
        <button onClick={handleSignOut}>
          <LogoutIcon width={18} height={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
