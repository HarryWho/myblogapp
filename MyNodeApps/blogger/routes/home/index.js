const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

router.get('/', (req, res) => {
  console.log(req.user)
  res.render("home/index")
})

router.get('/welcome', ensureAuth, (req, res) => {
  res.render('home/welcome', { user: req.user })
})
module.exports = router;