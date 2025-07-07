import { matchedData } from 'express-validator'
import Storage from '../models/storageModels.js'
import handleHttpError from '../utils/handleError.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Per ottenere __dirname in ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MEDIA_PATH = `${__dirname}/../storage`

// NOTE: funzione per creare un singolo item
export const createItem = async (req, res) => {
  try {
    const PUBLIC_URL = process.env.PUBLIC_URL
    const { file } = req

    if (!file) {
      return res.status(400).json({ message: 'Nessun file caricato' })
    }

    const newStorage = new Storage({
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename
    })

    const storage = await newStorage.save()

    res.json({
      storage,
      message: 'File caricato con successo'
    })
  } catch (error) {
    console.error('Errore:', error)
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per visualizzare una lista di items
export const getItems = async (req, res) => {
  try {
    const data = await Storage.find({})

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
    const { storageId } = req
    console.log(storageId)

    const storage = await Storage.findById(storageId)

    if (!storage) {
      return res.status(404).json({
        status: 404,
        message: 'Item non presente nel database'
      })
    }

    res.status(200).json({
      status: 200,
      storage,
      message: 'Visualizza item'
    })
  } catch (error) {
    handleHttpError(res, 'Errore nella richiesta')
  }
}

// NOTE: funzione per eliminare un singolo item
export const deleteItem = async (req, res) => {
  try {
    const { storageId } = matchedData(req)

    const storage = await Storage.findById(storageId)
    await Storage.findByIdAndDelete(storageId)

    if (!storage) {
      return res.status(404).json({
        status: 404,
        message: 'Item non presente nel database'
      })
    }

    const { filename } = storage

    const filepath = `${MEDIA_PATH}/${filename}`

    fs.unlinkSync(filepath)

    res.status(200).json({
      status: 200,
      filepath,
      deleted: 1,
      message: 'Item eliminato cottettamente'
    })
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, 'Errore nella richiesta')
  }
}
