const express = require('express')
const router = express.Router()
const demo = require('./route/demo.js')
const login = require('./route/login.js')
const authen = require('./route/authen.js')


router.use('/demo', demo)
router.use('/login', login)
router.use('/authen', authen)

module.exports = router