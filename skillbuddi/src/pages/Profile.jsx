import "../styles/profile.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import { getUserProfile, addInterest, checkMutualInterest } from "../utils/internetservice"; // Utility functions for profiles
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth(); // Current logged-in user
  const { id: profileUserId } = useParams(); // Get the profile user ID from the URL
  const [profileData, setProfileData] = useState(null);
  const [emailVisible, setEmailVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile(profileUserId);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile.");
      }
    };

    const checkInterest = async () => {
      if (user.$id && profileUserId) {
        const mutualInterest = await checkMutualInterest(user.$id, profileUserId);
        setEmailVisible(mutualInterest);
      }
    };

    fetchProfileData();
    checkInterest();
  }, [user.$id, profileUserId]);

  const handleInterestClick = async () => {
    try {
      await addInterest(user.$id, profileUserId); // Add interest
      toast.success("Your interest has been recorded!");

      // Check for mutual interest
      const mutualInterest = await checkMutualInterest(user.$id, profileUserId);
      if (mutualInterest) {
        setEmailVisible(true);
        toast.success("Mutual interest! Email is now visible.");
      }
    } catch (error) {
      console.error("Error recording interest:", error);
      toast.error("Failed to record interest.");
    }
  };

  return (
    <div className="profile-container">
      {profileData ? (
        <>
          <h1>{profileData.firstName} {profileData.lastName}</h1>
          <p>Bio: {profileData.Bio || "No bio available"}</p>
          <p>Skills: {profileData.Skills?.join(", ") || "No skills listed"}</p>
          <p>Location: {profileData.location || "No location provided"}</p>
          {emailVisible ? (
            <p>Email: {profileData.email}</p> // Display email if mutual interest exists
          ) : (
            <button className="interest-button" onClick={handleInterestClick}>
              Show Interest
            </button>
          )}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
