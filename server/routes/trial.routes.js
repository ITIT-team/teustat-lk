const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post('/get_panel_data', async (request, response) => {
  try {
    const { body } = request
    const { routePath, clientDate, language } = body
    const res = await myfetch({
      path: `/rates${routePath}`,
      body: {
        token: process.env.TOKEN_TEUSTAT,
        clientDate,
        language,
        demo: true
      }
    })
    const data = await res.json()
    if (data.error){
      throw new Error(data.error)
    }
    response.status(200).json(data)
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

module.exports = rt
