import { useState } from "react";
import axios from "axios";

function OllamaChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { // Flask API URL
        message: message, 
      });

      if (res.data && res.data.response) {
        setResponse(res.data.response); // Display response from backend
      } else {
        setResponse("No response received.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get response from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Ollama Chat</h1>
      <textarea
        rows="4"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
}

export default OllamaChat;
