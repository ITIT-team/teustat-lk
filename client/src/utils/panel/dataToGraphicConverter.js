import { monthStrToFirstDate } from './graphic'

export const dataToGraphicConverter = graphicsData => {
    let labels = []
    const datasets = graphicsData.filter(dataset => !dataset.hidded).map(dataset => {
        if (dataset.records.length) {
            let minDate = new Date(Math.min(...dataset.records.map(r => monthStrToFirstDate(r.month))))
                .toLocaleDateString('ru-RU').split('.')
            minDate.splice(0, 1)
            minDate = minDate.join('.')
            let maxDate = new Date(Math.max(...dataset.records.map(r => monthStrToFirstDate(r.month))))
                .toLocaleDateString('ru-RU').split('.')
            maxDate.splice(0, 1)
            maxDate = maxDate.join('.')
            labels.push(minDate)
            let currentDate = monthStrToFirstDate(minDate)
            while (true) {
                currentDate.setMonth(currentDate.getMonth() + 1)
                let currentDateArr = currentDate.toLocaleDateString('ru-RU').split('.')
                currentDateArr.splice(0, 1)
                const monthStr = currentDateArr.join('.')
                labels.push(monthStr)
                if (monthStr === maxDate) {
                    break
                }
            }
        }
        let newMap = {
            label: `[ ${dataset.service.service} ] ${dataset.cityFrom.city} -> ${dataset.cityTo.city} (${dataset.containerSize})`,
            data: [].concat(...dataset.records
                .sort((a, b) => monthStrToFirstDate(a.month) - monthStrToFirstDate(b.month))
                .map(({ month, data }) => (
                    data.map(rec => {
                        let obj = {}
                        if (rec.currency === 'USD') {
                            obj = { rate: rec.rateUSD, date: month, fullDate: rec.date }
                        } else {
                            obj = { rate: rec.rate, date: month, fullDate: rec.date }
                        }
                        return obj
                    })
                ))),
            borderColor: dataset.datasetColor,
            backgroundColor: dataset.datasetColor,
            yAxisID: dataset.records[0]?.currency === 'USD' ? 'usd' : 'rub',
            parsing: {
                yAxisKey: 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    })
    console.warn(datasets)
    labels = labels
        .sort((a, b) => monthStrToFirstDate(a) - monthStrToFirstDate(b))
    return { datasets, labels: [...new Set(labels)] }
}
