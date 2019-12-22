const Koa = require('koa')
const json = require('koa-json')
const cors = require('@koa/cors')
const body = require('koa-body')
const logger = require('koa-logger')
const { userAgent } = require('koa-useragent')
const router = require('./router')
// eslint-disable-next-line no-unused-vars
const mongo = require('./mongoSetup')

const app = new Koa()

app.use(logger())

app.use(
  body({
    multipart: true,
  }),
)
app.use(json({ pretty: true }))
app.use(cors())
app.use(userAgent)
app.use(router.routes())

app.listen(3000)
