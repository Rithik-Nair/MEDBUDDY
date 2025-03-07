from flask import Flask, request, jsonify
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']
    score = sia.polarity_scores(text)
    
    if score['compound'] >= 0.5:
        emotion = "Happy"
    elif score['compound'] <= -0.3:
        emotion = "Depressed"
    else:
        emotion = "Neutral"
    
    return jsonify({"emotion": emotion})

if __name__ == '__main__':
    app.run(debug=True)
