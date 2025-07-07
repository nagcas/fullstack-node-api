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
