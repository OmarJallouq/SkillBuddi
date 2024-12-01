import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage } from "../utils/messageService";
import client, { DATABASE_ID, MESSAGES_COLLECTION_ID } from "../appwriteConfig";
import "../styles/messages.css";

const Chat = () => {
  const { user } = useAuth();
  const { userid } = useParams(); // Partner's user ID
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchMessages(user.$id, userid);
      setMessages(messagesData);
    };

    getMessages();

    // Real-time subscription
    const unsubscribe = client.subscribe(
      [`databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`],
      (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          const messageData = response.payload;
          if (
            (messageData.senderId === user.$id && messageData.receiverId === userid) ||
            (messageData.senderId === userid && messageData.receiverId === user.$id)
          ) {
            setMessages((prevMessages) => [...prevMessages, messageData]);
          }
        }
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user.$id, userid]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(user.$id, userid, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="messages-page">
      <h1>Messages with {userid}</h1>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === user.$id ? "sent" : "received"}`}>
            <p>{msg.message}</p>
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
