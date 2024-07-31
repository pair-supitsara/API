import { Router } from 'express'
const router = Router()
import business from '../controller/admin/business.js'
import auth from '../middleware/auth.js'
import authorize from '../middleware/authorize.js'

router.post('/addnewitem', [auth, authorize], async (req, res) => {
    try {
        const result = await business.fnAddNewItem(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/removeproduct', [auth, authorize], async (req, res) => {
    try {
        const result = await business.fnRemoveProduct(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/updateproduct', [auth, authorize], async (req, res) => {
    try {
        const result = await business.fnUpdateProduct(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/getusers', [auth, authorize], async (req, res) => {
    try {
        const result = await business.fnGetUsers(req, res)

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router