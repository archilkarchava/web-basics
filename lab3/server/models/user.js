import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"

const UserSchema = mongoose.Schema(
  {
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true },
  { collection: "users" }
)

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  passwordHash
) {
  return bcrypt.compareSync(candidatePassword, passwordHash)
}

UserSchema.methods.setPassword = function hashPassword(password) {
  this.password = bcrypt.hashSync(password, 10)
}

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      username: this.username,
      email: this.email,
      phone: this.phone
    },
    process.env.JWT_SECRET
  )
}

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    token: this.generateJWT()
  }
}

UserSchema.plugin(uniqueValidator, {
  message: "Данный {PATH} уже используется."
})

export default mongoose.model("User", UserSchema)
