import { MONTH_DICTIONARY } from 'constants/GlobalConstants'

export const monthStrToDictionary = monthStr => {
  const month = MONTH_DICTIONARY[parseInt(monthStr.split('.')[0]) - 1]
  const year = monthStr.split('.')[1]
  return `${month} ${year}`
}
