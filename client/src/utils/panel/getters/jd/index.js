import {departureCityGetter} from './departureCityGetter'
import {destinationCityGetter} from './destinationCityGetter'
import {serviceGetter} from './serviceGetter'
import {sizesGetter} from './sizesGetter'
import {ownershipsGetter} from './ownershipsGetter'
import {rateTypesGetter} from './rateTypesGetter'
import {departureStationGetter} from './departureStationGetter'
import {destinationStationGetter} from './destinationStationGetter'
import {departureTerminalGetter} from './departureTerminalGetter'
import {destinationTerminalGetter} from './destinationTerminalGetter'
import {todayDatesGetter} from './todayDatesGetter'
import {futureDatesGetter} from './futureDatesGetter'

export const departureCities = departureCityGetter
export const destinationCities = destinationCityGetter
export const services = serviceGetter
export const sizes = sizesGetter
export const ownerships = ownershipsGetter
export const rateTypes = rateTypesGetter
export const departureStations = departureStationGetter
export const destinationStations = destinationStationGetter
export const departureTerminals = departureTerminalGetter
export const destinationTerminals = destinationTerminalGetter
export const todayDates = todayDatesGetter
export const futureDates = futureDatesGetter