const express = require('express');
const router = express.Router();

// Predefined responses (you can later enhance this with AI or dynamic responses)
const chatbotResponses = {
  "hi": "Hello! How can I assist you today?",
  "hello": "Hi there! What can I help you with?",
  "help": "I am MedBuddy, your assistant. How can I help you today?",
  "default": "I'm sorry, I didn't understand that. Can you please ask something else?"
};

// POST route to handle chatbot messages
router.post('/api/medbuddy/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase(); // Get the user's message and convert to lowercase

  // Generate bot response based on predefined messages
  let botResponse = chatbotResponses[userMessage] || chatbotResponses["default"];

  // Send the bot's response back to the client
  res.json({ response: botResponse });
});

module.exports = router;
