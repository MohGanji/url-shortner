const path = require('path')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
  shortUrlToken: { type: String, required: true },
  visitorSessionId: { type: String },
  device: { type: String, enum: ['mobile', 'desktop'] },
  browser: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const fileName = path.basename(__filename, '.js')
const model = mongoose.model(fileName, schema)

module.exports = model
