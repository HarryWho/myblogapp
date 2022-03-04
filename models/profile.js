const mongoose = require('mongoose')

const UserProfile = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectID,
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
  //module.exports = mongoose.model('User', User)