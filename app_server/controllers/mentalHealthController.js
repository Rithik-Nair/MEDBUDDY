const { detectSentiment } = require('../model/aiModel');

exports.analyzeMentalHealth = async (req, res) => {
    const { message } = req.body;
    try {
        const sentiment = await detectSentiment(message);
        res.json({ sentiment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};