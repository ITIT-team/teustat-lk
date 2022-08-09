import {getDataFromRecords} from 'utils'

export const typeUnitGetter = (records, filter) => {
  return getDataFromRecords(records.filter(rec => {
    if (!rec.departureCity.includes(filter.depCity)) return false
    if (!rec.destinationCity.includes(filter.desCity)) return false
    if (!rec.service.includes(filter.agent)) return false
    return true
  }), 'typeUnit')
}
