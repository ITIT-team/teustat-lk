import {departureCityGetter} from './departureCityGetter'
import {destinationCityGetter} from './destinationCityGetter'
import {sizesGetter} from './sizesGetter'
import {rateTypesGetter} from './rateTypesGetter'
import {agentGetter} from './agentGetter'
import {todayDatesGetter} from './todayDatesGetter'
import {futureDatesGetter} from './futureDatesGetter'
import {containerOwnersGetter} from './containerOwnersGetter'

export const departureCities = departureCityGetter
export const destinationCities = destinationCityGetter
export const sizes = sizesGetter
export const rateTypes = rateTypesGetter
export const agents = agentGetter
export const todayDates = todayDatesGetter
export const futureDates = futureDatesGetter
export const containerOwners = containerOwnersGetter