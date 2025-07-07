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
