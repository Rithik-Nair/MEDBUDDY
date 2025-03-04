from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple chatbot function (basic logic)
def medical_assistant_response(user_message):
    responses = {
        "fever": "It looks like you may have a fever. Please monitor your temperature, and consider seeing a doctor if symptoms persist.",
        "headache": "Headaches can be caused by various factors. Stay hydrated, and if it persists, consult a doctor.",
        "cough": "If you have a persistent cough, it might be a cold or a respiratory infection. You should seek medical advice."
    }
    for symptom, response in responses.items():
        if symptom.lower() in user_message.lower():
            return response
    return "I’m sorry, I didn’t understand that. Could you please provide more details?"

# Route to handle chat
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = medical_assistant_response(user_message)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
