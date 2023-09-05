import { Router } from 'express'
const router = Router()
import business from '../controller/authentication/authenbusiness.js'
import jwt from 'jsonwebtoken'

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
        const json = await business.fnLogin(req, res)
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
        const json = await business.fnVerifyJWT(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/fnRegister', async (req, res) => {
    try {
        const json = await business.fnRegister(req, res)
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


export default router