const express = require('express')
const router = express.Router()
const routetest = require('./route/route-test.js')

router.use('/routetest', routetest)

module.exports = router