import express from "express"

import User from "../models/user"
import parseErrors from "../utils/parseErrors"

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
    const newUser = new User({
      username,
      email,
      phone
    })
    newUser.setPassword(password)
    newUser
      .save()
      .then(userRecord => {
        res.json({ success: true, user: userRecord.toAuthJSON() })
      })
      .catch(err =>
        res.json({ success: false, errors: parseErrors(err.errors) })
      )
  }
})

// Login Process
router.post("/login", (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }).then(user => {
    if (user && user.comparePassword(password, user.password)) {
      res.json({ success: true, user: user.toAuthJSON() })
    } else {
      res.json({
        success: false,
        errors: { global: "Неверный логин или пароль." }
      })
    }
  })
})

export default router
