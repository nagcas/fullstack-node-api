import { matchedData } from 'express-validator'
import Track from '../models/tracksModels.js'
import handleHttpError from '../utils/handleError.js'

// NOTE: funzione per visualizzare un elenco completo di items
export const getItems = async (req, res) => {
  try {
    const data = await Track.find({})

    if (data.length === 0) {
      return res.status(200).json({
        status: 200,
        data,
        message: 'Nessuna traccia presente nel database'
      })
    }

    res.status(200).json({
      status: 200,
      data,
      message: 'Lista completa delle tracks'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per visualizzare un singolo item
export const getItem = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Visualizza una track'
  })
}

// NOTE: funzione per creare un nuovo item
export const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    // const { body } = req
    console.log(body)

    const newTrack = new Track(body)

    const track = await newTrack.save()

    res.status(201).json({
      status: 201,
      track,
      message: 'Track creata correttamente'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per modificare un singolo item
export const updateItem = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Track modificata correttamente'
  })
}

// NOTE: funzione per eliminare un singolo item
export const deleteItem = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Track eliminata correttamente'
  })
}
