import { sortFunction } from "."


export const givenFilters = (records, filter, course) => {
    return records.filter(r => {
        if (!r.departureCity.includes(filter.depCity)) return false
        if (!r.destinationCity.includes(filter.desCity)) return false
        if (!r.service.includes(filter.agent)) return false
        if (filter.s20 && r.containerSize !== '20') return false
        if (filter.s40 && r.containerSize !== '40') return false
        if (filter.import || filter.export || filter.kabotaj){
            if (r.rateType === 'Импорт' && !filter.import) return false
            if (r.rateType === 'Экспорт' && !filter.export) return false
            if (r.rateType === 'Каботаж' && !filter.kabotaj) return false
            if (r.rateType === '') return false
        }
        if (filter.future){
            if (Date.parse(r.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filter.today){
            if (Date.parse(r.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }).sort((a, b) => sortFunction(a, b, filter, course))
}