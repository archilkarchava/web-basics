import dotenv from "dotenv"
import express from "express"
import path from "path"
import expressValidator from "express-validator"
import bodyParser from "body-parser"
import passport from "passport"
import mongoose from "mongoose"
import Promise from "bluebird"

import rootRoutes from "./routes/index"
import userRoutes from "./routes/users"

dotenv.config({
  path: `${__dirname}/.env`
})
mongoose.connect(process.env.DB_HOST, { useMongoClient: true })
mongoose.Promise = Promise

// Init app
const app = express()

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")))

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
})

// Configuring Passport
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(
  expressValidator({
    errorFormatter(param, msg, value) {
      const namespace = param.split(".")
      const root = namespace.shift()
      let formParam = root

      while (namespace.length) {
        formParam += `[${namespace.shift()}]`
      }
      return {
        param: formParam,
        msg,
        value
      }
    }
  })
)

// BodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

// Include routes
app.use("/", rootRoutes)
app.use("/users", userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
