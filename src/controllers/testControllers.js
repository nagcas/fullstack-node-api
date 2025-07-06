// NOTE: funzione per visualizzate il test del server
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
