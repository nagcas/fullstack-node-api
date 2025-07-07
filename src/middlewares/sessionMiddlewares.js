import handleHttpError from '../utils/handleError.js'
import { verifyToken } from '../utils/handleJwt.js'
import User from '../models/usersModels.js'

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'Non sei autorizzato ad accedere', 401)
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
    handleHttpError(res, 'Non sei autorizzato ad accedere', 401)
  }
}
