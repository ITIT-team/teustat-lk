import {getDataFromRecords} from 'utils'

export const departureCityGetter = (records, filter) => {
  return getDataFromRecords(records.filter(rec => {
    if (!rec.destinationCity.includes(filter.desCity)) return false
    if (!rec.typeUnit.includes(filter.typeUnit)) return false
    if (!rec.service.includes(filter.agent)) return false
    return true
  }))
}
