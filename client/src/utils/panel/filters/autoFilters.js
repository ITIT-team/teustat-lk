import { sortFunction } from "."


export const autoFilters = (records, filter, course) => {
    return records.filter(r => {
        if (!r.departureCity.includes(filter.depCity)) return false
        if (!r.destinationCity.includes(filter.desCity)) return false
        if (!r.service.includes(filter.agent)) return false
        if (!r.containerSize.includes(filter.size)) return false
        if (filter.future){
            if (Date.parse(r.date.split('T')[0]) <= Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        if (filter.today){
            if (Date.parse(r.date.split('T')[0]) !== Date.parse(new Date().toISOString().split('T')[0])) return false
        }
        return true
    }).sort((a, b) => sortFunction(a, b, filter, course))
}