import {getDataFromRecords} from 'utils'


export const agentGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.departureCity.includes(filters.depCity)) return false
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (filters.s20 || filters.s40){
            if (rec.containerSize === '20' && !filters.s20) return false
            if (rec.containerSize === '40' && !filters.s40) return false
        }
        if (filters.import || filters.export || filters.kabotaj){
            if (rec.rateType === 'Импорт' && !filters.import) return false
            if (rec.rateType === 'Экспорт' && !filters.export) return false
            if (rec.rateType === 'Каботаж' && !filters.kabotaj) return false
        }
        if (filters.future){
            if (Date.parse(rec.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filters.today){
            if (Date.parse(rec.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    }), 'service')
}
