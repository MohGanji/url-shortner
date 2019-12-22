const crypto = require('crypto')

function sha256(text) {
  return crypto
    .createHash('sha256')
    .update(text, 'binary')
    .digest('base64')
}

function isDate(value) {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(Date.parse(value))
}

function trimDate(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours())
}

module.exports = {
  sha256,
  isDate,
  trimDate,
}
