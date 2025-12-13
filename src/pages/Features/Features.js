import React from "react";
import SEO from "../../components/SEO";
import Header from "../Home/components/Header";
import FeaturesContent from "./components/FeaturesContent";
import Footer from "./components/Footer";
import "./Features.css";

function Features() {
  return (
    <>
      <SEO />
      <div className="features-page">
        <Header showGetStarted={true} className="features-header" />
        <FeaturesContent />
        <Footer />
      </div>
    </>
  );
}

export default Features;
