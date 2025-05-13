# GestureGenius - ASL Detection Platform

## Overview
GestureGenius is a real-time American Sign Language (ASL) detection system that can be used for video calls and self-testing. The platform uses a pre-trained MobileNet model to recognize hand gestures and convert them into text.

## Features
- **Real-time ASL Detection**: Instantly recognize ASL signs through your webcam
- **Self-Testing Mode**: Practice and learn ASL with immediate feedback
- **Video Call Integration**: Communicate using sign language during video calls
- **Modern UI**: Clean, responsive interface with real-time feedback
- **Detection History**: Track your recently detected signs

## Technology Stack
- **Frontend**: React with modern UI components
- **Backend**: Flask (Python) for ML processing, Node.js for WebRTC
- **Machine Learning**: TensorFlow, MediaPipe for hand detection
- **Video Processing**: OpenCV

## Quick Start

### Option 1: Run Everything with One Command
```bash
# Clone the repository
git clone https://github.com/yourusername/GestureGenius.git
cd GestureGenius

# Make the start script executable
chmod +x start_app.sh

# Run the application (starts both client and servers)
./start_app.sh
```

### Option 2: Run Components Separately

#### 1. Start the Python Servers
```bash
cd server

# Install dependencies
pip install -r requirements.txt

# Start both Python servers
python server.py  # Main server on port 5000
python ser.py     # Self-testing server on port 5001
```

#### 2. Start the React Client
```bash
cd client

# Install dependencies
npm install

# Start the client
npm start
```

## Application Structure
```
GestureGenius/
│── client/                # React frontend
│   ├── public/            # Static assets
│   ├── src/               # React components
│   │   ├── pages/         # Page components
│   │   ├── theme.css      # Global theme variables
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
│
│── server/                # Backend services
│   ├── server.py          # Main Python server
│   ├── ser.py             # Self-testing server
│   ├── best_model.keras   # Trained ML model
│   ├── labels.txt         # ASL sign labels
│   └── requirements.txt   # Python dependencies
│
└── start_app.sh           # Main startup script
```

## Usage Guide

### Self-Testing Mode
1. Navigate to the "Self Testing" page
2. Position your hand in the camera view
3. Make ASL signs and see real-time detection
4. View your detection history on the right panel
5. Follow the tips for better detection accuracy

### Video Call Mode
1. Navigate to the "Video Calling" page
2. Enter your name and join a room
3. Share the room ID with others to connect
4. Use ASL signs during the call for automatic detection

## Troubleshooting
- **Camera not working**: Ensure your browser has permission to access your camera
- **Detection issues**: Make sure your hand is clearly visible and well-lit
- **Server connection errors**: Check that both Python servers are running
- **Performance issues**: Close other applications using your webcam

## Development

### Frontend Development
```bash
cd client
npm install
npm start
```

### Backend Development
```bash
cd server
pip install -r requirements.txt
python server.py  # or python ser.py
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- The ASL detection model was trained on a dataset of over 30,000 images
- Special thanks to the MediaPipe team for their hand detection framework
- Built with ❤️ for accessibility and inclusion