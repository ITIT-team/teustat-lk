import {getDataFromRecords} from 'utils'

export const destinationCityGetter = (records, filter) => {
  return getDataFromRecords(records.filter(rec => {
    if (!rec.departureCity.includes(filter.depCity)) return false
    if (!rec.typeUnit.includes(filter.typeUnit)) return false
    if (!rec.service.includes(filter.agent)) return false
    return true
  }), 'destinationCity')
}
