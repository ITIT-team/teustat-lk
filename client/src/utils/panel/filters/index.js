import {fraxtFilters} from './fraxtFilters'
import {jdFilters} from './jdFilters'
import {autoFilters} from './autoFilters'
import {givenFilters} from './givenFilters'
import {crossFilters} from './crossFilters'
import {groupageFilters} from './groupageFilters'
import {fraxtFiltersForGraphic} from './fraxtFiltersForGraphic'

export const sortFunction = (a, b, filter, course) => {
    const aRub = a.currency === 'USD' ? course.USD * a.rateUSD : (a.currency === 'EUR' ? course.EUR * a.rate : a.rate)
    const bRub = b.currency === 'USD' ? course.USD * b.rateUSD : (b.currency === 'EUR' ? course.EUR * b.rate : b.rate)
    switch (filter.rateSort) {
        case 'none': return null
        case 'up': return aRub - bRub
        case 'down': return bRub - aRub
        default: return null
    }
}

export const filterFraxt = fraxtFilters
export const filterJd = jdFilters
export const filterAuto = autoFilters
export const filterGiven = givenFilters
export const filterCross = crossFilters
export const filterGroupage = groupageFilters

export const graphFilterFraxt = fraxtFiltersForGraphic