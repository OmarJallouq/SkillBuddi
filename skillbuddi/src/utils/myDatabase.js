// src/utils/myDatabase.js
import { databases } from "../appwriteConfig";

export const updateUserData = async (userId, updatedData) => {
  try {
    await databases.updateDocument(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_COLLECTION_ID,
      userId,
      updatedData
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
