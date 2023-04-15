export const dataToGraphicConverter = (graphicsData) => {
    const datasets = graphicsData.filter(dataset => !dataset.hidded).map(dataset => {
        const dollarCourse = dataset.course.currency.USD
        let newMap = {
            label: `[ ${dataset.service.service} ] ${dataset.cityFrom.city || ''} -> ${dataset.cityTo.city} (${dataset.containerSize})`,
            data: dataset.records
                .sort((a, b) => new Date(a.date.split('T')[0]) - new Date(b.date.split('T')[0]))
                .map(rec => {
                    let curr = rec.betType === 'DropOff' ? 'USD' : rec.currency
                    let obj = {
                        rate: 0,
                        rateUSD: 0,
                        date: rec.date
                    }
                    if (curr === 'USD') {
                        obj.rate = rec.rateUSD * dollarCourse
                        obj.rateUSD = rec.rateUSD
                    } else {
                        obj.rate = rec.rate
                        obj.rateUSD = rec.rate / dollarCourse
                    }
                    return obj
                })
            ,
            borderColor: dataset.datasetColor,
            backgroundColor: dataset.datasetColor,
            yAxisID: dataset.records[0].currency === 'USD' ? 'y1' : 'y',
            parsing: {
                yAxisKey: dataset.records[0].currency === 'USD' ? 'rateUSD' : 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    })
    return { datasets }
}
