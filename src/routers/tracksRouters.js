import express from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem } from '../controllers/tracksControllers.js'

const router = express.Router()

// NOTE: route [get] per visualizzare una lista completa di items
router.get('/', getItems)

// NOTE: route [get] per visualizzare un singolo item
router.get('/:trackId', getItem)

// NOTE: route [post] per creare un singolo item
router.post('/', createItem)

// NOTE: route [put] per modificare un singolo item
router.put('/:trackId', updateItem)

// NOTE: route [delete] per eliminare un singolo item
router.delete('/:trackId', deleteItem)

export default router
