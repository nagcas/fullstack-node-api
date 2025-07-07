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
      type: String
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
