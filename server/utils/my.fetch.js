const fetch = require('node-fetch')

const myfetch = async ({
    path,
    body=null,
    method='POST',
    contentType='application/json',
    headers={}
}) => {
    headers['Authorization'] = process.env['AUTH_HEADER']
    if (body){
        headers['Content-Type'] = contentType
        body = JSON.stringify(body)
    }
    return await fetch(`${process.env['1C_ADRESS']}${path}`, { method, body, headers })
}

module.exports = {
    myfetch
}
