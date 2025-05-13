# Latest Fixes for GestureGenius

## Issues Fixed

### 1. Self-Testing Mode Camera Refresh Issue

**Problem:** The camera window was refreshing every time a hand gesture changed, causing a disruptive experience.

**Solution:**
- Changed the video feed implementation from an `<img>` tag to an `<iframe>` in `SelfTesting.jsx`
- This prevents the component from re-rendering when the video content changes
- Added CSS styling to ensure the iframe displays properly without borders

### 2. Video Call Camera and Microphone Access Issue

**Problem:** Users were getting "Cannot access camera and microphone" alerts when trying to use the video call feature.

**Solution:**
- Improved the `startLocalStream()` function in `VideoCall.jsx` with better error handling
- Added a fallback mechanism to try video-only if video+audio fails
- Added more specific camera constraints for better compatibility
- Improved error messages to guide users on how to fix permission issues
- Added detailed logging to help diagnose issues

## How to Run the Application

1. Start all servers:
   ```bash
   cd server
   chmod +x start_servers.sh
   ./start_servers.sh
   ```

2. Start the React client:
   ```bash
   cd client
   npm install
   npm start
   ```

3. Access the application at http://localhost:3000

## Browser Permissions

For the video calling and self-testing features to work properly:

1. Make sure to allow camera and microphone permissions when prompted by your browser
2. If you accidentally denied permissions, you'll need to:
   - Click on the lock/info icon in your browser's address bar
   - Change the camera and microphone settings to "Allow"
   - Refresh the page

## Additional Notes

- The Socket.IO server must be running for the video calling feature to work
- For best ASL detection results, ensure good lighting and position your hand clearly in the frame
- If you still encounter issues with the video call feature, check the browser console for error messages