import {departureCityGetter} from './departureCityGetter'
import {destinationCityGetter} from './destinationCityGetter'
import {serviceGetter} from './serviceGetter'
import {givenCityGetter} from './givenCityGetter'
import {sizesGetter} from './sizesGetter'
import {ownershipsGetter} from './ownershipsGetter'
import {rateTypesGetter} from './rateTypesGetter'
import { futureDatesGetter } from './futureDatesGetter'
import {todayDatesGetter} from './todayDatesGetter'
import {terminalsGetter} from './terminalsGetter'

export const departureCities = departureCityGetter
export const destinationCities = destinationCityGetter
export const services = serviceGetter
export const givenCities = givenCityGetter
export const sizes = sizesGetter
export const ownerships = ownershipsGetter
export const rateTypes = rateTypesGetter
export const todayDates = todayDatesGetter
export const futureDates = futureDatesGetter
export const terminals = terminalsGetter