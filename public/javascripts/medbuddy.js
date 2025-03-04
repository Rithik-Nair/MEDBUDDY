document.getElementById('sendMessage').addEventListener('click', function() {
    const userMessage = document.getElementById('userMessage').value;
  
    if (userMessage.trim() === "") return; // Don't send empty messages
  
    // Send the message to the server
    fetch('/api/medbuddy/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
      const botMessage = data.response;
      
      // Append the user's message
      const messagesDiv = document.querySelector('.messages');
      const userMessageElement = document.createElement('p');
      userMessageElement.classList.add('user-message');
      userMessageElement.innerText = userMessage;
      messagesDiv.appendChild(userMessageElement);
  
      // Append the bot's response
      const botMessageElement = document.createElement('p');
      botMessageElement.classList.add('bot-message');
      botMessageElement.innerText = botMessage;
      messagesDiv.appendChild(botMessageElement);
      
      // Clear the input field
      document.getElementById('userMessage').value = '';
      
      // Scroll to the bottom of the messages div
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  