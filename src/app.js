import express from 'express'
import expressListEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'
import cors from 'cors'

import routeTest from './routers/testRouters.js'
import routeTracks from './routers/tracksRouters.js'
import { PORT } from './config/portConfig.js'
import dbConnect from './config/mongoConfig.js'

dotenv.config()

const app = express()

const DEV_ENV = process.env.DEV_ENV

app.use(express.json())
app.use(cors())

app.use('/api', routeTest)
app.use('/api/tracks', routeTracks)

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
