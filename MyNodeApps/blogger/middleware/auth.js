module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/login')
    }
  },
  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/welcome')
    } else {
      return next()
    }
  }
}