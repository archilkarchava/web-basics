import express from "express"

const router = express.Router()

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.json({ success: false, message: "Ошибка. Вы не залогинены." })
  res.redirect("/users/login")
}

// Get Homepage
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index")
})

module.exports = router
