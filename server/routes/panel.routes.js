const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post('/get_data', async(request, response) => {
  const { body } = request
  try {
    const { routePath, clientDate, language } = body
    const res = await myfetch({
      path: `/rates${routePath}`,
      body: {
        token: process.env.TOKEN_TEUSTAT,
        clientDate,
        language,
      },
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

rt.post('/get_pdf', async(request, response) => {
  const { body } = request
  try {
    const { idPrice } = body
    const res = await myfetch({
      path: '/rates/getOther/price',
      body: { idPrice },
    })
    const baseContent = await res.text()
    response.status(200).json({ baseContent })
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

rt.post('/get_rate_details', async(request, response) => {
  const { body } = request
  try {
    const res = await myfetch({
      path: '/rates/getOther/rateDetails',
      body
    })
    const data = await res.json()
    response.status(200).json(data)
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

module.exports = rt
