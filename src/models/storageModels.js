// NOTE: modello Mongoose per la collezione "storages"
// Questo schema definisce la struttura dei documenti che rappresentano file caricati e salvati,
// con campi per l'URL pubblico e il nome del file.
// Sono abilitati i timestamp automatici (createdAt, updatedAt),
// disabilitata la versione (`__v`) e la raccolta è specificata come "storages".
// Inoltre è utilizzato il plugin mongoose-delete per abilitare la cancellazione soft,
// che aggiunge un campo `deletedAt` e override dei metodi per gestire i documenti eliminati "virtualmente".
import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const storageSchema = new Schema(
  {
    url: {
      type: String
    },
    filename: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'storages'
  }
)

storageSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const Storage = model('storages', storageSchema)

export default Storage
