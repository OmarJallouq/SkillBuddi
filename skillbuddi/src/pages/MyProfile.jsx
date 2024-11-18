import React, { useState, useEffect } from 'react';
import './MyProfile.css';

const MyProfile = () => {
  // State to store the user's profile data
  const [user, setUser] = useState(null);

  // Simulated fetch function to get user data (this could be an API call in real use)
  useEffect(() => {
    const fetchUserData = () => {
      const userData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png', // Placeholder image
        skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'] // Example skills
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

  // Handle editing a skill (replaces the old skill with the new one)
  const handleEditSkill = (oldSkill, newSkill) => {
    if (newSkill && oldSkill !== newSkill) {
      setUser((prevUser) => ({
        ...prevUser,
        skills: prevUser.skills.map((skill) =>
          skill === oldSkill ? newSkill : skill
        ),
      }));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="Profile Avatar" className="avatar" />
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>@{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="skills-section">
        <h2>Skills</h2>
        {user.skills.length === 0 ? (
          <p>No skills listed.</p>
        ) : (
          <ul className="skills-list">
            {user.skills.map((skill, index) => (
              <li key={index} className="skill-item">
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="remove-skill"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    const newSkill = prompt(
                      'Edit skill:',
                      skill
                    ); // Simple prompt to edit the skill
                    if (newSkill) {
                      handleEditSkill(skill, newSkill);
                    }
                  }}
                  className="edit-skill"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => {
            const newSkill = prompt('Enter a new skill:'); // Prompt to add a new skill
            if (newSkill) {
              handleAddSkill(newSkill);
            }
          }}
          className="add-skill"
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
