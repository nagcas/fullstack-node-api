import { Schema, model } from 'mongoose'

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

const Track = model('tracks', tracksSchema)

export default Track
