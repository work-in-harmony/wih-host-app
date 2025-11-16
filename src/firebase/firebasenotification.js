// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAb5R4uzSWZfX7FBf_DPh0Ca5fdF12iQ6I",
//   authDomain: "wih-notification.firebaseapp.com",
//   projectId: "wih-notification",
//   storageBucket: "wih-notification.firebasestorage.app",
//   messagingSenderId: "644957052553",
//   appId: "1:644957052553:web:b3d840a248ceb893107058",
//   measurementId: "G-38RWV33ZXR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);


// export const generateToken = async () => {
//   const permissions = await Notification.requestPermission();
//   if (permissions !== "granted") {
//     throw new Error("Permission not granted for Notification");
//   }
//   console.log(permissions);
// }