import { getDataFromRecords } from 'utils'

export const departureCityGetter = (records, filter, services) => {
  return getDataFromRecords(records.filter(r => {
    if (services.length !== 0 && !services.includes(r.service)) return false
    if (!r.destinationCity.includes(filter.destinationCity)) return false
    if (!r.containerSize.includes(filter.containerSize)) return false
    return true
  }), 'departureCity', true)
}
