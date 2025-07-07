# Backend API

Backend per la gestione di un sistema di upload file, gestione utenti, autenticazione e gestione di tracce musicali.  
Sviluppato con Node.js, Express e MongoDB, include funzionalità di logging avanzato su file e Slack.

---

## Descrizione

Questo progetto implementa un backend RESTful API per:

- Registrazione e login utenti con autenticazione JWT e crittografia password (bcryptjs).
- Upload, gestione e cancellazione di file multimediali (Multer + MongoDB).
- Gestione CRUD di "tracks" (brani musicali) con autorizzazioni di ruolo.
- Logging dettagliato delle richieste e risposte HTTP tramite `morgan-body`, con invio log su file e Slack.
- Validazione input con `express-validator`.
- Gestione soft-delete con mongoose-delete.
- Supporto CORS e configurazioni tramite variabili d'ambiente.

---

## Tecnologie e Dipendenze

- [Node.js](https://nodejs.org/) v22.x  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)  
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - crittografia password  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - autenticazione JWT  
- [multer](https://www.npmjs.com/package/multer) - gestione upload file  
- [morgan-body](https://www.npmjs.com/package/morgan-body) - logging richieste HTTP  
- [express-validator](https://express-validator.github.io/docs/) - validazione dati in input  
- [@slack/webhook](https://www.npmjs.com/package/@slack/webhook) - invio log a Slack  
- [mongoose-delete](https://www.npmjs.com/package/mongoose-delete) - soft delete per mongoose  
- [cors](https://www.npmjs.com/package/cors) - gestione CORS  
- [dotenv](https://www.npmjs.com/package/dotenv) - gestione variabili d’ambiente  

---

## Installazione

1. Clona il repository

```bash
git clone https://github.com/tuo-username/backend.git
cd backend
```
## Installa le dipendenze

```bash
npm install
```

## Crea un file .env nella root del progetto con i seguenti valori (aggiorna secondo il tuo ambiente):

```bash
DEV_ENV=development
DB_URI=la_tua_uri_mongodb
PUBLIC_URL=http://localhost:3000/storage
JWT_SECRET=la_tua_chiave_segreta
SLACK_WEBHOOK=il_tuo_webhook_slack
```

## Avvia il server in modalità sviluppo

```bash
npm run dev
```

## Uso

Il server si avvierà sulla porta configurata (di default 5000 se impostata).

Documentazione degli endpoint disponibili con express-list-endpoints e output nel terminale all'avvio.

Le rotte sono strutturate in moduli per autenticazione, gestione tracce, upload file e test.

## Endpoints principali

```bash
### /api/auth/signUp — Registrazione utente

### /api/auth/signIn — Login utente

### /api/tracks — CRUD tracce musicali (protetto da autenticazione e ruoli)

### /api/storage — Upload e gestione file

### /api/test/test — Endpoint di test server
```

## Logging

Le richieste HTTP di tipo POST, PUT, DELETE e PATCH sono loggate con dettagli corpo richiesta e risposta.

I log vengono salvati su file logs/logger.log e inviati a Slack tramite webhook configurato.

Il logger evita di loggare risposte con codice < 400 per ridurre il rumore.

Struttura del progetto
```bash
├── src/
│   ├── app.js                # Entry point dell'app
│   ├── controllers/          # Logica di business
│   ├── middlewares/          # Middleware personalizzati (auth, roles, validator)
│   ├── models/               # Modelli mongoose
│   ├── routers/              # Definizione rotte
│   ├── utils/                # Utility (logger, validator, JWT, password)
│   ├── config/               # Configurazioni DB e porte
│   └── storage/              # Cartella file caricati
├── logs/                     # File di log
├── .env                      # Variabili d'ambiente (non committare)
├── package.json              # Gestione dipendenze e script
└── README.md                 # Documentazione
```

## Script disponibili

```bash
### npm run dev	Avvia il server in sviluppo con nodemon
### npm start	Avvia il server in modalità produzione
### npm run lint	Controlla stile codice con ESLint Standard
### npm run lint:fix	Corregge automaticamente problemi di stile
```


## Note finali

Assicurati che MongoDB sia attivo e raggiungibile con la URI configurata in .env.

Mantieni segrete le chiavi JWT_SECRET e SLACK_WEBHOOK.

Questo backend è pronto per essere integrato con frontend React o altre applicazioni client.

```
Autore: Gianluca Chiaravalloti
Licenza: ISC
```