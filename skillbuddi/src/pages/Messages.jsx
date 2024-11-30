import React, { useEffect, useState } from "react";
import { fetchConversations } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import "../styles/messages.css";

const Messages = () => {
  const { user } = useAuth(); // Assumes `user` has a `username` field
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      if (user) {
        const data = await fetchConversations(user.username); // Pass `username` to fetchConversations
        setConversations(data);
      }
      setLoading(false);
    };

    getConversations();
  }, [user]);

  if (loading) {
    return <p>Loading conversations...</p>;
  }

  return (
    <div className="messages-page">
      <h1>Your Conversations</h1>
      {conversations.length > 0 ? (
        <ul className="conversations-list">
          {conversations.map((conversation) => (
            <li key={conversation.conversationId} className="conversation-item">
              <Link to={`/messages/${conversation.partnerUsername}`}>
                Chat with {conversation.partnerUsername}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-conversations">
          <p>You don’t have any conversations yet.</p>
          <p>
            Start a conversation by visiting a user's profile and clicking the
            "Message" button.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
