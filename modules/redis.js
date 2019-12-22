// @flow
const Redis = require('ioredis')

const redis = new Redis(6379, process.env.REDIS_URI)

module.exports = redis
