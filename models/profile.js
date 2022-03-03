const mongoose = require('mongoose')

const UserProfile = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  about: {
    type: String
  }


});

module.exports = mongoose.model('UserProfile', UserProfile)


module.exports = mongoose.model('UserProfile', UserProfile)