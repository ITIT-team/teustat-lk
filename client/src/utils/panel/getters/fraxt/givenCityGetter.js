import { getDataFromRecords } from 'utils'


export const givenCityGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (filters.soc) return false
        if (!rec.service.includes(filters.agent)) return false
        if (filters.future){
            if (Date.parse(rec.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filters.today){
            if (Date.parse(rec.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }), 'destinationDropOff')
}
