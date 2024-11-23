import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const { partnerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      if (user) {
        const fetchedMessages = await fetchMessages(user.$id, partnerId);
        setMessages(fetchedMessages);
      }
    };
    loadMessages();
  }, [user, partnerId]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage(user.$id, partnerId, newMessage);
      setMessages((prev) => [...prev, { senderId: user.$id, text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Chat with {partnerId}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.senderId === user.$id ? "right" : "left" }}>
            {msg.text}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
