const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose');
User = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'UserProfile'
  }
})

// Setting up the passport plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
// module.exports = mongoose.model('UserProfile', UserProfile);