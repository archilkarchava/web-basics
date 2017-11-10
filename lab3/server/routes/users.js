import express from "express"
import passport from "passport"
import LocalStrategy from "passport-local"
import JwtStrategy from "passport-jwt"

// Bring in User Model
import User from "../models/user"

const router = express.Router()

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
    User.findOne({ username }, (err, user) => {
      if (err) throw err
      if (user) {
        res.json({
          success: false,
          message: "Пользователь с таким именем уже зарегистрирован."
        })
      } else {
        const newUser = new User({
          username,
          password,
          email,
          phone
        })
        User.createUser(newUser, (err, user) => {
          if (err) throw err
          console.log(user)
          res
            .status(200)
            .json({ success: true, message: "Вы успешно зарегестрированы." })
        })
      }
    })
  }
})

// Passport's stuff
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
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

// Login Process
router.post("/login", (req, res) => {
  // Do email and password validation for the server
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err
    if (!user) {
      return res.json({ success: false, message: info.message })
    }
    req.logIn(user, loginErr => {
      if (loginErr) {
        return res.json({ success: false, message: loginErr })
      }
      return res.json({ success: true, message: "Вы успешно вошли!" })
    })
  })(req, res)
})

// logout
router.get("/logout", (req, res) => {
  req.logout()
  return res.json({ success: true })
})

module.exports = router
