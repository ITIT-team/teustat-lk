import React from 'react'
import {INITIAL_TABS_STATE} from 'constants/PanelConstants'
import { TabsPanel } from './TabsPanel'
import { FraxtTab } from './tabs/FraxtTab'
import { JdTab } from './tabs/JdTab'
import { GivenTab } from './tabs/GivenTab'
import { AutoTab } from './tabs/AutoTab'
import { CrossTab } from './tabs/CrossTab'
// import { GroupageTab } from './tabs/GroupageTab'

export const FilterPanel = ({ tabs, tabsSetter, activetab, setActivetab }) => {
    return (
        <div className="filter_panel">
            <TabsPanel tabs={tabs} activetab={activetab} setActivetab={setActivetab}/>
            { activetab === 1
            &&
            <FraxtTab filters={tabs.find(f => f.id === 1)}
                setFilter={changes => tabsSetter(1, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 1)}
            /> 
            }
            { activetab === 2
            && 
            <JdTab filters={tabs.find(f => f.id === 2)}
                setFilter={changes => tabsSetter(2, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 2)}
            /> 
            }
            { activetab === 3
            && 
            <AutoTab 
                filters={tabs.find(f => f.id === 3)}
                setFilter={changes => tabsSetter(3, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 3)}
            />
            }
            { activetab === 4
            && 
            <GivenTab 
                filters={tabs.find(f => f.id === 4)}
                setFilter={changes => tabsSetter(4, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 4)}
            /> 
            }
            { activetab === 5
            && 
            <CrossTab 
                filters={tabs.find(f => f.id === 5)}
                setFilter={changes => tabsSetter(5, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 5)}
            /> 
            }
            {/* { activetab === 6
            && 
            <GroupageTab
                filters={tabs.find(f => f.id === 6)}
                setFilter={changes => tabsSetter(6, changes)}
                clearFilters={INITIAL_TABS_STATE.find(f => f.id === 6)}
            /> 
            } */}
        </div>
    )
}