import {getDataFromRecords} from 'utils'

export const serviceGetter = (records, filter) => {
  return getDataFromRecords(records.filter(rec => {
    if (!rec.departureCity.includes(filter.depCity)) return false
    if (!rec.destinationCity.includes(filter.desCity)) return false
    if (!rec.typeUnit.includes(filter.typeUnit)) return false
    return true
  }), 'service')
}
