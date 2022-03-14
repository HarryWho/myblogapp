const express = require('express')
const config = require('dotenv')
const ejsLayouts = require('express-ejs-layouts')
const app = express()

// config file
config.config({ path: './config/config.env' })

// set up ejs

app.set('layout', 'layouts/layout')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// setup Routes
app.use('/', require('./controllers/home/home'))
app.use('/user', require('./controllers/user/user'))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})