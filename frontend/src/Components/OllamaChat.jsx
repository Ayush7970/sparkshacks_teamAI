import { useState, useEffect, useRef } from "react";
import axios from "axios";
import bobImg from '../Assets/Bob.png';
import userImg from '../Assets/user.png';
import { useNavigate } from "react-router-dom";
import '../Styles/Ollama.css';

function OllamaChat() {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([
    { user: "Ollama", message: "Hello! How can I help you today? 😊" }
  ]);

  const chatLogRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { user: "Me", message: input };
    setChatLog((prevChatLog) => [...prevChatLog, newUserMessage]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });
      if (response.data && response.data.response) {
        const ollamaMessage = { user: "Ollama", message: response.data.response };
        setChatLog((prevChatLog) => [...prevChatLog, ollamaMessage]);
      } else {
        console.error("No response received from Ollama.");
      }
    } catch (error) {
      console.error("Error fetching response from Ollama:", error);
    }
  }

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatlog]);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#e48f0f",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "absolute", /* Fixes white space */
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden"
    }}>
      {/* Back Button (Inside yellow background) */}
      <button
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 14px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
          zIndex: 10
        }}
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {/* Chatbox */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "65vw",
        height: "85vh",
        backgroundColor: "#e48f0f",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)",
        position: "relative"
      }}>
        <div ref={chatLogRef} style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "20px",
          padding: "20px"
        }}>
          {chatlog.map((message, index) => <ChatMessage key={index} message={message} />)}
        </div>

        {/* Input Box */}
        <div style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#e48f0f",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here"
              style={{
                backgroundColor: "#dbbd95",
                width: "95%",
                padding: "15px",
                color: "black",
                fontSize: "1.3em",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)"
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div style={{
      padding: "12px 20px",
      marginBottom: "30px",
      marginLeft: "70px",
      borderRadius: "12px",
      maxWidth: "85%",
      display: "flex",
      alignItems: "flex-start",
      backgroundColor: message.user === "Ollama" ? "#d08412" : "#f5f5f5",
      alignSelf: message.user === "Ollama" ? "flex-start" : "flex-end"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        maxWidth: "720px",
        margin: "auto",
        gap: "12px"
      }}>
        <div
          style={{
            backgroundImage: `url(${message.user === "Ollama" ? bobImg : userImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            flexShrink: 0
          }}>
        </div>
        <div style={{
          padding: "10px",
          borderRadius: "8px",
          color: "black",
          fontSize: "1rem",
          fontFamily: message.user === "Ollama" ? "'Times New Roman', " : "Arial, sans-serif",
          fontStyle: message.user === "Ollama" ? "italic" : "normal"
        }}>
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default OllamaChat;
