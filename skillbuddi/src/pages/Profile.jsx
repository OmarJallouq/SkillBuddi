import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import testProfiles from "../testProfiles.json";
import { useDatabase } from "../utils/DatabaseContext";
import "../styles/profile.css";

const Profile = () => {
  const { username } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { fetchUserData } = useDatabase();
  const [profile, setProfile] = useState(null);

  // fetch user data
  useEffect(() => {
    const fetchData = async () => {
      fetchUserData(); //
      setProfile(testProfiles[id]);
    };

    fetchData();
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    // Redirect to the Messaging page with the profile ID
    navigate(`/messaging/${profile.id}`);
  };

  return (
    <div className="whole-thing">
      <h1 className="profile-title">{profile.name}'s Profile</h1>
      <div className="profile-container">
        <div className="profile-avatar">
          <img
            src={profile.photo}
            alt={`${profile.name}'s profile`}
            className="avatar"
          />
          <button className="message-button" onClick={handleMessage}>
            Message {profile.name}
          </button>
        </div>

        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Skills:</strong> {profile.skills.join(", ")}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
