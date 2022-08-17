import React from 'react'
import { TAB_ID } from 'constants/PanelConstants'
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
import { ReactComponent as BlueContainerIcon } from 'assets/panel/tabspanel/groupageswitcher/container_blue_icon.svg'
import { ReactComponent as LightBlueContainerIcon } from 'assets/panel/tabspanel/groupageswitcher/container_light_blue_icon.svg'
import { ReactComponent as BlueGroupageIcon } from 'assets/panel/tabspanel/groupageswitcher/groupage_blue_icon.svg'
import { ReactComponent as LightBlueGroupageIcon } from 'assets/panel/tabspanel/groupageswitcher/groupage_light_blue_icon.svg'

const dataLayer = {
    [TAB_ID.FRAXT]: { blue: fraxtIcon, white: activeFraxtIcon, tabName: <>ФРАХТ</> },
    [TAB_ID.JD]: { blue: jdIcon, white: activeJdIcon, tabName: <>ЖД</> },
    [TAB_ID.AUTO]: { blue: autoIcon, white: activeAutoIcon, tabName: <>АВТОВЫВОЗ</> },
    [TAB_ID.GIVEN]: { blue: givenIcon, white: activeGivenIcon, tabName: <>ВЫДАЧА /<br />АРЕНДА КТК</> },
    [TAB_ID.CROSS]: { blue: crossIcon, white: activeCrossIcon, tabName: <>СКВОЗНЫЕ<br />СЕРВИСЫ</> },
    [TAB_ID.GROUPAGE]: { blue: groupageIcon, white: activeGroupageIcon, tabName: <>СБОРНЫЕ ГРУЗЫ</> },
    [TAB_ID.MAP]: { blue: mapsIcon, white: activeMapsIcon, tabName: <>КАРТА<br />ТЕРМИНАЛОВ</> },
}

export const TabsPanel = ({ tabs, activetab, setActivetab }) => {
    return (
        <div className={c.tabs}>
            <div
                className={c.tab}
                style={{
                    backgroundColor: 'var(--lightBlue)',
                    border: 'none',
                    justifySelf: 'flex-start',
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
