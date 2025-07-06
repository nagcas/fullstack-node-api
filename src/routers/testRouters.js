import express from 'express'
import { testController } from '../controllers/testControllers.js'

const router = express.Router()

// NOTE: endpoint test
router.get('/test', testController)

export default router
