document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const userMessageInput = document.querySelector("#userMessage");
  const sendMessageButton = document.querySelector("#sendMessage");
  const messagesContainer = document.querySelector(".messages");

  // Ensure the elements are found
  if (!userMessageInput || !sendMessageButton || !messagesContainer) {
    console.error("Error: One or more required elements are missing.");
    return;
  }

  // Function to handle message sending
  const sendMessage = async () => {
    const message = userMessageInput.value.trim();
    
    if (message) {
      // Display the user's message
      displayMessage(message, 'user');

      try {
        // Send the message to the server (using Fetch)
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        // Parse the response from the server
        const data = await response.json();
        if (data && data.reply) {
          // Display the chatbot's reply
          displayMessage(data.reply, 'bot');
        } else {
          console.error("Error: No reply received from the server.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Clear the input after sending the message
      userMessageInput.value = '';
    } else {
      console.log("Input is empty.");
    }
  };

  // Function to display messages in the chat box
  const displayMessage = (message, sender) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Event listener for the send button
  sendMessageButton.addEventListener('click', () => {
    console.log("Send button clicked"); // Debugging click event
    sendMessage();
  });

  // Event listener for 'Enter' key to send message
  userMessageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      console.log("Enter key pressed"); // Debugging enter key event
      sendMessage();
    }
  });
});
