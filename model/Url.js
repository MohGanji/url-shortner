const path = require('path')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
  originalUrl: { type: String },
  shortToken: { type: String },
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

const fileName = path.basename(__filename, '.js')
const model = mongoose.model(fileName, schema)

module.exports = model
