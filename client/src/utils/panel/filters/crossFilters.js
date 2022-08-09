import { sortFunction } from "."


export const crossFilters = (records, filter) => {
    return records.filter(rec => {
        if (!rec.departureCity.includes(filter.depCity)) return false
        if (!rec.destinationCity.includes(filter.desCity)) return false
        if (!rec.service.includes(filter.agent)) return false
        if (filter.s20 && rec.containerSize !== '20') return false
        if (filter.s40 && rec.containerSize !== '40') return false
        if (filter.s20t && rec.containerSize !== '20 фут.тяж.') return false
        if (filter.coc && rec.containerOwner !== 'COC') return false
        if (filter.soc && rec.containerOwner !== 'SOC') return false
        if (filter.import || filter.export || filter.kabotaj){
            if (rec.rateType === 'Импорт' && !filter.import) return false
            if (rec.rateType === 'Экспорт' && !filter.export) return false
            if (rec.rateType === 'Каботаж' && !filter.kabotaj) return false
            if (rec.rateType === '') return false
        }
        if (filter.future){
            if (Date.parse(rec.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filter.today){
            if (Date.parse(rec.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    }).sort((a, b) => sortFunction(a, b, filter))
}