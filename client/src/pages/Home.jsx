import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, BrainCircuit } from 'lucide-react';
import './css/Home.css';
const HomePage = () => {
  return (
    <div className="homepage">
      
      <nav className="navbar">
        <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
            <li><Link to="/Explore">Explore Model</Link></li>

          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1>ASL Detector</h1>
          <p>Breaking communication barriers with real-time sign language detection</p>
        </div>
      </div>

      {/* Problem Highlight */}
      <div className="problem-highlight">
        <div className="container">
          <h2>The Communication Barrier</h2>
          <p>
            Millions of people who use American Sign Language (ASL) struggle with effective communication
            in a world designed for spoken language. Limited accessibility in workplaces, education, and
            healthcare creates significant challenges for the deaf and hard-of-hearing community.
          </p>
        </div>
      </div>

      {/* Our Solution */}
      <div className="solution">
        <div className="container">
          <h2>How ASL Detector Helps</h2>
          <p>
            Our AI-powered model bridges the gap by recognizing sign language gestures in real time.
            Whether it's learning ASL, self-testing, or video calling, our platform enhances communication
            accessibility.
          </p>
          <div className="solution-grid">
            <div className="solution-card">
              <BrainCircuit className="icon" />
              <h3>AI-Powered Detection</h3>
              <p>Our deep-learning model accurately detects and translates ASL signs in real time.</p>
            </div>
            <div className="solution-card">
              <Camera className="icon" />
              <h3>Self Testing</h3>
              <p>Users can practice ASL and receive instant feedback on their sign accuracy.</p>
            </div>
            <div className="solution-card">
              <Video className="icon" />
              <h3>ASL Video Calls</h3>
              <p>Our smart video calling system recognizes and assists in ASL communication.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="container">
          <h2>Our Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <Camera className="icon" />
              <h3>Self Testing</h3>
              <p>Practice and test your ASL signs with instant feedback.</p>
            </div>
            <div className="feature-card">
              <Video className="icon" />
              <h3>Video Calling</h3>
              <p>Connect with others using ASL-enabled video calls.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Experience the power of our ASL detection technology</p>
          <Link to="/self-testing">
            <button>Try Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
