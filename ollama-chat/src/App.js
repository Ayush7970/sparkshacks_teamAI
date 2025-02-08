import './normalize.css';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([
    { user: "Ollama", message: "Hello! How can I help you today? 😊" }
  ]);

  const chatLogRef = useRef(null); // Reference to chatlog container

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

  // Scroll to the latest message whenever chatlog updates
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatlog]);

  return (
    <div className="App">
      <section className="chatbox">
        <div className="chatlog" ref={chatLogRef}> 
          {chatlog.map((message, index) => 
            <ChatMessage key={index} message={message}/>
          )}
        </div>
        <div className="chatbox-holder">
          <form onSubmit={handleSubmit}>
            <input 
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatbox-text"
              placeholder="Type your message here"
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "Ollama" && "llm"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "Ollama" && "llm"}`}>
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default App;
