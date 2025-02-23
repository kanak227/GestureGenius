// import React, { useRef, useEffect, useState } from 'react';
// import './ASLDetector.css';

// const ASLDetector = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const frameInterval = useRef(null);
//   const [prediction, setPrediction] = useState(null);
//   const [isStarted, setIsStarted] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [outputString, setOutputString] = useState('');
//   const [handDetected, setHandDetected] = useState(false); // New state for tracking hand detection

//   const captureFrame = async () => {
//     if (!videoRef.current || !canvasRef.current || isProcessing) return;

//     setIsProcessing(true);
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           image: canvas.toDataURL('image/jpeg')
//         }),
//       });

//       const data = await response.json();

//       if (!data.error) {
//         setPrediction(data);

//         // Update output string
//         if (data.class) {
//           setOutputString(prev => {
//             const newString = prev + data.class;
//             return newString.length > 30 ? newString.slice(-30) : newString;
//           });
//         }

//         // Draw bounding box and update hand detection state
//         if (data.bbox) {
//           setHandDetected(true);  // Hand detected, enable blinking effect
//           context.strokeStyle = '#00FF00';
//           context.lineWidth = 2;
//           context.strokeRect(
//             data.bbox.x_min,
//             data.bbox.y_min,
//             data.bbox.x_max - data.bbox.x_min,
//             data.bbox.y_max - data.bbox.y_min
//           );
//         } else {
//           setHandDetected(false); // No hand detected, disable blinking effect
//         }
//       } else {
//         setHandDetected(false); // If prediction failed, disable blinking
//       }
//     } catch (error) {
//       console.error('Error predicting:', error);
//       setHandDetected(false);
//     } finally {
//       setIsProcessing(false);
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           width: { ideal: 640 },
//           height: { ideal: 480 }
//         }
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//         setIsStarted(true);

//         frameInterval.current = setInterval(captureFrame, 500);
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }
//     if (frameInterval.current) {
//       clearInterval(frameInterval.current);
//     }
//     setIsStarted(false);
//     setPrediction(null);
//     setOutputString('');
//     setHandDetected(false); // Reset hand detection state
//   };

//   const clearOutput = () => {
//     setOutputString('');
//   };

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   return (
//     <div className="asl-detector">
//       <h2 className="title">ASL Sign Language Detector</h2>

//       <div className={video-container ${handDetected ? 'processing' : ''}}>
//         <video ref={videoRef} playsInline />
//         <canvas ref={canvasRef} />
//         {handDetected && <div className="processing-overlay" />}
//       </div>

//       <div className="controls">
//         <button 
//           onClick={isStarted ? stopCamera : startCamera}
//           className={control-button ${isStarted ? 'stop' : 'start'}}
//         >
//           {isStarted ? 'Stop Camera' : 'Start Camera'}
//         </button>

//         <button 
//           onClick={clearOutput}
//           className="control-button clear"
//           disabled={!outputString}
//         >
//           Clear Output
//         </button>
//       </div>

//       {outputString && (
//         <div className="output-container">
//           <h3>Detected Signs:</h3>
//           <div className="output-text">{outputString}</div>
//         </div>
//       )}

//       {prediction && prediction.hand_image && (
//         <div className="prediction-container">
//           <div className="hand-image">
//             <h3>Detected Hand</h3>
//             <img src={prediction.hand_image} alt="Detected hand" />
//           </div>
//           <div className="prediction-info">
//             <h3>Prediction</h3>
//             <p className="sign">Sign: {prediction.class}</p>
//             <p className="confidence">
//               Confidence: {(prediction.confidence * 100).toFixed(2)}%
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ASLDetector;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ASLDetector = () => {
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5001/prediction');
        const data = await response.json();
        setPrediction(data.class);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
            <li><Link to="/Explore">Explore Model</Link></li>
          </ul>
        </div>
      </nav>
      <div className="asl-container">
        <style>
          {`
     .asl-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%; /* Adjust width to match the video */
  max-width: 800px; /* Prevent it from getting too large */
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.video-feed {
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 2px solid #ddd;
}

    .title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
          .output-box {
            padding: 10px;
            background: white;
            border-radius: 8px;
            display: inline-block;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }
          .output-text {
            font-size: 1.5rem;
            font-weight: bold;
            color: #555;
            }
            `}
        </style>


        {/* Main Content */}
        <div className="content">
          <h7 className="title">ASL Sign Language Detector</h7>

          {/* Video Feed */}
          <div className="video-wrapper">
            <img src="http://localhost:5001/video_feed" alt="Live ASL Stream" className="video-feed" />
          </div>

          {/* Output Display */}
          <div className="output-box">
            <h3>Detected Sign: {prediction || "No hand detected"}</h3>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ASLDetector;

