const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Method to compare entered password with stored password
userSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;  // Compare plain text passwords
};

module.exports = mongoose.model('User', userSchema);
