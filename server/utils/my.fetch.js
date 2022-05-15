const fetch = require('node-fetch')

const myfetch = async ({
    path,
    method='POST',
    body,
    headers
}) => {
    headers['Authorization'] = process.env.AUTH_HEADER
    if (body){
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
    }
    return await fetch(`${process.env['1C_ADRESS']}${path}`, {method, body, headers})
}

module.exports = {
    myfetch
}
