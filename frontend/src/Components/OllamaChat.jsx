import { useState, useEffect, useRef } from "react";
import axios from "axios";
import bobImg from '../Assets/Bob.png';
import userImg from '../Assets/user.png';
import { useNavigate } from "react-router-dom"; // Import for navigation
//import '../Styles/normalize.css';
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
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });

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
    <div className="ollama-chat-page"> {/* Scoped class to prevent global styles */}
    <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <div className="chatbox">
        <div className="chatlog" ref={chatLogRef}>
          {chatlog.map((message, index) => 
            <ChatMessage key={index} message={message}/>
          )}
        </div>
        <div className="chatbox-holder">
          <form onSubmit={handleSubmit}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatbox-text"
              placeholder="Type your message here"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "Ollama" ? "llm" : ""}`}>
      <div className="chat-message-center">
        <div 
          className={`avatar ${message.user === "Ollama" ? "llm" : "user"}`} 
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

        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default OllamaChat;