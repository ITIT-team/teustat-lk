import { getDataFromRecords } from 'utils'


export const todayDatesGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.departureCity.includes(filters.depCity)) return false
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (!rec.service.includes(filters.agent)) return false
        if (!rec.containerSize.includes(filters.size)) return false
        if (Date.parse(rec.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        return true
    }), 'date')
}
