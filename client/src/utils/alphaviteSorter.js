export const alphaviteSorter = array => {
    const c = new Intl.Collator('ru')
    return array.sort((a, b) => c.compare(a, b))
}