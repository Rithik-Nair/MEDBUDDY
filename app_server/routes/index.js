const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');

// MongoDB connection with error handling
mongoose.connect('mongodb+srv://Rithik:RTKA53@myatlasclusteredu.7ci8cvq.mongodb.net/MedBuddy?retryWrites=true&w=majority&appName=myAtlasClusterEDU')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Middleware to automatically pass user data to views
router.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Automatically sends user data to all Pug views
  next();
});

// Render the homepage
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
})

router.get('/mentalHealth', (req, res) => {
  res.render('mentalHealth');
});

// Render home page (only if user is logged in)
router.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  res.render('home'); // No need to pass user manually
});

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Render registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register a new user
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send('User already registered');
    }

    const user = new User({
      name,
      username,
      email,
      password,
    });

    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.send('Error Occurred');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send('Invalid Credentials');
    }

    if (password !== user.password) {
      return res.send('Invalid Credentials');
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };
    res.redirect('/home');
  } catch (err) {
    console.log(err);
    res.send('Error Occurred');
  }
});

// Logout User
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error while logging out');
    }
    res.redirect('/');
  });
});

// Controller for symptom-based prediction
const symptomController = {
  predictCondition: (req, res) => {
    const symptoms = req.body.symptoms; // e.g., 'cough, fever, body pain'
    // Logic to predict condition based on symptoms
    // For now, mock the output
    const condition = 'Flu';
    const medicines = ['Paracetamol', 'Cough Syrup'];

    res.json({
      condition,
      medicines,
      message: 'Suggested medicines for your symptoms'
    });
  }
};

// Controller for mental health analysis
const mentalHealthController = {
  analyzeEmotion: (req, res) => {
    const userInput = req.body.feelings; // e.g., 'I feel anxious and stressed'
    // Perform sentiment analysis and provide mental health insights
    // For simplicity, mock the output
    const analysis = 'Moderate stress detected. Try relaxation techniques like meditation.';
    
    res.json({ analysis });
  }
};

// Controller for health monitoring
const healthMonitorController = {
  trackSymptoms: (req, res) => {
    const symptomData = req.body; // Data about the symptoms
    // Logic to track symptoms and provide alerts
    // For now, mock the output
    const alert = 'Frequent headaches detected. Consult a doctor if symptoms persist.';
    
    res.json({ alert });
  }
};

// Define routes for symptoms
router.post('/predict-condition', symptomController.predictCondition);

// Define routes for mental health analysis
router.post('/analyze', mentalHealthController.analyzeEmotion);

// Define routes for health monitoring
router.post('/track-symptoms', healthMonitorController.trackSymptoms);

module.exports = router;
