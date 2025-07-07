// NOTE: middleware di autenticazione JWT
// Questo middleware verifica la presenza di un token JWT nell'header Authorization della richiesta.
// Se il token è valido, estrae l'ID utente dal payload, recupera i dati dell'utente dal database
// e li assegna a req.user per renderli disponibili ai middleware o route successivi.
// In caso di token mancante o non valido, risponde con errore 401 (Unauthorized).
import handleHttpError from '../utils/handleError.js'
import { verifyToken } from '../utils/handleJwt.js'
import User from '../models/usersModels.js'

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'Accesso negato: credenziali mancanti o non valide. Effettua il login e riprova.', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (!dataToken._id) {
      handleHttpError(res, 'Errore id token', 401)
      return
    }

    const user = await User.findById(dataToken._id)
    req.user = user

    next()
  } catch (error) {
    handleHttpError(res, 'Accesso negato: credenziali mancanti o non valide. Effettua il login e riprova.', 401)
  }
}
