const mongoose = require('mongoose')

userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic'
  },
  isValidated: {
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model('User', userSchema);