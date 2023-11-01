const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  email: String,
  avatar: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);