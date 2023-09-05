import { Router } from 'express'
const router = Router()
import business from '../controller/login.js'

router.post('/fnRegister', async (req, res) => {
    try {
        const json = await fnRegister(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router