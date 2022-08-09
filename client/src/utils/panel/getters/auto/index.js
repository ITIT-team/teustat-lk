import { departureCityGetter } from './departureCityGetter'
import { destinationCityGetter } from './destinationCityGetter'
import { futureDatesGetter } from './futureDatesGetter'
import { serviceGetter } from './serviceGetter'
import { sizesGetter } from './sizesGetter'
import { todayDatesGetter } from './todayDatesGetter'

export const departureCity = departureCityGetter
export const destinationCity = destinationCityGetter
export const service = serviceGetter
export const size = sizesGetter
export const todayDates = todayDatesGetter
export const futureDates = futureDatesGetter