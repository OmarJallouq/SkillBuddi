// src/utils/myDatabase.js
import { databases } from "../appwriteConfig";

export const updateUserData = async (userId, updatedData) => {
  try {
    await databases.updateDocument(
      process.env.REACT_APP_APPWRITE_DATABASE, // Replace with your database ID
      process.env.REACT_APP_APPWRITE_COLLECTION, // Replace with your collection ID
      userId,
      updatedData
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
