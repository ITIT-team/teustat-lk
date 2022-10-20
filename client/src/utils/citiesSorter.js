export const citiesSorter = (a, b) => {
  const c = Intl.Collator('ru')
  return c.compare(a.departureCity, b.departureCity)
}
