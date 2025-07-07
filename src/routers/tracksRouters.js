import express from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem } from '../controllers/tracksControllers.js'
import { validatorCreateItem, validatorGetItem } from '../validators/trackValidators.js'
import customHeader from '../middlewares/customHeader.js'
import { authMiddleware } from '../middlewares/sessionMiddlewares.js'

const router = express.Router()

// NOTE: route [get] per visualizzare una lista completa di items
router.get('/', authMiddleware, getItems)

// NOTE: route [get] per visualizzare un singolo item
router.get('/:trackId', validatorGetItem, getItem)

// NOTE: route [post] per creare un singolo item
router.post('/', validatorCreateItem, customHeader, createItem)

// NOTE: route [put] per modificare un singolo item
router.put('/:trackId', validatorCreateItem, validatorGetItem, updateItem)

// NOTE: route [delete] per eliminare un singolo item
router.delete('/:trackId', validatorGetItem, deleteItem)

export default router
