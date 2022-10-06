import { sortFunction } from '.'


export const fraxtFilters = (records, filter, course) => {
    const mainData = records.filter(r => {
        if (r.departureCity === '' && r.destinationCity === '') return false
        if (!r.departureCity.includes(filter.depPort)) return false
        if (!r.destinationCity.includes(filter.desPort)) return false
        if (!r.service.includes(filter.agent)) return false
        if (!r.terminal.includes(filter.terminal)) return false
        if (filter.s20 && r.containerSize !== '20') return false
        if (filter.s40 && r.containerSize !== '40') return false
        if (filter.coc && r.containerOwner !== 'COC') return false
        if (filter.soc && r.containerOwner !== 'SOC') return false
        if (filter.import || filter.export || filter.kabotaj){
            if (r.rateType === 'Импорт' && !filter.import) return false
            if (r.rateType === 'Экспорт' && !filter.export) return false
            if (r.rateType === 'Каботаж' && !filter.kabotaj) return false
            if (r.rateType === '') return false
        }
        if (filter.future){
            if (Date.parse(r.date) <= Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        if (filter.today){
            if (Date.parse(r.date) !== Date.parse(new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-'))) return false
        }
        return true
    }).sort((a, b) => sortFunction(a, b, filter, course))

    const dropData = records.filter(r => {
        if (r.destinationDropOff === '') return false
        if (!r.destinationDropOff.includes(filter.cityOfGiven)) return false
        if (!r.service.includes(filter.agent)) return false
        return true
    })

    const result = mainData.map(rec => {
        if (rec.rateType === 'Импорт' && rec.containerOwner === 'COC'){
            const dropRec = dropData.find(r => r.containerSize === rec.containerSize && r.service === rec.service)
            if (dropRec){
                rec.destinationDropOff = dropRec.destinationDropOff
                rec.rateDropOff = dropRec.rateDropOff
            }
        }
        return rec
    })

    return result.filter(r => r.destinationDropOff.includes(filter.cityOfGiven))
}
