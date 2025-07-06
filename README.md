# 🧪 Backend – Test Project

Progetto di backend con Node.js, Express e MongoDB, configurato per uno sviluppo efficiente e con supporto allo standard JavaScript Style (`standard`) tramite ESLint.

---

## 📦 Installazione

Clona il progetto e installa le dipendenze:

```bash
git clone <url-repo>
cd backend
npm install

🚀 Script disponibili
▶️ Avviare il server

npm start
Avvia il server usando Node.js

🔄 Modalità sviluppo con Hot Reload

npm run dev
Avvia il server in modalità sviluppo usando nodemon per ricaricare automaticamente quando salvi

✅ Lint – Controllo dello stile del codice

npm run lint
Analizza il codice secondo le regole di JavaScript Standard Style

🛠️ Lint + Fix – Corregge automaticamente lo stile

npm run lint:fix
Applica automaticamente correzioni a spazi, virgolette, indentazioni ecc.

🧰 Configurazione ESLint
Nel package.json è già incluso:

"eslintConfig": {
  "extends": "standard"
}
Questa configurazione estende le regole di standard, mantenendo uno stile di codice coerente e leggibile.

🛡️ Dipendenze principali
Production
express – Web framework versione 4

mongoose – ODM per MongoDB

dotenv – Gestione variabili ambiente

express-list-endpoints – Elenco delle rotte disponibili

Development
nodemon – Hot reload durante lo sviluppo

eslint – Analisi statica del codice

eslint-config-standard – Regole predefinite standard.js

eslint-plugin-import, n, promise – Plugin necessari per ESLint Standard

standard – CLI alternativa per lo stile standard

📂 Suggerimento: ignorare cartelle nel lint
Crea un file .eslintignore per ignorare cartelle non necessarie al linting:


node_modules/
dist/