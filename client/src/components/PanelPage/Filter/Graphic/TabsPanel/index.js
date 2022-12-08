import React from 'react'
import { useGlobalContext } from 'Context'
import { GRAPHIC_TAB_ID } from 'constants/PanelConstants'

import c from 'styles/PanelPage/Filter/tabspanel.module.css'

import fraxtIcon from 'assets/panel/tabspanel/fraxt_icon.svg'
import activeFraxtIcon from 'assets/panel/tabspanel/active_fraxt_icon.svg'
import jdIcon from 'assets/panel/tabspanel/jd_icon.svg'
import activeJdIcon from 'assets/panel/tabspanel/active_jd_icon.svg'
import givenIcon from 'assets/panel/tabspanel/given_icon.svg'
import activeGivenIcon from 'assets/panel/tabspanel/active_given_icon.svg'
import crossIcon from 'assets/panel/tabspanel/cross_icon.svg'
import activeCrossIcon from 'assets/panel/tabspanel/active_cross_icon.svg'

import { PanelLocale } from 'locales'

export const TabsPanel = ({ tabs, activetab, setActivetab }) => {
  const { locale } = useGlobalContext()

  const dataLayer = {
    [GRAPHIC_TAB_ID.FRAXT_IMPORT]: { blue: fraxtIcon, white: activeFraxtIcon, tabName: PanelLocale['фрахт_заголовок'][locale] },
    [GRAPHIC_TAB_ID.FRAXT_EXPORT]: { blue: fraxtIcon, white: activeFraxtIcon, tabName: PanelLocale['фрахт_заголовок'][locale] },
    [GRAPHIC_TAB_ID.FRAXT_KABOTAJ]: { blue: fraxtIcon, white: activeFraxtIcon, tabName: PanelLocale['фрахт_заголовок'][locale] },
    [GRAPHIC_TAB_ID.JD_IMPORT]: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
    [GRAPHIC_TAB_ID.JD_EXPORT]: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
    [GRAPHIC_TAB_ID.JD_DIRECT]: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
    [GRAPHIC_TAB_ID.JD_KABOTAJ]: { blue: jdIcon, white: activeJdIcon, tabName: PanelLocale['жд_заголовок'][locale] },
    [GRAPHIC_TAB_ID.CROSS_IMPORT]: { blue: crossIcon, white: activeCrossIcon, tabName: PanelLocale['сквозные_сервисы_заголовок'][locale] },
    [GRAPHIC_TAB_ID.CROSS_EXPORT]: { blue: crossIcon, white: activeCrossIcon, tabName: PanelLocale['сквозные_сервисы_заголовок'][locale] },
    [GRAPHIC_TAB_ID.CROSS_KABOTAJ]: { blue: crossIcon, white: activeCrossIcon, tabName: PanelLocale['сквозные_сервисы_заголовок'][locale] },
    [GRAPHIC_TAB_ID.GIVEN_IMPORT]: { blue: givenIcon, white: activeGivenIcon, tabName: PanelLocale['выдача_аренда_ктк_заголовок'][locale] },
    [GRAPHIC_TAB_ID.GIVEN_EXPORT]: { blue: givenIcon, white: activeGivenIcon, tabName: PanelLocale['выдача_аренда_ктк_заголовок'][locale] },
    [GRAPHIC_TAB_ID.GIVEN_KABOTAJ]: { blue: givenIcon, white: activeGivenIcon, tabName: PanelLocale['выдача_аренда_ктк_заголовок'][locale] },
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
        ))
      }
    </div>
  )
}
