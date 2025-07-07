// NOTE: router per la gestione dei file di storage
// Questo modulo definisce le rotte per operazioni CRUD relative ai file salvati nel backend:
// - caricamento di un file (POST /)
// - recupero della lista di tutti i file (GET /)
// - recupero di un singolo file tramite ID (GET /:storageId)
// - eliminazione di un file tramite ID (DELETE /:storageId)
// Tutte le rotte sono protette dal middleware di autenticazione `authMiddleware`.
// È utilizzato un middleware per gestire l’upload dei file (`uploadMiddleware`).
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
