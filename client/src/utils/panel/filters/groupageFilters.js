import {sortFunction} from '.'
import { PanelLocale } from 'locales'

const symbolKeys = {
  'Объем': 'объем',
  'Volume': 'объем',
  '体积': 'объем',
  'Вес': 'вес',
  'Weight': 'вес',
  '重量': 'вес',
  'Объем/Вес': 'объем/вес',
  'Volume/Weight': 'объем/вес',
  '体积/重量': 'объем/вес',
}

export const groupageFilters = (records, filter, course, locale='ru') => {
  let difficultWays = []
  let simpleWays = []
  records.forEach(r => r.commonList ? simpleWays.push(r) : difficultWays.push(r))
  return simpleWays
  .concat(difficultWays)
  .sort((a, b) => sortFunction(a, b, filter, course))
  .filter(r => {
    if (!r.departureCity.includes(filter.depCity)) return false
    if (!r.destinationCity.includes(filter.desCity)) return false
    if (!r.typeUnit.includes(filter.typeUnit)) return false
    if (!r.service.includes(filter.agent)) return false
    return true
  })
  .map(r => {
    if (!r.commonList){
      r.currency = 'USD'
      r.betType = 'Фрахт'
    }
    r.typeUnit = PanelLocale[symbolKeys[r.typeUnit]][locale]
    return r
  })
}
