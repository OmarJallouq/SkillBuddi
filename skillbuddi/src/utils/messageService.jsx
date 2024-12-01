import { databases } from "../appwriteConfig";
import { ID, Query } from "appwrite";

// Constants
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION;

/**
 * Fetch all messages between two users.
 */
export const fetchMessages = async (loggedInUserId, partnerUserId) => {
  try {
    // Fetch messages where either user is sender and the other is receiver
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.or(
          Query.and(
            Query.equal("senderId", loggedInUserId),
            Query.equal("receiverId", partnerUserId)
          ),
          Query.and(
            Query.equal("senderId", partnerUserId),
            Query.equal("receiverId", loggedInUserId)
          )
        ),
        Query.orderAsc("timestamp"), // Sort by timestamp
      ]
    );

    return response.documents; // Return sorted messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

/**
 * Send a message between two users.
 */
export const sendMessage = async (senderId, receiverId, message) => {
  if (!message.trim()) return null; // Prevent sending empty messages

  try {
    const newMessage = {
      senderId,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      newMessage
    );

    return response; // Return the new message document
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};
