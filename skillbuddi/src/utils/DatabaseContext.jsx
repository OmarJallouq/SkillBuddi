import React, { createContext, useContext, useState } from "react";
import { databases, storage } from "../appwriteConfig";
import { ID, Query } from "appwrite";

const DATABASE_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
const USER_COLLECTION_ID = `${process.env.REACT_APP_APPWRITE_COLLECTION}`;
const INTERESTS_COLLECTION = `${process.env.REACT_APP_REQUESTS_COLLECTION}`;
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
      return { success: true, updatedData };
    } catch (err) {
      setError(err.message);
      console.error("Error updating user data:", err);
      return { success: false, error: err.message || "Something went wrong." };
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
      return { success: true, response: response.$id }; // Return the file ID
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getImageUrl = (fileId) => {
    try {
      const url = storage.getFilePreview(BUCKET_ID, fileId);
      return url; // This can be used directly in an <img> tag
    } catch (error) {
      return null;
    }
  };

  const sendRequest = async (senderId, receiverId) => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        INTERESTS_COLLECTION,
        ID.unique(),
        {
          senderId,
          receiverId,
          status: "pending",
        }
      );

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const cancelRequest = async (senderId, receiverId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INTERESTS_COLLECTION,
        [
          Query.equal("senderId", senderId),
          Query.equal("receiverId", receiverId),
        ]
      );

      if (response.documents.length > 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          INTERESTS_COLLECTION,
          response.documents[0].$id
        );
      }
      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error("Error cancelling request:", error);
      return { success: false, error: error.message };
    }
  };

  const updateRequestStatus = async (requestId, data) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        INTERESTS_COLLECTION,
        requestId,
        data
      );

      return { success: true, response: response };
    } catch (error) {
      setError(error.message);
      console.error("Error updating user data:", error);
      return { success: false, error: error.message };
    }
  };

  const fetchRequestStatus = async (senderId, receiverId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INTERESTS_COLLECTION,
        [
          Query.and([
            Query.equal("senderId", senderId),
            Query.equal("receiverId", receiverId),
          ]),
        ]
      );
      return response.documents[0] || null; // Return the first matching request or null
    } catch (error) {
      console.error("Error fetching request status:", error);
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
      return response.documents;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return null;
    }
  };

  const contextData = {
    fetchUserData,
    updateUserData,
    createUserData,
    uploadProfilePicture,
    deleteUserData,
    getImageUrl,
    sendRequest,
    fetchRequestStatus,
    cancelRequest,
    fetchPending,
    updateRequestStatus,
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
