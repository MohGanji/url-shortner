const shortid = require('shortid')
const Url = require('../model/Url')
const Cachify = require('../modules/Cachify')

async function createShortUrl(creator, originalUrl) {
  const shortToken = shortid.generate()
  await Url.create({
    creator: creator._id,
    shortToken,
    originalUrl,
  })
  const shortUrl = `${process.env.BASE_URL}/r/${shortToken}`
  return shortUrl
}

async function findOriginalUrlImpl(shortToken) {
  const foundUrl = await Url.findOne({ shortToken })
  if (!foundUrl) return null
  return foundUrl.originalUrl
}

const findOriginalUrlCachified = Cachify({
  func: findOriginalUrlImpl,
  namespace: 'findOriginalUrl',
  ttl: 24 * 60 * 60,
  autoExtend: true,
})

async function findOriginalUrl(shortToken) {
  return findOriginalUrlCachified.get(shortToken)
}

async function isCreatorOfUrl(user, shortToken) {
  return Url.findOne({
    shortToken,
    creator: user._id,
  })
}

module.exports = {
  createShortUrl,
  findOriginalUrl,
  isCreatorOfUrl,
}
