import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./Loading/LoadingPage";
import { use, useEffect } from "react";

import { generateToken } from "../firebase/firebase";
import { API_URLS } from "../constants/urls";

const ProtectedRoute = () => {
  const auth = useAuth();

  const { isAuthenticated, isLoading, userData } = auth;

  console.log("THIS IS THE USE AUTH " + JSON.stringify(auth));

  useEffect(() => {
    const setupNotifications = async () => {
      if (isAuthenticated && !isLoading) {
        const token = await generateToken();
        if (token) {
          await fetch(API_URLS.updateFcmToken, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fcmToken: token, email: userData.message }),
          });
          console.log("✅ FCM token sent to backend");
        }
      }
    };
    setupNotifications();
  }, [isAuthenticated, isLoading, userData]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Case 2: User is authenticated, but has not completed registration.
  // Send them to a page to finish setup.
  if (isAuthenticated && userData?.registered === false) {
    // You must create this new route in your app!
    return <Navigate to="/plans" replace />;
  }

  // Case 3: User is authenticated AND registered.
  // They are allowed to see the page.
  return <Outlet />;
};

export default ProtectedRoute;
