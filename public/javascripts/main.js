document.addEventListener('DOMContentLoaded', () => {
    const sendMessageButton = document.getElementById('sendMessage');
    const userMessageInput = document.getElementById('userMessage');
    const messagesContainer = document.querySelector('.messages');

    // Open chatbot modal when the button is clicked
    document.getElementById('chatbotBtn').addEventListener('click', () => {
        $('#chatbotModal').modal('show');
    });

    sendMessageButton.addEventListener('click', async () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            // Show the user's message
            const userMessageElement = document.createElement('p');
            userMessageElement.classList.add('user-message');
            userMessageElement.innerText = userMessage;
            messagesContainer.appendChild(userMessageElement);

            // Send the message to the Flask API
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();

            // Show the chatbot's response
            const botMessageElement = document.createElement('p');
            botMessageElement.classList.add('bot-message');
            botMessageElement.innerText = data.response;
            messagesContainer.appendChild(botMessageElement);

            // Clear the input field
            userMessageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
    });
});
