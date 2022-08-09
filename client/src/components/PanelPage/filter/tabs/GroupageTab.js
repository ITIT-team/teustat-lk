import React from 'react'
import { Select } from 'components/Global/Select'
import { usePanelContext } from 'Context'
import {
  departureCities,
  destinationCities,
  typeUnits,
  services,
} from 'utils/panel/getters/groupage'

import globalStyles from 'styles/PanelPage/filter/global.module.css'
import localStyles from 'styles/PanelPage/filter/tabs/tab.groupage.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import containerIcon from 'assets/panel/tabs/minicontainer_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'

export const GroupageTab = ({ filters, setFilter, clearFilters }) => {
  const { records, course } = usePanelContext()
  const data = records.find(r => r.id === 6).recs

  return (
    <div className={globalStyles.up_filters_container}>
      <div className={globalStyles.input_filters}>
        <div className={localStyles.one_input_filter}>
          <Select
            items={departureCities(data, filters)}
            result={filters.depCity}
            setResult={val => setFilter({ depCity: val })}
            placeholder="Пункт отправления"
            logo={pointIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={destinationCities(data, filters)}
            result={filters.desCity}
            setResult={val => setFilter({ desCity: val })}
            placeholder="Пункт назначения"
            logo={flagIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={(() => {
              let unitsArr = typeUnits(data, filters)
              if (unitsArr.includes('Объем/Вес')){
                unitsArr = unitsArr.concat('Вес')
              }
              return [...new Set(unitsArr.filter(u => u !== 'Объем/Вес'))]
            })()}
            result={filters.typeUnit}
            setResult={val => setFilter({ typeUnit: val })}
            placeholder="Цена за"
            logo={containerIcon}
          />
        </div>
        <div className={localStyles.one_input_filter}>
          <Select
            items={services(data, filters)}
            result={filters.agent}
            setResult={val => setFilter({ agent: val })}
            placeholder="Агент"
            logo={userIcon}
            withoutBorder
          />
        </div>
      </div>
      <div className={globalStyles.dollar}>
        1$ = {course} руб.
      </div>
    </div>
  )
}