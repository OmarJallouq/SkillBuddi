import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/header.css";
import { useDatabase } from "../utils/DatabaseContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const { fetchNotifications } = useDatabase();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const notifications = await fetchNotifications(user.$id);
        setNotifications(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (user) {
      fetchNotifs();
    }
  }, [user]);

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
                src="https://i.ibb.co/Zdv59dK/omer.jpg"
              ></img>
            </Link>
          </div>
          <div className="links-container">
            <Link className="header-link" to="/">
              Matching
            </Link>
            <Link className="header-link" to="/">
              My Profile
            </Link>
            <Link className="header-link" to="/">
              Messages
            </Link>
          </div>
          {/* TODO: This shit */}
          {/* <div>
            Notifications: {notifications.length}
            {notifications.map((notification) => (
              <div key={notification.$id}>
                <p>{notification.senderId} sent you a request!</p>
              </div>
            ))}
          </div> */}
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
