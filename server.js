// import required modules
require('dotenv').config()
require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

// create app server
const app = express()

// set the static public folder
app.use(express.static('public'))

// set up ejs
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set("layout extractScripts", true)
app.use(expressLayouts)

// urlencode bodyparser for data passed in a form i.e req.body.form_element
app.use(express.urlencoded({ extended: false }));

// import routes
const indexRoute = require("./routes/index");

// Use routes
app.use('/', indexRoute);

// connect and start mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

// monitor mongoose
db.on('error', err => {
  console.error(err.message)
})

db.once('open', () => {
  console.log("MongoDB connected");
})

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})