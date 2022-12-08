export const graphicFilters = (records, filters, services) => {
  return records.filter(r => {
    if (!r.departureCity.includes(filters.departureCity)) return false
    if (!r.destinationCity.includes(filters.destinationCity)) return false
    if (!r.containerSize.includes(filters.containerSize)) return false
    if (!services.includes(r.service)) return false
    return true
  })
}
