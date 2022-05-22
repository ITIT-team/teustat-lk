const { validationResult } = require('express-validator')

const checkErrors = (request) => {
    let tmp = false
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()){
        tmp = validationErrors.array()
        tmp = tmp.map(er => er.msg)
    }
    return tmp
}

module.exports = {
    checkErrors
}
