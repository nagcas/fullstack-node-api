// NOTE: router per la gestione delle tracce musicali (tracks)
// Questo modulo definisce le rotte CRUD per le tracce:
// - lista completa di tracce (GET /)
// - visualizzazione di una singola traccia tramite ID (GET /:trackId)
// - creazione di una nuova traccia (POST /) - protetta da autenticazione e ruolo 'admin'
// - aggiornamento di una traccia esistente (PUT /:trackId)
// - eliminazione di una traccia (DELETE /:trackId)
// Tutte le rotte sono protette dal middleware di autenticazione `authMiddleware`.
// Per la creazione è inoltre richiesto il controllo ruolo con `checkRol(['admin'])`.
// I dati in ingresso sono validati tramite middleware dedicati.
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
