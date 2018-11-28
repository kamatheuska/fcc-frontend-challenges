const mongoose = require('mongoose')
let mongodb_uri = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
    mongodb_uri = 'mongodb://localhost:27017/messageBuilder'
}

mongoose.Promise = global.Promise
mongoose.connect(mongodb_uri, {
    // useFindAndModify: false
    useNewUrlParser: true,
    useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
mongoose.plugin(schema => { schema.options.usePushEach = true })

module.exports = { mongoose, db }
