const Router = require('koa-router')
const { isCreatorOfUrl } = require('../controller/url')
const { getUrlVisits } = require('../controller/urlVisit')
const { requireAuth } = require('./utils')

const router = new Router({ prefix: '/analytics' })

router.get('/:shortToken', requireAuth, async (ctx) => {
  try {
    const { shortToken } = ctx.params
    const { from, to, unique } = ctx.query
    if (!(await isCreatorOfUrl(ctx.user, shortToken))) {
      ctx.throw(403, 'Forbidden')
      return
    }

    const visits = await getUrlVisits(shortToken, from, to, unique)

    ctx.body = {
      visits,
    }
  } catch (err) {
    ctx.throw(400, err)
  }
})

module.exports = router
