import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { databases } from "../appwriteConfig"; // Appwrite setup
import { ID } from "appwrite";

const ChatPage = () => {
  const { userId } = useParams(); // ID of the user being messaged
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const fetchOrCreateConversation = async () => {
      try {
        // Replace with your database and collection IDs
        const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION;

        // Fetch conversations involving the logged-in user and the recipient
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          `participants=${userId},${localStorage.getItem("loggedInUserId")}`, // Adjust based on your schema
        ]);

        if (response.documents.length > 0) {
          setConversationId(response.documents[0].$id); // Use existing conversation ID
          setMessages(response.documents[0].messages || []);
        } else {
          // Create a new conversation if none exists
          const newConversation = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
              participants: [userId, localStorage.getItem("loggedInUserId")],
              messages: [],
            }
          );
          setConversationId(newConversation.$id);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching or creating conversation:", error);
      }
    };

    fetchOrCreateConversation();
  }, [userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages
    try {
      // Add the message to the conversation
      const updatedMessages = [...messages, { sender: "me", text: newMessage }];
      setMessages(updatedMessages);

      // Update the conversation in Appwrite
      const DATABASE_ID = `${process.env.REACT_APP_APPWRITE_DATABASE}`;
      const COLLECTION_ID = `${process.env.REACT_APP_APPWRITE_MESSAGES}`;
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, conversationId, {
        messages: updatedMessages,
      });

      setNewMessage(""); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Chat with {userId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
            {msg.text}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
