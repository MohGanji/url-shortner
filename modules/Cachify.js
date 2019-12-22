const md5 = require('md5')
const redis = require('./redis')

function Cachify({
  func,
  namespace = 'urlShortener',
  ttl = 60 * 60, // ONE HOUR
  autoExtend = false,
}) {
  function stableCopy(value) {
    if (!value || typeof value !== 'object') {
      return value
    }
    if (typeof value === 'object' && Object.keys(value).includes('_bsontype')) {
      return value.toString()
    }
    if (Array.isArray(value)) {
      return value.map(stableCopy)
    }
    const keys = Object.keys(value).sort()
    const stable = {}
    for (let i = 0; i < keys.length; i += 1) {
      stable[keys[i]] = stableCopy(value[keys[i]])
    }
    return stable
  }

  const getKey = (...args) => {
    const key = `cachify:${namespace}:${md5(func.toString())}:${args
      .map((arg) => JSON.stringify(stableCopy(arg)))
      .join(',')}`
    return key
  }

  const get = async (...args) => {
    const key = getKey(...args)
    // console.log('key in get: ', key)
    const cachedValue = await redis.get(key)
    if (cachedValue) {
      if (autoExtend) {
        await redis.expire(key, ttl)
      }
      const { value } = JSON.parse(cachedValue)
      return value
    }
    const value = await func(...args)
    await redis.set(key, JSON.stringify({ value }), 'EX', ttl)
    return value
  }

  const del = async (...args) => {
    const key = getKey(...args)
    return redis.del(key)
  }

  return {
    get,
    del,
  }
}

module.exports = Cachify
