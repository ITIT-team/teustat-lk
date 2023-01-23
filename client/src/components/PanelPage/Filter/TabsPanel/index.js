import React from 'react'
import { useGlobalContext } from 'Context'
import { GroupageSwitcher } from '../Tabs'
import { TAB_ID } from 'constants/PanelConstants'
import c from 'styles/PanelPage/Filter/tabspanel.module.css'

import fraxtIcon from 'assets/panel/tabspanel/fraxt_icon.svg'
import activeFraxtIcon from 'assets/panel/tabspanel/active_fraxt_icon.svg'
import jdIcon from 'assets/panel/tabspanel/jd_icon.svg'
import activeJdIcon from 'assets/panel/tabspanel/active_jd_icon.svg'
import autoIcon from 'assets/panel/tabspanel/auto_icon.svg'
import activeAutoIcon from 'assets/panel/tabspanel/active_auto_icon.svg'
import givenIcon from 'assets/panel/tabspanel/given_icon.svg'
import activeGivenIcon from 'assets/panel/tabspanel/active_given_icon.svg'
import crossIcon from 'assets/panel/tabspanel/cross_icon.svg'
import activeCrossIcon from 'assets/panel/tabspanel/active_cross_icon.svg'
import groupageIcon from 'assets/panel/tabspanel/groupage_icon.svg'
import activeGroupageIcon from 'assets/panel/tabspanel/active_groupage_icon.svg'
// import graphicsIcon from 'assets/panel/tabspanel/graphics_icon.svg'
// import activeGraphicsIcon from 'assets/panel/tabspanel/active_graphics_icon.svg'
import mapsIcon from 'assets/panel/tabspanel/maps_icon.svg'
import activeMapsIcon from 'assets/panel/tabspanel/active_maps_icon.svg'

import { PanelLocale } from 'locales'

export const TabsPanel = ({ tabs, activetab, setActivetab }) => {
    const { locale } = useGlobalContext()

    const dataLayer = {
        [TAB_ID.FRAXT]: { blue: fraxtIcon, white: activeFraxtIcon, tabName: PanelLocale['фрахт_заголовок'][locale] },
        [TAB_ID.JD]: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
        [TAB_ID.AUTO]: { blue: autoIcon, white: activeAutoIcon, tabName: PanelLocale['автовывоз_заголовок'][locale] },
        [TAB_ID.GIVEN]: { blue: givenIcon, white: activeGivenIcon, tabName: PanelLocale['выдача_аренда_ктк_заголовок'][locale] },
        [TAB_ID.CROSS]: { blue: crossIcon, white: activeCrossIcon, tabName: PanelLocale['сквозные_сервисы_заголовок'][locale] },
        [TAB_ID.GROUPAGE]: { blue: groupageIcon, white: activeGroupageIcon, tabName: PanelLocale['сборные_грузы_заголовок'][locale] },
        [TAB_ID.MAP]: { blue: mapsIcon, white: activeMapsIcon, tabName: PanelLocale['карта_терминалов_заголовок'][locale] },
    }

    return (
        <div className={c.tabs}>
            <GroupageSwitcher activetab={activetab} setActivetab={setActivetab} />
            {
                activetab !== TAB_ID.GROUPAGE &&
                tabs.filter(t => t.id !== TAB_ID.GROUPAGE).map(t => {
                    return (
                        <div 
                            key={t.id} 
                            style={{
                                backgroundColor: t.id === activetab ? 'var(--hardBlue)' : 'transparent'
                            }} 
                            className={c.tab}
                            onClick={setActivetab.bind(this, t.id)}
                        >
                            <div className={c.tab_logo}>
                                <img src={t.id === activetab ? dataLayer[t.id].white : dataLayer[t.id].blue} alt={dataLayer[t.id].tabName} />
                            </div>
                            <div
                                style={t.id === activetab ? { color: 'white' } : {}}
                                className={c.tab_name}
                            >{dataLayer[t.id].tabName}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
