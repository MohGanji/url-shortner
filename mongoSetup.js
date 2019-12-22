const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect(
  process.env.MONGO_URI,
  {
    poolSize: 2,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    /* eslint-disable no-console */
    if (err) console.error('Mongoose connection error: ', err)
    else if (process.env.NODE_ENV === 'development') {
      console.log(`connected to db: ${process.env.MONGO_URI}`)
    }
    /* eslint-enable */
  },
)

module.exports = mongoose
