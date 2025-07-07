// NOTE: middleware di validazione per la richiesta che richiede un singolo item di storage
// Controlla che il parametro 'storageId':
// - sia presente (exists)
// - non sia vuoto (notEmpty)
// - sia un ID MongoDB valido (isMongoId)
// Utilizza validateResults per gestire e inviare eventuali errori di validazione.
import { check } from 'express-validator'
import validateResults from '../utils/handleValidator.js'

const validatorGetItem = [
  check('storageId')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export { validatorGetItem }
