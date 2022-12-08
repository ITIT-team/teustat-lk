import { getDataFromRecords } from 'utils'

export const servicesGetter = (records, filter) => {
  return getDataFromRecords(records.filter(r => {
    if (!r.departureCity.includes(filter.departureCity)) return false
    if (!r.destinationCity.includes(filter.destinationCity)) return false
    if (!r.containerSize.includes(filter.containerSize)) return false
    return true
  }), 'service')
}
