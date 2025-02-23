import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoCall from "./pages/VideoCall.jsx";
import HomePage from "./pages/Home.jsx";
import Testing from "./pages/SelfTesting.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video-calling" element={<VideoCall />} />
        <Route path="/self-testing" element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;
