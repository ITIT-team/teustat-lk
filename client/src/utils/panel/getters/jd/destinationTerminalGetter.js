import {getDataFromRecords} from 'utils'


export const destinationTerminalGetter = (records, filters) => {
    return getDataFromRecords(records.filter(rec => {
        if (!rec.departureCity.includes(filters.depCity)) return false
        if (!rec.destinationCity.includes(filters.desCity)) return false
        if (!rec.departureStation.includes(filters.depStation)) return false
        if (!rec.destinationStation.includes(filters.desStation)) return false
        if (!rec.departureTerminal.includes(filters.depTerminal)) return false
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
        if (filters.import || filters.direct || filters.kabotaj || filters.export){
            if (rec.rateType === 'Импорт' && !filters.import) return false
            if (rec.rateType === 'ЖД Китай' && !filters.direct) return false
            if (rec.rateType === 'Каботаж' && !filters.kabotaj) return false
            if (rec.rateType === 'Экспорт' && !filters.export) return false
        }
        if (filters.future){
            if (Date.parse(rec.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filters.today){
            if (Date.parse(rec.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }), 'destinationTerminal')
}
