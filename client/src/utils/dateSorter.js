export const dateSorter = (a, b) =>
  new Date(b.date.split('T')[0]) - new Date(a.date.split('T')[0])
