import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/header.css";

const Header = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      toast.success("Logout Successful!");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link id="header-logo" to="/">
          <img
            src="https://i.ibb.co/Zdv59dK/omer.jpg"
            className="logo-img"
          ></img>
        </Link>
      </div>

      <div className="links-wrapper">
        {user ? (
          <>
            <Link to="/" className="header-link">
              Matching (Home)
            </Link>
            <Link to="/profile" className="header-link">
              Profile
            </Link>
            <Link to="/messages" className="header-link">
              Messages
            </Link>

            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
