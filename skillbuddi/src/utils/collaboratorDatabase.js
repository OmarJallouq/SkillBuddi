// src/utils/collaboratorDatabase.js
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://your-collaborator-appwrite-endpoint") 
  .setProject("your-collaborator-project-id"); 

const databases = new Databases(client);

export const fetchUserData = async (userId) => {
  try {
    const response = await databases.getDocument(
      "collaborator-database-id", // Replace with collaborator's database ID
      "collaborator-collection-id", // Replace with collaborator's collection ID
      userId
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
