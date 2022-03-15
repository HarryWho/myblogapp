const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
require('../../config/local_passport')

const { ensureGuest, verifyForm } = require('../../middleware/ensureAuth');
const User = require('../../models/googleSchema');

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.post('/register', ensureGuest, async(req, res, next) => {
  let errors = []
  await verifyForm(req.body, async(errors) => {

    if (errors.length > 0) {
      console.log(errors)
      res.render('home/register', { form: req.body, errors: errors });
      return next()
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
      const newUser = {
        displayName: req.body.displayName,
        firstName: '',
        lastName: '',
        email: req.body.email,
        password: hashPassword
      }
      try {
        const user = new User(newUser)
        user.save()
        res.redirect('/')
      } catch (error) {
        console.log(error)
        res.redirect('/')
      }

    }
  })

})

module.exports = router;