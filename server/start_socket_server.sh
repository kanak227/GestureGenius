#!/bin/bash

# Install Node.js dependencies if not already installed
npm install

# Start the Socket.IO server for video calling
echo "Starting Socket.IO server for video calling on port 3001..."
node index.js