import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import ChartIcon from "../../../assets/icons/ChartIcon";
import TrackIcon from "../../../assets/icons/TrackIcon";
import MusicIcon from "../../../assets/icons/MusicIcon";
import ClockIcon from "../../../assets/icons/ClockIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import "./styles/FeaturesContent.css";

function FeaturesContent() {
  return (
    <div className="features-content">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="hero-left">
          <h1>Cool</h1>
          <p>Everything you need to track your goals</p>
        </div>
        <div className="hero-right">
          <h1>Features</h1>
          <p>Visualize progress and achieve success</p>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="features-mobile-hero">
        <div className="features-mobile-hero-content">
          <h1>Cool Features</h1>
          <p>
            Everything you need to track, visualuze and achieve your goals in
            one beautifully designed website.
          </p>
        </div>
      </section>

      {/* Yearly Progress Visualization */}
      <section className="feature-section feature-section-white">
        <div className="feature-icon-container">
          <div className="feature-list-icon">
            <ChartIcon size={120} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-label">CORE FEATURE</span>
          <h2>Yearly Progress Visualization</h2>
          <p>
            Watch your transformation unfold with beautiful, intuitive yearly
            progress graph. We have a custom graph that tracks every goal you
            set and displays your achievements in a clear, motivating format.
          </p>
          <ul className="feature-list feature-list-white">
            <li>
              Interactive chart showing daily progress for the current year
            </li>
            <li>Whole year progress to track long-term growth</li>
            <li>Average completion rate to focus on what matters most</li>
            <li>
              No need for hard calculations, your progress is displayed right
              infront of you
            </li>
          </ul>
        </div>
      </section>

      {/* Daily Goal Tracking */}
      <section className="feature-section feature-section-black">
        <div className="feature-text">
          <span className="feature-label">CORE FEATURE</span>
          <h2>Daily Goal Tracking</h2>
          <p>
            Set, track, and complete your daily goals with our intuitive
            interface. Whether it's fitness, learning, work, or personal
            development - track everything that matters to you.
          </p>
          <ul className="feature-list feature-list-black">
            <li>Create unlimited goals across multiple categories</li>
            <li>Log in daily to track your goals</li>
            <li>Track completion rates and average completion rate</li>
          </ul>
        </div>
        <div className="feature-icon-container">
          <div className="feature-list-icon feature-icon-white">
            <TrackIcon size={120} />
          </div>
        </div>
      </section>

      {/* Spotify Embed */}
      <section className="feature-section feature-section-white">
        <div className="feature-icon-container">
          <div className="feature-list-icon">
            <MusicIcon size={120} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-label">CORE FEATURE</span>
          <h2>Spotify Embed</h2>
          <p>
            Stay energized and focused while working on your goals with a
            seamlessly embedded Spotify playlist. Music has the power to
            motivate, and we've made it effortless to listen to a groovy
            playlist while working on your goals.
          </p>
          <ul className="feature-list feature-list-white">
            <li>
              We have a dedicated playlist for this project to match it's dark
              black theme
            </li>
            <li>Control playback without leaving your goals page</li>
            <li>
              No need to create a playlist, we have a dedicated one for this
              project
            </li>
          </ul>
        </div>
      </section>

      {/* Elegant Flip Clock */}
      <section className="feature-section feature-section-black">
        <div className="feature-text">
          <span className="feature-label">CORE FEATURE</span>
          <h2>Elegant Flip Clock</h2>
          <p>
            Stay aware of every moment with our beautifully designed flip clock.
            Time is your most valuable resource, and our clock helps you make
            the most of every second while working toward your goals.
          </p>
          <ul className="feature-list feature-list-black">
            <li>Retro-style flip animation for visual appeal</li>
            <li>Real-time display of hours and minutes</li>
            <li>Minimalist design that doesn't distract from your work</li>
            <li>Helps maintain time awareness during focused work sessions</li>
          </ul>
        </div>
        <div className="feature-icon-container">
          <div className="feature-list-icon feature-icon-white">
            <ClockIcon size={120} />
          </div>
        </div>
      </section>

      {/* Integrated Calendar */}
      <section className="feature-section feature-section-white">
        <div className="feature-icon-container">
          <div className="feature-list-icon">
            <CalendarIcon size={120} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-label">CORE FEATURE</span>
          <h2>Integrated Calendar</h2>
          <p>
            Plan your goals with precision using our stylized calendar. Schedule
            goals and milestones with specific dates and visualize your goal
            timeline to ensure you never miss an important deadline.
          </p>
          <ul className="feature-list feature-list-white">
            <li>Monthly calendar view to plan your goals</li>
            <li>Visual indicator for today's date</li>
            <li>
              Quick navigation to any date to review past progress or future
              plans
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Transform your lifestyle in style.</h2>
        <p>
          Experience all these powerful features and more. Start tracking your
          goals today and watch your dreams become reality.
        </p>
        <div className="cta-buttons">
          <Link to={ROUTES.SIGNUP} className="cta-btn cta-btn-primary">
            Get Started Free
          </Link>
          <Link to={ROUTES.ABOUT} className="cta-btn cta-btn-secondary">
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FeaturesContent;
