# Running GestureGenius Locally

## Prerequisites
- Python 3.8+ with pip
- Node.js 14+ with npm
- Git
- Webcam access

## Step-by-Step Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kanak227/GestureGenius.git
cd GestureGenius
```

### 2. Set Up the Python Backend

#### Install Python Dependencies
```bash
cd server
pip install -r requirements.txt
```

The requirements include:
- flask
- flask-cors
- opencv-python
- numpy
- tensorflow
- mediapipe

#### Start the Python Servers
Open two separate terminal windows:

Terminal 1:
```bash
cd server
python server.py
```

Terminal 2:
```bash
cd server
python ser.py
```

You should see output indicating that both servers are running:
- Main server on port 5000
- Self-testing server on port 5001

### 3. Set Up the React Frontend

#### Install Node.js Dependencies
```bash
cd client
npm install
```

#### Start the React Application
```bash
npm start
```

This will start the React development server on port 3000 and automatically open your browser to http://localhost:3000.

### 4. Using the Application

1. Navigate to the "Self Testing" page to practice ASL signs
2. Position your hand in the camera view
3. Make ASL signs and see real-time detection
4. View your detection history on the right panel

### Troubleshooting

#### Camera Access Issues
- Make sure your browser has permission to access your camera
- Check that no other applications are using your camera
- Try restarting your browser if camera access is denied

#### Server Connection Errors
- Verify both Python servers are running (on ports 5000 and 5001)
- Check for any error messages in the terminal windows running the servers
- Make sure your firewall isn't blocking the connections

#### React Application Issues
- If the React app doesn't start, try running `npm install` again
- Check the browser console for any JavaScript errors
- Make sure you're using a modern browser (Chrome, Firefox, Edge)

## Alternative: Using the Start Scripts

If you prefer, you can use the provided scripts to start everything at once:

```bash
# Make the scripts executable
chmod +x start_app.sh
chmod +x server/start_servers.sh
chmod +x client/start_client.sh

# Run the application
./start_app.sh
```

This will start both the Python servers and the React client in one command.