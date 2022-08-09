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
            const country = records.find(r => r[key] === item)[`${key}Country`]
            return { city: item, country }
        }
        return item
    })
}