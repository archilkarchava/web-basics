import dotenv from "dotenv"
import express from "express"
import expressValidator from "express-validator"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Promise from "bluebird"

import userRoutes from "./routes/users"

dotenv.config({
  path: `${__dirname}/.env`
})
mongoose.connect(process.env.DB_HOST, { useMongoClient: true })
mongoose.Promise = Promise

// Init app
const app = express()

app.get("/*", (req, res) => {
  res.sendFile(`path.join${__dirname}/index.html`)
})

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
app.use("/users", userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Сервер работает на порте ${process.env.PORT}`) // eslint-disable-line
})
