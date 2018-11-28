const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authenticate')
const { wrapAsync } = require('../utils')
router.post('/convert',
    wrapAsync(authenticate),
    (req, res, next) => {
    })

module.exports = router
