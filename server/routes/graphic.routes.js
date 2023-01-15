const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post('/get_filters_data/:field', async(request, response) => {
  try {
    const { body } = request
    const res = await myfetch({
      path: `/rates/selectionList/${request.params.field}`,
      body
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

module.exports = rt
