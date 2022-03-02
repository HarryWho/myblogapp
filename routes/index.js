const express = require('express')
const User = require('../models/user')
const router = express.Router();

let errorMessages = []

router.get('/', (req, res) => {
  res.render('home/index')
})

router.get('/login', (req, res) => {
  console.log(req.user);
  res.render('home/login', { errorMessages })
})

router.get('/welcome', (req, res) => {
  res.render('home/welcome')
})
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get("/register", (req, res) => {
  res.render('home/register', { regFields: new User(), errorMessages: errorMessages })
})

router.post('/register', async(req, res) => {

  const { username, email, password, password2 } = req.body;
  const regFields = {
    username: username,
    email: email,
    password: password,
    password2: password2
  }
  errorMessages = []

  FormIsValid(regFields, errorMessages)

  if (errorMessages.length > 0) {

    res.render('home/register.ejs', { regFields: regFields, errorMessages: errorMessages });
  }
  try {
    const user = await new User(req.body)
    user.save();
    req.flash('success_msg', "Registration successfully created. You can now Login")
    res.redirect('/login');
  } catch (err) {
    req.flash('error_msg', 'Soemthign went wrong')
    res.render('home/register', { regFields: regFields })
  }


})

function FormIsValid(regFields, errorMessages) {
  if (regFields.username.trim() == "" || regFields.email.trim() == "" || regFields.password.trim() == "" || regFields.password2.trim() == "") {
    errorMessages.push("Please fill in all required Fields")
  }
  if (!email_validator(regFields.email.trim())) {
    errorMessages.push("Email is Invalide")
  }
  if (regFields.password.trim().length < 6) {
    errorMessages.push("Password must be at least 6 characters long")
  }
  if (regFields.password.trim() != regFields.password2.trim()) {
    errorMessages.push("Passwords do not match")
  }

}

function email_validator(my_email) {
  var email_pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if (email_pattern.test(my_email)) {
    return true;
  } else {
    return false;
  }
}
module.exports = router;