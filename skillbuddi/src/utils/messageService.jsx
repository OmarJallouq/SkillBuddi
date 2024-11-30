import { databases } from "../appwriteConfig"; // Import your Appwrite configuration
import { ID } from "appwrite";

// Constants
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE; // Replace with your database ID
const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION; // Replace with your collection ID

/**
 * Fetch messages between two users by their usernames.
 * @param {string} loggedInUsername - The username of the logged-in user.
 * @param {string} partnerUsername - The username of the conversation partner.
 * @returns {Array} - List of messages.
 */
export const fetchMessages = async (loggedInUsername, partnerUsername) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        `participants=${loggedInUsername},${partnerUsername}`, // Query using usernames
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

/**
 * Send a message between two users by their usernames.
 * @param {string} senderUsername - The username of the sender.
 * @param {string} recipientUsername - The username of the recipient.
 * @param {string} text - The message text.
 * @returns {void}
 */
export const sendMessage = async (senderUsername, recipientUsername, text) => {
  if (!text.trim()) return; // Prevent sending empty messages

  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        `participants=${senderUsername},${recipientUsername}`, // Query using usernames
      ]
    );

    let conversationId;
    let updatedMessages;

    if (response.documents.length > 0) {
      // Conversation exists, update it
      conversationId = response.documents[0].$id;
      updatedMessages = [
        ...response.documents[0].messages,
        { sender: senderUsername, text, timestamp: new Date().toISOString() },
      ];

      await databases.updateDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        conversationId,
        { messages: updatedMessages }
      );
    } else {
      // No conversation exists, create a new one
      updatedMessages = [{ sender: senderUsername, text, timestamp: new Date().toISOString() }];

      const newConversation = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        {
          participants: [senderUsername, recipientUsername],
          messages: updatedMessages,
        }
      );

      conversationId = newConversation.$id;
    }

    return conversationId;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

/**
 * Fetch a list of all conversations for a user by username.
 * @param {string} loggedInUsername - The username of the logged-in user.
 * @returns {Array} - List of conversations.
 */
export const fetchConversations = async (loggedInUsername) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        `participants=${loggedInUsername}`, // Query conversations involving the logged-in user
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
