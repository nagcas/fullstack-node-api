// NOTE: middleware per la gestione dei risultati della validazione con express-validator
// Questo middleware verifica se ci sono errori di validazione nella request.
// Se presenti, risponde con status 403 e array di errori in formato JSON.
// Se non ci sono errori, passa il controllo al middleware successivo.
import { validationResult } from 'express-validator'

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    res.json({ errors: error.array() })
  }
}

export default validateResults
