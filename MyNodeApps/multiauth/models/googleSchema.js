const mongoose = require('mongoose')

const GoogleSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  image: String,
  joinedDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('GoogleUser', GoogleSchema);