export const getDataFromRecords = (records, key = 'departureCity') => {
    let items = []
    records.forEach(r => {
        if (r[key] !== ""){
            items.push(r[key])
        }
    })
    const uniqItems = [...new Set(items)]
    return uniqItems.map(item => {
        if (['departureCity', 'destinationCity'].includes(key)){
            const findedRecord = records.find(r => r[key] === item)
            const country = findedRecord[`${key}Country`]
            const transcription = findedRecord[`${key}Rus`]
            return { city: item, country, transcription }
        }
        return item
    })
}