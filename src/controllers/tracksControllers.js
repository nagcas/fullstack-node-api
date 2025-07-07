import { matchedData } from 'express-validator'
import Track from '../models/tracksModels.js'
import handleHttpError from '../utils/handleError.js'

// NOTE: funzione per visualizzare un elenco completo di items
// Questa funzione restituisce tutti gli items (tracks) presenti nel database.
// Se non ci sono risultati, invia un messaggio informativo.
// Viene incluso anche l'utente autenticato, se disponibile in `req.user`.
export const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await Track.find({})

    if (data.length === 0) {
      return res.status(200).json({
        status: 200,
        data,
        message: 'Non sono stati trovati elementi nel database.'
      })
    }

    res.status(200).json({
      status: 200,
      data,
      user,
      message: 'Lista completa degli elementi disponibili.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per visualizzare un singolo item
// Questa funzione recupera un singolo item (track) dal database in base al suo ID.
// I dati vengono estratti e validati tramite `matchedData`.
// Se l'elemento non esiste, viene restituito un errore 404.
export const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { trackId } = req
    console.log(trackId)

    const track = await Track.findById(trackId)

    if (!track) {
      return res.status(404).json({
        status: 404,
        message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.'
      })
    }

    res.status(200).json({
      status: 200,
      track,
      message: 'Elemento recuperato con successo.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per creare un nuovo item
// Questa funzione consente di creare un nuovo item (track) nel database.
// I dati vengono validati con `matchedData` prima della creazione.
// In caso di successo, restituisce lo stato 201 con i dettagli dell’oggetto salvato.
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
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per modificare un singolo item
// Questa funzione aggiorna un item (track) esistente nel database.
// Viene identificato tramite ID (`trackId`) e aggiornato con i dati ricevuti.
// Se l’item non esiste, restituisce un errore 404. In caso di successo, ritorna l’oggetto aggiornato.
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
        .json({ message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.' })
    }

    res.status(201).json({
      status: 201,
      updateTrack,
      message: 'Elemento modificato con successo.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}

// NOTE: funzione per eliminare un singolo item
// Questa funzione elimina un item (track) dal database utilizzando l’ID validato.
// Se l’item non esiste, restituisce un errore 404. In caso di eliminazione corretta,
// restituisce conferma dell’operazione.
export const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { trackId } = req
    console.log(trackId)

    const track = await Track.delete({ _id: trackId })

    if (!track) {
      return res.status(404).json({
        status: 404,
        message: 'Elemento richiesto non trovato. Potrebbe essere stato eliminato o non esiste.'
      })
    }

    res.status(200).json({
      status: 200,
      deleted: 1,
      message: 'Elemento eliminato con successo.'
    })
  } catch (error) {
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}
