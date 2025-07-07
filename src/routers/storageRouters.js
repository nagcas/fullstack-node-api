import express from 'express'
import uploadMiddleware from '../utils/handleStorage.js'
import { createItem, deleteItem, getItem, getItems } from '../controllers/storageControllers.js'
import { validatorGetItem } from '../validators/storageValidators.js'
import { authMiddleware } from '../middlewares/sessionMiddlewares.js'

const router = express.Router()

// NOTE: route [post] per caricare nella cartella storage un file
router.post('/', authMiddleware, uploadMiddleware.single('myFile'), createItem)

// NOTE: route [get] per visualizzare la lista completa items
router.get('/', authMiddleware, getItems)

// NOTE: route [get] per visualizzare un singolo item
router.get('/:storageId', authMiddleware, validatorGetItem, getItem)

// NOTE: route [delete] per eliminare un singolo item
router.delete('/:storageId', authMiddleware, validatorGetItem, deleteItem)

export default router
