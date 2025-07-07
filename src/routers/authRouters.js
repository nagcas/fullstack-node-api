// NOTE: router per l'autenticazione utente
// Questo modulo definisce le rotte relative all'autenticazione,
// includendo la registrazione (`signUp`) e il login (`signIn`).
// Entrambe le rotte utilizzano middleware di validazione per verificare i dati in ingresso
// prima di invocare i controller corrispondenti.
import express from 'express'
import { validatorLogin, validatorRegister } from '../validators/userValidators.js'
import { signIn, signUp } from '../controllers/authControllers.js'

const router = express.Router()

// NOTE: route per la registrazione di un utente
router.post('/signUp', validatorRegister, signUp)

// NOTE: route per il login di un utente
router.post('/signIn', validatorLogin, signIn)

export default router
