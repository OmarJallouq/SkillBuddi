import { databases } from "../appwriteConfig"; // Import your Appwrite configuration
import { ID, Query } from "appwrite";

// Constants
const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION;

/**
 * Fetch messages between two users by their user IDs.
 * @param {string} loggedInUserId - The ID of the logged-in user.
 * @param {string} partnerUserId - The ID of the conversation partner.
 * @returns {Array} - List of messages.
 */
export const fetchMessages = async (loggedInUserId, partnerUserId) => {
  try {
    // Fetch messages where the logged-in user is the sender and the partner is the receiver
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", loggedInUserId),
        Query.equal("receiverId", partnerUserId),
        Query.orderAsc("timestamp"),
      ]
    );

    const senderMessages = response.documents;

    // Fetch messages where the partner is the sender and the logged-in user is the receiver
    const receiverMessages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", partnerUserId),
        Query.equal("receiverId", loggedInUserId),
        Query.orderAsc("timestamp"),
      ]
    );

    const allMessages = [...senderMessages, ...receiverMessages].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    return allMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

/**
 * Send a message between two users.
 * @param {string} senderId - The ID of the sender.
 * @param {string} receiverId - The ID of the receiver.
 * @param {string} message - The message content.
 * @returns {void}
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

    console.log("Message sent:", response);

    return response; // Return the response, which is the new message document
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

/**
 * Fetch all conversations for a user by user ID.
 * @param {string} loggedInUserId - The ID of the logged-in user.
 * @returns {Array} - List of conversations.
 */
export const fetchConversations = async (loggedInUserId) => {
  try {
    // Query the documents where the logged-in user is either the sender or receiver
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal("senderId", loggedInUserId),
        Query.equal("receiverId", loggedInUserId),
        Query.orderDesc("timestamp"), // Sort by the latest message
      ]
    );

    const conversations = [];
    const uniqueParticipants = new Set();

    // Iterate through all documents and organize them by conversation
    response.documents.forEach((message) => {
      const otherUserId = message.senderId === loggedInUserId ? message.receiverId : message.senderId;

      if (!uniqueParticipants.has(otherUserId)) {
        conversations.push({
          conversationId: message.$id,
          participants: [loggedInUserId, otherUserId],
          lastMessage: message,
        });
        uniqueParticipants.add(otherUserId);
      }
    });

    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};
