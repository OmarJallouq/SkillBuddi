import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";
//import "../styles/chat.css";

const Chat = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetchMessages(user.$id, username);
      setMessages(data);
      setLoading(false);
    };

    getMessages();
  }, [user.$id, username]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(user.$id, username, newMessage);
      setMessages((prev) => [
        ...prev,
        { senderId: user.$id, text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  if (loading) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="chat-page">
      <h1>Chat with {username}</h1>
      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.senderId === user.$id ? "sent" : "received"
              }`}
            >
              {message.text}
            </div>
          ))
        ) : (
          <div className="no-messages">
            <p>No messages yet. Say hello to start the conversation!</p>
          </div>
        )}
      </div>
      <div className="message-input-container">
        <input
          type="text"
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