import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";

const Profile = () => {
  const { user, updateProfile, uploadProfilePicture } = useAuth();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    skills: "",
    location: "",
    dateOfBirth: "",
    profilePicture: null,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        profilePicture: user.profilePicture || null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileId = await uploadProfilePicture(file);
      setProfile({ ...profile, profilePicture: fileId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = { ...profile, skills: profile.skills.split(",").map((s) => s.trim()) };
    const result = await updateProfile(user.$id, updates);

    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Error updating profile: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} placeholder="First Name" />
      <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} placeholder="Last Name" />
      <textarea name="bio" value={profile.bio} onChange={handleInputChange} placeholder="Bio" />
      <input type="text" name="skills" value={profile.skills} onChange={handleInputChange} placeholder="Skills (comma-separated)" />
      <input type="text" name="location" value={profile.location} onChange={handleInputChange} placeholder="Location" />
      <input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleInputChange} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
