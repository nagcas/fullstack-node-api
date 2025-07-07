import handleHttpError from '../utils/handleError.js'

export const checkRol = (roles) => async (req, res, next) => {
  try {
    const { user } = req
    console.log({ user })
    const rolesByUser = user.role

    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))

    if (!checkValueRol) {
      handleHttpError(res, 'Utente non autorizzato', 403)
      return
    }

    next()
  } catch (error) {
    handleHttpError(res, 'Permesso non autorizzato', 403)
  }
}
