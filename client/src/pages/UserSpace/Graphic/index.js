import React, { useState } from 'react'
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
// import { Line } from 'react-chartjs-2'
import {
    INITIAL_GRAPHIC_TABS_STATE,
    GRAPHIC_TAB_ID
} from 'constants/PanelConstants'
// import { dataToGraphicConverter } from 'utils/panel/dataToGraphicConverter'
// import { GRAPHIC_INITIALIZE_OPTIONS } from 'constants/PanelConstants'
import {
    StartScreen,
    TabsPanel,
    GraphicTools,
    NewGraphicPopup
} from 'components/Graphic'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Graphic = () => {
    const [tabs, setTabs] = useState(INITIAL_GRAPHIC_TABS_STATE)
    const [activetab, setActivetab] = useState(GRAPHIC_TAB_ID.CROSS)
    const [newGraphicPopup, setNewGraphicPopup] = useState(false)
    const [datasets, setDatasets] = useState([])

    return (
        <div style={{ padding: '0 5% 25px 5%' }}>
            <TabsPanel
                tabs={tabs}
                activetab={activetab}
                setActivetab={setActivetab}
            />
            {
                datasets.length !== 0 ?
                <GraphicTools
                    datasets={datasets}
                    setDatasets={setDatasets}
                    onOpenNewDatasetPopup={() => setNewGraphicPopup(true)}
                />
                :
                <StartScreen setShowPopup={setNewGraphicPopup} />
            }
            {
                newGraphicPopup &&
                <NewGraphicPopup
                    onClosePopup={() => setNewGraphicPopup(false)}
                    ratesType={(() => {
                        switch (activetab) {
                            case GRAPHIC_TAB_ID.CROSS: return 'fobFor'
                            case GRAPHIC_TAB_ID.FRAXT: return 'freight'
                            case GRAPHIC_TAB_ID.DROP_OFF: return 'dropOff'
                            case GRAPHIC_TAB_ID.JD: return 'railway'
                            case GRAPHIC_TAB_ID.GIVEN: return 'delivery'
                            default: return 'fobFor'
                        }
                    })()}
                    alreadyUsedColors={datasets.map(d => d.datasetColor)}
                    addNewDataset={newDataset => setDatasets(prev => prev.concat(newDataset))}
                />
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
