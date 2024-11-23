import React, { createContext, useContext, useState } from "react";
import { databases, storage } from "../appwriteConfig";
import { ID } from "appwrite";

// Appwrite Configuration
const DATABASE_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
const USER_COLLECTION_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
const BUCKET_ID = `${process.env.REACT_APP_APPWRITE_STORAGE}`;
// Create Context
const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch User Data by User ID
  const fetchUserData = async (userId) => {
    setLoading(true);
    setError(null);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  // Update User Data
  const updateUserData = async (userId, data) => {
    setLoading(true);
    setError(null);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  // Create New User Data
  const createUserData = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Picture
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
    updateUserData,
    createUserData,
    uploadProfilePicture,
  };

  return (
    <DatabaseContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </DatabaseContext.Provider>
  );
};

// Custom Hook
export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export default DatabaseContext;
