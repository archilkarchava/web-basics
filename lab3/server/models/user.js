var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    collection: 'users'
  }
)

var User = (module.exports = mongoose.model('User', UserSchema))

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) throw err
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) throw err
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username }
  User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}
