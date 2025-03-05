const express = require('express');
const router = express.Router();
// app_server/routes/chatbot.js (Express route)
router.post('/sendMessage', (req, res) => {
    // Your logic for handling the message
    res.json({ message: 'Message received' });
  });
  
// Route to handle chatbot messages (if needed for API)
router.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;

    // Generate a simple response based on the message
    let botResponse = 'I’m here to assist you. Could you please provide more details?';

    if (userMessage.toLowerCase().includes('flu')) {
        botResponse = 'It seems like you have the flu. I recommend taking Paracetamol and staying hydrated.';
    } else if (userMessage.toLowerCase().includes('stress')) {
        botResponse = 'You seem stressed. Try deep breathing exercises and meditation to relax.';
    }

    res.json({ reply: botResponse });
});

module.exports = router;
