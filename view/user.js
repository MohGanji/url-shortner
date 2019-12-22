const Router = require('koa-router')
const { checkParams, requireAuth } = require('./utils')
const { createUser, generateAuthToken, authorizeUser } = require('../controller/user')

const router = new Router({ prefix: '/user' })

router.post('/signup', async (ctx) => {
  const { username, email, password } = ctx.request.body
  checkParams(ctx, { username, email, password })

  const user = await createUser(username, email, password)
  const authToken = generateAuthToken(user)

  ctx.body = { authToken }
})

router.post('/signin', async (ctx) => {
  const { username, password } = ctx.request.body
  checkParams(ctx, { username, password })

  const authToken = await authorizeUser(username, password)
  if (!authToken) ctx.throw(401, 'Error: Wrong username or password')
  else ctx.body = { authToken }
})

module.exports = router
