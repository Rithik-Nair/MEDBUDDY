const healthBot = {
    hello: "Hello! I am MedBuddy. How can I assist you?",
    headache: "You can take Paracetamol or Crocin for headaches.",
    fever: "Drink plenty of fluids and take Paracetamol if necessary.",
    cough: "Take cough syrup and drink warm water frequently.",
    covid: "Isolate yourself and consult a doctor immediately.",
    bye: "Goodbye! Take care ❤️",
  };
  
  function getBotResponse(input) {
    input = input.toLowerCase();
    for (let key in healthBot) {
      if (input.includes(key)) {
        return healthBot[key];
      }
    }
    return "Sorry, I am not trained for this question.";
  }
  