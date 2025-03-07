const axios = require('axios');

async function analyzeEmotion(text) {
  try {
    const res = await axios.post('http://localhost:5000/predict', { text });
    return res.data.emotion;
  } catch (err) {
    return "Error";
  }
}

module.exports = analyzeEmotion;
