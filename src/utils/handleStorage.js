import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Simula __dirname per ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configura storage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = path.join(__dirname, '../storage')
    cb(null, pathStorage)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) // es: .jpg
    const filename = `file-${Date.now()}${ext}`
    cb(null, filename)
  }
})

const uploadMiddleware = multer({ storage })

export default uploadMiddleware
