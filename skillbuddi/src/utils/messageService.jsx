import { databases } from "../appwriteConfig"; 
import { ID, Query } from "appwrite";

// Constants
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE; // Replace with your database ID
const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION; // Replace with your collection ID

// Fetch messages between two users
export const fetchMessages = async (loggedInUserId, partnerUserId) => {
  try {
    // Fetch the conversation between the logged-in user and the partner
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", loggedInUserId),  // Ensure senderId matches
        Query.equal("receiverId", partnerUserId), // Ensure receiverId matches
      ]
    );

    // If the conversation exists, return the messages, else return an empty array
    if (response.documents.length > 0) {
      return response.documents[0].messages || []; // Return messages from the conversation
    } else {
      return []; // No conversation exists
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

// Send a message between two users
export const sendMessage = async (senderId, receiverId, text) => {
  if (!text.trim()) return null; // Prevent sending empty messages

  try {
    // Fetch conversation by senderId and receiverId
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", senderId),
        Query.equal("receiverId", receiverId),
      ]
    );

    let conversationId;
    let updatedMessages;

    if (response.documents.length > 0) {
      // If conversation exists, add the new message to the existing conversation
      conversationId = response.documents[0].$id;
      updatedMessages = [
        ...response.documents[0].messages,
        { senderId, receiverId, text, timestamp: new Date().toISOString() }, // Add new message
      ];

      // Update the conversation with the new message
      await databases.updateDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        conversationId,
        { messages: updatedMessages }
      );
    } else {
      // If no conversation exists, create a new one
      updatedMessages = [
        { senderId, receiverId, text, timestamp: new Date().toISOString() }, // First message
      ];

      // Create a new conversation document
      const newConversation = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        {
          senderId,
          receiverId,
          messages: updatedMessages, // Store the initial message
        }
      );

      conversationId = newConversation.$id;
    }

    // Return the conversationId to track the conversation
    return conversationId;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

// Fetch all conversations for the logged-in user
export const fetchConversations = async (loggedInUserId) => {
  try {
    // Fetch all conversations where the logged-in user is either sender or receiver
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", loggedInUserId),  // Fetch all conversations where user is the sender
        Query.equal("receiverId", loggedInUserId), // Or the receiver
      ]
    );

    // Return an array of conversations with last message information
    return response.documents.map((doc) => ({
      conversationId: doc.$id,
      participants: [doc.senderId, doc.receiverId],
      lastMessage: doc.messages?.[doc.messages.length - 1] || null, // Last message in the conversation
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};
