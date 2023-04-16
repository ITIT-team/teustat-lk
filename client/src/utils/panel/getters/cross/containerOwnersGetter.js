import { getDataFromRecords } from 'utils'


export const containerOwnersGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.departureCity.includes(filters.depCity)) return false
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (!rec.service.includes(filters.agent)) return false
        if (filters.s20 || filters.s40 || filters.s20t){
            if (rec.containerSize === '20' && !filters.s20) return false
            if (rec.containerSize === '20 фут.тяж.' && !filters.s20t) return false
            if (rec.containerSize === '40' && !filters.s40) return false
        }
        if (filters.import || filters.export || filters.kabotaj){
            if (rec.rateType === 'Импорт' && !filters.import) return false
            if (rec.rateType === 'Экспорт' && !filters.export) return false
            if (rec.rateType === 'Каботаж' && !filters.kabotaj) return false
        }
        if (filters.future){
            if (Date.parse(rec.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filters.today){
            if (Date.parse(rec.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }), 'containerOwner')
}
