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
    const [rewriteGraphicPopupData, setRewriteGraphicPopupData] = useState(null)
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
                    onOpenRewriteDatasetPopup={setRewriteGraphicPopupData}
                />
                :
                <StartScreen setShowPopup={setNewGraphicPopup} />
            }
            {
                newGraphicPopup &&
                <NewGraphicPopup
                    onClosePopup={() => setNewGraphicPopup(false)}
                    rewritableData={{
                        ratesType: (() => {
                            switch (activetab) {
                                case GRAPHIC_TAB_ID.CROSS: return 'fobFor'
                                case GRAPHIC_TAB_ID.FRAXT: return 'freight'
                                case GRAPHIC_TAB_ID.DROP_OFF: return 'dropOff'
                                case GRAPHIC_TAB_ID.JD: return 'railway'
                                case GRAPHIC_TAB_ID.GIVEN: return 'delivery'
                                default: return 'fobFor'
                            }
                        })()
                    }}
                    alreadyUsedColors={datasets.map(d => d.datasetColor)}
                    addNewDataset={newDataset => setDatasets(prev => prev.concat(newDataset))}
                />
            }
            {
                rewriteGraphicPopupData &&
                <NewGraphicPopup
                    onClosePopup={() => setRewriteGraphicPopupData(null)}
                    alreadyUsedColors={datasets.map(d => d.datasetColor).filter(color => color !== rewriteGraphicPopupData.datasetColor)}
                    addNewDataset={newDataset => {
                        setDatasets(
                            prev => 
                                prev
                                .filter(d => d.datasetColor !== rewriteGraphicPopupData.datasetColor)
                                .concat(newDataset)
                        )
                    }}
                    rewritableData={rewriteGraphicPopupData}
                />
            }
            {/* <Line
                options={GRAPHIC_INITIALIZE_OPTIONS}
                data={dataToGraphicConverter(fitlerGraphic(records, filters, services))}
                height={600}
            /> */}
        </div>
    )
}
