import React from 'react'
import { INITIAL_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import { TabsPanel } from './TabsPanel'
import { FraxtTab } from './tabs/FraxtTab'
import { JdTab } from './tabs/JdTab'
import { GivenTab } from './tabs/GivenTab'
import { AutoTab } from './tabs/AutoTab'
import { CrossTab } from './tabs/CrossTab'
import { GroupageTab } from './tabs/GroupageTab'

export const FilterPanel = ({ tabs, tabsSetter, activetab, setActivetab }) => {
    return (
        <div className="filter_panel">
            <TabsPanel tabs={tabs} activetab={activetab} setActivetab={setActivetab}/>
            { activetab === TAB_ID.FRAXT
            &&
            <FraxtTab filters={tabs.find(f => f.id === TAB_ID.FRAXT)}
                setFilter={changes => tabsSetter(TAB_ID.FRAXT, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.FRAXT)}
            /> 
            }
            { activetab === TAB_ID.JD
            && 
            <JdTab filters={tabs.find(f => f.id === TAB_ID.JD)}
                setFilter={changes => tabsSetter(TAB_ID.JD, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.JD)}
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
            { activetab === TAB_ID.GIVEN
            && 
            <GivenTab 
                filters={tabs.find(f => f.id === TAB_ID.GIVEN)}
                setFilter={changes => tabsSetter(TAB_ID.GIVEN, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.GIVEN)}
            /> 
            }
            { activetab === TAB_ID.CROSS
            && 
            <CrossTab 
                filters={tabs.find(f => f.id === TAB_ID.CROSS)}
                setFilter={changes => tabsSetter(TAB_ID.CROSS, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === TAB_ID.CROSS)}
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