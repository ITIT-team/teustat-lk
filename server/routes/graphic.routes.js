const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post('/get_filters_data/:field', async (request, response) => {
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

rt.post('/get_graphics_data', async (request, response) => {
  try {
    const { body } = request
    const {
      cityFrom,
      cityTo,
      service,
      containerSize,
      containerOwner,
      rateType,
      ratesType,
      dateFrom,
      dateTo
    } = body
    const bodyObj = {
      selection: true,
      groupDate: true,
      cityFrom,
      cityTo,
      service,
      containerSize,
      containerOwner,
      rateType,
      dateFrom,
      dateTo
    }
    const res = await myfetch({
      path: `/rates/serviceRegistry/${ratesType}`,
      body: bodyObj,
    })
    const course = await myfetch({
      path: '/rates/getOther/course'
    })
    const data = await res.json()
    const courseData = await course.json()
    if (data.error) {
      throw new Error(data.error)
    }
    if (courseData.error) {
      throw new Error(courseData.error)
    }
    response.status(200).json({
      records: data,
      course: courseData
    })
  } catch (e) {
    response.status(403).json({
      errors: [errorInHuman[e.message] || e.message]
    })
  }
})

module.exports = rt
