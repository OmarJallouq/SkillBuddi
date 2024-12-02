import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../styles/userCard.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDatabase } from "../utils/DatabaseContext";
import defaultPfp from "../assets/Default_pfp.svg.png";

const UserCard = ({ username }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { fetchUserData, getImageUrl } = useDatabase();
  const [profile, setProfile] = useState(null);
  const [pfpLink, setPfpLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(username);
        setProfile(userData);
        setPfpLink(getImageUrl(userData.profilePicture));
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

  const handleProfileClick = () => {
    // Redirect to the user's profile page
    navigate(`/profile/${profile.$id}`);
  };

  return (
    <div className="whole-card">
      <div className="top-section" onClick={handleProfileClick}>
        <div className="pfp-container">
          <img
            src={profile.profilePicture ? pfpLink : defaultPfp}
            className="pfp"
          />
        </div>

        <div className="top-text">
          <h1>{profile.firstName + " " + profile.lastName}</h1>

          <p>{profile.$id}</p>
        </div>
      </div>

      <div className="bio-section">
        <p>{profile.Bio}</p>
      </div>

      <div className="skills-section">
        <p className="skills-text">Skills: {profile.Skills.join(", ")}</p>
      </div>
    </div>
  );
};

export default UserCard;
