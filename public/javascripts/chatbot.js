import React, { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log(message); // Placeholder for actual chatbot logic
    setMessage(""); // Clear the input after sending
  };

  return (
    <div>
      <h5>Chat with MedBuddy</h5>
      <p>I'm here to help with your health and wellness journey.</p>
      <textarea
        className="form-control"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <button className="btn btn-primary" type="button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
