const { validationResult } = require('express-validator')

const checkErrors = (request) => {
    let tmp = false
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()){
        tmp = validationErrors.array()
    }
    return tmp ? { errors: tmp } : tmp
}

module.exports = {
    checkErrors
}
