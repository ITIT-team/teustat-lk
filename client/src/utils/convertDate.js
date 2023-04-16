export const convertDate = (date, locale='ru-RU') => {
    if (date && date !== '') return new Date(date.split('T')[0]).toLocaleDateString(locale)
    else return '00.00.0000'
}
