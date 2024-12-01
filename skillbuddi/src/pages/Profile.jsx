import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDatabase } from "../utils/DatabaseContext";
import defaultPfp from "../assets/Default_pfp.svg.png";
import "../styles/profile.css";

const Profile = () => {
  const { username } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { fetchUserData, getImageUrl } = useDatabase();
  const [profile, setProfile] = useState(null);
  const [age, setAge] = useState(0);
  

  // Local state to track if both users are interested
  const [userHasClicked, setUserHasClicked] = useState(false);  // Current user's interest status
  const [otherUserHasClicked, setOtherUserHasClicked] = useState(false);  // Other user's interest status

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

  // Handle current user's interest in learning the skill
  const handleUserInterestClick = () => {
    setUserHasClicked(true);
  };

  // Handle the other user's interest in learning the skill
  const handleOtherUserInterestClick = () => {
    setOtherUserHasClicked(true);
  };


  return (
    <div className="whole-thing">
      <h1 className="profile-title">
        {profile.firstName + " " + profile.lastName}'s Profile
      </h1>
      <div className="profile-container">
        <div className="profile-avatar">
          <img
            src={
              profile.profilePicture
                ? getImageUrl(profile.profilePicture)
                : defaultPfp
            }
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
          
          {/* Conditionally display the email if both users have shown interest */}
          {userHasClicked && otherUserHasClicked && (
            <p><strong>Email:</strong> {profile.email}</p>
          )}

          {/* Button for current user to express interest */}
          <button onClick={handleUserInterestClick} className="interest-button">
            Interested in learning this skill
          </button>

          {/* Simulate the other user clicking the button */}
          <button onClick={handleOtherUserInterestClick} className="interest-button">
            Other User Interested in Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
