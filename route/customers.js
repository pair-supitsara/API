import { Router } from 'express'
const router = Router()
import business from '../controller/customers/business.js'
import auth from '../middleware/auth.js'

router.post('/products', async (req, res) => {
    try {
        const json = await business.fnGetProducts(req, res)

        res.status(200).json({ json })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router