import { getDataFromRecords } from 'utils'

export const todayDatesGetter = (records, filter) => getDataFromRecords(records.filter(rec => {
    if (!rec.departureCity.includes(filter.depCity)) return false
    if (!rec.destinationCity.includes(filter.desCity)) return false
    if (!rec.service.includes(filter.agent)) return false
    if (!rec.departureStation.includes(filter.depStation)) return false
    if (!rec.destinationStation.includes(filter.desStation)) return false
    if (!rec.departureTerminal.includes(filter.depTerminal)) return false
    if (!rec.destinationTerminal.includes(filter.desTerminal)) return false
    if (filter.s20 && rec.containerSize !== '20') return false
    if (filter.s40 && rec.containerSize !== '40') return false
    if (filter.s20t && rec.containerSize !== '20 фут.тяж.') return false
    if (filter.coc && rec.containerOwner !== 'COC') return false
    if (filter.soc && rec.containerOwner !== 'SOC') return false
    if (filter.import || filter.direct || filter.kabotaj || filter.export){
        if (rec.rateType === 'Импорт' && !filter.import) return false
        if (rec.rateType === 'ЖД Китай' && !filter.direct) return false
        if (rec.rateType === 'Каботаж' && !filter.kabotaj) return false
        if (rec.rateType === 'Экспорт' && !filter.export) return false
        if (rec.rateType === '') return false
    }
    if (Date.parse(rec.date.split('T')[0].split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
    return true
}), 'date')
