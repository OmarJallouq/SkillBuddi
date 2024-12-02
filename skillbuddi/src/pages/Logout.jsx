import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";

const Logout = () => {
  const { logoutUser } = useAuth(); // Access the logoutUser function
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      console.log("PERFORMING LOGOUT");
      const response = await logoutUser(); // Perform logout logic
      if (response.success) {
        toast.success("Logout Successful!");
      } else {
        toast.error(response.error);
      }
      navigate("/login"); // Redirect to login page
    };

    performLogout();
  }, [logoutUser, navigate]);

  return <p>Logging out...</p>; // Optional: Display a message while logging out
};

export default Logout;