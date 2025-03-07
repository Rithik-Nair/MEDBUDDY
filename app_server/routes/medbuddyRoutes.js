const express = require('express');
const router = express.Router();
const analyzeEmotion = require('../model/sentimentAnalysis');
const History = require('../model/healthDB');

router.post('/analyze', async (req, res) => {
  const { username, text } = req.body;
  const result = await analyzeEmotion(text);
  
  const newHistory = new History({ username, symptoms: text, result });
  await newHistory.save();
  
  res.json({ result });
});

module.exports = router;
