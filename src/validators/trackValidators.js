// NOTE: middleware di validazione per le richieste relative alle tracce (tracks)
// - validatorCreateItem: valida i campi richiesti per creare una nuova traccia,
//   verificando che ogni campo obbligatorio esista e non sia vuoto,
//   incluso il controllo che mediaId sia un ID Mongo valido.
// - validatorGetItem: valida che il parametro trackId sia presente, non vuoto e sia un ID Mongo valido.
// Entrambi usano validateResults per la gestione centralizzata degli errori di validazione.
import { check } from 'express-validator'
import validateResults from '../utils/handleValidator.js'

const validatorCreateItem = [
  check('name')
    .exists()
    .notEmpty(),
  check('album')
    .exists()
    .notEmpty(),
  check('cover')
    .exists()
    .notEmpty(),
  check('artist')
    .exists()
    .notEmpty(),
  check('artist.name')
    .exists()
    .notEmpty(),
  check('artist.nickname')
    .exists()
    .notEmpty(),
  check('artist.nationality')
    .exists()
    .notEmpty(),
  check('duration')
    .exists()
    .notEmpty(),
  check('duration.start')
    .exists()
    .notEmpty(),
  check('duration.end')
    .exists()
    .notEmpty(),
  check('mediaId')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorGetItem = [
  check('trackId')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export { validatorCreateItem, validatorGetItem }
