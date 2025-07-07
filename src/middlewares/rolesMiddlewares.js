// NOTE: middleware per il controllo dei ruoli utenti
// Questa funzione factory restituisce un middleware che verifica se l'utente autenticato
// possiede almeno uno dei ruoli richiesti per accedere alla risorsa.
// Se il ruolo non è autorizzato, risponde con errore 403 (Forbidden).
// In caso contrario, passa il controllo al middleware successivo.
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
