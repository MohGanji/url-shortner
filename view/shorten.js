const Router = require('koa-router')
const { findOriginalUrl } = require('../controller/url')
const { addUrlVisit } = require('../controller/urlVisit')

const router = new Router({ prefix: '/r' })

router.get('/:shortToken', async (ctx) => {
  const { shortToken } = ctx.params

  const originalUrl = await findOriginalUrl(shortToken)
  if (!originalUrl) {
    ctx.throw(404, 'Error: Not Found')
  } else {
    const { isMobile, isDesktop, browser } = ctx.userAgent
    const visitorSessionId = ctx.cookies.get('sessionId')
    addUrlVisit(visitorSessionId, shortToken, isMobile, isDesktop, browser)
    ctx.redirect(originalUrl)
  }
})

module.exports = router
