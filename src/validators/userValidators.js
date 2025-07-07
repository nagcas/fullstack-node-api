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
