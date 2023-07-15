const express = require('express')
const router = express.Router()
const controller = require('../controller/login.js')

router.post('/fnRegister', async (req, res) => {
    try {
        const json = await controller.fnRegister(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router