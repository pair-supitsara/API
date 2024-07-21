import { Router } from 'express'
const router = Router()

import business from '../controller/demo.js'

router.post('/fnDemo', async (req, res) => { await business.fnDemo(req, res) })

export default router