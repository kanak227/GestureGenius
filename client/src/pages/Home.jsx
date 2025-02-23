import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, PlayCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
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

      {/* Features Section */}
      <div className="features">
        <div className="container">
          <h2>Our Features</h2>

          <div className="feature-grid">
            {/* Self Testing Feature */}
            <div className="feature-card">
              <Camera className="icon" />
              <h3>Self Testing</h3>
              <p>Practice and test your ASL signs with instant feedback</p>
              <ul>
                <li>Real-time sign detection</li>
                <li>Instant accuracy feedback</li>
                <li>Practice mode available</li>
              </ul>
            </div>

            {/* Video Calling Feature */}
            <div className="feature-card">
              <Video className="icon" />
              <h3>Video Calling</h3>
              <p>Connect with others using ASL-enabled video calls</p>
              <ul>
                <li>Live ASL translation</li>
                <li>HD video quality</li>
                <li>Easy-to-use interface</li>
              </ul>
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

      {/* Styles */}
      <style>{`
        .homepage {
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Navbar */
        .navbar {
          background-color: #2563eb;
          padding: 15px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
        }

        .navbar ul {
          list-style: none;
          display: flex;
          gap: 20px;
          padding: 0;
          margin: 0;
        }

        .navbar ul li {
          display: inline;
        }

        .navbar ul li a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          transition: opacity 0.3s;
        }

        .navbar ul li a:hover {
          opacity: 0.8;
        }

        .hero {
          background-color: white;
          color: black;
          padding: 20px 0;
          text-align: center;
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 20px;
          margin: 0;
        }

        .features {
          padding: 30px 0;
        }

        .features h2 {
          text-align: center;
          font-size: 36px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .feature-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .icon {
          width: 48px;
          height: 48px;
          color: #2563eb;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .feature-card p {
          color: #666;
          margin-bottom: 20px;
        }

        .feature-card ul {
          list-style: none;
          padding: 0;
        }

        .feature-card ul li {
          color: #666;
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
        }

        .feature-card ul li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #2563eb;
        }

        .cta {
          background-color: #f3f4f6;
          padding: 80px 0;
          text-align: center;
        }

        .cta h2 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .cta p {
          color: #666;
          margin-bottom: 30px;
        }

        .cta button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 18px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cta button:hover {
          background-color: #1d4ed8;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 36px;
          }

          .hero p {
            font-size: 18px;
          }

          .features {
            padding: 60px 0;
          }

          .feature-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
