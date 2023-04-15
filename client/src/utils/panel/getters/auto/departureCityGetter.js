import { getDataFromRecords } from 'utils'

export const departureCityGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (!rec.service.includes(filters.agent)) return false
        if (!rec.containerSize.includes(filters.size)) return false
        if (filters.future){
            if (Date.parse(rec.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filters.today){
            if (Date.parse(rec.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }))
}
