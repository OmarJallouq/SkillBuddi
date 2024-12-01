/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConversations } from "../utils/messageService"; // Import your message service function
import { useAuth } from "../utils/AuthContext"; // Use the auth context to get logged-in user

const ConversationList = () => {
  const { user } = useAuth(); // Get the current logged-in user
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Redirect to login if the user is not logged in
      window.location.href = "/login";
      return;
    }

    // Fetch all conversations for the logged-in user
    const loadConversations = async () => {
      const conversationsData = await fetchConversations(user.$id);
      setConversations(conversationsData);
      setLoading(false);
    };

    loadConversations();
  }, [user]);

  if (loading) {
    return <p>Loading your conversations...</p>;
  }

  return (
    <div>
      <h1>Your Conversations</h1>
      <ul>
        {conversations.length === 0 ? (
          <p>You have no conversations yet.</p>
        ) : (
          conversations.map((conversation) => (
            <li key={conversation.conversationId}>
              <Link to={`/messages/${conversation.participants[0] === user.$id ? conversation.participants[1] : conversation.participants[0]}`}>
                <div>
                  <p>Conversation with {conversation.participants[0] === user.$id ? conversation.participants[1] : conversation.participants[0]}</p>
                  <p>Last message: {conversation.lastMessage?.message || "No messages yet"}</p>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ConversationList;*/
