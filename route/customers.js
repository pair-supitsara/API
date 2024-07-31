import { Router } from 'express'
const router = Router()
import business from '../controller/customers/business.js'
import auth from '../middleware/auth.js'

router.post('/products', async (req, res) => {
    try {
        const result = await business.fnGetProducts(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/getproductbyid', async (req, res) => {
    try {
        const result = await business.fnGetProductById(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/addtocart', auth, async (req, res) => {
    try {
        const result = await business.fnAddtoCart(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/getmycart', auth, async (req, res) => {
    try {
        const result = await business.fnGetCartByUserId(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router