import express from 'express'
import { validatorLogin, validatorRegister } from '../validators/userValidators.js'
import { signIn, signUp } from '../controllers/authControllers.js'

const router = express.Router()

// NOTE: route per la registrazione di un utente
router.post('/signUp', validatorRegister, signUp)

// NOTE: route per il login di un utente
router.post('/signIn', validatorLogin, signIn)

export default router
