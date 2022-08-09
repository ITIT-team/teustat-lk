import { getDataFromRecords } from 'utils'


export const givenCityGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (filters.soc) return false
        if (!rec.service.includes(filters.agent)) return false
        if (filters.future){
            if (Date.parse(rec.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filters.today){
            if (Date.parse(rec.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    }), 'destinationDropOff')
}
