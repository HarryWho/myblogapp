const express = require('express')
const User = require('../models/user')
const router = express.Router();

const errorMessages = []

router.get('/', (req, res) => {
  res.render('home/index')
})

router.get('/login', (req, res) => {
  console.log(req.user);
  res.render('home/login')
})

router.get('/welcome', (req, res) => {
  res.render('home/welcome')
})
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get("/register", (req, res) => {
  res.render('home/register')
})

router.post('/register', async(req, res) => {
  FormIsValid(req)
  if (errorMessages.length > 0) {
    req.flash('success_msg', "Success")
    res.redirect('/');
  }


})

function FormIsValid(req) {
  if (req.username == "" || req.email == null || req.password == '' || req.password2 == '') {
    errorMessages.push("Please fill in all fields")
  }

}

module.exports = router;