import React, { useState } from 'react'
import {
    INITIAL_GRAPHIC_TABS_STATE,
    GRAPHIC_TAB_ID,
    RATE_TYPES,
} from 'constants/PanelConstants'
import {
    StartScreen,
    TabsPanel,
    GraphicTools,
    NewGraphicPopup
} from 'components/Graphic'

export const Graphic = () => {
    const [tabs] = useState(INITIAL_GRAPHIC_TABS_STATE)
    const [activetab, setActivetab] = useState(GRAPHIC_TAB_ID.FOBFOR)
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
                            const {
                                FOBFOR,
                                FREIGHT,
                                DROPOFF,
                                RAILWAY,
                                DELIVERY
                            } = RATE_TYPES
                            switch (activetab) {
                                case GRAPHIC_TAB_ID.FOBFOR: return FOBFOR
                                case GRAPHIC_TAB_ID.FREIGHT: return FREIGHT
                                case GRAPHIC_TAB_ID.DROP_OFF: return DROPOFF
                                case GRAPHIC_TAB_ID.RAILWAY: return RAILWAY
                                case GRAPHIC_TAB_ID.DELIVERY: return DELIVERY
                                default: return FOBFOR
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
        </div>
    )
}
