import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDatabase } from "../utils/DatabaseContext";
import defaultPfp from "../assets/Default_pfp.svg.png";
import "../styles/profile.css";

const Profile = () => {
  const { username } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { fetchUserData } = useDatabase();
  const [profile, setProfile] = useState(null);
  const [age, setAge] = useState(0);

  // fetch user data
  useEffect(() => {
    const calculateAge = (dobString) => {
      const today = new Date();
      const dob = new Date(dobString);

      let age = today.getFullYear() - dob.getFullYear();
      // Adjust if the birthday hasn't occurred yet this year
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      return age;
    };

    const fetchData = async () => {
      try {
        const userData = await fetchUserData(username);
        setProfile(userData);
        setAge(calculateAge(userData.dateOfBirth));
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
    navigate(`/messaging/${profile.id}`);
  };

  return (
    <div className="whole-thing">
      <h1 className="profile-title">
        {profile.firstName + " " + profile.lastName}'s Profile
      </h1>
      <div className="profile-container">
        <div className="profile-avatar">
          <img
            src={profile.profilePicture ? profile.profilePicture : defaultPfp}
            alt={`${profile.firstName + " " + profile.lastName}'s profile`}
            className="avatar"
          />
          <button className="message-button" onClick={handleMessage}>
            Message {profile.firstName}
          </button>
        </div>

        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.firstName + " " + profile.lastName}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Skills:</strong> {profile.Skills.join(", ")}
          </p>
          <p>
            <strong>Bio:</strong> {profile.Bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
