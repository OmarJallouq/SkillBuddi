import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/userCard.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDatabase } from "../utils/DatabaseContext";
import defaultPfp from "../assets/Default_pfp.svg.png";

const UserCard = ({ username }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { fetchUserData } = useDatabase();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(username);
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    // Redirect to the Messaging page with the profile ID
    navigate(`/messaging/${profile.$id}`);
  };

  const handleProfileClick = () => {
    // Redirect to the user's profile page
    navigate(`/profile/${profile.$id}`);
  };

  return (
    <div className="whole-card">
      <div className="top-section" onClick={handleProfileClick}>
        <div className="pfp-container">
          <img
            src={profile.profilePicture ? profile.profilePicture : defaultPfp}
            alt={`${profile.firstName + " " + profile.lastName}'s profile`}
            className="pfp"
          />
        </div>

        <div className="top-text">
          <h>{profile.firstName + " " + profile.lastName}</h>

          <p>{profile.$id}</p>
        </div>
      </div>

      <div className="bio-section">
        <p>{profile.Bio}</p>
      </div>

      <div className="skills-section">
        <p className="skills-text">Skills: {profile.Skills.join(", ")}</p>
      </div>

      <button onClick={handleMessage}>Send Message</button>
    </div>
  );
};

export default UserCard;
