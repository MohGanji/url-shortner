const Router = require('koa-router')
const { checkParams, requireAuth } = require('./utils')
const { createShortUrl } = require('../controller/url')

const router = new Router({ prefix: '/url' })

router.post('/shorten', requireAuth, async (ctx) => {
  const { url } = ctx.request.body
  checkParams(ctx, { url })

  const shortUrl = await createShortUrl(ctx.user, url)

  ctx.body = { shortUrl }
})

module.exports = router
