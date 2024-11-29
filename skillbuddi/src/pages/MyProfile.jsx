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
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setSkills(user.Skills || []);
    setSkillsWanted(user.Skills_wanted || []);
    setLocation(user.location);
    setBio(user.Bio);
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
        toast.success("Wanted skill added successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add the wanted skill.");
    }
  };

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
        toast.success("Wanted skill removed successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove the wanted skill.");
    }
  };

  const handleChangeLocation = async () => {
    const newLocation = prompt("Enter a new location:");

    if (!newLocation || newLocation.trim() === "") {
      toast.error("Location cannot be empty!");
      return;
    }

    try {
      // Update the user's name in the database
      const response = await updateUserData(user.$id, {
        location: newLocation,
      });

      if (response.success) {
        // Update local state for immediate UI feedback
        setLocation(newLocation);
        toast.success("Location updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update location.");
    }
  };

  const handleChangeName = async () => {
    const newFirstName = prompt("Enter a new First Name:");
    if (!newFirstName || newFirstName.trim() === "") {
      toast.error("Last name cannot be empty!");
      return;
    }

    const newLastName = prompt("Enter a new Last Name:");
    if (!newLastName || newLastName.trim() === "") {
      toast.error("Last name cannot be empty!");
      return;
    }

    try {
      // Update the user's name in the database
      const response = await updateUserData(user.$id, {
        firstName: newFirstName,
        lastName: newLastName,
      });

      if (response.success) {
        // Update local state for immediate UI feedback
        setFirstName(newFirstName);
        setLastName(newLastName);
        toast.success("Name updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update last name.");
    }
  };

  const handleChangeLastName = async () => {
    const newLastName = prompt("Enter a new last name:");

    if (!newLastName || newLastName.trim() === "") {
      toast.error("Last name cannot be empty!");
      return;
    }

    try {
      // Update the user's name in the database
      const response = await updateUserData(user.$id, {
        lastName: newLastName,
      });

      if (response.success) {
        // Update local state for immediate UI feedback
        setLastName(newLastName);
        toast.success("Last name updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update last name.");
    }
  };

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
        setBio(newBio);

        toast.success("Bio updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update bio.");
    }
  };

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
      toast.error(error.message || "Failed to remove the skill.");
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
      toast.error(error.message || "Failed to add the skill.");
    }
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

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
              style={{ display: "none" }}
              id="profile-picture-upload"
            />
            <label
              htmlFor="profile-picture-upload"
              className="upload-profile-picture-button"
            >
              <span>Upload Picture</span>
            </label>
          </div>
          <div className="profile-info">
            <h1>
              Name: {firstName} {lastName}
              <button
                onClick={() => handleChangeName()}
                className="change-button"
              >
                ✎
              </button>
            </h1>
            <p>{user.$id}</p>
            <p>{user.email}</p>
            <p>
              Location: {location}
              <button
                onClick={() => handleChangeLocation()}
                className="change-button"
              >
                ✎
              </button>
            </p>
            <p>Date of Birth: {user.dateOfBirth}</p>
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

          <p>{bio}</p>
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
