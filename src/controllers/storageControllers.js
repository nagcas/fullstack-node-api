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
// Questa funzione gestisce il caricamento di un file da parte dell'utente.
// Verifica la presenza del file nella richiesta, lo salva nel database con
// URL pubblico e nome del file, e restituisce i dati del file appena salvato.
export const createItem = async (req, res) => {
  try {
    const PUBLIC_URL = process.env.PUBLIC_URL
    const { file } = req

    if (!file) {
      return res.status(400).json({ message: 'Nessun file è stato caricato. Per favore, seleziona un file e riprova.' })
    }

    const newStorage = new Storage({
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename
    })

    const storage = await newStorage.save()

    res.json({
      storage,
      message: 'Caricamento del file avvenuto con successo.'
    })
  } catch (error) {
    console.error('Errore:', error)
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per visualizzare una lista di items
// Questa funzione recupera tutti gli item presenti nella collezione Storage.
// Restituisce un array di oggetti (anche vuoto) con un messaggio informativo
// in base al numero di risultati trovati.
export const getItems = async (req, res) => {
  try {
    const data = await Storage.find({})

    if (data.length === 0) {
      return res.status(200).json({
        status: 200,
        data,
        message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.'
      })
    }

    res.status(200).json({
      status: 200,
      data,
      message: 'Lista completa degli elementi disponibili.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per visualizzare un singolo item
// Questa funzione recupera un singolo item dal database a partire
// dal suo ID (`storageId`) validato. Se presente, restituisce i dati dell’item,
// altrimenti risponde con un errore 404.
export const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { storageId } = req
    console.log(storageId)

    const storage = await Storage.findById(storageId)

    if (!storage) {
      return res.status(404).json({
        status: 404,
        message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.'
      })
    }

    res.status(200).json({
      status: 200,
      storage,
      message: 'Elemento recuperato con successo.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per eliminare un singolo item
// Questa funzione elimina un item dal database e rimuove anche
// fisicamente il file associato dal file system. Verifica l’esistenza dell’item,
// cancella il documento da MongoDB e poi il file dal disco.
export const deleteItem = async (req, res) => {
  try {
    const { storageId } = matchedData(req)

    const storage = await Storage.findById(storageId)
    await Storage.findByIdAndDelete(storageId)

    if (!storage) {
      return res.status(404).json({
        status: 404,
        message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.'
      })
    }

    const { filename } = storage

    const filepath = `${MEDIA_PATH}/${filename}`

    fs.unlinkSync(filepath)

    res.status(200).json({
      status: 200,
      filepath,
      deleted: 1,
      message: 'Elemento eliminato con successo.'
    })
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}
