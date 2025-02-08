import './normalize.css';
import './App.css';
import { useState } from 'react';


function App() {

  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([{
    user: "Bob",
    message: "How can I help you today?"
  },{
    user: "Me",
    message: "I want to FARM! today"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatlog, { user: "me", message: `${input}`}]);
    setInput("");
    // FETCH RESPONSE FROM API and COMBINE with array of messages
    const response = await fetch("http://localhost:3000", { //CHANGE TO CORRECT LISTENING PORT
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: chatlog.map((message) => message.message).join("")
      })
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
      <aside className="sideMenu">
        <div className="sideMenu-button">
          <span> + </span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chatlog"> 
          {chatlog.map((message, index) => 
          <ChatMessage key={index} message={message}/>)}
          

          
        </div>
        <div className="chatbox-holder">
          <form onSubmit={handleSubmit}>
            <input 
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chatbox-text"
            placeholder="Type your message here">
            </input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message ${message.user === "Bob" && "llm"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "Bob" && "llm"}`}>
        
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
