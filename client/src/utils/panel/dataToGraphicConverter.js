export const dataToGraphicConverter = graphicsData => {
    let labels = []
    const datasets = graphicsData.filter(data => !data.hidded).map(data => {
        labels = labels.concat(data.records.map(r => r.date))
        let newMap = {
            label: `[ ${data.service.service} ] ${data.cityFrom.city} -> ${data.cityTo.city} (${data.containerSize})`,
            data: data.records.sort((a, b) => new Date(a.date) - new Date(b.date)).map(rec => {
                let obj = {}
                if (rec.currency === 'USD') {
                    obj = { rate: rec.rateUSD, date: rec.date }
                } else {
                    obj = { rate: rec.rate, date: rec.date }
                }
                return obj
            }),
            borderColor: data.datasetColor,
            backgroundColor: data.datasetColor,
            yAxisID: data.records[0]?.currency === 'USD' ? 'usd' : 'rub',
            parsing: {
                yAxisKey: 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    })
    labels = labels.sort((a, b) => new Date(a) - new Date(b))
    return  { datasets , labels: [ ...new Set(labels) ] }
}