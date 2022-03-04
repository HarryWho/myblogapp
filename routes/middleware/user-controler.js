const { validationResult, matchedData } = require('express-validator');

const UserDetails = require('../../models/user/user');
const UserProfile = require('../../models/user/profile')
module.exports = {
  userForm: function(req, res) {
    res.render('home/register');
  },
  validateForm: async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errMsg = errors.mapped();
      var inputData = matchedData(req);
      res.render('home/register', { errors: errMsg, inputData: inputData });
    } else {
      var inputData = matchedData(req);
      // insert query will be written here
      try {
        await UserDetails.register({ username: inputData.username, email: inputData.email }, req.body.password)
        req.flash('success_msg', "Congratulations. You can now Login")
        res.redirect('/login');
      } catch (err) {
        req.flash('error_msg', 'Soemthign went wrong')
        res.render('home/register', { errors, errMsg, inputData: inputData })
      }
    }

  }
}