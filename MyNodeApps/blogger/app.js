const config = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const ConnectDB = require('./config/DB');
const expressLayout = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Set process.env Variables
config.config({ path: './config/config.env' })

// Create Server
const app = express()
const server = require('http').createServer(app);
const { myGooglePassport } = require('./config/passport')


// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// static public folder
app.use(express.static('public'))

// View Engine
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

// Express session
app.use(session({
  secret: 'keyboard cat',
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: true
}))


// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
myGooglePassport(passport)
  // Routes
const homeRoute = require('./routes/home/index');
const authRoute = require('./routes/auth/auth');

app.use('/', homeRoute);
app.use('/auth', authRoute);




// Connect MongoDB
ConnectDB();



// Start Server
server.listen(process.env.PORT, () => {
  console.log(`Sever running on PORT ${process.env.PORT}`);
})