export const fraxtFiltersForGraphic = (records, filter) => {
    console.warn(new Set(records.map(rec => rec.betType)))
    return records.filter(r => {
        
        if (!r.departureCity.includes(filter.depPort)) return false
        if (!r.destinationCity.includes(filter.desPort)) return false
        // if (filter.cityOfGiven !== '' && !flag){
        //     if (r.destinationDropOff.includes(filter.cityOfGiven)) flag = true
        // }
        // if (filter.depPort === '' && filter.desPort === ''){
        //     if (!r.destinationDropOff.includes(filter.cityOfGiven)) return false
        // }
        if (!r.service.includes(filter.agent)) return false
        if (filter.s20 || filter.s40){
            if (r.containerSize === '20' && !filter.s20) return false
            if (r.containerSize === '40' && !filter.s40) return false
            if (r.containerSize === '') return false
        }
        if (filter.coc || filter.soc){
            if (r.containerOwner === 'COC' && !filter.coc) return false
            if (r.containerOwner === 'SOC' && !filter.soc) return false
            if (r.containerOwner === '') return false
        }
        if (filter.import || filter.export || filter.kabotaj){
            if (r.rateType === 'Импорт' && !filter.import) return false
            if (r.rateType === 'Экспорт' && !filter.export) return false
            if (r.rateType === 'Каботаж' && !filter.kabotaj) return false
            if (r.rateType === '') return false
        }
        return true
    })
}