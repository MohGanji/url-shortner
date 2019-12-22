const jwt = require('jsonwebtoken')
const { sha256 } = require('../utils')
const User = require('../model/User')

function generateAuthToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

async function createUser(username, email, password) {
  const hashedPassword = sha256(password)
  return User.create({ username, email, password: hashedPassword })
}

async function authorizeUser(usernameOrEmail, password) {
  const hashedPassword = sha256(password)
  let user = await User.findOne({ username: usernameOrEmail, password: hashedPassword })
  if (!user) user = await User.findOne({ email: usernameOrEmail, password: hashedPassword })
  if (!user) return null
  return generateAuthToken(user)
}

module.exports = {
  createUser,
  generateAuthToken,
  authorizeUser,
}
