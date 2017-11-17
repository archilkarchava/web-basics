import express from "express"

import User from "../models/user"
import parseErrors from "../utils/parseErrors"

const router = express.Router()

// Registration Proccess
router.post("/register", (req, res) => {
  const { username, password, email, phone } = req.body

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
    .catch(err => res.json({ success: false, errors: parseErrors(err.errors) }))
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
        errors: {
          username: "Неверный логин или пароль.",
          password: "Неверный логин или пароль."
        }
      })
    }
  })
})

export default router
