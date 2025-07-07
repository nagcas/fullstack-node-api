// NOTE: modello Mongoose per la collezione "tracks"
// Questo schema rappresenta una traccia musicale con campi quali nome, album, cover e dati dell'artista.
// Il campo `cover` include una validazione base per l'URL (attualmente sempre true).
// L'artista è un sotto-documento con nome, nickname e nazionalità.
// La durata è definita da un intervallo start-end in secondi.
// `mediaId` è un riferimento ad un documento collegato (ad esempio un file multimediale).
// Sono abilitati i timestamp automatici e la cancellazione soft tramite mongoose-delete,
// che aggiunge il campo `deletedAt` e override dei metodi per gestire eliminazioni "virtuali".
// La raccolta nel database si chiama "tracks".
import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const tracksSchema = new Schema(
  {
    name: {
      type: String
    },
    album: {
      type: String
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true
        },
        message: 'Error url'
      }
    },
    artist: {
      name: {
        type: String
      },
      nickname: {
        type: String
      },
      nationality: {
        type: String
      }
    },
    duration: {
      start: {
        type: Number
      },
      end: {
        type: Number
      }
    },
    mediaId: {
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'tracks'
  }
)

tracksSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const Track = model('tracks', tracksSchema)

export default Track
