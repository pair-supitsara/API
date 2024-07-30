import { Router } from 'express'
const router = Router()
import business from '../controller/admin/business.js'
import auth from '../middleware/auth.js'

router.post('/addnewitem', async (req, res) => {
    try {
        const result = await business.fnAddNewItem(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/removeproduct', async (req, res) => {
    try {
        const result = await business.fnRemoveProduct(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/updateproduct', async (req, res) => {
    try {
        const result = await business.fnUpdateProduct(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router