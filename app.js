require('./config')

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const dist = path.join(__dirname, 'dist')
const { authenticate } = require('./middleware/authenticate')
const { wrapAsync } = require('./utils')
const {
    handleUndefinedError,
    handleAssertionError,
    handleJwtError,
    handleAutheticationError,
    handleDatabaseError } = require('./controllers/errors')

app.use(express.static(dist))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))

app.get('*',
    wrapAsync(authenticate),
    (req, res) => {
        if (res.user.authenticated) {
            res.sendFile(dist + '/index.html')
        }
    })

app.use(handleAssertionError)
app.use(handleDatabaseError)
app.use(handleAutheticationError)
app.use(handleJwtError)
app.use(handleUndefinedError)

module.exports = { app }
