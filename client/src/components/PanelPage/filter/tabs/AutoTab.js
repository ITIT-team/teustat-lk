import React from 'react'
import { Select } from 'components/Global/Select'
import globalStyles from 'styles/PanelPage/filter/global.module.css'
// import localStyles from '../../../styles/filter/tabs/tab.auto.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import containerIcon from 'assets/panel/tabs/container_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'

import {
    departureCity,
    destinationCity,
    service,
    size,
    // todayDates,
    // futureDates
} from 'utils/panel/getters/auto'
import { usePanelContext } from 'Context'

export const AutoTab = ({ filters, setFilter, clearFilters }) => {
    const { records, course } = usePanelContext()

    const data = records.find(r => r.id === 3).recs

    const depCities = departureCity(data, filters)
    const desCities = destinationCity(data, filters)
    const serviceArr = service(data, filters)
    const sizeArr = size(data, filters)
    // const haveToday = todayDates(data, filters)
    // const haveFuture = futureDates(data, filters)
    return (
        <>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <Select
                        items={depCities}
                        result={filters.depCity}
                        setResult={val => setFilter({ depCity: val })}
                        placeholder='Пункт отправления'
                        logo={pointIcon}
                    />
                    <Select
                        items={desCities}
                        result={filters.desCity}
                        setResult={val => setFilter({ desCity: val })}
                        placeholder='Пункт назначения'
                        logo={flagIcon}
                    />
                    <Select
                        items={sizeArr}
                        result={filters.size}
                        setResult={val => setFilter({ size: val })}
                        placeholder='Размер контейнера'
                        logo={containerIcon}
                    />
                    <Select
                        items={serviceArr}
                        result={filters.agent}
                        setResult={val => setFilter({ agent: val })}
                        placeholder='Агент'
                        logo={userIcon}
                        withoutBorder
                    />
                </div>
                <div className={globalStyles.dollar}>
                    1$ = {course} руб.
                </div>
            </div>
        </>
    )
}