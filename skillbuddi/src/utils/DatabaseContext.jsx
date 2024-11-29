import React, { createContext, useContext, useState } from "react";
import { databases, storage } from "../appwriteConfig";
import { ID, Query } from "appwrite";

const DATABASE_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
const USER_COLLECTION_ID = `${process.env.REACT_APP_APPWRITE_COLLECTION}`;
const BUCKET_ID = `${process.env.REACT_APP_APPWRITE_STORAGE}`;

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const fetchUserData = async (userId) => {
    setError(null);
    try {
      // Gets and returns the record
      const userData = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
      );
      return userData;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user data:", err);
      throw err;
    }
  };

  const fetchMatchingUsers = async (currentUser) => {
    try {
      // Prepare queries for skills
      const skillsWantedQuery = currentUser.Skills_wanted.join(" ");
      const skillsQuery = currentUser.Skills.join(" ");

      // Fetch users who have skills you want and also want the skills you have
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID,
        [
          // First query: Users who have at least one skill from Skills_wanted
          Query.search("Skills", skillsWantedQuery),

          // Second query: Users who want at least one skill you have in Skills
          Query.search("Skills_wanted", skillsQuery),
        ]
      );

      // Filter out the current user from the results
      const filteredUsers = response.documents.filter(
        (user) => user.$id !== currentUser.$id
      );

      // Further filter the users to ensure they match both criteria:
      const matchingUsers = filteredUsers.filter((user) => {
        const hasMatchingSkills = user.Skills.some(
          (skill) => currentUser.Skills_wanted.includes(skill) // Check if user has any of the skills you want
        );

        const hasMatchingWantedSkills = user.Skills_wanted.some(
          (wantedSkill) => currentUser.Skills.includes(wantedSkill) // Check if user wants any of the skills you have
        );

        return hasMatchingSkills && hasMatchingWantedSkills; // Return users that meet both conditions
      });

      return matchingUsers;
    } catch (err) {
      console.error("Error fetching matching users:", err);
      setError("Failed to load matching users.");
    }
  };

  const updateUserData = async (userId, data) => {
    setError(null);
    try {
      // Updates and returns updated record
      const updatedData = await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId,
        data
      );
      return updatedData;
    } catch (err) {
      setError(err.message);
      console.error("Error updating user data:", err);
      throw err;
    }
  };

  const createUserData = async (id, data) => {
    setError(null);
    try {
      // Creates new record in User collection
      const newData = await databases.createDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        id,
        data
      );
      return newData;
    } catch (err) {
      setError(err.message);
      console.error("Error creating user data:", err);
      throw err;
    }
  };

  const deleteUserData = async (userId) => {
    setError(null);
    try {
      await databases.deleteDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const uploadProfilePicture = async (file) => {
    try {
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
      return response.$id; // Return the file ID
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const contextData = {
    fetchUserData,
    fetchMatchingUsers,
    updateUserData,
    createUserData,
    uploadProfilePicture,
    deleteUserData,
  };

  return (
    <DatabaseContext.Provider value={contextData}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Custom Hook
export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export default DatabaseContext;
