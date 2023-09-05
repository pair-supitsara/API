import { Router } from 'express'
const router = Router()
import business from '../controller/ecommerce/ecommercebusiness.js'

router.post('/fnSearchProduct', async (req, res) => {
    try {
        const json = await business.fnSearchProduct(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/fnGetPopularTag', async (req, res) => {
    try {
        const json = await business.fnGetPopularTag(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router