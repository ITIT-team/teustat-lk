import React from 'react'
import { INITIAL_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import { TabsPanel } from './TabsPanel'
import { FraxtTab, JdTab, GivenTab, AutoTab, CrossTab, GroupageTab } from './Tabs'

export const FilterPanel = ({ tabs, tabsSetter, activetab, setActivetab }) => {
    return (
        <div className="filter_panel">
            <TabsPanel tabs={tabs} activetab={activetab} setActivetab={setActivetab}/>
            { activetab === TAB_ID.FREIGHT
            &&
            <FraxtTab filters={tabs.find(f => f.id === TAB_ID.FREIGHT)}
                setFilter={changes => tabsSetter(TAB_ID.FREIGHT, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.FREIGHT)}
            /> 
            }
            { activetab === TAB_ID.RAILWAY
            && 
            <JdTab filters={tabs.find(f => f.id === TAB_ID.RAILWAY)}
                setFilter={changes => tabsSetter(TAB_ID.RAILWAY, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.RAILWAY)}
            /> 
            }
            { activetab === TAB_ID.AUTO
            && 
            <AutoTab 
                filters={tabs.find(f => f.id === TAB_ID.AUTO)}
                setFilter={changes => tabsSetter(TAB_ID.AUTO, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.AUTO)}
            />
            }
            { activetab === TAB_ID.DELIVERY
            && 
            <GivenTab 
                filters={tabs.find(f => f.id === TAB_ID.DELIVERY)}
                setFilter={changes => tabsSetter(TAB_ID.DELIVERY, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.DELIVERY)}
            /> 
            }
            { activetab === TAB_ID.FOBFOR
            && 
            <CrossTab 
                filters={tabs.find(f => f.id === TAB_ID.FOBFOR)}
                setFilter={changes => tabsSetter(TAB_ID.FOBFOR, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.FOBFOR)}
            /> 
            }
            { activetab === TAB_ID.GROUPAGE
            && 
            <GroupageTab
                filters={tabs.find(f => f.id === TAB_ID.GROUPAGE)}
                setFilter={changes => tabsSetter(TAB_ID.GROUPAGE, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.GROUPAGE)}
            /> 
            }
        </div>
    )
}