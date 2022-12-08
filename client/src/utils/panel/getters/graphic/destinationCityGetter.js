import { getDataFromRecords } from 'utils'

export const destinationCityGetter = (records, filter, services) => {
  return getDataFromRecords(records.filter(r => {
    if (services.length !== 0 && !services.includes(r.service)) return false
    if (!r.departureCity.includes(filter.departureCity)) return false
    if (!r.containerSize.includes(filter.containerSize)) return false
    return true
  }), 'destinationCity', true)
}
