import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import Header from "./Header";
import "../Home.css";
import "./styles/Content.css";

function HomeLayout({ children, showBackButton = false }) {
  return (
    <div className="home">
      <Header showBackButton={showBackButton} />
      <div className="content">
        <div className="content-left">
          <div className="circle-container circle-right">
            <div className="circle"></div>
          </div>
          <div className="intro">
            <h1>Do you have some Goals?</h1>
            <p>
              Embark on a journey of self-improvement with Goal Tracker. Whether
              it's big or small, your goals matter. With our intuitive interface
              and insightful tracking, you'll be able to visualize your
              achievements, track your growth, and witness the transformation
              unfold in an intuitive graph to empower your day, every day.
            </p>
          </div>
          <div className="footer-container footer-container-left">
            <div className="circle-container circle-left">
              <div className="circle"></div>
            </div>
            <div className="footer-left">
              <p>
                © {new Date().getFullYear()} Goal Tracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="circle-container circle-left">
            <div className="circle"></div>
          </div>
          {children}
          <div className="footer-container footer-container-right">
            <nav className="footer-nav">
              <Link to={ROUTES.HOME} className="nav-link">
                Home
              </Link>
              <Link to={ROUTES.FEATURES} className="nav-link">
                Features
              </Link>
              <Link to={ROUTES.ABOUT} className="nav-link">
                About
              </Link>
            </nav>
            <div className="circle-container circle-right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
