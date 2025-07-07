// NOTE: middleware per la verifica di una API key personalizzata
// Questo middleware controlla la presenza e la validità di una API key
// nei headers della richiesta (`api_key`). Se la chiave è corretta,
// la richiesta prosegue; altrimenti viene bloccata con errore 403 (Forbidden).
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
    res.json({ error: "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste." })
  }
}

export default customHeader
