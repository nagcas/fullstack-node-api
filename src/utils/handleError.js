const handleHttpError = (res, message = 'Errore del server', code = 500) => {
  res.status(code)
  res.json({ error: message })
}

export default handleHttpError
