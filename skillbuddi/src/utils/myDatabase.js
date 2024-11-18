// src/utils/myDatabase.js
import { databases } from "../appwriteConfig";

export const updateUserData = async (userId, updatedData) => {
  try {
    await databases.updateDocument(
      "your-database-id", // Replace with your database ID
      "your-collection-id", // Replace with your collection ID
      userId,
      updatedData
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
