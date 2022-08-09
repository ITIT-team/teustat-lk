import {sortFunction} from '.'

export const groupageFilters = (records, filter) => {
  return records.filter(r => {
    if (!r.departureCity.includes(filter.depCity)) return false
    if (!r.destinationCity.includes(filter.desCity)) return false
    if (!r.typeUnit.includes(filter.typeUnit)) return false
    if (!r.service.includes(filter.agent)) return false
    return true
  }).map(r => {
    if (!r.commonList){
      r.currency = 'USD'
    }
    return r
  }).sort((a, b) => sortFunction(a, b, filter)).sort((_, b) => b.commonList ? 1 : -1)
}
