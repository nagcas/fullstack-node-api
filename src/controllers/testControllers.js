// NOTE: funzione per visualizzare il test del server
// Questa funzione serve come endpoint di test per verificare
// che il server sia attivo e funzionante. Risponde con un messaggio
// di conferma e uno status 200. In caso di errore, restituisce uno status 500
// con un messaggio di errore generico.
export const testController = async (req, res) => {
  try {
    console.log('TEST: Server avviato correttamente')
    res.status(200).json({
      status: 200,
      message: 'Server avviato correttamente'
    })
  } catch (error) {
    console.error('TEST: Server errore. Riprova più tardi')
    res.status(500).json({
      status: 500,
      error: 'TEST: Server errore. Riprova più tardi'
    })
  }
}
