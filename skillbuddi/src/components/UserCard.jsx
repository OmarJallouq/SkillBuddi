// UserCard.jsx
import React from 'react';
import './UserCard.css';

const UserCard = ({ username, skills, profilePic }) => {
  return (
    <div className="user-card">
      <div className="profile-pic">
        <img src={profilePic} alt={`${username}'s profile`} />
      </div>
      <div className="profile-info">
        <h3>{username}</h3> {/* Displaying the username here */}
        <div className="skills">
          <h4>Skills:</h4>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
