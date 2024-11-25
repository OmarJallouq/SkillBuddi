import React from "react";
import SkillTag from "../components/SkillTag";
import { useAuth } from "../utils/AuthContext";
import "../styles/myProfile.css";

const MyProfile = () => {
  const { user } = useAuth();

  const handleRemoveSkill = (skillToRemove) => {
    //TODO: HandleRemoveSkill Logic with DB
  };

  const handleAddSkill = (newSkill) => {
    //TODO: HandleAddSkill Logic with DB
  };

  return (
    <div className="whole-thing">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.avatar} alt="Profile Avatar" className="avatar" />
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="skills-section">
          <div className="title-skills-container">
            <h2>My Skills</h2>
            {!user.skills ? (
              <p>No skills added yet.</p>
            ) : (
              <ul className="skills-list">
                {user.skills.map((skill, index) => (
                  <SkillTag
                    skill={skill}
                    index={index}
                    handleRemoveSkill={handleRemoveSkill}
                  />
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => {
              const newSkill = prompt("Enter a new skill:");
              if (newSkill) {
                handleAddSkill(newSkill);
              }
            }}
            className="add-skill-button"
          >
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
