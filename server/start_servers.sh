#!/bin/bash

# Install Python requirements if not already installed
pip install -r requirements.txt

# Install Node.js requirements if not already installed
npm install

# Start the main server in the background
echo "Starting main server on port 5000..."
python server.py &
SERVER_PID=$!

# Start the self-testing server in the background
echo "Starting self-testing server on port 5001..."
python ser.py &
SELF_TEST_PID=$!

# Start the Socket.IO server for video calling
echo "Starting Socket.IO server for video calling on port 3001..."
node index.js &
SOCKET_PID=$!

# Function to handle script termination
cleanup() {
    echo "Stopping servers..."
    kill $SERVER_PID
    kill $SELF_TEST_PID
    kill $SOCKET_PID
    exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "All servers are running. Press Ctrl+C to stop."
wait