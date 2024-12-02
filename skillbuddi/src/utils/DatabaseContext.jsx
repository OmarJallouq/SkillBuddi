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
      // First, get all the users (prolly not efficient, but fuck it)
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID
      );
      const currentUserSkills = currentUser.Skills.map((skill) =>
        skill.toLowerCase()
      );
      const currentUserWantedSkills = currentUser.Skills_wanted.map((skill) =>
        skill.toLowerCase()
      );

      // Now, filter the users based on matching skills and wanted skills
      const filteredUsers = response.documents.filter((user) => {
        // Skip the current user
        if (user.$id === currentUser.$id) return false;

        const userSkills = user.Skills.map((skill) => skill.toLowerCase());
        const userWantedSkills = user.Skills_wanted.map((skill) =>
          skill.toLowerCase()
        );

        // Check if any of the user's skills match the current user's wanted skills
        const hasMatchingSkills = currentUserWantedSkills.some((wantedSkill) =>
          userSkills.includes(wantedSkill)
        );

        // Check if any of the user's wanted skills match the current user's skills
        const hasMatchingWantedSkills = userWantedSkills.some((wantedSkill) =>
          currentUserSkills.includes(wantedSkill)
        );

        // Return true if there's a match in both directions simultaneously
        return hasMatchingSkills && hasMatchingWantedSkills;
      });

      return filteredUsers;
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

  const fetchPending = async (userId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INTERESTS_COLLECTION,
        [Query.equal("receiverId", userId), Query.equal("status", "pending")]
      );
      return { success: true, response: response.documents };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return { success: false };
    }
  };

  const contextData = {
    fetchUserData,
    fetchMatchingUsers,
    updateUserData,
    createUserData,
    uploadProfilePicture,
    deleteUserData,
    fetchPending,
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
