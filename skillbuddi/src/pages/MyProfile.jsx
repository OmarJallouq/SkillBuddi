import React, { useState, useEffect } from "react";
import SkillTag from "../components/SkillTag";
import { useAuth } from "../utils/AuthContext";
import { useDatabase } from "../utils/DatabaseContext";
import { toast } from "react-toastify";
import defaultPfp from "../assets/Default_pfp.svg.png";
import "../styles/myProfile.css";




const MyProfile = () => {
  const { user } = useAuth();
  const { updateUserData } = useDatabase();
  const [skills, setSkills] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);

  useEffect(() => {
    setSkills(user.Skills);
    console.log(skills);
  }, []);

  useEffect(() => {
    setSkills(user.Skills || []);
    setSkillsWanted(user.Skills_wanted || []);
  }, [user]);

  const handleAddWantedSkill = async (newSkill) => {
    if (!newSkill.trim()) {
      toast.error("Skill cannot be empty!");
      return;
    }

    const currentSkillsWanted = skillsWanted || [];

    if (currentSkillsWanted.includes(newSkill)) {
      toast.error("Skill already exists!");
      return;
    }

    const updatedSkillsWanted = [...currentSkillsWanted, newSkill];

    try {
      const response = await updateUserData(user.$id, {
        Skills_wanted: updatedSkillsWanted,
      });

      if (response.success) {
        setSkillsWanted(updatedSkillsWanted);
        toast.success("Skill Wanted Added Successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add skill wanted.");
    }
  };

  // Remove a wanted skill
  const handleRemoveWantedSkill = async (skillToRemove) => {
    const updatedSkillsWanted = skillsWanted.filter(
      (skill) => skill !== skillToRemove
    );

    try {
      const response = await updateUserData(user.$id, {
        Skills_wanted: updatedSkillsWanted,
      });

      if (response.success) {
        setSkillsWanted(updatedSkillsWanted);
        toast.success("Skill Wanted Removed Successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove skill wanted.");
    }
  };
  
  //check this I don't know if it's right
  const handleChangeField = async (field) => {
    const fieldName = field === "location" ? "Location" : "Date of Birth";
    const currentValue = user[field];
    const newValue = prompt(`Enter your new ${fieldName}:`, currentValue);

    
    if (field === "dateOfBirth") {
      const birthDate = new Date(newValue);
      const age = new Date().getFullYear() - birthDate.getFullYear();
  
      if (age < 18) {
        toast.error("You must be at least 18 years old!");
        return;
      }
    }
  
    if (!newValue || newValue.trim() === "") {
      toast.error(`${fieldName} cannot be empty!`);
      return;
    }
  
    try {
      const response = await updateUserData(user.$id, {
        [field]: newValue.trim(),
      });
  
      if (response.success) {
        // Update the user field locally to reflect changes immediately
        user[field] = newValue.trim();
        toast.success(`${fieldName} updated successfully!`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || `Failed to update ${fieldName}.`);
    }
  };

  const handleChangeFirstName = async () => {
    const newFirstName = prompt("Enter a new first name:");

    if (!newFirstName || newFirstName.trim() === "") {
      toast.error("First Name cannot be empty!");
      return;
    }

    try {
      // Update the user's name in the database
      const response = await updateUserData(user.$id, { firstName: newFirstName });
  
      if (response.success) {
        // Update local state for immediate UI feedback
        user.firstName = newFirstName; 
        toast.success("First name updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update first name.");
    }

  }

  const handleChangeLastName = async () => {
    const newLastName = prompt("Enter a new last name:");

    if (!newLastName || newLastName.trim() === "") {
      toast.error("Last name cannot be empty!");
      return;
    }

    try {
      // Update the user's name in the database
      const response = await updateUserData(user.$id, { lastName: newLastName });
  
      if (response.success) {
        // Update local state for immediate UI feedback
        user.lastName = newLastName; 
        toast.success("Last name updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update last name.");
    }

  }
  
  
//check i don't know if it's right
const handleChangeBio = async () => {
  const newBio = prompt("Enter a new bio:");
  
  // Check if the input is valid
  if (!newBio || newBio.trim() === "") {
    toast.error("Bio cannot be empty!");
    return;
  }

  try {
    // Update the user's bio in the database
    const response = await updateUserData(user.$id, { Bio: newBio });

    if (response.success) {
      // Update local state for immediate UI feedback
      user.Bio = newBio; 
      toast.success("Bio updated successfully!");
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    toast.error(error.message || "Failed to update bio.");
  }
};

//need to write a function to update profile picture

  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);

    try {
      const response = await updateUserData(user.$id, {
        Skills: updatedSkills,
      });

      if (response.success) {
        setSkills(updatedSkills);
        toast.success("Skill Removed Successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove skill.");
    }
  };

  const handleAddSkill = async (newSkill) => {
    if (!newSkill.trim()) {
      toast.error("Skill cannot be empty!");
      return;
    }

    const currentSkills = skills || [];

    if (currentSkills.includes(newSkill)) {
      toast.error("Skill already exists!");
      return;
    }

    const updatedSkills = [...currentSkills, newSkill];

    try {
      const response = await updateUserData(user.$id, {
        Skills: updatedSkills,
      });
      if (response.success) {
        setSkills(updatedSkills); // Update local state immediately for UI feedback
        toast.success("Skill Added Successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add skill.");
    }
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('profilePicture', file);
  
    try {
      const response = await updateUserData(user.$id, {
        profilePicture: URL.createObjectURL(file), // Store the URL for immediate preview
      });
  
      if (response.success) {
        toast.success("Profile picture updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile picture.");
    }
  };

  return (
    <div className="whole-thing">
      <div className="profile-container">
        <div className="profile-header">
        <img
    src={user.profilePicture ? user.profilePicture : defaultPfp}
    alt="Profile Avatar"
    className="avatar"
  />
  <div>
    <input
      type="file"
      accept="image/*"
      onChange={handleProfilePictureChange}
      style={{ display: 'none' }}
      id="profile-picture-upload"
    />
    <label htmlFor="profile-picture-upload" className="upload-profile-picture-button">
      <span>Upload Picture</span>
    </label>
      </div>
          <div className="profile-info">
            <h1>
              {user.username}
              First name: {user.firstName} 
              
              
              <button
              onClick={() => handleChangeFirstName()}
              className="change-button">
              ✎
              </button>
            </h1>
            <h1>
              Last name: {user.lastName}
              <button
              onClick={() => handleChangeLastName()}
              className="change-button">
              ✎
              </button>
            </h1>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>
              Location: {user.location}
              <button
              onClick={() => handleChangeField("location")}
              className="change-button">
              ✎
              </button>
            </p> 
            <p>
              Date of Birth: {user.dateOfBirth}
              <button
              className="change-button"
              onClick={() => handleChangeField("dateOfBirth", "Date of Birth")}>
              ✎
              </button>
            </p>
          </div>
        </div>
        <div className="Bio">

          <div className="bio-header">
            <h2>Bio</h2>
            <button
              onClick={() => handleChangeBio("Bio")}
              className="change-button"
            >
              ✎
            </button>
          </div>

          <p>{user.Bio}</p>

        </div>

        <div className="skills-section">
          <div className="title-skills-container">
            <h2>My Skills</h2>
            {skills.length === 0 ? (
              <p>No skills added yet.</p>
            ) : (
              <ul className="skills-list">
                {skills.map((skill, index) => (
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
        <div className="skills-wanted-section">
          <div className="title-skills-container">
            <h2>Skills Wanted</h2>
            {skillsWanted.length === 0 ? (
              <p>No skills wanted added yet.</p>
            ) : (
              <ul className="skills-list">
                {skillsWanted.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill}
                    index={index}
                    handleRemoveSkill={handleRemoveWantedSkill}
                  />
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => {
              const newSkill = prompt("Enter a new skill wanted:");
              if (newSkill) {
                handleAddWantedSkill(newSkill);
              }
            }}
            className="add-skill-button"
          >
            Add Skill Wanted
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
