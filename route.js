const express = require('express')
const router = express.Router()
const demo = require('./route/demo.js')
// const login = require('./route/login.js')

router.use('/demo', demo)
// router.use('/login', login)

module.exports = router