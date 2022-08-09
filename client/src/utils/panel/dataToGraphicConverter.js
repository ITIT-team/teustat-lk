import { getRandomColor } from 'utils'

export const dataToGraphicConverter = records => {
    const ways = [ ...new Set(records.map(rec => `${rec.departureCity} -> ${rec.destinationCity} (${rec.service})(${rec.containerSize})`))]
    let labels = []
    const recordsMap = ways.map(way => {
        const recordsOnWays = records.filter(rec => `${rec.departureCity} -> ${rec.destinationCity} (${rec.service})(${rec.containerSize})` === way)
        labels = labels.concat(recordsOnWays.map(r => r.date))
        const lineColor = getRandomColor()
        const newMap = {
            label: way,
            data: recordsOnWays.map(rec => 
                rec.currency === 'USD' ? 
                ({rate: rec.rateUSD, date: rec.date.split('-').reverse().join('.')})
                :
                ({rate: rec.rate, date: rec.date.split('-').reverse().join('.')})),
            borderColor: lineColor,
            backgroundColor: lineColor,
            yAxisID: recordsOnWays[0].currency === 'USD' ? 'usd' : 'rub',
            parsing: {
                yAxisKey: 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    })
    labels = labels.sort((a, b) => new Date(a) - new Date(b)).map(lab => lab.split('-').reverse().join('.'))
    return  { recordsMap , labels: [ ...new Set(labels) ] }
}