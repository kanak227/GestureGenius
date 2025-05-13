#!/bin/bash

# Start the Python servers in the background
echo "Starting Python servers..."
cd server
./start_servers.sh &
SERVER_PID=$!

# Wait a moment for servers to initialize
sleep 3

# Start the React client
echo "Starting React client..."
cd ../client
./start_client.sh &
CLIENT_PID=$!

# Function to handle script termination
cleanup() {
    echo "Stopping all services..."
    kill $SERVER_PID
    kill $CLIENT_PID
    exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "Application is running. Press Ctrl+C to stop."
wait