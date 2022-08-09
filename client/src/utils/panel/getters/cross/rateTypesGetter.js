import { getDataFromRecords } from 'utils'


export const rateTypesGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.departureCity.includes(filters.depCity)) return false
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (!rec.service.includes(filters.agent)) return false
        if (filters.s20 || filters.s40 || filters.s20t){
            if (rec.containerSize === '20' && !filters.s20) return false
            if (rec.containerSize === '20 фут.тяж.' && !filters.s20t) return false
            if (rec.containerSize === '40' && !filters.s40) return false
        }
        if (filters.coc || filters.soc){
            if (rec.containerOwner === 'COC' && !filters.coc) return false
            if (rec.containerOwner === 'SOC' && !filters.soc) return false
        }
        if (filters.future){
            if (Date.parse(rec.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filters.today){
            if (Date.parse(rec.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    }), 'rateType')
}
