import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../utils/messageService";
import "../styles/messages.css";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get partnerUsername from the URL
  const { partnerUsername } = useParams();

  useEffect(() => {
    const getMessages = async () => {
      const messages = await fetchMessages(user.$id, partnerUsername); // Use usernames
      setConversations(messages);
      setLoading(false);
    };

    getMessages();
  }, [user.username, partnerUsername]);

  if (loading) {
    return <p>Loading conversations...</p>;
  }

  return (
    <div className="messages-page">
      <h1>Messages with {partnerUsername}</h1>
      {conversations.length > 0 ? (
        <ul className="conversations-list">
          {conversations.map((conversation) => (
            <li key={conversation.timestamp} className="conversation-item">
              {conversation.text}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-conversations">
          <p>No messages yet. Start a conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
