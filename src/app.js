// NOTE: configurazione e avvio del server Express
// - Importa e configura middleware essenziali: CORS, JSON parser, logging avanzato con morgan-body
// - Usa un logger personalizzato che invia log sia su file sia a Slack tramite loggerStream
// - Serve file statici dalla cartella "storage"
// - Registra le rotte API per test, autenticazione, tracks e storage
// - Connette a MongoDB tramite dbConnect
// - Avvia il server sulla porta definita da variabile d'ambiente o config
// - Stampa a console lo stato del server e la lista degli endpoint disponibili
// - Gestisce errori critici all’avvio del server
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import expressListEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'
import cors from 'cors'

import routeTest from './routers/testRouters.js'
import routeAuth from './routers/authRouters.js'
import routeTracks from './routers/tracksRouters.js'
import routeStorage from './routers/storageRouters.js'
import { PORT } from './config/portConfig.js'
import dbConnect from './config/mongoConfig.js'

import morganBody from 'morgan-body'
import { loggerStream } from './utils/hangleLogger.js'

dotenv.config()

const app = express()

const DEV_ENV = process.env.DEV_ENV

// Per ottenere __dirname in ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

// Servi i file statici nella cartella "storage"
app.use(express.static(path.join(__dirname, '../src/storage')))

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400
  },
  logRequestBody: true,
  logResponseBody: true,
  includeNewLines: true,
  methods: ['POST', 'PUT', 'DELETE', 'PATCH']
})

app.use('/api', routeTest)
app.use('/api/auth', routeAuth)
app.use('/api/tracks', routeTracks)
app.use('/api/storage', routeStorage)

const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(PORT, () => {
      console.log(`Server in ambiente ${DEV_ENV || 'production'}`)
      console.log(`Avviato su: http://localhost:${PORT}`)
      console.log(`Test: http://localhost:${PORT}/api/test`)
      const ENDPOINTS = expressListEndpoints(app)
      console.log('Elenco endpoint disponibili:')
      console.table(ENDPOINTS)
    })
  } catch (error) {
    console.error('Errore avvio server:', error.message)
    process.exit(1)
  }
}

startServer()
