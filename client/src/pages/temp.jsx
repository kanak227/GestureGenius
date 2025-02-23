import React, { useEffect, useRef, useState } from 'react';

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [localPeerId] = useState(`user-${Math.random().toString(36).substr(2, 9)}`);
  const [prediction, setPrediction] = useState({ class: '', confidence: 0 });
  
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const canvasRef = useRef();
  const peerConnectionRef = useRef();
  const wsRef = useRef();
  const frameIntervalRef = useRef();

  // Initialize WebSocket connection
  useEffect(() => {
    wsRef.current = new WebSocket(`ws://localhost:8000/ws/${localPeerId}`);
    
    wsRef.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'offer') {
        await handleOffer(message);
      } else if (message.type === 'answer') {
        await handleAnswer(message);
      } else if (message.type === 'ice-candidate') {
        await handleIceCandidate(message);
      } else if (message.type === 'processed-frame') {
        // Display processed frame from other peer
        const img = new Image();
        img.onload = () => {
          const canvas = remoteVideoRef.current;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = message.frame;
        setPrediction(message.prediction);
      }
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    };
  }, []);

  // Initialize local stream and frame processing
  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        
        // Setup canvas for frame capture
        const video = localVideoRef.current;
        const canvas = canvasRef.current;
        video.srcObject = stream;
        
        // Start frame capture and processing
        frameIntervalRef.current = setInterval(() => {
          if (peerId && wsRef.current) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frame = canvas.toDataURL('image/jpeg');
            
            // Send frame for processing
            wsRef.current.send(JSON.stringify({
              type: 'video-frame',
              frame: frame,
              target: peerId
            }));
          }
        }, 100); // Adjust interval as needed
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initLocalStream();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [peerId]);

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const message = {
          type: 'ice-candidate',
          candidate: event.candidate,
          target: peerId,
          from: localPeerId
        };
        wsRef.current.send(JSON.stringify(message));
      }
    };

    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    return pc;
  };

  const handleOffer = async (message) => {
    peerConnectionRef.current = createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.offer));
    
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    const answerMessage = {
      type: 'answer',
      answer: answer,
      target: message.from,
      from: localPeerId
    };
    wsRef.current.send(JSON.stringify(answerMessage));
  };

  const handleAnswer = async (message) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
  };

  const handleIceCandidate = async (message) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
    }
  };

  const startCall = async () => {
    peerConnectionRef.current = createPeerConnection();
    
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    const message = {
      type: 'offer',
      offer: offer,
      target: peerId,
      from: localPeerId
    };
    wsRef.current.send(JSON.stringify(message));
  };

  return (
    <div style={styles.container}>
      <div style={styles.infoSection}>
        <p style={styles.peerId}>Your ID: {localPeerId}</p>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter peer ID"
            value={peerId}
            onChange={(e) => setPeerId(e.target.value)}
            style={styles.input}
          />
          <button onClick={startCall} style={styles.button}>
            Start Call
          </button>
        </div>
        <p style={styles.prediction}>
          Prediction: {prediction.class} ({(prediction.confidence * 100).toFixed(2)}%)
        </p>
      </div>
      
      <div style={styles.videoGrid}>
        <div style={styles.videoContainer}>
          <p style={styles.videoLabel}>Local Video</p>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={styles.video}
          />
          <canvas ref={canvasRef} style={styles.hiddenCanvas} width="640" height="480" />
        </div>
        <div style={styles.videoContainer}>
          <p style={styles.videoLabel}>Remote Video</p>
          <canvas
            ref={remoteVideoRef}
            width="640"
            height="480"
            style={styles.video}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  infoSection: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  peerId: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '200px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px',
  },
  videoContainer: {
    backgroundColor: '#000',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  videoLabel: {
    color: '#666',
    margin: '10px',
  },
  video: {
    width: '100%',
    height: '300px',
    backgroundColor: '#2f2f2f',
  },
  hiddenCanvas: {
    display: 'none',
  },
  prediction: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
  }
};

export default VideoChat;