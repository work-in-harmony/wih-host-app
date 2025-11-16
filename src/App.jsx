import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./Routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
// import LandingPage from "./page/LandingPage";

const CheckMailPage = lazy(() => import("AuthApp/CheckMailPage"));
const SignUpPage = lazy(() => import("AuthApp/SignUpPage"));
const VerifyPage = lazy(() => import("AuthApp/VerifyPage"));
const LoginPage = lazy(() => import("AuthApp/LoginPage"));
const LandingPage = lazy(() => import("AuthApp/LandingPage"));

const SubAppPage = lazy(() => import("SubApp/SubscriptionApp"));

const DashboardPage = lazy(() => import("HomeApp/DashboardPage"));
const AddMember = lazy(() => import("HomeApp/AddMember"));
const ProjectPage = lazy(() => import("HomeApp/ProjectPage"));
const ProjectDashboardPage = lazy(() => import("HomeApp/ProjectDashboardPage"));
const AdminDashboard = lazy(() => import("HomeApp/AdminDashboard"));
import AdminDashboardTest from "./page/AdminDashboardTest.jsx";

import LoadingPage from "./Routes/Loading/LoadingPage";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import { CallProvider } from "./context/CallContext";
import VideoCallPage from "./page/VideoCallPage";
import { onMessage } from "./firebase/firebase";
import { messaging } from "./firebase/firebase";
import AdminProtectedRoute from "./Routes/AdminProtectedRoutes.jsx";



function App() {

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <AuthProvider>
        <CallProvider>
          <Suspense fallback={<LoadingPage />}>
            <Routes>

              {/* Public routes - redirect to dashboard if authenticated */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/check-mail" element={<CheckMailPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/verify-otp" element={<VerifyPage />} />
              </Route>

              <Route path="/plans" element={<SubAppPage />} />
              <Route path="/admindash" element={<AdminDashboard startDate={"2025-10-01"} endDate={"2025-12-01"} />} />

              <Route path="/admin" element={<AdminProtectedRoute />}>
                <Route
                  path="dashboard"
                  element={
                    <AdminDashboard startDate={"2025-10-01"} endDate={"2025-12-01"} />
                  }
                />
              </Route>
              {/* Protected routes - redirect to login if not authenticated */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/add-member" element={<AddMember />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route
                  path="/project/:projectId"
                  element={<ProjectDashboardPage />}
                />
                <Route path="/video-call/:roomId" element={<VideoCallPage />} />
                <Route
                  path="/search"
                  element={
                    <>
                      <h1>this is search</h1>
                    </>
                  }
                />
                {/* Add more protected routes here */}
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </CallProvider>
      </AuthProvider>
    </>
  );
}

export default App;
