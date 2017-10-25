var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// Bring in User Model
let User = require('../models/user')

// Login Form
router.get('/login', function(req, res) {
  res.render('login')
})

// Register Form
router.get('/register', function(req, res) {
  res.render('register')
})

// Register Proccess
router.post('/register', function(req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const phone = req.body.phone

  req.checkBody('username', 'Введите имя пользователя').notEmpty()
  req.checkBody('email', 'Введите Email').notEmpty()
  req.checkBody('email', 'Email введен неверно').isEmail()
  req.checkBody('password', 'Введите пароль').notEmpty()

  let errors = req.validationErrors()

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    let newUser = new User({
      username: username,
      password: password,
      email: email,
      phone: phone
    })

    User.createUser(newUser, function(err, user) {
      if (err) throw err
      console.log(user)
    })

    res.status(200).send('Успех!')
  }
})

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err
      if (!user) {
        return done(null, false, {
          message: 'Пользователя с таким именем не существует.'
        })
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Логин и пароль не совпадают.' })
        }
      })
    })
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  })
})

// Login Process

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failWithError: true
  }),
  function(req, res) {
    res.redirect('/')
  }
)

// logout
router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router
