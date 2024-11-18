import React from "react";
import "../styles/UserCard.css"; // Optional: Add styles here

const UserCard = ({ key, username, skills, profilePic }) => {
  return (
    <div className="user-card" key={key}>
      <img
        src={profilePic}
        alt={`${username}'s profile`}
        className="profile-pic"
      />
      <h2 className="username">{username}</h2>
      <div className="skills">
        <h4>Skills:</h4>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
