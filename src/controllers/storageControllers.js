import Storage from '../models/storageModels.js'

export const createItem = async (req, res) => {
  try {
    const PUBLIC_URL = process.env.PUBLIC_URL
    const { file } = req

    const newStorage = new Storage({
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename
    })

    const storage = await newStorage.save()

    res.json({
      storage,
      message: 'File caricato con successo'
    })
  } catch (error) {
    console.error('Errore del Server')
  }
}
