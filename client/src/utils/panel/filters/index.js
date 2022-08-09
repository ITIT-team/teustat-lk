import {fraxtFilters} from './fraxtFilters'
import {jdFilters} from './jdFilters'
import {autoFilters} from './autoFilters'
import {givenFilters} from './givenFilters'
import {crossFilters} from './crossFilters'
import {groupageFilters} from './groupageFilters'
import {fraxtFiltersForGraphic} from './fraxtFiltersForGraphic'

export const sortFunction = (a, b, filter) => {
    let result = null
    switch (filter.rateSort) {
        case 'none': return result
        case 'up':
            if (a.currency === 'USD' && b.currency === 'USD') result = a.rateUSD - b.rateUSD
            else result = a.rate - b.rate
            break
        case 'down':
            if (a.currency === 'USD' && b.currency === 'USD') result = b.rateUSD - a.rateUSD
            else result = b.rate - a.rate
            break
        default: break
    }
    return result
}

export const filterFraxt = fraxtFilters
export const filterJd = jdFilters
export const filterAuto = autoFilters
export const filterGiven = givenFilters
export const filterCross = crossFilters
export const filterGroupage = groupageFilters

export const graphFilterFraxt = fraxtFiltersForGraphic