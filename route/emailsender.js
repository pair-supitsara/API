const express = require('express')
const router = express.Router()
const controller = require('../controller/emailsender')
const { fnVerifyJsonWebToken } = require('../verifyjwt.js')

router.post('/fnSendEmail', fnVerifyJsonWebToken, async (req, res) => {
    try {
        const json = await controller.fnSendEmail(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router