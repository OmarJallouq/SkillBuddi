import React, { useState } from "react";
import "../styles/Messaging.css";

const Messaging = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="messaging-container">
      <div className="messages-box">
        <h2>Messages</h2>
        <div className="messages-list">
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))
          )}
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="send-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Messaging;
