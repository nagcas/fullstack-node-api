// NOTE: utility per la gestione delle password con bcryptjs
// Questo modulo esporta due funzioni asincrone:
// - encrypt(passwordPlain): cifra una password in chiaro usando bcrypt con 10 salt rounds,
//   restituendo l'hash generato.
// - compare(passwordPlain, hashPassword): confronta una password in chiaro con un hash bcrypt,
//   restituendo true se corrispondono, false altrimenti.
import bcryptjs from 'bcryptjs'

export const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10)
  return hash
}

export const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword)
}
