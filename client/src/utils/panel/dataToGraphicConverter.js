import { getRandomColor } from 'utils'

export const dataToGraphicConverter = records => {
    const ways = [ ...new Set(records.map(rec => `[ ${rec.service} ] ${rec.departureCity} -> ${rec.destinationCity} (${rec.containerSize})`)) ]
    let labels = []
    let datasets = ways.map(way => {
        const recordsOnWays = records.filter(rec => `[ ${rec.service} ] ${rec.departureCity} -> ${rec.destinationCity} (${rec.containerSize})` === way)
        labels = labels.concat(recordsOnWays.map(r => r.date))
        const lineColor = getRandomColor()
        let newMap = {
            label: way,
            data: recordsOnWays.map(rec => {
                let obj = {}
                if (rec.currencty === 'USD') {
                    obj = {rate: rec.rateUSD, date: rec.date}
                } else {
                    obj = {rate: rec.rate, date: rec.date}
                }
                return obj
            }),
            borderColor: lineColor,
            backgroundColor: lineColor,
            yAxisID: recordsOnWays[0].currency === 'USD' ? 'usd' : 'rub',
            parsing: {
                yAxisKey: 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    }).map(dataset => {
        dataset.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        return dataset
    })
    labels = labels.sort((a, b) => new Date(a) - new Date(b))
    return  { datasets , labels: [ ...new Set(labels) ] }
}