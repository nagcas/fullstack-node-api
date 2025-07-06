const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key
    if (apiKey === 'api-public-123') {
      next()
    } else {
      res.status(403)
      res.json({ message: 'Api key non corretto' })
    }
  } catch (error) {
    res.status(403)
    res.json({ error: 'Si è verificato un errore' })
  }
  // console.log(req.headers)
  // next()
}

export default customHeader
