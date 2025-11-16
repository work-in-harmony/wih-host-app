// OAuth.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      // Optionally store token in localStorage / context
      localStorage.setItem("jwt", token);
      localStorage.setItem("email", email);

      console.log("Token:", token);
      console.log("Email:", email);
      

      // Redirect to dashboard or wherever
      navigate("/jwt/test");
    }
  }, [searchParams, navigate]);


  return <div>Loading...</div>; // Can show a spinner while redirecting
};

export default OAuth;
