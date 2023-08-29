const express = require('express')
const router = express.Router()
const controller = require('../controller/ecommerce/ecommercebusiness.js')

router.post('/fnSearchProduct', async (req, res) => {
    try {
        const json = await controller.fnSearchProduct(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/fnGetPopularTag', async (req, res) => {
    try {
        const json = await controller.fnGetPopularTag(req, res)
        res.status(200).json(json)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router