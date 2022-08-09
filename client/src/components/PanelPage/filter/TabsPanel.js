import React from 'react'
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

const dataLayer = {
    1: { blue: fraxtIcon, white: activeFraxtIcon, tabName: <>ФРАХТ</> },
    2: { blue: jdIcon, white: activeJdIcon, tabName: <>ЖД</> },
    3: { blue: autoIcon, white: activeAutoIcon, tabName: <>АВТОВЫВОЗ</> },
    4: { blue: givenIcon, white: activeGivenIcon, tabName: <>ВЫДАЧА /<br />АРЕНДА КТК</> },
    5: { blue: crossIcon, white: activeCrossIcon, tabName: <>СКВОЗНЫЕ<br />СЕРВИСЫ</> },
    6: { blue: groupageIcon, white: activeGroupageIcon, tabName: <>СБОРНЫЕ ГРУЗЫ</> },
    // 6: { blue: graphicsIcon, white: activeGraphicsIcon, tabName: <>ГРАФИКИ</> },
    7: { blue: mapsIcon, white: activeMapsIcon, tabName: <>КАРТА<br />ТЕРМИНАЛОВ</> },
}

export const TabsPanel = ({ tabs, activetab, setActivetab }) => 
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
