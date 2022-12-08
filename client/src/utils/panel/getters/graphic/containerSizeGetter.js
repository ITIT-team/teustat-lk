import { getDataFromRecords } from 'utils'

export const containerSizeGetter = (records, filter, services) => {
  return getDataFromRecords(records.filter(r => {
    if (services.length !== 0 && !services.includes(r.service)) return false
    if (!r.departureCity.includes(filter.departureCity)) return false
    if (!r.destinationCity.includes(filter.destinationCity)) return false
    return true
  }), 'containerSize', true)
}
