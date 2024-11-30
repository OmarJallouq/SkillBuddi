import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../utils/messageService";
import "../styles/messages.css";

const Chat = () => {
  const { user } = useAuth();
  const { userid } = useParams(); // Get the other user's ID from URL
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      const messagesData = await fetchMessages(user.$id, userid); // Fetch messages for the conversation
      setMessages(messagesData);
      setLoading(false);
    };

    loadMessages();
  }, [user.$id, userid]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await sendMessage(user.$id, userid, messageText); // Send the message
      setMessageText(""); // Clear input field
      // Reload messages after sending
      const updatedMessages = await fetchMessages(user.$id, userid);
      setMessages(updatedMessages);
    }
  };

  if (loading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div className="chat-page">
      <h1>Chat with {userid}</h1>
      <div className="messages-container">
        {messages.length > 0 ? (
          <ul className="messages-list">
            {messages.map((msg) => (
              <li key={msg.timestamp} className="message-item">
                <p>{msg.text}</p>
                <span>{new Date(msg.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>
      <div className="message-input">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
