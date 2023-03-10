export const dataToGraphicConverter = (graphicsData) => {
    const datasets = graphicsData.filter(dataset => !dataset.hidded).map(dataset => {
        const dollarCourse = dataset.course.currency.USD
        let newMap = {
            label: `[ ${dataset.service.service} ] ${dataset.cityFrom.city} -> ${dataset.cityTo.city} (${dataset.containerSize})`,
            data: dataset.records
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(rec => ({rate: rec.rate, rateUSD: Math.round(rec.rate / dollarCourse), date: rec.date}))
            ,
            borderColor: dataset.datasetColor,
            backgroundColor: dataset.datasetColor,
            parsing: {
                yAxisKey: 'rate',
                xAxisKey: 'date'
            }
        }
        return newMap
    })
    return { datasets }
}
