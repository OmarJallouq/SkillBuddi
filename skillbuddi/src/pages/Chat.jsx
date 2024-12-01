import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { fetchMessages, sendMessage } from "../utils/messageService";
import "../styles/chat.css";

const Chat = () => {
  const { username } = useParams(); // Use username for display
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Fetch messages when the component mounts or when username changes
  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchMessages(user.$id, username);
      setMessages(messagesData);
      setLoading(false);
    };
    getMessages();
  }, [user.$id, username]);

  // Scroll to the bottom of the message list when messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const scrollableDiv = scrollRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      // Send the message to the backend
      await sendMessage(user.$id, username, newMessage);

      // Append the new message optimistically
      setMessages((prev) => [
        ...prev,
        {
          senderId: user.$id,
          message: newMessage, // Match the new backend's structure
          timestamp: new Date().toISOString(), // Add a timestamp for sorting
        },
      ]);

      setNewMessage(""); // Clear the input field
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  if (loading) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="chat-page">
      <h1>Chat with {username}</h1>
      <div ref={scrollRef} className="messages-container">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.senderId === user.$id ? "sent" : "received"
              }`}
            >
              <p>{message.message}</p>
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
          className="message-typer"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSendMessage}>🢂</button>
      </div>
    </div>
  );
};

export default Chat;