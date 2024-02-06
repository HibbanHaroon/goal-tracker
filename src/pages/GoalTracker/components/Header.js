import React, { useEffect } from "react";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/Header.css";

function Header() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user]);

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
