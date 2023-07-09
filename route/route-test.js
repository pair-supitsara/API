const express = require('express')
const router = express.Router()
const controller = require('./../controller/route-test.js')

router.post('/fntest', controller.fnTest)

module.exports = router