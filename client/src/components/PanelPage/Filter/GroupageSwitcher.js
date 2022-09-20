import React from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import c from 'styles/PanelPage/Filter/tabspanel.module.css'

import { ReactComponent as BlueContainerIcon } from 'assets/panel/tabspanel/groupageswitcher/container_blue_icon.svg'
import { ReactComponent as LightBlueContainerIcon } from 'assets/panel/tabspanel/groupageswitcher/container_light_blue_icon.svg'
import { ReactComponent as BlueGroupageIcon } from 'assets/panel/tabspanel/groupageswitcher/groupage_blue_icon.svg'
import { ReactComponent as LightBlueGroupageIcon } from 'assets/panel/tabspanel/groupageswitcher/groupage_light_blue_icon.svg'

export const GroupageSwitcher = ({ activetab, setActivetab=()=>{}, switcherStyle={} }) => {
  return (
    <div
        className={c.tab}
        style={{
            backgroundColor: 'var(--lightBlue)',
            border: 'none',
            justifySelf: 'flex-start',
            ...switcherStyle
        }}
    >
        <div
            className={c.tab_switch}
            style={{
                backgroundColor: activetab !== TAB_ID.GROUPAGE ? 'white' : 'transparent'
            }}
            onClick={setActivetab.bind(this, TAB_ID.CROSS)}
        >
            { activetab !== TAB_ID.GROUPAGE ? <BlueContainerIcon /> : <LightBlueContainerIcon /> }
        </div>
        <div
            className={c.tab_switch}
            style={{
                backgroundColor: activetab === TAB_ID.GROUPAGE ? 'white' : 'transparent'
            }}
            onClick={setActivetab.bind(this, TAB_ID.GROUPAGE)}
        >
            { activetab === TAB_ID.GROUPAGE ? <BlueGroupageIcon /> : <LightBlueGroupageIcon /> }
        </div>
    </div>
  )
}
