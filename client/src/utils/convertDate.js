export const convertDate = (date, locale='ru') => {
    if (date && date !== '') return new Date(date).toLocaleDateString(locale)
    else return '00.00.0000'
}
