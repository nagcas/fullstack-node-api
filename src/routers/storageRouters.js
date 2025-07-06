import express from 'express'
import uploadMiddleware from '../utils/handleStorage.js'
import { createItem } from '../controllers/storageControllers.js'

const router = express.Router()

// NOTE: route per caricare nella cartella storage un file
router.post('/', uploadMiddleware.single('myFile'), createItem)

export default router
