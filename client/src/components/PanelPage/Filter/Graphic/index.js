import React from 'react'
import { TabsPanel } from './TabsPanel'
import { INITIAL_GRAPHIC_TABS_STATE, GRAPHIC_TAB_ID } from 'constants/PanelConstants'

export const FilterPanel = ({ tabs, tabsSetter, activetab, setActivetab }) => {
  return (
    <>
      <TabsPanel tabs={tabs} activetab={activetab} setActivetab={setActivetab}/>
    </>
  )
}
