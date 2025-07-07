// NOTE: utility per la gestione dei JSON Web Token (JWT)
// Questo modulo esporta due funzioni:
// - tokenSign(user): genera un token JWT firmato con il segreto definito in ambiente,
//   includendo l’ID utente (_id) e il ruolo, con scadenza di 2 ore.
// - verifyToken(tokenJwt): verifica la validità di un token JWT e ritorna il payload decodificato,
//   oppure null in caso di token non valido o scaduto.
// Il segreto JWT è caricato dalle variabili di ambiente tramite dotenv.
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET)

const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )

  return sign
}

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export { tokenSign, verifyToken }
