const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../../models/user')
const Profile = require('../../models/profile');


router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render('user/user', { user: req.user })
})

router.get('/profile/:id', connectEnsureLogin.ensureLoggedIn('/login'), async(req, res) => {
  try {
    const profile = await User.findById(req.params.id).populate('userId')

    console.log(profile)
    res.render('user/userprofile', { inputData: profile })
  } catch (err) {
    console.log(`Error: ${err}`)
    req.flash('error_msg', `${err}`)
    res.redirect('/user')
  }
})

router.get('/profile/add', (req, res) => {
  res.render('user/profile')
})
router.post('/profile', async(req, res) => {
  const profile = await new Profile(req.body);
  profile.save()
  res.redirect('/user');
})
module.exports = router;