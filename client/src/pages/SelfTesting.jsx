import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, PlayCircle } from 'lucide-react';

const Testing = () => {
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


    </div>
  );
};

export default Testing;
