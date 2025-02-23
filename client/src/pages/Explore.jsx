import React from 'react';
import { BrainCircuit, Image, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModelPage = () => {
  return (
    <>
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
    <div className="model-page">
      {/* Model Overview */}
      <div className="model-overview">
        <div className="container">
          <h1>Our AI Model</h1>
          <p>
            We have utilized a pre-trained <strong>MobileNet</strong> model and fine-tuned it over a dataset containing
            more than <strong>30,000 images</strong> to accurately detect and recognize American Sign Language (ASL) gestures.
          </p>
        </div>
      </div>

      {/* Real-Life Applications */}
      <div className="real-life-applications">
        <div className="container">
          <h2>Real-Life Applications</h2>
          <p>
            Our model is designed to make ASL communication more accessible and efficient in various real-world scenarios.
          </p>
          <ul>
            <li><strong>Education:</strong> Assists in ASL learning for students and teachers.</li>
            <li><strong>Healthcare:</strong> Helps deaf patients communicate with medical staff.</li>
            <li><strong>Customer Support:</strong> Enhances accessibility in businesses and public services.</li>
            <li><strong>Social Interaction:</strong> Enables fluid communication between ASL and non-ASL users.</li>
          </ul>
        </div>
      </div>
      {/* Technical Details */}
      <div className="technical-details">
        <div className="container">
          <h2>Technical Highlights</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <BrainCircuit className="icon" />
              <h3>Pre-trained MobileNet</h3>
              <p>
                We started with MobileNet, a lightweight and efficient deep learning model optimized for mobile and edge devices.
              </p>
            </div>
            <div className="tech-card">
              <Image className="icon" />
              <h3>30,000+ ASL Images</h3>
              <p>
                The model was fine-tuned on a custom dataset of over 30,000 ASL gesture images, ensuring high accuracy and reliability.
              </p>
            </div>
            <div className="tech-card">
              <Globe className="icon" />
              <h3>Real-time Detection</h3>
              <p>
                The model runs efficiently in real time, allowing users to get instant recognition feedback.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Styles */}
      <style>{`
        .model-overview, .technical-details, .real-life-applications {
          background-color: #f8fafc;
          padding: 30px 0;
          text-align: center;
        }

        .model-overview h1, .technical-details h2, .real-life-applications h2 {
          font-size: 32px;
          color: #1e40af;
          margin-bottom: 15px;
        }

        .model-overview p, .technical-details p, .real-life-applications p {
          font-size: 18px;
          color: #4b5563;
          max-width: 800px;
          margin: 0 auto;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }

        .tech-card {
          background: white;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s;
          }
          
          .tech-card:hover {
          transform: translateY(-5px);
          }

          .icon {
            width: 48px;
            height: 48px;
          color: #2563eb;
          margin-bottom: 15px;
          }

        .tech-card h3 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        
        .tech-card p {
            font-size: 16px;
          color: #666;
        }
        
        .real-life-applications ul {
          text-align: left;
          max-width: 600px;
          margin: 20px auto;
          font-size: 18px;
          color: #4b5563;
          }

        .real-life-applications li {
            margin-bottom: 10px;
            }
      `}</style>
    </div>
            </>
  );
};

export default ModelPage;
