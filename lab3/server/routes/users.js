import express from "express"
import passport from "passport"
import LocalStrategy from "passport-local"

// Bring in User Model
import User from "../models/user"

const router = express.Router()

// Login Form
router.get("/login", (req, res) => {
  res.render("login")
})

// Register Form
router.get("/register", (req, res) => {
  res.render("register")
})

// Register Proccess
router.post("/register", (req, res) => {
  const { username, password, email, phone } = req.body

  req.checkBody("username", "Введите имя пользователя").notEmpty()
  req.checkBody("email", "Введите Email").notEmpty()
  req.checkBody("password", "Введите пароль").notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    res.render("register", {
      errors
    })
  } else {
    const newUser = new User({
      username,
      password,
      email,
      phone
    })
    User.findOne({ username }, (err, user) => {
      if (err) throw err
      if (user) {
        User.findOne({ email }, (err, user) => {
          if (err) throw err
          if (!user) {
            User.createUser(newUser, (err, user) => {
              if (err) throw err
              console.log(user)
              res.status(200).json({ message: "Вы успешно зарегестрированы." })
              return true
            })
          } else {
            res
              .status(200)
              .json({ message: "Данный email уже зарегестрирован." })
            return false
          }
        })
      } else {
        res.status(200).json({
          message: "Пользователь с таким именем уже зарегестрирован."
        })
        return false
      }
    })
  }
})

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) throw err
      if (!user) {
        return done(null, false, {
          message: "Пользователя с таким именем не существует."
        })
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { message: "Неверный пароль." })
      })
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user)
  })
})

// Login Process

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  }),
  (req, res) => {
    res.json("Вы вошли успешно.")
    res.redirect("/")
  }
)

/* router.post('/login', function(req, res) {
  if (req.body.name && req.body.password) {
    var username = req.body.username
    var password = req.body.password
  }
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
        return done(null, false, { message: 'Неверный пароль.' })
      }
    })
  })
  var user = users[_.findIndex(users, { name: name })]
  if (!user) {
    res.status(401).json({ message: 'no such user found' })
  }

  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id }
    var token = jwt.sign(payload, jwtOptions.secretOrKey)
    res.json({ message: 'ok', token: token })
  } else {
    res.status(401).json({ message: 'passwords did not match' })
  }
}) */

// logout
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/user/login")
})

module.exports = router
