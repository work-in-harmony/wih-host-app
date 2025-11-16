// src/components/VideoCall.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function VideoCallPage() {
  const { roomId } = useParams(); // from /video-call/:roomId
  const [searchParams] = useSearchParams();
  const explicitRole = searchParams.get("role"); // 'caller' | 'callee' | null
  const location = useLocation();
  const callResponse = location.state?.callResponse;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const [inCall, setInCall] = useState(false);
  const [generatedCallId, setGeneratedCallId] = useState("");

  const getPeerConnection = () => {
    if (pcRef.current) return pcRef.current;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });
    pcRef.current = pc;

    // Helpful connection diagnostics
    pc.oniceconnectionstatechange = () =>
      console.log("iceconnection:", pc.iceConnectionState);
    pc.onconnectionstatechange = () =>
      console.log("connection:", pc.connectionState);
    pc.onsignalingstatechange = () =>
      console.log("signaling:", pc.signalingState);
    pc.onicegatheringstatechange = () =>
      console.log("gathering:", pc.iceGatheringState);
    return pc;
  };

  const startLocal = async () => {
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStreamRef.current;

    const pc = getPeerConnection();
    localStreamRef.current
      .getTracks()
      .forEach((t) => pc.addTrack(t, localStreamRef.current));

    // Attach remote media directly from the incoming stream
    pc.ontrack = (event) => {
      console.log("ontrack:", event.streams?.[0]);
      const remoteEl = remoteVideoRef.current;
      if (!remoteEl) return;

      const [incoming] = event.streams || [];
      if (incoming) {
        remoteEl.srcObject = incoming;
      } else {
        if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
        remoteStreamRef.current.addTrack(event.track);
        remoteEl.srcObject = remoteStreamRef.current;
      }
      // Try to start playback (helps with autoplay policies)
      remoteEl
        .play()
        .catch((err) => console.warn("remote autoplay blocked:", err));
    };
  };

  // src/components/VideoCall.jsx

  const hangUp = async () => {
    setInCall(false);
    try {
      if (pcRef.current) {
        pcRef.current.getSenders().forEach((s) => s.track && s.track.stop());
        pcRef.current.close();
        pcRef.current = null;
      }
      // Clear attached media elements
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      localStreamRef.current = null;
      remoteStreamRef.current = null;
      if (generatedCallId) await deleteDoc(doc(db, "calls", generatedCallId));
    } catch (e) {
      console.warn(e);
    }
  };

  // Caller
  const handleCreateCall = async () => {
    await startLocal();
    const pc = getPeerConnection();

    // src/components/VideoCall.jsx

    // ... inside handleCreateCall ...

    // ✅ FIXED LINE
    const callDocRef = doc(db, "calls", roomId);

    // ... // use given roomId
    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    pc.onicecandidate = async (event) => {
      if (event.candidate)
        await addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await setDoc(callDocRef, { offer: { type: offer.type, sdp: offer.sdp } });
    setGeneratedCallId(roomId);
    setInCall(true);

    onSnapshot(callDocRef, async (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDesc = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(answerDesc);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  // Callee
  const handleAnswerCall = async () => {
    await startLocal();
    const pc = getPeerConnection();

    const callDocRef = doc(db, "calls", roomId);
    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    pc.onicecandidate = async (event) => {
      if (event.candidate)
        await addDoc(answerCandidates, event.candidate.toJSON());
    };

    // Wait for the caller's offer if it doesn't exist yet
    let answered = false;
    const unsubCall = onSnapshot(callDocRef, async (snapshot) => {
      const data = snapshot.data();
      if (!answered && data?.offer && !pc.currentRemoteDescription) {
        try {
          const offerDesc = new RTCSessionDescription(data.offer);
          await pc.setRemoteDescription(offerDesc);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await updateDoc(callDocRef, {
            answer: { type: answer.type, sdp: answer.sdp },
          });
          setInCall(true);
          answered = true;
          unsubCall();
        } catch (e) {
          console.warn("Failed to answer call:", e);
        }
      }
    });

    // Listen for caller ICE candidates
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  useEffect(() => {
    if (!roomId) return;
    console.log("Joining call:", roomId, "role:", explicitRole ?? "auto");

    const run = async () => {
      if (explicitRole === "caller") {
        await handleCreateCall();
        return;
      }
      if (explicitRole === "callee") {
        await handleAnswerCall();
        return;
      }
      // Fallback: infer by doc existence (may race on rare cases)
      const callDocRef = doc(db, "calls", roomId);
      const docSnap = await getDoc(callDocRef);
      if (docSnap.exists()) await handleAnswerCall();
      else await handleCreateCall();
    };

    run();
    return () => hangUp();
    // eslint-disable-next-line
  }, [roomId, explicitRole]);

  return (
    <div className="page min-h-full bg-wih-900 text-wih-50 text-center p-4">
      <h1 className="text-xl mb-4">🎥 Video Call Room: {roomId}</h1>
      {callResponse && (
        <div className="mb-5 rounded-xl border border-wih-700 bg-wih-800 p-4 text-left">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="mr-2 font-semibold">Call Info</div>
            <div className="h-4 w-px bg-wih-700" />
            <div>
              <span className="text-wih-600">Caller: </span>
              <span className="font-medium">{callResponse.callerEmail}</span>
            </div>
            <div>
              <span className="text-wih-600">Receiver: </span>
              <span className="font-medium">{callResponse.receiverEmail}</span>
            </div>
            <div>
              <span className="text-wih-600">Room: </span>
              <span className="font-mono">{callResponse.roomId}</span>
            </div>
            <div className="ml-auto">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  callResponse.accepted
                    ? "bg-green-600/20 text-green-300 border border-green-700"
                    : "bg-yellow-600/20 text-yellow-300 border border-yellow-700"
                }`}
              >
                {callResponse.accepted ? "Accepted" : "Pending/Rejected"}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 justify-center">
        <div className="text-left">
          <h3 className="mb-2 text-sm text-wih-600">Local</h3>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-wih-700 bg-black">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 rounded-md bg-wih-900/70 px-2 py-1 text-xs">Local</div>
          </div>
        </div>
        <div className="text-left">
          <h3 className="mb-2 text-sm text-wih-600">Remote</h3>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-wih-700 bg-black">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 rounded-md bg-wih-900/70 px-2 py-1 text-xs">Remote</div>
          </div>
        </div>
      </div>
      <button
        onClick={hangUp}
        className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded mt-4"
      >
        Hang Up
      </button>
    </div>
  );
}
