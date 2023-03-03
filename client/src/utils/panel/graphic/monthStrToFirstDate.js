export const monthStrToFirstDate = monthStr => (
  new Date(monthStr.split('.').reverse().join('-'))
)
