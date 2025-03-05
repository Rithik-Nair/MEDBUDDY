var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
var indexRouter = require('./app_server/routes/index.js');
var usersRouter = require('./app_server/routes/users.js');
const chatbotRouter = require('./app_server/routes/chatbot.js'); // Correct path
const medbuddyRoutes = require('./app_server/routes/medbuddyRoutes'); // Corrected path

// Initialize the app
var app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
  secret: 'medbuddy',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(chatbotRouter); // Use chatbot routes
app.use('/api/medbuddy', medbuddyRoutes); // Add medbuddy routes

// Route for handling chatbot messages
app.post('/api/chatbot', (req, res) => {
  const userMessage = req.body.message;

  // Here, you can integrate chatbot logic or an API call to process the user's message
  // For now, let's just echo the user's message with a placeholder reply.
  console.log("User message:", userMessage);

  // Simple response
  const botReply = `Bot: I received your message: "${userMessage}"`;

  // Send the response back to the client
  res.json({ reply: botReply });
});

// Health check API endpoint
app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve the MedBuddy chat page
app.get('/medbuddy', (req, res) => {
  res.render('medbuddy');
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error';

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
