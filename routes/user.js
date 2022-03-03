const express = require('express')
const router = express.Router()

router.get('/profile/:id', (req, res) => {
  res.send(req.params.id)
})


module.exports = router;