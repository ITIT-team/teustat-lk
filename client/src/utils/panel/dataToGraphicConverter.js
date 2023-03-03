import { monthStrToFirstDate } from './graphic'

export const dataToGraphicConverter = graphicsData => {
    let labels = []
    const datasets = graphicsData.filter(dataset => !dataset.hidded).map(dataset => {
        labels = labels.concat(dataset.records.map(r => r.month))
        let newMap = {
            label: `[ ${dataset.service.service} ] ${dataset.cityFrom.city} -> ${dataset.cityTo.city} (${dataset.containerSize})`,
            data: [].concat(...dataset.records
            .sort((a, b) => monthStrToFirstDate(a.month) - monthStrToFirstDate(b.month))
            .map(({ month, data }) => (
                data.map(rec => {
                    let obj = {}
                    if (rec.currency === 'USD') {
                        obj = { rate: rec.rateUSD, date: month }
                    } else {
                        obj = { rate: rec.rate, date: month }
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
    labels = labels.sort((a, b) => monthStrToFirstDate(a) - monthStrToFirstDate(b))
    console.warn(datasets)
    console.warn(labels)
    return  { datasets , labels: [ ...new Set(labels) ] }
}
