import React, { useState, useEffect } from "react";
import SkillTag from "../components/SkillTag";
import "../styles/myProfile.css";

const MyProfile = () => {
  // State to store the user's profile data
  const [user, setUser] = useState(null);

  // Simulated fetch function to get user data (this could be an API call in real use)
  // yeah someone should make this an api call lol
  useEffect(() => {
    const fetchUserData = () => {
      const userData = {
        name: "Akumba Khabibi",
        username: "cocksucker123",
        email: "akumba@example.com",
        avatar: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder image
        skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"], // Example skills
      };
      setUser(userData);
    };
    fetchUserData();
  }, []);

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle adding a new skill
  const handleAddSkill = (newSkill) => {
    if (newSkill && !user.skills.includes(newSkill)) {
      setUser((prevUser) => ({
        ...prevUser,
        skills: [...prevUser.skills, newSkill],
      }));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
          {user.skills.length === 0 ? (
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
            const newSkill = prompt("Enter a new skill:"); // Prompt to add a new skill
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
