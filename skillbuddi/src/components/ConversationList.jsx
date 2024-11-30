import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchConversations } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth(); // Assumes `user` has a `username` field
  const navigate = useNavigate();

  useEffect(() => {
    const loadConversations = async () => {
      if (user) {
        const response = await fetchConversations(user.username); // Pass `username` to fetchConversations
        setConversations(response);
      }
    };
    loadConversations();
  }, [user]);

  return (
    <div>
      <h1>Your Conversations</h1>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.conversationId}
            onClick={() => navigate(`/messages/${conversation.partnerUsername}`)} // Use `partnerUsername` in the URL
            style={{ cursor: "pointer" }}
          >
            {conversation.partnerUsername} {/* Display the partner's username */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
