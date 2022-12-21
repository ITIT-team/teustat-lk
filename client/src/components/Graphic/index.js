import React from 'react'
import { TabsPanel } from './TabsPanel'

export const FilterPanel = ({ tabs, activetab, setActivetab }) => {
  return (
    <>
      <TabsPanel tabs={tabs} activetab={activetab} setActivetab={setActivetab} />
    </>
  )
}
