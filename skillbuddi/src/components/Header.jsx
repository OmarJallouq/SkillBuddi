import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="header">
      <div>
        <Link id="header-logo" to="/">
          LOGO
        </Link>
      </div>

      <div className="links--wrapper">
        {user ? (
          <>
            <Link to="/" className="header--link">
              Matching (Home)
            </Link>
            <Link to="/profile" className="header--link">
              Profile
            </Link>
            <Link to="/messages" className="header--link">
              Messages
            </Link>

            <button onClick={logoutUser} className="btn">
              Logout
            </button>
          </>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
