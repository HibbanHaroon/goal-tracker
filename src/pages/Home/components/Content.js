import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import HomeLayout from "./HomeLayout";

function Content() {
  return (
    <HomeLayout>
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
      </div>
    </HomeLayout>
  );
}

export default Content;
