import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDatabase } from "../utils/DatabaseContext";
import { useAuth } from "../utils/AuthContext";
import defaultPfp from "../assets/Default_pfp.svg.png";
import { toast } from "react-toastify";
import "../styles/profile.css";

const Profile = () => {
  const { username } = useParams(); // Extract the user ID from the URL
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const {
    fetchUserData,
    getImageUrl,
    fetchRequestStatus,
    sendRequest,
    cancelRequest,
    checkMutualAcceptance,
  } = useDatabase();

  const [profile, setProfile] = useState(null);
  const [age, setAge] = useState(0);
  const [requestStatus, setRequestStatus] = useState("");
  const [mutualAcceptance, setMutualAcceptance] = useState(false);

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

    const checkRequestStatus = async () => {
      const status = await fetchRequestStatus(user.$id, username);
      setRequestStatus(status);
    };

    const checkMutual = async () => {
      const mutuals = await checkMutualAcceptance(user.$id, username);
      setMutualAcceptance(mutuals);
    };

    if (username) {
      fetchData();
      checkRequestStatus();
      checkMutual();
    }
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    // Redirect to the Messaging page with the profile ID
    navigate(`/messaging/${profile.id}`);
  };

  const handleRequestClick = async () => {
    if (!requestStatus) {
      // Send request
      const response = await sendRequest(user.$id, username);
      if (response.success) {
        setRequestStatus("pending");
      } else toast.error(response.error);
    } else if (requestStatus === "pending") {
      // Cancel request
      const response = await cancelRequest(user.$id, username);
      if (response.success) setRequestStatus(null);
      else toast.error(response.error);
    }
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
            Send Request
          </button>
          <button
            onClick={handleRequestClick}
            style={{
              backgroundColor: requestStatus === "pending" ? "gray" : "blue",
            }}
          >
            {requestStatus === "pending"
              ? "Request Sent"
              : requestStatus === "accepted"
              ? "Already Friends"
              : "Add Request"}
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
          {mutualAcceptance ? (
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
