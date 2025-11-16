import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";
import { SOCKET_URLS } from "../constants/urls";

const CallContext = createContext();
let stompClient = null;

export const CallProvider = ({ children }) => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [ringing, setRinging] = useState(false);
  const [audio] = useState(new Audio(""));
  const [activeRoomId, setActiveRoomId] = useState(null);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) return;

    const socket = new SockJS(SOCKET_URLS.call);

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        // 🔔 Incoming call
        stompClient.subscribe(`/user/${userEmail}/queue/ring`, (msg) => {
          const call = JSON.parse(msg.body);
          console.log("📞 Incoming call", call);
          setIncomingCall(call);
          setActiveRoomId(call.roomId);
          startRinging();
        });

        // 📩 Response from callee
        stompClient.subscribe(`/user/${userEmail}/queue/response`, (msg) => {
          const res = JSON.parse(msg.body);
          console.log("📩 Call response", res);
          stopRinging();

          if (res.accepted) {
            console.log("✅ Call accepted by receiver, navigating to room:", res.roomId);
            // 👇 navigate caller when call is accepted, mark role explicitly
            navigate(`/video-call/${res.roomId}?role=caller`, {
              state: { callResponse: res },
            });
          } else {
            console.log("❌ Call rejected by", res.receiverEmail);
            alert(`Call rejected by ${res.receiverEmail}`);
          }
        });
      },
    });

    stompClient.activate();
    return () => stompClient?.deactivate();
  }, [userEmail]);

  const startRinging = () => {
    setRinging(true);
    audio.loop = true;
    audio.play().catch(() => {});
  };

  const stopRinging = () => {
    setRinging(false);
    audio.pause();
    audio.currentTime = 0;
  };

  const acceptCall = () => {
    stopRinging();
    stompClient.publish({
      destination: "/app/call/response",
      body: JSON.stringify({
        callerEmail: incomingCall?.callerEmail,
        receiverEmail: userEmail,
        roomId: incomingCall?.roomId,
        accepted: true,
      }),
    });

    console.log("✅ Accepted call — joining:", incomingCall?.roomId);
    // Mark callee role explicitly to avoid offer/answer race
    navigate(`/video-call/${incomingCall?.roomId}?role=callee`, {
      state: {
        callResponse: {
          callerEmail: incomingCall?.callerEmail,
          receiverEmail: userEmail,
          accepted: true,
          roomId: incomingCall?.roomId,
        },
      },
    });
  };

  const rejectCall = () => {
    stopRinging();
    stompClient.publish({
      destination: "/app/call/response",
      body: JSON.stringify({
        callerEmail: incomingCall?.callerEmail,
        receiverEmail: userEmail,
        accepted: false,
      }),
    });
  };

  const callUser = (receiverEmail) => {
    const roomId = crypto.randomUUID();
    setActiveRoomId(roomId);

    stompClient.publish({
      destination: "/app/call/send",
      body: JSON.stringify({
        callerEmail: userEmail,
        receiverEmail,
        roomId,
        message: "Incoming call",
      }),
    });

    console.log("📨 Sent call invite:", roomId);
    // Caller does NOT navigate yet — waits for callee accept event
  };

  return (
    <CallContext.Provider value={{ callUser }}>
      {children}

      {ringing && (
        <div className="fixed bottom-6 right-6 bg-wih-800 text-wih-50 rounded-2xl shadow-lg p-5 animate-fade-in z-[9999]">
          <p className="font-semibold">
            📞 Incoming call from {incomingCall?.callerEmail}
          </p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={acceptCall}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={rejectCall}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);
