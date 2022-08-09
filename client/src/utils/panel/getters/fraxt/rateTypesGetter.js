import { getDataFromRecords } from 'utils'


export const rateTypesGetter = (records, filter) => {
    const mainData = records.filter(r => {
        if (r.departureCity === '' && r.destinationCity === '') return false
        if (!r.departureCity.includes(filter.depPort)) return false
        if (!r.destinationCity.includes(filter.desPort)) return false
        if (!r.service.includes(filter.agent)) return false
        if (!r.terminal.includes(filter.terminal)) return false
        if (filter.s20 || filter.s40){
            if (r.containerSize === '20' && !filter.s20) return false
            if (r.containerSize === '40' && !filter.s40) return false
        }
        if (filter.coc || filter.soc){
            if (r.containerOwner === 'COC' && !filter.coc) return false
            if (r.containerOwner === 'SOC' && !filter.soc) return false
        }
        if (filter.future){
            if (Date.parse(r.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filter.today){
            if (Date.parse(r.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    })

    const dropData = records.filter(r => {
        if (r.destinationDropOff === '') return false
        if (!r.destinationDropOff.includes(filter.cityOfGiven)) return false
        if (!r.service.includes(filter.agent)) return false
        return true
    })

    const result = mainData.map(rec => {
        if (rec.rateType === 'Импорт' && rec.containerOwner === 'COC'){
            const dropRec = dropData.find(r => r.containerSize === rec.containerSize && r.service === rec.service)
            if (dropRec){
                rec.destinationDropOff = dropRec.destinationDropOff
                rec.rateDropOff = dropRec.rateDropOff
            }
        }
        return rec
    })

    return getDataFromRecords(result.filter(r => r.destinationDropOff.includes(filter.cityOfGiven)), 'rateType')
}
