// src/hooks/useVideoCall.js
import { useRef, useState } from "react";
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

export const useVideoCall = () => {
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const [generatedCallId, setGeneratedCallId] = useState("");
  const [inCall, setInCall] = useState(false);

  // --- Peer connection ---
  const getPeerConnection = () => {
    if (pcRef.current) return pcRef.current;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });
    pcRef.current = pc;
    return pc;
  };

  const startLocal = async (localVideoRef, remoteVideoRef) => {
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideoRef.current.srcObject = localStreamRef.current;

    const pc = getPeerConnection();
    localStreamRef.current
      .getTracks()
      .forEach((track) => pc.addTrack(track, localStreamRef.current));

    remoteStreamRef.current = new MediaStream();
    remoteVideoRef.current.srcObject = remoteStreamRef.current;

    pc.ontrack = (event) => {
      event.streams[0]
        .getTracks()
        .forEach((t) => remoteStreamRef.current.addTrack(t));
    };
  };

  // --- Caller flow ---
  const createCall = async (roomId) => {
    const pc = getPeerConnection();

    // ✅ FIX: Create a document reference correctly
    const callDocRef = roomId
      ? doc(db, "calls", roomId) // use same roomId if passed
      : doc(collection(db, "calls")); // auto-generate if not

    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    pc.onicecandidate = async (event) => {
      if (event.candidate) await addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await setDoc(callDocRef, { offer: { type: offer.type, sdp: offer.sdp } });
    setGeneratedCallId(callDocRef.id);
    setInCall(true);

    // Listen for the callee's answer
    onSnapshot(callDocRef, async (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    // Listen for ICE from callee
    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        }
      });
    });

    return callDocRef.id; // ✅ return the callId / roomId
  };

  // --- Callee flow ---
  const answerCall = async (callId) => {
    const pc = getPeerConnection();
    const callDocRef = doc(db, "calls", callId);

    const callData = (await getDoc(callDocRef)).data();
    if (!callData?.offer) throw new Error("Call not found or already closed");

    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    pc.onicecandidate = async (event) => {
      if (event.candidate) await addDoc(answerCandidates, event.candidate.toJSON());
    };

    await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await updateDoc(callDocRef, { answer: { type: answer.type, sdp: answer.sdp } });

    setInCall(true);

    // Listen for caller ICE candidates
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        }
      });
    });
  };

  const hangUp = async () => {
    try {
      if (pcRef.current) {
        pcRef.current.getSenders().forEach((s) => s.track?.stop());
        pcRef.current.close();
      }
      if (generatedCallId) await deleteDoc(doc(db, "calls", generatedCallId));
    } finally {
      setGeneratedCallId("");
      setInCall(false);
    }
  };

  return { createCall, answerCall, hangUp, generatedCallId, inCall, startLocal };
};
