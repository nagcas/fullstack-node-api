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
        message: 'Nessun items presente nel database'
      })
    }

    res.status(200).json({
      status: 200,
      data,
      message: 'Lista completa items'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per visualizzare un singolo item
export const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { trackId } = req
    console.log(trackId)

    const track = await Track.findById(trackId)

    if (!track) {
      return res.status(404).json({
        status: 404,
        message: 'Item non presente nel database'
      })
    }

    res.status(200).json({
      status: 200,
      track,
      message: 'Visualizza item'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
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
      message: 'Item creata correttamente'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per modificare un singolo item
export const updateItem = async (req, res) => {
  try {
    const { trackId, ...body } = matchedData(req)

    console.log(trackId)
    console.log(body)

    const updateTrack = await Track.findOneAndUpdate(
      { _id: trackId },
      body,
      { new: true }
    )

    console.log(updateTrack)

    if (!updateTrack) {
      return res
        .status(404)
        .json({ message: 'Item non presente nel database' })
    }

    res.status(201).json({
      status: 201,
      updateTrack,
      message: 'Item modificato correttamente'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per eliminare un singolo item
export const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { trackId } = req
    console.log(trackId)

    const track = await Track.delete({ _id: trackId })

    if (!track) {
      return res.status(404).json({
        status: 404,
        message: 'Item non presente nel database'
      })
    }

    res.status(200).json({
      status: 200,
      deleted: 1,
      message: 'Item eliminata cottettamente'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}
