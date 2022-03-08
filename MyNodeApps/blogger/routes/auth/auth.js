var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;