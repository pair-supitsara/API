import { Router } from 'express'
const router = Router()
import business from '../controller/authentication/business.js'
import auth from '../middleware/auth.js'

router.post('/login', async (req, res) => {
    try {
        const result = await business.fnLogin(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/testverifytoken', auth, async (req, res) => { /* ทดสอบ use middleware */
    try {
        const result = {
            message: 'test token result'
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/register', async (req, res) => {
    try {
        const result = await business.fnRegister(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router