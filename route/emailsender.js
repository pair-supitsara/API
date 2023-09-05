import { Router } from 'express'
const router = Router()
import business from '../controller/emailsender.js'
import jwt from '../verifyjwt.js'

router.post('/fnSendEmail', async (req, res) => {
    try {
        const json = await business.fnSendEmail(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router