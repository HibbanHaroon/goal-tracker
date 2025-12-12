import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import HomeLayout from "./HomeLayout";
import ChartIcon from "../../../assets/icons/ChartIcon";
import MusicIcon from "../../../assets/icons/MusicIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";

function Content() {
  return (
    <HomeLayout>
      <div className="mobile-hero">
        <h1>Do you have some Goals?</h1>
        <p>
          Embark on a journey of self-improvement with Goal Tracker. Whether
          it's big or small, your goals matter.
        </p>
      </div>
      <div className="landing-section">
        <h1>Track them right away.</h1>
        <div className="landing-buttons">
          <Link to={ROUTES.SIGNUP} className="landing-btn landing-btn-primary">
            Get Started
          </Link>
          <Link to={ROUTES.LOGIN} className="landing-btn">
            Sign In
          </Link>
        </div>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <ChartIcon size={24} />
            </div>
            <div className="feature-content">
              <h3>Yearly Progress Graph</h3>
              <p>
                Visualize your achievements with intuitive yearly progress
                tracking
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <MusicIcon size={24} />
            </div>
            <div className="feature-content">
              <h3>Spotify Embed</h3>
              <p>Stay motivated with a groovy playlist while tracking goals</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <CalendarIcon size={24} />
            </div>
            <div className="feature-content">
              <h3>Calendar & Flip Clock</h3>
              <p>Track time and organize your goals with built-in calendar</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Content;
