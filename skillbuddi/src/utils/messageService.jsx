import { databases } from "../appwriteConfig"; // Import your Appwrite configuration
import { ID, Query } from "appwrite";

// Constants
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE; // Replace with your database ID
const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION; // Replace with your collection ID

export const fetchMessages = async (loggedInUserId, partnerUserId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.contains("participants", loggedInUserId),
        Query.contains("participants", partnerUserId),
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0].messages || []; // Return messages if conversation exists
    } else {
      return []; // No conversation exists
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const sendMessage = async (senderId, receiverId, text) => {
  if (!text.trim()) return null; // Prevent sending empty messages

  try {
    // Fetch conversation by participant userIds
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        `participants=${senderId},${receiverId}`, // Query using user IDs
      ]
    );

    let conversationId;
    let updatedMessages;

    if (response.documents.length > 0) {
      // Conversation exists, update it
      conversationId = response.documents[0].$id;
      updatedMessages = [
        ...response.documents[0].messages,
        { senderId, receiverId, text, timestamp: new Date().toISOString() }, // Use user IDs here
      ];

      await databases.updateDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        conversationId,
        { messages: updatedMessages }
      );
    } else {
      // No conversation exists, create a new one
      updatedMessages = [
        { senderId, receiverId, text, timestamp: new Date().toISOString() },
      ];

      const newConversation = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        {
          participants: [senderId, receiverId], // Store user IDs in participants
          messages: updatedMessages,
        }
      );

      conversationId = newConversation.$id;
    }

    return conversationId;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

export const fetchConversations = async (loggedInUserId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        `participants=${loggedInUserId}`, // Query conversations involving the logged-in user ID
      ]
    );

    return response.documents.map((doc) => ({
      conversationId: doc.$id,
      participants: doc.participants,
      lastMessage: doc.messages?.[doc.messages.length - 1] || null,
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};
