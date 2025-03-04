document.addEventListener('DOMContentLoaded', function () {
    const sendMessageBtn = document.getElementById('sendMessage');
    const userMessageInput = document.getElementById('userMessage');
    const messagesContainer = document.querySelector('.messages');

    // Event listener for sending messages
    sendMessageBtn.addEventListener('click', function () {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user');  // Append user message to chat
            userMessageInput.value = ''; // Clear the input field

            // Simulate a response from the chatbot
            setTimeout(function () {
                const botResponse = generateBotResponse(userMessage);
                appendMessage(botResponse, 'bot'); // Append bot's response to chat
            }, 1000); // Delay for chatbot response
        }
    });

    // Function to append a new message
    function appendMessage(message, sender) {
        const messageElement = document.createElement('p');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.innerText = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the latest message
    }

    // Function to generate bot's response
    function generateBotResponse(userMessage) {
        // Basic responses, can be extended later
        if (userMessage.toLowerCase().includes('flu')) {
            return 'It seems like you have the flu. I recommend taking Paracetamol and staying hydrated.';
        } else if (userMessage.toLowerCase().includes('stress')) {
            return 'You seem stressed. Try deep breathing exercises and meditation to relax.';
        } else {
            return 'I’m here to assist you. Could you please provide more details?';
        }
    }
});
