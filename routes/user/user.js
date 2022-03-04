const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../../models/user')
const Profile = require('../../models/profile');


router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render('user/user', { user: req.user })
})

router.get('/profile/add', (req, res) => {

  res.render('user/profile', { inputData: new Profile(), user: req.user })
})

router.get('/profile/:id', connectEnsureLogin.ensureLoggedIn('/login'), async(req, res) => {

  try {
    const profile = await User.findOne({ id: req.params.id }).populate({
      path: 'userId',
      model: "UserProfile"
    });
    console.log(profile)
    res.render('user/userprofile', { inputData: profile, user: req.user })
  } catch (err) {
    console.log(`Error: ${err}`)
    req.flash('error_msg', `${err}`)
    res.redirect('/user')
  }
})



router.post('/profile', async(req, res) => {
  let profile = await new Profile({
    userId: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    about: req.body.about
  });
  try {
    profile.save()
    await User.findByIdAndUpdate({ _id: req.user.id }, { userId: profile._id });
    res.redirect('/user');
  } catch (err) {
    req.flash('error_msg', "Something went wrong")
    res.render('user/profile', { inputData: profile, user: req.user })
  }

})
module.exports = router;