import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import ChartIcon from "../../../assets/icons/ChartIcon";
import MusicIcon from "../../../assets/icons/MusicIcon";
import ClockIcon from "../../../assets/icons/ClockIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import QuoteIcon from "../../../assets/icons/QuoteIcon";
import TrackIcon from "../../../assets/icons/TrackIcon";
import "./styles/AboutContent.css";

function AboutContent() {
  return (
    <div className="about-content">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-left">
          <h1>About</h1>
          <p>Empowering individuals to achieve their dreams</p>
        </div>
        <div className="hero-right">
          <h1>Goal Tracker</h1>
          <p>Your journey to success starts here</p>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="about-mobile-hero">
        <div className="about-mobile-hero-content">
          <h1>About Goal Tracker</h1>
          <p>
            Empowering individuals to achieve their dreams through intuitive
            goal tracking and progress visualization.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <h2>Our Story</h2>
        <div className="our-story-content">
          <p>
            Goal Tracker was born from a simple observation: people have dreams,
            but often lack the tools to track their progress effectively. We
            believe that every goal, whether big or small, deserves to be
            celebrated and monitored with precision.
          </p>
          <p>
            Our mission is to provide a comprehensive platform that not only
            helps you set and track your daily goals but also visualizes your
            yearly progress in an intuitive and motivating way. We understand
            that the journey to success is filled with ups and downs, and we're
            here to support you every step of the way.
          </p>
          <p>
            What started as a personal project has grown into a powerful tool
            used by my friends and family who are committed to self-improvement
            and achieving their aspirations.
          </p>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="what-makes-different-section">
        <h2>What Makes Us Different</h2>
        <div className="features-grid">
          {/* Yearly Progress Visualization */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <ChartIcon size={80} />
              </div>
            </div>
            <h3>Yearly Progress Visualization</h3>
            <p>
              Track your goals daily and watch your progress unfold through a
              beautiful, intuitive yearly graph that showcase your
              transformation journey.
            </p>
          </div>

          {/* Spotify Integration */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <MusicIcon size={80} />
              </div>
            </div>
            <h3>Spotify Integration</h3>
            <p>
              Stay motivated while tracking your goals with seamlessly embedded
              my personal Spotify playlist that keep you energized and focused.
            </p>
          </div>

          {/* Flip Clock Timer */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <ClockIcon size={80} />
              </div>
            </div>
            <h3>Flip Clock Timer</h3>
            <p>
              Keep track of time with our elegant flip clock feature that helps
              you stay aware of every moment in your goal achieving journey.
            </p>
          </div>

          {/* Integrated Calendar */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <CalendarIcon size={80} />
              </div>
            </div>
            <h3>Integrated Calendar</h3>
            <p>
              Organize your goals with our stylized calendar system that helps
              you plan your goals so that you never miss an important milestone.
            </p>
          </div>

          {/* Daily Motivation Quotes */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <QuoteIcon size={80} />
              </div>
            </div>
            <h3>Daily Motivation Quotes</h3>
            <p>
              Start each day inspired with carefully curated motivational quotes
              that fuel your determination and keep you moving forward.
            </p>
          </div>

          {/* Intuitive Interface */}
          <div className="feature-box">
            <div className="about-icon-container">
              <div className="about-list-icon">
                <TrackIcon size={80} />
              </div>
            </div>
            <h3>Intuitive Interface</h3>
            <p>
              Experience a clean, minimalist black and white design that
              eliminates distractions and keeps you focused on what matters
              most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission & Our Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-box">
          <h2>Our Mission</h2>
          <p>
            To empower individuals worldwide with the tools and insights they
            need to set meaningful goals, track their progress consistently, and
            achieve lasting personal transformation.
          </p>
          <p>
            We believe that everyone deserves access to powerful goal-tracking
            technology that makes self-improvement accessible, engaging, and
            rewarding.
          </p>
        </div>
        <div className="vision-box">
          <h2>Our Vision</h2>
          <p>
            To become a cool and useful goal-tracking platform, helping more
            people transform their aspirations into achievements through
            data-driven insights and motivational support.
          </p>
          <p>
            We envision a future where goal tracking is as natural as checking
            the time, and where every individual has the confidence to pursue
            their dreams.
          </p>
        </div>
      </section>

      {/* Why Choose Goal Tracker? Section */}
      <section className="why-choose-section">
        <h2>Why Choose Goal Tracker?</h2>
        <div className="why-choose-list">
          <div className="why-choose-item">
            <div className="why-choose-number">1</div>
            <div className="why-choose-content">
              <h3>Comprehensive Tracking System</h3>
              <p>
                Unlike basic to-do apps, Goal Tracker provides a clean way to
                track your goals and see your progress.
              </p>
            </div>
          </div>
          <div className="why-choose-item">
            <div className="why-choose-number">2</div>
            <div className="why-choose-content">
              <h3>All-in-One Platform</h3>
              <p>
                From goal tracking to listening music, managing your calendar,
                and motivational quotes - everything you need for success is in
                one beautifully designed interface.
              </p>
            </div>
          </div>
          <div className="why-choose-item">
            <div className="why-choose-number">3</div>
            <div className="why-choose-content">
              <h3>Minimalist Design Philosophy</h3>
              <p>
                Our clean black and white interface eliminates distractions,
                allowing you to focus entirely on your goals without visual
                clutter or unnecessary complexity.
              </p>
            </div>
          </div>
          <div className="why-choose-item">
            <div className="why-choose-number">4</div>
            <div className="why-choose-content">
              <h3>Data-Driven Insights</h3>
              <p>
                Make informed decisions about your goals and see your daily
                progress for the current year that show you exactly where you
                stand and where you're heading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Journey? Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Join my friends and family who are transforming their lives with Goal
          Tracker. Your success story starts today.
        </p>
        <div className="cta-buttons">
          <Link to={ROUTES.SIGNUP} className="cta-btn cta-btn-primary">
            Get Started Free
          </Link>
          <Link to={ROUTES.FEATURES} className="cta-btn cta-btn-secondary">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutContent;
