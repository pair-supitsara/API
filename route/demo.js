const express = require('express')
const router = express.Router()
const controller = require('../controller/demo.js')

router.post('/fnDemo', async (req, res) => { await controller.fnDemo(req, res) })

module.exports = router