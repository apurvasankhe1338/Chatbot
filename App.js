import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleMessageSubmit = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      
      try {
        // Send the user's message to the backend
        const response = await axios.post('http://localhost:5000/message', { text: input });
        setMessages([...newMessages, { sender: 'bot', text: response.data.text }]);
      } catch (error) {
        console.error("Error communicating with the backend:", error);
      }
      
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default App;