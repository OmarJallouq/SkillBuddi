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
  }, []);
  
  //check this I don't know if it's right
  const handleChangeField = async (field) => {
    const fieldName =
      field === "location"
        ? "Location"
        : field === "dateOfBirth"
        ? "Date of Birth"
        : "Bio";
    const currentValue = user[field];
    const newValue = prompt(`Enter your new ${fieldName}:`, currentValue);

    if (!newValue || newValue.trim() === "") {
      toast.error(`${fieldName} cannot be empty!`);
      return;
    }

    if (field === "Bio" && newValue.length > 140) {
      toast.error("Bio exceeds 140 character limit")
      return;
    }

    //TODO: add validation for DOB format, add character limit for bio
    try {
      const response = await updateUserData(user.$id, {
        [field]: newValue.trim(),
      });

      if (response.success) {
        // Update the user field locally to reflect changes immediately
        window.location.reload(false); //TODO: Bad practice, add as dependency in useEffect to trigger rerender.
        toast.success(`${fieldName} updated successfully!`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || `Failed to update ${fieldName}.`);
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

  return (
    <div className="whole-thing">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={user.profilePicture ? user.profilePicture : defaultPfp}
            alt="Profile Avatar"
            className="avatar"
          />
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>
              Location: {user.location}
              <button
                onClick={() => handleChangeField("location")}
                className="change-button"
              >
                ✎
              </button>
            </p>
            <p>
              Date of Birth: {user.dateOfBirth}
            </p>
          </div>
        </div>
        <div className="Bio">
          <div className="bio-header">
            <h2>Bio</h2>
            <button
              onClick={() => handleChangeField("Bio")}
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
