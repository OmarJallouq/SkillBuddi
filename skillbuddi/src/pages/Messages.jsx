import React, { useEffect, useState } from "react";
import { fetchConversations } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import "../styles/messages.css";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      const data = await fetchConversations(user.$id);
      setConversations(data);
      setLoading(false);
    };

    getConversations();
  }, [user.$id]);

  if (loading) {
    return <p>Loading conversations...</p>;
  }

  return (
    <div className="messages-page">
      <h1>Your Conversations</h1>
      {conversations.length > 0 ? (
        <ul className="conversations-list">
          {conversations.map((conversation) => (
            <li key={conversation.id} className="conversation-item">
              <Link to={`/message/${conversation.partnerName}`}>
                Chat with {conversation.partnerName}
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
