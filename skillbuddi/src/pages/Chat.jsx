import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../utils/messageService";
import "../styles/messages.css";

const Chat = () => {
  const { user } = useAuth();
  const { userid } = useParams(); // Get partner's user ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages whenever user or recipient changes
  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchMessages(user.$id, userid); // Fetch messages using user IDs
      setMessages(messagesData);
    };

    getMessages();
  }, [user.$id, userid]); // Reload when user or recipient changes

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(user.$id, userid, newMessage); // Send message
      setNewMessage(""); // Clear input field

      // Re-fetch messages to include the new message
      const updatedMessages = await fetchMessages(user.$id, userid);
      setMessages(updatedMessages); // Update the state with the new messages
    }
  };

  return (
    <div className="messages-page">
      <h1>Messages with {userid}</h1>
      
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === user.$id ? "sent" : "received"}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <div className="message-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
