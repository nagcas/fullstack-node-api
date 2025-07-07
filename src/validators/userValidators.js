// NOTE: middleware di validazione per le richieste utente
// - validatorRegister: valida i dati di registrazione, controllando che
//   nome, età, password ed email siano presenti e corretti, inclusi:
//   - nome tra 3 e 99 caratteri
//   - età numerica tra 18 e 60 anni
//   - password tra 3 e 15 caratteri
//   - email valida
// - validatorLogin: valida i dati di login, assicurandosi che password e email
//   siano presenti e formattate correttamente
// - validatorGetItem: valida che userId sia un ID MongoDB valido e presente
// Ogni validator utilizza validateResults per gestire gli errori.
import { check } from 'express-validator'
import validateResults from '../utils/handleValidator.js'

const validatorRegister = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),
  check('age')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 18 || value > 60) {
        throw new Error("L'età deve essere compresa tra 18 e 60")
      }
      return true
    }),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorLogin = [
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorGetItem = [
  check('userId')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export { validatorRegister, validatorLogin, validatorGetItem }
