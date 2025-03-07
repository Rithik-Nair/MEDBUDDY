document.getElementById("send-btn").onclick = function () {
    const userInput = document.getElementById("user-input").value;
    const chatDisplay = document.getElementById("chat-display");
  
    if (userInput.trim() !== "") {
      const userMessage = `<p class="user-message">You: ${userInput}</p>`;
      chatDisplay.innerHTML += userMessage;
  
      setTimeout(() => {
        const botReply = `<p class="system-message">MedBuddy: I am still learning. Please wait...</p>`;
        chatDisplay.innerHTML += botReply;
      }, 1000);
  
      document.getElementById("user-input").value = "";
    }
  };
  