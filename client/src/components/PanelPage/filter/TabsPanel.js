import React from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/filter/tabspanel.module.css'
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
        1: { blue: fraxtIcon, white: activeFraxtIcon, tabName: PanelLocale['фрахт_заголовок'][locale] },
        2: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
        3: { blue: autoIcon, white: activeAutoIcon, tabName: PanelLocale['автовывоз_заголовок'][locale] },
        4: { blue: givenIcon, white: activeGivenIcon, tabName: PanelLocale['выдача_аренда_ктк_заголовок'][locale] },
        5: { blue: crossIcon, white: activeCrossIcon, tabName: PanelLocale['сквозные_сервисы_заголовок'][locale] },
        6: { blue: groupageIcon, white: activeGroupageIcon, tabName: PanelLocale['сборные_грузы_заголовок'][locale] },
        7: { blue: mapsIcon, white: activeMapsIcon, tabName: PanelLocale['карта_терминалов_заголовок'][locale] },
    }

    return (
        <div className={c.tabs}>
            {
                tabs.map(t => (
                    <div
                        key={t.id}
                        style={{
                            backgroundColor: t.id === activetab ? 'var(--hardBlue)' : 'transparent'
                        }}
                        className={c.tab}
                        onClick={() => setActivetab(t.id)}
                    >
                        <div className={c.tab_logo}>
                            <img src={t.id === activetab ? dataLayer[t.id].white : dataLayer[t.id].blue} alt={dataLayer[t.id].tabName} />
                        </div>
                        <div
                            style={t.id === activetab ? { color: 'white' } : {}}
                            className={c.tab_name}
                        >{dataLayer[t.id].tabName}</div>
                    </div>
                ))
            }
        </div>
    )
}
