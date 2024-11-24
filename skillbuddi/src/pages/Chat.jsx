import React, { useState } from "react";

const Chat = ({ partnerName }) => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [inputMessage, setInputMessage] = useState(""); // Input field message

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // User's message
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]); // Update messages
    setInputMessage(""); // Clear the input

    // Simulate a response from the partner
    setTimeout(() => {
      const replyMessage = {
        id: messages.length + 2,
        text: `Hi! This is ${partnerName}.`,
        sender: partnerName,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 1000); // Simulate a delay of 1 second
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatHeader}>Chat with {partnerName}</div>

      <div style={styles.chatBox}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              style={
                message.sender === "You"
                  ? styles.messageUser1
                  : styles.messageUser2
              }
            >
              <span style={styles.messageText}>{message.text}</span>
              <span style={styles.messageTime}>{message.timestamp}</span>
            </div>
          ))
        ) : (
          <p style={styles.noMessages}>No messages yet. Start the conversation!</p>
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  chatHeader: {
    padding: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#40E0D0",
    color: "#fff",
  },
  chatBox: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
  },
  noMessages: {
    textAlign: "center",
    color: "#888",
    marginTop: "20px",
  },
  messageUser1: {
    alignSelf: "flex-start",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#40E0D0",
    borderRadius: "10px",
    color: "#fff",
    maxWidth: "60%",
  },
  messageUser2: {
    alignSelf: "flex-end",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#007BFF",
    borderRadius: "10px",
    color: "#fff",
    maxWidth: "60%",
  },
  messageText: {
    display: "block",
    fontSize: "14px",
  },
  messageTime: {
    display: "block",
    fontSize: "10px",
    textAlign: "right",
    marginTop: "5px",
    color: "#ddd",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#40E0D0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chat;
