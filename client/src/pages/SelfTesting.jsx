import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, PlayCircle } from 'lucide-react';

const Testing = () => {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setIsRecording(true);
      setShowAlert(true);
      simulateGestureDetection();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsRecording(false);
      setMessage('');
      setShowAlert(false);
    }
  };

  const simulateGestureDetection = () => {
    const helloMessage = 'Hello!';
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < helloMessage.length) {
        setMessage(prev => prev + helloMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
                        <li><Link to="/Explore">Explore Model</Link></li>

          </ul>
        </div>
      </nav>

      <div className="main-content">
        <div className="camera-container">
          <div className="video-wrapper">
            {stream ? (
              <video
                autoPlay
                playsInline
                ref={video => {
                  if (video) {
                    video.srcObject = stream;
                  }
                }}
                className="video-feed"
              />
            ) : (
              <div className="camera-placeholder">
                <Camera size={64} />
              </div>
            )}
          </div>

          <div className="controls">
            {!isRecording ? (
              <button
                onClick={startCamera}
                className="start-button"
              >
                <PlayCircle size={20} />
                <span>Start Camera</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="stop-button"
              >
                <Video size={20} />
                <span>Stop Camera</span>
              </button>
            )}
          </div>
        </div>

        {showAlert && (
          <div className="custom-alert">
            <p className="alert-content">
              Detected Signs: <span className="detected-text">{message}</span>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .nav-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-list a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s;
        }

        .nav-list a:hover {
          color: #666;
        }

        .main-content {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .camera-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .video-wrapper {
          aspect-ratio: 16 / 9;
          background-color: #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .video-feed {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .camera-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .start-button, .stop-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .start-button {
          background-color: #4CAF50;
          color: white;
        }

        .start-button:hover {
          background-color: #45a049;
        }

        .stop-button {
          background-color: #f44336;
          color: white;
        }

        .stop-button:hover {
          background-color: #da190b;
        }

        .custom-alert {
          background-color: #e3f2fd;
          border: 1px solid #90caf9;
          border-radius: 4px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .alert-content {
          margin: 0;
          font-size: 1rem;
          color: #1976d2;
        }

        .detected-text {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Testing; 