// NOTE: modulo per logging combinato su file e Slack
// - Crea (se necessario) una cartella "logs" e un file di log "logger.log" dove scrive i messaggi in append.
// - Invia ogni messaggio di log anche a un canale Slack tramite IncomingWebhook,
//   utilizzando l’URL del webhook definito nelle variabili di ambiente.
// - Gestisce eventuali errori di invio a Slack senza interrompere il flusso.
// - Mostra in console una conferma per ogni messaggio loggato.
import fs from 'fs'
import path from 'path'
import { IncomingWebhook } from '@slack/webhook'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Percorso log file
const logDir = path.join(__dirname, '..', 'logs')
const logFile = path.join(logDir, 'logger.log')

// Crea la cartella logs se non esiste
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// Stream per scrivere nel file
const fileStream = fs.createWriteStream(logFile, { flags: 'a' })

// Slack Webhook
const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

// Stream combinato
export const loggerStream = {
  write: async (message) => {
    // Scrive su file
    fileStream.write(message)

    // Scrive su Slack (con try/catch per evitare crash)
    try {
      await slackWebhook.send({ text: message })
    } catch (err) {
      console.error('Slack log error:', err.message)
    }

    // Debug su console
    console.log('Log registrato:', message.trim())
  }
}
