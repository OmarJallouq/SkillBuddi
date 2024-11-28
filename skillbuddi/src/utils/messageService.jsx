import { Query } from "appwrite";
import { databases } from "../appwriteConfig";

// Replace these with your database and collection IDs
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
const COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION; //TODO: This is not in .env???

export const fetchConversations = async (userId) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("participants", userId),
    ]);
    return response.documents.map((doc) => ({
      id: doc.$id,
      partnerId: doc.partnerId,
      partnerName: doc.partnerName,
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export const fetchMessages = async (userId, partnerId) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("participants", [userId, partnerId]),
    ]);
    return response.documents.map((doc) => ({
      senderId: doc.senderId,
      text: doc.text,
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const sendMessage = async (userId, partnerId, text) => {
  try {
    await databases.createDocument(DATABASE_ID, COLLECTION_ID, {
      participants: [userId, partnerId],
      senderId: userId,
      text,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
