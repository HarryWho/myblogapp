const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../../models/user')

router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render('user/user', { user: req.user })
})

router.get('/profile/:id', connectEnsureLogin.ensureLoggedIn('/login'), async(req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render('user/profile', { user: user })
  } catch (err) {
    console.log(err.message);
    req.flash('error_msg', "Something went wrong")
    res.redirect('/user')
  }
})



module.exports = router;