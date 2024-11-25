import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/header.css";
import logo from "../logo.PNG"

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
    <>
      {user ? (
        <nav className="header-bar">
          <div className="header-logo">
            <Link to="/">
              <img
                className="logo-img"
                alt="logo"
                src={logo}
              ></img>
            </Link>
          </div>

          <div className="links-container">
            <Link className="header-link" to="/">
              Matching
            </Link>
            <Link className="header-link" to="/myProfile">
              My Profile
            </Link>
            <Link className="header-link" to="/messages">
              Messages
            </Link>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
