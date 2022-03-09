var express = require('express');
const passport = require('passport');
const { ensureGuest } = require('../../middleware/auth');
var router = express.Router();

router.get('/login', ensureGuest, function(req, res, next) {
  res.render('auth/login');
});

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/');
})
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/welcome');
});

module.exports = router;