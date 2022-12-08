const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post('/get_graphics_data', async(request, response) => {
  const { body } = request
  try {
    const res = await myfetch({
      path: `/rates/serviceRegistry/${body.category}`,
      body: {
        receiveDataPart: false,
        rateType: 'Импорт',
        numberPart: body.numberPart
      }
    })
    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
    response.status(200).json(data)
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

rt.post('/get_graphics_parts_count', async(request, response) => {
  try {
    const res = await myfetch({
      path: `/rates/serviceRegistry/${request.body.category}`,
      body: {
        receiveDataPart: true,
        rateType: 'Импорт',
        numberPart: 0
      }
    })
    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
    response.status(200).json(data)
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

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
