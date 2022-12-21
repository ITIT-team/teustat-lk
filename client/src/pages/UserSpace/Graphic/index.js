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
import {
    INITIAL_GRAPHIC_FILTERS_STATE,
    INITIAL_GRAPHIC_TABS_STATE,
    GRAPHIC_TAB_ID
} from 'constants/PanelConstants'
import { dataToGraphicConverter } from 'utils/panel/dataToGraphicConverter'
import { fitlerGraphic } from 'utils/panel/filters'
import * as G from 'utils/panel/getters/graphic'
import { GRAPHIC_INITIALIZE_OPTIONS } from 'constants/PanelConstants'
import { FilterPanel } from 'components/Graphic'
import { StartScreen } from 'components/Graphic/StartScreen'
import c from 'styles/Graphic/main.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Graphic = () => {
    const [tabs, setTabs] = useState(INITIAL_GRAPHIC_TABS_STATE)
    const [activetab, setActivetab] = useState(GRAPHIC_TAB_ID.CROSS)
    const [datasets, setDatasets] = useState(null)

    const tabsSetter = (id, changes = {}) => {
        let newTabs = JSON.parse(JSON.stringify(tabs))
        let tabRef = newTabs.find(t => t.id === id)
        Object.keys(changes).forEach(key => {
            tabRef[key] = changes[key]
        })
        setTabs(newTabs)
    }

    return (
        <div className={c.container}>
            <FilterPanel
                tabs={tabs}
                tabsSetter={tabsSetter}
                activetab={activetab}
                setActivetab={setActivetab}
            />
            {
                datasets ?
                <div>some data</div>
                :
                <StartScreen />
            }
        </div>
    )
    // const { request } = useHttp()
    // const [records, setRecords] = useState([])
    // const [filters, setFilters] = useState(INITIAL_GRAPHIC_FILTERS_STATE)
    // const [services, setServices] = useState([])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { quantityPart } = await request('/trial/get_graphics_parts_count', { category: 'freight' })
    //             let promises = []
    //             for (let i = 0; i < quantityPart; i++){
    //                 promises[i] = request('/trial/get_graphics_data', { category: 'freight', numberPart: i + 1 })
    //             }
    //             const result = await Promise.all(promises)
    //             setRecords([].concat(...result))
    //         } catch (e) {
    //             console.warn(e)
    //         }
    //     })()
    // }, [ request ])

    // return records.length !== 0 ? (
    //     <div className={c.graphic_container}>
    //         <div className={c.graphic_filters}>
    //             <div className={c.one_filter}>
    //                 <Select
    //                     items={G.departureCityGetter(records, filters, services)}
    //                     result={filters.departureCity}
    //                     setResult={val => setFilters(prev => ({ ...prev, departureCity: val }))}
    //                     placeholder='Город отправления'
    //                     logo={MapPointIcon}
    //                 />
    //             </div>
    //             <div className={c.one_filter}>
    //                 <Select
    //                     items={G.destinationCityGetter(records, filters, services)}
    //                     result={filters.destinationCity}
    //                     setResult={val => setFilters(prev => ({ ...prev, destinationCity: val }))}
    //                     placeholder='Город назначения'
    //                     logo={FlagIcon}
    //                 />
    //             </div>
    //             <div className={c.one_filter}>
    //                 <Select
    //                     items={G.containerSizeGetter(records, filters, services)}
    //                     result={filters.containerSize}
    //                     setResult={val => setFilters(prev => ({ ...prev, containerSize: val }))}
    //                     placeholder='Размер'
    //                     logo={ContainerIcon}
    //                     withoutBorder
    //                 />
    //             </div>
    //         </div>
    //         <div className={c.services_block}>
    //             {
    //                 G.servicesGetter(records, filters).map((service, index) =>
    //                     <div
    //                         key={index}
    //                         className={c.one_service}
    //                         onClick={() => setServices(prev =>
    //                             prev.includes(service) ? prev.filter(s => s !== service) : prev.concat(service)
    //                         )}
    //                     >
    //                         {services.includes(service) ? '+' : ''} {service}
    //                     </div>
    //                 )
    //             }
    //         </div>
    //         <Line
    //             options={GRAPHIC_INITIALIZE_OPTIONS}
    //             data={dataToGraphicConverter(fitlerGraphic(records, filters, services))}
    //             height={600}
    //         />
    //     </div>
    // ) : <Loader />
}
