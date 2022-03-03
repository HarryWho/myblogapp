const { validationResult, matchedData } = require('express-validator');

const UserDetails = require('../models/user');
module.exports = {
  userForm: function(req, res) {
    res.render('home/register');
  },
  validateForm: function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errMsg = errors.mapped();
      var inputData = matchedData(req);

    } else {
      var inputData = matchedData(req);
      // insert query will be written here
      try {
        UserDetails.register({ username: req.body.username, email: req.body.email, active: false }, req.body.password);
        // user.save();
        req.flash('success_msg', "Registration successfully created. You can now Login")
        res.redirect('/login');
      } catch (err) {
        req.flash('error_msg', 'Soemthign went wrong')
        res.render('home/register', { errors, errMsg, inputData: inputData })
      }
    }
    res.render('home/register', { errors: errMsg, inputData: inputData });
  }
}