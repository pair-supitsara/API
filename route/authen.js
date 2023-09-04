const express = require('express')
const router = express.Router()
const controller = require('../controller/authentication/authenbusiness.js')
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
        const json = await controller.fnLogin(req, res)
        res.status(200).json({
            status: json.status,
            message: json.message,
            data: json.data
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
            data: []
        })
    }
})

router.post('/fnVerifyJWT', async (req, res) => {
    try {
        const json = await controller.fnVerifyJWT(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/fnRegister', async (req, res) => {
    try {
        const json = await controller.fnRegister(req, res)
        res.status(200).json({
            status: json.status,
            message: json.message,
            data: json.data
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
            data: []
        })
    }
})


module.exports = router