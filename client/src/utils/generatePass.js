export const generatePassword = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    do {
        result += chars[Math.floor(Math.random() * (chars.length))]
    } while(result.length < 8)
    
    return result
}
