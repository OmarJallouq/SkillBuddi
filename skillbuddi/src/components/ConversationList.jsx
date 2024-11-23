import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchConversations } from "../utils/messageService";
import { useAuth } from "../utils/AuthContext";

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadConversations = async () => {
      if (user) {
        const response = await fetchConversations(user.$id);
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
            key={conversation.id}
            onClick={() => navigate(`/chat/${conversation.partnerId}`)}
            style={{ cursor: "pointer" }}
          >
            {conversation.partnerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
