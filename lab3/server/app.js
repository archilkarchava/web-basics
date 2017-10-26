require('dotenv').config({
  path: `${__dirname}/.env`
})
var express = require('express')
var path = require('path')
var expressValidator = require('express-validator')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var passport = require('passport')
var mongoose = require('mongoose')
mongoose.connect(process.env.DB_HOST, { useMongoClient: true })
mongoose.Promise = global.Promise

var rootRoutes = require('./routes/index')
var userRoutes = require('./routes/users')

// Init app
var app = express()

app.use(cookieParser())

// BodyParser Middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(cookieParser())

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Include routes
app.use('/', rootRoutes)
app.use('/users', userRoutes)

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

// Express Session
app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({
      mongooseConnection: process.env.DB_HOST
    }),
    saveUninitialized: true,
    resave: true
  })
)

// Configuring Passport
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      var root = namespace.shift()
      var formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      }
    }
  })
)

app.listen(process.env.PORT, function() {
  console.log('Server started on port ' + process.env.PORT)
})
