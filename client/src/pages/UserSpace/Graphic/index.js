import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useHttp } from 'hooks'
import { INITIAL_GRAPHIC_FILTERS_STATE } from 'constants/PanelConstants'
import { dataToGraphicConverter } from 'utils/panel/dataToGraphicConverter'
import { fitlerGraphic } from 'utils/panel/filters'
import * as G from 'utils/panel/getters/graphic'
import { GRAPHIC_INITIALIZE_OPTIONS } from 'constants/PanelConstants'
import { Select } from 'components/Global/Select'
import { Loader } from 'components/Global/Loader'
import c from 'styles/PanelPage/Graphic/main.module.css'

import MapPointIcon from 'assets/panel/tabs/map_point_icon.svg'
import FlagIcon from 'assets/panel/tabs/flag_icon.svg'
import ContainerIcon from 'assets/panel/tabs/container_icon.svg'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Graphic = () => {
    const { request } = useHttp()
    const [records, setRecords] = useState([])
    const [filters, setFilters] = useState(INITIAL_GRAPHIC_FILTERS_STATE)
    const [services, setServices] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { quantityPart } = await request('/trial/get_graphics_parts_count', { category: 'freight' })
                let promises = []
                for (let i = 0; i < quantityPart; i++){
                    promises[i] = request('/trial/get_graphics_data', { category: 'freight', numberPart: i + 1 })
                }
                const result = await Promise.all(promises)
                setRecords([].concat(...result))
            } catch (e) {
                console.warn(e)
            }
        })()
    }, [ request ])

    return records.length !== 0 ? (
        <div className={c.graphic_container}>
            <div className={c.graphic_filters}>
                <div className={c.one_filter}>
                    <Select
                        items={G.departureCityGetter(records, filters, services)}
                        result={filters.departureCity}
                        setResult={val => setFilters(prev => ({ ...prev, departureCity: val }))}
                        placeholder='Город отправления'
                        logo={MapPointIcon}
                    />
                </div>
                <div className={c.one_filter}>
                    <Select
                        items={G.destinationCityGetter(records, filters, services)}
                        result={filters.destinationCity}
                        setResult={val => setFilters(prev => ({ ...prev, destinationCity: val }))}
                        placeholder='Город назначения'
                        logo={FlagIcon}
                    />
                </div>
                <div className={c.one_filter}>
                    <Select
                        items={G.containerSizeGetter(records, filters, services)}
                        result={filters.containerSize}
                        setResult={val => setFilters(prev => ({ ...prev, containerSize: val }))}
                        placeholder='Размер'
                        logo={ContainerIcon}
                        withoutBorder
                    />
                </div>
            </div>
            <div className={c.services_block}>
                {
                    G.servicesGetter(records, filters).map((service, index) =>
                        <div
                            key={index}
                            className={c.one_service}
                            onClick={() => setServices(prev =>
                                prev.includes(service) ? prev.filter(s => s !== service) : prev.concat(service)
                            )}
                        >
                            {services.includes(service) ? '+' : ''} {service}
                        </div>
                    )
                }
            </div>
            <Line
                options={GRAPHIC_INITIALIZE_OPTIONS}
                data={dataToGraphicConverter(fitlerGraphic(records, filters, services))}
                height={600}
            />
        </div>
    ) : <Loader />
}
