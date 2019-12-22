const Router = require('koa-router')
const path = require('path')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const router = new Router()

// add user to context
router.use(async (ctx, next) => {
  if (ctx.headers.auth) {
    const tokenData = jwt.verify(ctx.headers.auth, process.env.JWT_SECRET)
    ctx.user = tokenData.user
  }
  return next()
})

// set a unique ID to identify unique users.
router.use(async (ctx, next) => {
  if (!ctx.cookies.get('sessionId')) ctx.cookies.set('sessionId', uuid(), { maxAge: 99999999999999999 })
  return next()
})

const views = fs.readdirSync(path.join(__dirname, 'view'))
views.forEach((m) => {
  const [viewName] = m.split('.')
  if (viewName === 'utils') return
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const viewRouter = require(path.join(__dirname, 'view', viewName))
  router.use(viewRouter.routes())
})

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'server is up.',
  }
})

module.exports = router
