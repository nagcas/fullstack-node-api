import User from '../models/usersModels.js'
import { matchedData } from 'express-validator'
import handleHttpError from '../utils/handleError.js'
import { encrypt } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js'
import { compare } from 'bcryptjs'

// NOTE: funzione per la registrazione di un utente
export const signUp = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const data = { ...req, password }

    const newUser = new User(data)

    const user = await newUser.save()
    user.set('password', undefined, { strict: false })

    const dataUser = {
      token: await tokenSign(user),
      user
    }

    res.status(201).json({
      status: 201,
      dataUser,
      message: 'Registrazione avvenuta con successo'
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per il login di un utente
export const signIn = async (req, res) => {
  try {
    req = matchedData(req)

    const user = await User.findOne({ email: req.email }).select('password name email')

    if (!user) {
      handleHttpError(res, 'Utente non presente nel database', 404)
      return
    }

    const hashPassword = user.password
    const check = compare(req.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'Password non valida', 401)
      return
    }

    user.set('password', undefined, { strict: false })

    res.status(200).json({
      status: 200,
      token: await tokenSign(user),
      user,
      message: 'Login avvenuto con successo'
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, 'Errore nella richiesta')
  }
}
