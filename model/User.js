const path = require('path')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const fileName = path.basename(__filename, '.js')
const model = mongoose.model(fileName, schema)

module.exports = model
