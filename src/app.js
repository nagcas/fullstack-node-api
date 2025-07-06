import express from 'express'
import expressListEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'

import routeTest from './routers/testRouters.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT_ENV || 5001
const DEV_ENV = process.env.DEV_ENV

app.use(express.json())

app.use('/api', routeTest)

app.listen(PORT, () => {
  if (DEV_ENV === 'development') {
    console.log(`Backend ${DEV_ENV}`)
  } else {
    console.log('Backend production')
  }
  console.clear()
  console.log(`Server avviato alla porta ${PORT}`)
  const ENDPOINTS = expressListEndpoints(app)
  console.log('Elenco endpoints disponibili: ')
  console.table(ENDPOINTS)
})
