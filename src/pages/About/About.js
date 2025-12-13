import React from "react";
import SEO from "../../components/SEO";
import Header from "../Home/components/Header";
import AboutContent from "./components/AboutContent";
import Footer from "../Features/components/Footer";
import "./About.css";

function About() {
  return (
    <>
      <SEO />
      <div className="about-page">
        <Header showGetStarted={true} className="about-header" />
        <AboutContent />
        <Footer />
      </div>
    </>
  );
}

export default About;
