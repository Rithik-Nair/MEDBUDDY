exports.analyze = (inputText) => {
    // Simple mock logic for sentiment analysis
    if (inputText.includes('stress') || inputText.includes('anxious')) {
        return 'negative'; // Negative sentiment
    }
    return 'positive'; // Positive sentiment
};
