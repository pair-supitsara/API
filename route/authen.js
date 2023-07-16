const express = require('express')
const router = express.Router()
const controller = require('../controller/authen.js')
const jwt = require('jsonwebtoken')

const fnVerifyJsonWebToken = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        jwt.verify(token, process.env.PRIVATE_KEY, function(error, response) {
            if(error){ 
                throw error 
            } else {
                req.body.username = response.username
                next()
            }
        })
    } catch (error) {
        throw error
    }
}

router.post('/fnLogin', async (req, res) => {
    try {
        const json = await controller.fnGenerateJWT(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/fnVerifyJWT', async (req, res) => {
    try {
        const json = await controller.fnVerifyJWT(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/fnGetData', fnVerifyJsonWebToken, async (req, res) => {
    try {
        const { username } = req.body
        const json = {
            username
        }
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router