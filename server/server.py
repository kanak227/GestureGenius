import uvicorn
import socketio
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# Enable CORS (Important for WebRTC communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Socket.IO server
sio = socketio.AsyncServer(cors_allowed_origins="*")
app.mount("/", socketio.ASGIApp(sio, other_asgi_app=app))

# Store email-to-socket mappings
email_to_socket_map = {}

@sio.event
async def connect(sid, environ):
    print(f"User connected: {sid}")

@sio.event
async def register_email(sid, email):
    # Remove previous session if email is already registered
    if email in email_to_socket_map:
        prev_sid = email_to_socket_map[email]
        if prev_sid != sid:
            await sio.emit("registration-failed", {"message": "Email already registered on another device."}, to=sid)
            print(f"Registration failed for {email}: Email already in use.")
            return
        else:
            del email_to_socket_map[email]

    email_to_socket_map[email] = sid
    await sio.emit("registration-success", {"message": "Email registered successfully."}, to=sid)
    print(f"Registered email: {email} with socket ID: {sid}")

@sio.event
async def initiate_call(sid, data):
    to_email = data.get("toEmail")
    offer = data.get("offer")
    
    if not to_email or not offer:
        await sio.emit("error", {"message": "Invalid call request."}, to=sid)
        return

    target_socket_id = email_to_socket_map.get(to_email)
    if target_socket_id:
        await sio.emit("incoming-call", {"from": sid, "offer": offer}, to=target_socket_id)
    else:
        await sio.emit("user-not-found", {"email": to_email}, to=sid)

@sio.event
async def accept_call(sid, data):
    to = data.get("to")
    answer = data.get("answer")

    if not to or not answer:
        await sio.emit("error", {"message": "Invalid accept call request."}, to=sid)
        return

    print(f"Call accepted by {sid}, sending to {to}")
    await sio.emit("call-accepted", {"answer": answer}, to=to)

@sio.event
async def candidate(sid, data):
    to = data.get("to")
    candidate = data.get("candidate")

    if not to or not candidate:
        await sio.emit("error", {"message": "Invalid ICE candidate request."}, to=sid)
        return

    print(f"ICE candidate from {sid} to {to}")
    await sio.emit("candidate", {"candidate": candidate}, to=to)

@sio.event
async def end_call(sid, data):
    to = data.get("to")

    if not to:
        await sio.emit("error", {"message": "Invalid end call request."}, to=sid)
        return

    print(f"Call ended by {sid}, notifying {to}")
    await sio.emit("call-ended", {"message": "Call has been ended."}, to=to)

@sio.event
async def disconnect(sid):
    # Remove user from email mapping on disconnect
    email_to_remove = None
    for email, socket_id in email_to_socket_map.items():
        if socket_id == sid:
            email_to_remove = email
            break

    if email_to_remove:
        del email_to_socket_map[email_to_remove]
        print(f"User with email {email_to_remove} disconnected.")

    print(f"User disconnected: {sid}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)
