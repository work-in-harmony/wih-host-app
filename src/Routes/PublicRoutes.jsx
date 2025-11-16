import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { lazy, useContext } from "react";


import  LoadingPage  from "./Loading/LoadingPage";

export const Logo = lazy(() => import("AuthApp/Logo"));

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  

  if (isLoading) {
    return (
      <>
        <LoadingPage/>
      </>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard"/>;
};

export default PublicRoute;
