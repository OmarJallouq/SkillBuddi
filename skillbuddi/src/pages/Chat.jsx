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

  // Fetch messages whenever the conversation changes
  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchMessages(user.$id, userid); // Fetch messages
      setMessages(messagesData);
    };

    getMessages();
  }, [user.$id, userid]); // Refetch when user or partner changes

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(user.$id, userid, newMessage); // Send the message
      setNewMessage(""); // Clear the input field

      // Re-fetch messages after sending
      const updatedMessages = await fetchMessages(user.$id, userid);
      setMessages(updatedMessages);
    }
  };

  return (
    <div className="messages-page">
      <h1>Chat with {userid}</h1>

      <div className="messages-list">
        {messages.map((msg) => (
          <div
            key={msg.$id}
            className={`message ${
              msg.senderId === user.$id ? "sent" : "received"
            }`}
          >
            <p>{msg.message}</p> {/* Use 'msg.message' for the text */}
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
