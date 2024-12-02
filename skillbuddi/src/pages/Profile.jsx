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
    updateRequestStatus,
  } = useDatabase();

  const [profile, setProfile] = useState(null);
  const [age, setAge] = useState(0);
  const [pfpLink, setPfpLink] = useState("");
  const [sentRequest, setSentRequest] = useState({});
  const [receivedRequest, setReceivedRequest] = useState({});

  // fetch user data
  useEffect(() => {
    if (username === user.$id) {
      navigate("/myProfile");
      return;
    }
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
        setPfpLink(getImageUrl(userData.profilePicture));
        setAge(calculateAge(userData.dateOfBirth));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const checkSentRequestStatus = async () => {
      const status = await fetchRequestStatus(user.$id, username);
      setSentRequest(status);
    };

    const checkReceivedRequestStatus = async () => {
      const status = await fetchRequestStatus(username, user.$id);
      setReceivedRequest(status);
    };

    if (username) {
      fetchData();
      checkSentRequestStatus();
      checkReceivedRequestStatus();
    }
  }, [username, fetchRequestStatus, fetchUserData, getImageUrl, navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    // Redirect to the Messaging page with the profile ID
    navigate(`/messaging/${profile.id}`);
  };

  const handleRequestClick = async () => {
    if (!sentRequest && !receivedRequest) {
      // Send request
      const response = await sendRequest(user.$id, username);
      if (response.success) {
        setSentRequest("pending");
        toast.success("Request Sent Successfully");
      } else toast.error(response.error);
    } else if (sentRequest?.status === "pending") {
      // Cancel request
      const response = await cancelRequest(user.$id, username);
      if (response.success) {
        setSentRequest(null);
        toast.success("Request Cancelled Successfully");
      } else toast.error(response.error);
    } else if (receivedRequest?.status === "pending") {
      //update status to accepted
      const response = await updateRequestStatus(receivedRequest.$id, {
        status: "accepted",
      });
      if (response.success) {
        setReceivedRequest(response.response);
        toast.success("Request Accepted");
      } else toast.error(response.error);
    } else if (
      receivedRequest?.status === "accepted" ||
      sentRequest?.status === "accepted"
    ) {
      const removeConfirm = window.confirm(
        "Would you like to remove your request?"
      );
      if (removeConfirm) {
        if (receivedRequest) {
          const response = await cancelRequest(username, user.$id);
          if (response.success) {
            setReceivedRequest(null);
            toast.success("Removed Request Successfully");
          } else toast.error(response.error);
        } else {
          const response = await cancelRequest(user.$id, username);
          if (response.success) {
            setSentRequest(null);
            toast.success("Removed Request Successfully");
          } else toast.error(response.error);
        }
      } else {
        // do nothing since the user cancelled the unrequest
      }
    }
  };

  const handleDenyClick = async () => {
    const response = await cancelRequest(username, user.$id);
    if (response.success) {
      setReceivedRequest(null);
      toast.success("Request Denied Successfully");
    } else toast.error(response.error);
  };

  return (
    <div className="whole-thing">
      <h1 className="profile-title">
        {profile.firstName + " " + profile.lastName}'s Profile
      </h1>
      <div className="profile-container">
        <div className="profile-avatar">
          <img
            src={true ? pfpLink : defaultPfp}
            alt={`${profile.firstName + " " + profile.lastName}'s profile`}
            className="avatar"
          />
          <button className="button-request" onClick={handleRequestClick}>
            {sentRequest?.status === "accepted" ||
            receivedRequest?.status === "accepted"
              ? "Request Accepted"
              : !sentRequest && !receivedRequest
              ? "Send Request"
              : receivedRequest
              ? "Accept Request"
              : "Cancel Request"}
          </button>
          <button
            className={
              receivedRequest?.status === "pending" && !sentRequest
                ? "button-request"
                : "button-hidden"
            }
            onClick={handleDenyClick}
          >
            Deny Request
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
          {true ? (
            <p>
              <strong>Email:</strong> {(sentRequest?.status==="accepted" || receivedRequest) ? profile.email : "Send request to see email"}
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
