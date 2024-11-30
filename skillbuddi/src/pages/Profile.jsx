import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


const Profile = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { user: loggedInUser } = useAuth(); // Added: Get logged-in user info.
  const [profile, setProfile] = useState(null);

  // Simulate fetching user data
    

  useEffect(() => {
    const fetchData = async () => {
      const mockData = {
        id,
        name: "Jamal Doe",
        photo: "https://randomuser.me/api/portraits/men/41.jpg",
        skills: ["Maths"],
        bio: "Passionate about sharing knowledge and learning new things.",
        location: "Brooklyn",
        age: "238",
        occupation: "Hustler",

      };
      setProfile(mockData);
    };

    fetchData();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    navigate(`/messages/${profile.username}`);
  };
  

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        marginTop: "65px",
        marginLeft: "100px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "40px" }}>
          <strong>{profile.name}'s Profile</strong>
        </p>
        <img
          src={profile.photo}
          alt={`${profile.name}'s profile`}
          style={{
            width: "350px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        />
        {/* Conditional Buttons */}
        {loggedInUser?.$id === profile.$id ? (
          <button
            style={{
              padding: "20px 30px",
              fontSize: "25px",
              backgroundColor: "#40E0D0",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "25px",
            }}
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        ) : (
          <button
            style={{
              padding: "20px 30px",
              fontSize: "25px",
              backgroundColor: "#40E0D0",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "25px",
            }}
            onClick={handleMessage}
          >
            Message {profile.name}
          </button>
        )}
      </div>
  
      <div
        style={{
          alignItems: "start",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "13px",
        }}
      >
        <p style={{ marginTop: "80px" }}>
          <strong>Name:</strong> {profile.name}
        </p>
        <p style={{ marginTop: "12px" }}>
          <strong>Age:</strong> {profile.age}
        </p>
        <p style={{ marginTop: "12px" }}>
          <strong>Location:</strong> {profile.location}
        </p>
        <p style={{ marginTop: "12px" }}>
          <strong>Skills:</strong> {profile.skills.join(", ")}
        </p>
        <p style={{ marginTop: "12px" }}>
          <strong>Bio:</strong> {profile.bio}
        </p>
      </div>
    </div>
  );
};  

export default Profile;

/* return (
    <div style={{ padding: "20px", display:'flex', flexDirection: 'row', marginTop: '65px', marginLeft: '100px' }}>
        
        
        <div style={{display:'flex', flexDirection:'column'}}>
            <p style={{fontSize: '40px'}}>
            <strong>{profile.name}'s Profile</strong>
            </p>
            <img src={profile.photo}
                alt={`${profile.name}'s profile`}
                style={{ width: "350px", borderRadius: "20px", marginTop: "20px" }}>
            </img>
            <button
                style={{
                
                padding: "20px 30px",
                fontSize: "25px",
                backgroundColor: "#40E0D0",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "25px"
                }}
                onClick={handleMessage} // Call the navigation function
            >
                Message {profile.name}
            </button>
        </div>

        <div style={{alignItems: 'start', fontSize: '25px', display:'flex', flexDirection: 'column', marginLeft: '13px'}}>
            <p style={{ marginTop: "80px"}}><strong>Name:</strong>{profile.name}</p>
            <p style={{ marginTop: "12px"}}><strong>Age:</strong> {profile.age}</p>
            <p style={{ marginTop: "12px"}}><strong>Location:</strong> {profile.location}</p>
            <p style={{ marginTop: "12px"}}><strong>Skills:</strong> {profile.skills.join(", ")}</p>

            <p style={{ marginTop: "12px"}}><strong>Bio:</strong> {profile.bio}</p>
            
        </div>
        <div>
            
        </div>
    </div>
  );
*/
  