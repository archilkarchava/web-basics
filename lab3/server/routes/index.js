import express from "express"

const router = express.Router()

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send("Ошибка. Вы не залогинены.")
  res.redirect("/user/login")
}

// Get Homepage
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index")
})

module.exports = router
