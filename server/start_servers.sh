#!/bin/bash

# Install requirements if not already installed
pip install -r requirements.txt

# Start the main server in the background
echo "Starting main server on port 5000..."
python server.py &
SERVER_PID=$!

# Start the self-testing server in the background
echo "Starting self-testing server on port 5001..."
python ser.py &
SELF_TEST_PID=$!

# Function to handle script termination
cleanup() {
    echo "Stopping servers..."
    kill $SERVER_PID
    kill $SELF_TEST_PID
    exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "Servers are running. Press Ctrl+C to stop."
wait