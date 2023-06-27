import React from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { Select } from 'components/Global'
import { usePanelContext, useGlobalContext } from 'Context'
import {
  departureCities,
  destinationCities,
  typeUnits,
  services,
} from 'utils/panel/getters/groupage'

import globalStyles from 'styles/PanelPage/Filter/global.module.css'
import localStyles from 'styles/PanelPage/Filter/tabs/tab.groupage.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import containerIcon from 'assets/panel/tabs/minicontainer_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'

import { PanelLocale } from 'locales'

export const GroupageTab = ({ filters, setFilter }) => {
  const { records, course } = usePanelContext()
  const { locale } = useGlobalContext()
  const data = records[TAB_ID.GROUPAGE] || []

  return (
    <div className={globalStyles.up_filters_container}>
      <div className={globalStyles.input_filters}>
        <div className={localStyles.one_input_filter}>
          <Select
            items={departureCities(data, filters)}
            result={filters.depCity}
            setResult={val => setFilter({ depCity: val })}
            placeholder={PanelLocale['пункт_отправления'][locale]}
            logo={pointIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={destinationCities(data, filters)}
            result={filters.desCity}
            setResult={val => setFilter({ desCity: val })}
            placeholder={PanelLocale['пункт_назначения'][locale]}
            logo={flagIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={(() => {
              let unitsArr = typeUnits(data, filters)
              if (unitsArr.includes(PanelLocale['объем/вес'][locale])){
                unitsArr = unitsArr.concat(PanelLocale['вес'][locale])
              }
              return [...new Set(unitsArr.filter(u => u !== PanelLocale['объем/вес'][locale]))]
            })()}
            result={filters.typeUnit}
            setResult={val => setFilter({ typeUnit: val })}
            placeholder={PanelLocale['цена_за'][locale]}
            logo={containerIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={services(data, filters)}
            result={filters.agent}
            setResult={val => setFilter({ agent: val })}
            placeholder={PanelLocale['агент'][locale]}
            logo={userIcon}
            withoutBorder
          />
        </div>
      </div>
      <div className={globalStyles.dollar}>
        1$ = {course.USD} руб.<br />
        1€ = {course.EUR} руб.
      </div>
    </div>
  )
}
