const express = require('express')

const router = express.Router();

const passport = require('passport');

// const req = require('express/lib/request');
const userController = require('./user-controler');
const validationRule = require('./validation-rules');
let errorMessages = []

router.get('/', (req, res) => {

  if (req.user == undefined) {
    res.render('home/index', { user: req.user })
  } else {
    res.render('home/welcome', { user: req.user })
  }
})

router.get('/login', (req, res) => {

  res.render('home/login')
})


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/register', userController.userForm)


router.post('/register', validationRule.form, userController.validateForm)


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successReturnToOrRedirect: '/',
}))

module.exports = router;