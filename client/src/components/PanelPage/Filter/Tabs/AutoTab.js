import React from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { Select } from 'components/Global'
import globalStyles from 'styles/PanelPage/Filter/global.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import containerIcon from 'assets/panel/tabs/container_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'

import {
    departureCity,
    destinationCity,
    service,
    size,
} from 'utils/panel/getters/auto'
import { usePanelContext, useGlobalContext } from 'Context'

import { PanelLocale } from 'locales'

export const AutoTab = ({ filters, setFilter, clearFilters }) => {
    const { records, course } = usePanelContext()
    const { locale } = useGlobalContext()

    const data = records[TAB_ID.AUTO] || []

    const depCities = departureCity(data, filters)
    const desCities = destinationCity(data, filters)
    const serviceArr = service(data, filters)
    const sizeArr = size(data, filters)

    return (
        <>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <Select
                        items={depCities}
                        result={filters.depCity}
                        setResult={val => setFilter({ depCity: val })}
                        placeholder={PanelLocale['пункт_отправления'][locale]}
                        logo={pointIcon}
                    />
                    <Select
                        items={desCities}
                        result={filters.desCity}
                        setResult={val => setFilter({ desCity: val })}
                        placeholder={PanelLocale['пункт_назначения'][locale]}
                        logo={flagIcon}
                    />
                    <Select
                        items={sizeArr}
                        result={filters.size}
                        setResult={val => setFilter({ size: val })}
                        placeholder={PanelLocale['размер_контейнера'][locale]}
                        logo={containerIcon}
                    />
                    <Select
                        items={serviceArr}
                        result={filters.agent}
                        setResult={val => setFilter({ agent: val })}
                        placeholder={PanelLocale['агент'][locale]}
                        logo={userIcon}
                        withoutBorder
                    />
                </div>
                <div className={globalStyles.dollar}>
                    1$ = {course.USD} руб.<br />
                    1€ = {course.EUR} руб.
                </div>
            </div>
        </>
    )
}