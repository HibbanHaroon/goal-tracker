import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="features-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Goal Tracker</h2>
        </div>
        <nav className="footer-nav">
          <Link to={ROUTES.HOME} className="nav-link">
            Home
          </Link>
          <Link to={ROUTES.ABOUT} className="nav-link">
            About
          </Link>
          <Link to={ROUTES.FEATURES} className="nav-link">
            Features
          </Link>
        </nav>
      </div>
      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Goal Tracker. All rights reserved. Built
          with passion for goal-achievers worldwide.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
