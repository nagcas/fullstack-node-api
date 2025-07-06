import { Schema, model } from 'mongoose'

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

const User = model('users', usersSchema)

export default User
