import express from "express"
import passport from "passport"
import passportJWT from "passport-jwt"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

import User from "../models/user"

dotenv.config({
  path: `${__dirname}/../.env`
})

const { ExtractJwt } = passportJWT
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// Bring in User Model

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
        const salt = bcrypt.genSaltSync(10)
        newUser.password = bcrypt.hashSync(newUser.password, salt)
        newUser
          .save()
          .then(
            res.status(200).json({ message: "Вы успешно зарегистрировались" })
          )
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

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findOne({ username: jwtPayload.username }, (err, user) => {
    if (err) throw err
    if (!user) {
      return done(null, false, {
        message: "Пользователя с таким именем не существует."
      })
    }

    User.comparePassword(jwtPayload.password, user.password, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, { message: "Вы ввели неверный пароль." })
    })
  })
})

passport.use(strategy)

// Login Process
router.post("/login", (req, res) => {
  // Do email and password validation for the server
  passport.authenticate("jwt", (err, user, info) => {
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
