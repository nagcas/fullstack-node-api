import { Schema, model } from 'mongoose'

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

const Storage = model('storages', storageSchema)

export default Storage
