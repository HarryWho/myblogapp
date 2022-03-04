const express = require('express');
const { redirect } = require('express/lib/response');

const router = express.Router();

const passport = require('passport');

// const req = require('express/lib/request');
const userController = require('./../middleware/user-controler');
const validationRule = require('./../middleware/validation-rules');


router.get('/', (req, res) => {

  if (req.user == undefined) {
    res.render('home/index')
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


router.post('/register', validationRule.form, userController.validateForm, (req, res, next) => {

})


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successReturnToOrRedirect: '/',
}))

module.exports = router;