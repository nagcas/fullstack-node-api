import express from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem } from '../controllers/tracksControllers.js'
import { validatorCreateItem, validatorGetItem } from '../validators/trackValidators.js'
// import customHeader from '../middlewares/customHeader.js'
import { authMiddleware } from '../middlewares/sessionMiddlewares.js'
import { checkRol } from '../middlewares/rolesMiddlewares.js'

const router = express.Router()

// NOTE: route [get] per visualizzare una lista completa di items
router.get('/', authMiddleware, getItems)

// NOTE: route [get] per visualizzare un singolo item
router.get('/:trackId', authMiddleware, validatorGetItem, getItem)

// NOTE: route [post] per creare un singolo item
router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem, createItem)

// NOTE: route [put] per modificare un singolo item
router.put('/:trackId', authMiddleware, validatorCreateItem, validatorGetItem, updateItem)

// NOTE: route [delete] per eliminare un singolo item
router.delete('/:trackId', authMiddleware, validatorGetItem, deleteItem)

export default router
