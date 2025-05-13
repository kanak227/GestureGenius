"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HandIcon, RefreshCcw, Info, Settings, Camera, History } from 'lucide-react'
import "./css/SelfTesting.css"

const ASLDetector = () => {
  const [prediction, setPrediction] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [serverUrl, setServerUrl] = useState("http://localhost:5001")

  useEffect(() => {
    // Check if we're running in the deployment environment
    if (window.location.hostname.includes('all-hands.dev')) {
      // Use the deployment URL
      setServerUrl(`https://${window.location.hostname}:12001`);
    }

    const checkConnection = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${serverUrl}/prediction`)
        if (response.ok) {
          setError(null)
        } else {
          setError("Server connection issue")
        }
      } catch (error) {
        setError("Cannot connect to ASL detection server")
        console.error("Connection error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkConnection()

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${serverUrl}/prediction`)
        const data = await response.json()
        
        if (data.class && data.class !== prediction && data.confidence > 0.7) {
          // Add to history if it's a new prediction with good confidence
          setHistory(prev => {
            const newHistory = [{ sign: data.class, time: new Date().toLocaleTimeString() }, ...prev]
            return newHistory.slice(0, 10) // Keep only the last 10 items
          })
        }
        
        setPrediction(data.class)
        setConfidence(data.confidence)
      } catch (error) {
        console.error("Error fetching prediction:", error)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [prediction])

  const handleRefresh = () => {
    window.location.reload()
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="asl-detector">
      {/* Navbar */}
      <nav className="asl-navbar">
        <div className="asl-container">
          <Link to="/" className="asl-logo">
            <HandIcon className="logo-icon" />
            GestureGenius
          </Link>
          <ul className="asl-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing" className="active">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
            <li><Link to="/explore">Explore Model</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="asl-content">
        <div className="page-header">
          <h1 className="title">Real-Time ASL Detection</h1>
          <p className="subtitle">Practice your sign language skills with instant feedback</p>
        </div>

        <div className="dashboard">
          <div className="main-panel">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Connecting to ASL detection service...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <div className="error-message">
                  <Info className="error-icon" />
                  <p>{error}</p>
                </div>
                <button className="primary-button" onClick={handleRefresh}>
                  <RefreshCcw size={16} />
                  Retry Connection
                </button>
              </div>
            ) : (
              <>
                <div className="video-container">
                  <div className="video-wrapper">
                    {/* Using iframe instead of img to prevent refreshing */}
                    <iframe
                      src={`${serverUrl}/video_feed`}
                      title="Live ASL Stream"
                      className="video-feed"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    <div className="video-overlay">
                      <Camera className="camera-icon" />
                    </div>
                  </div>
                  <div className="video-controls">
                    <button className="control-button refresh" onClick={handleRefresh}>
                      <RefreshCcw size={16} />
                      Refresh
                    </button>
                    <button className="control-button settings">
                      <Settings size={16} />
                      Settings
                    </button>
                  </div>
                </div>

                <div className="output-container">
                  <div className="output-box">
                    <h2>Detected Sign</h2>
                    <div className={`detected-sign ${prediction ? "" : "no-hand"}`}>
                      {prediction || "Waiting for sign..."}
                    </div>
                    {prediction && (
                      <div className="confidence-meter">
                        <div className="confidence-bar">
                          <div 
                            className="confidence-fill" 
                            style={{ width: `${confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="confidence-text">{Math.round(confidence * 100)}% confidence</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="side-panel">
            <div className="history-box">
              <div className="history-header">
                <h2>
                  <History size={18} />
                  Recent Detections
                </h2>
                <button className="clear-button" onClick={clearHistory}>Clear</button>
              </div>
              {history.length === 0 ? (
                <div className="empty-history">
                  <p>No signs detected yet</p>
                </div>
              ) : (
                <ul className="history-list">
                  {history.map((item, index) => (
                    <li key={index} className="history-item">
                      <span className="history-sign">{item.sign}</span>
                      <span className="history-time">{item.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="tips-box">
              <h2>Tips for Better Detection</h2>
              <ul className="tips-list">
                <li>Ensure good lighting on your hands</li>
                <li>Position your hand in the center of the frame</li>
                <li>Make clear, distinct gestures</li>
                <li>Keep a neutral background if possible</li>
                <li>Hold the sign steady for better recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ASLDetector
