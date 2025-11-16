import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URLS } from "../constants/urls";

export default function AdminProtectedRoute() {
  const { user } = useAuth(); // from your AuthContext
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!user || !user.token) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await fetch(API_URLS.adminGate, {
          method: "GET",
          credentials: "include", // include cookies if needed
        });

        // Backend sends JSON with "success" field
        const data = await res.json();

        console.log("this is admin response "  +  data)
        if (data.success) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
        setIsAdmin(false);
      }
    };

    verifyAdmin();
  }, [user]);

  // 🕒 while checking admin status
  if (isAdmin === null) {
    return (
      <div className="text-center mt-10 text-wih-200">
        Checking admin access…
      </div>
    );
  }

  // 🚫 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ allowed
  return <Outlet />;
}
