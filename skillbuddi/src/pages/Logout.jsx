import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";

const Logout = () => {
  const { logoutUser } = useAuth(); // Access the logoutUser function
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // Track if logout was already triggered

  useEffect(() => {
    const performLogout = async () => {
      if (hasLoggedOut.current) return; // Prevent duplicate calls
      hasLoggedOut.current = true;

      console.log("PERFORMING LOGOUT");
      const logoutAndRedirect = async () => {
        const response = await logoutUser(); // Perform logout logic
        if (response.success) {
          toast.success("Logout Successful!");
        } else {
          toast.error(response.error);
        }
        navigate("/login"); // Redirect to login page
      };

      logoutAndRedirect();
    };

    performLogout();
  }, [logoutUser, navigate]);

  return <p>Logging out...</p>; // Optional: Display a message while logging out
};

export default Logout;
