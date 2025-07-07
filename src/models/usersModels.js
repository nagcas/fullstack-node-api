// NOTE: modello Mongoose per la collezione "users"
// Questo schema definisce la struttura dei documenti utente con campi come nome, età, email, password e ruolo.
// Il campo `email` è unico per evitare duplicati.
// La password è esclusa dalle query di default (`select: false`) per motivi di sicurezza.
// Il campo `role` indica il tipo di utente, con valori possibili 'user' o 'admin' e valore di default 'user'.
// Sono abilitati i timestamp automatici e la cancellazione soft tramite mongoose-delete,
// che aggiunge il campo `deletedAt` e override dei metodi per gestire eliminazioni "virtuali".
// La raccolta nel database si chiama "users".
import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const usersSchema = new Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
  }
)

usersSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const User = model('users', usersSchema)

export default User
