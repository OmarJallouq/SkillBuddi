import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/mergedbar.css";

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
                            <img className="logo-img" src="https://i.ibb.co/Zdv59dK/omer.jpg"></img>
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

                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>

                </nav>
            ) : (
                <nav className="header-bar">
                    <div className="header-logo">
                        <Link to="/">
                            <img className="logo-img" src="https://i.ibb.co/Zdv59dK/omer.jpg"></img>
                        </Link>
                    </div>
                </nav>
        
            )}
        </>
    );

};

export default Header;