import express from "express"
import jwt from "jsonwebtoken"

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
        res.json({ user: userRecord.toAuthJSON() })
      })
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))
  }
})

// Login Process
router.post("/login", (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }).then(user => {
    if (user && user.comparePassword(password, user.password)) {
      res.json({ user: user.toAuthJSON() })
    } else {
      res.status(400).json({ errors: { global: "Неверный логин или пароль." } })
    }
  })
})

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({})
    } else {
      res.json({})
    }
  })
})

export default router
