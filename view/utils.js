// const User = require('../model/User')

const checkParams = (ctx, params) => {
  if (!Object.values(params).every((param) => param !== undefined)) {
    ctx.throw(400, `Bad request: ${Object.keys(params).join(', ')} are required`)
  }
}

const requireAuth = async (ctx, next) => {
  if (!ctx.user) {
    ctx.cookies.set('authToken', null)
    ctx.throw(401, 'Unauthorized')
  }
  return next()
}

module.exports = {
  checkParams,
  requireAuth,
}
