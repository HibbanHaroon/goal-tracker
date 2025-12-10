import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
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

  const handleNavigateToLinkAccount = () => {
    navigate(ROUTES.LINK_ACCOUNT);
  };

  return (
    <div className="main-header">
      <h1>Goal Tracker</h1>
      <div className="header-actions">
        {isGuestUser && (
          <button
            onClick={handleNavigateToLinkAccount}
            className="header-btn"
            aria-label="Link Account"
            title="Link Account"
          >
            <LinkIcon width={20} height={20} />
            <span className="btn-text">Link Account</span>
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="header-btn"
          aria-label="Logout"
          title="Logout"
        >
          <LogoutIcon width={20} height={20} />
          <span className="btn-text">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
