import React, { useState, useRef, useEffect } from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { Select } from 'components/Global/Select'
import { ThumblersRow } from 'components/PanelPage/ThumblersRow'
import { Thumbler } from 'components/PanelPage/Thumbler'
import globalStyles from 'styles/PanelPage/Filter/global.module.css'
import localStyles from 'styles/PanelPage/Filter/tabs/tab.given.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import snakeIcon from 'assets/panel/tabs/snake_way_icon.svg'
import filterIcon from 'assets/panel/filter/filter_icon.svg'

import {
    departureCities,
    destinationCities,
    sizes,
    rateTypes,
    agents,
    todayDates,
    futureDates
} from 'utils/panel/getters/given'
import { usePanelContext, useGlobalContext } from 'Context'

import { PanelLocale } from 'locales'

export const GivenTab = ({ filters, setFilter, clearFilters }) => {
    const { records, course, pulse, setPulse } = usePanelContext()
    const { locale } = useGlobalContext()
    const [menu, setMenu] = useState(false)

    const iconMenu = useRef()

    useEffect(() => {
        if (iconMenu.current){
            iconMenu.current.addEventListener('mouseover', () => {
                setPulse(false)
            })
        }
    }, [ setPulse ])

    const data = records.find(r => r.id === TAB_ID.GIVEN).recs
    
    const depCities = departureCities(data, filters)
    const desCities = destinationCities(data, filters)
    const sizesArr = sizes(data, filters)
    const rateTypesArr = rateTypes(data, filters)
    const agentsArr = agents(data, filters)
    const haveToday = todayDates(data, filters).length !== 0
    const haveFuture = futureDates(data, filters).length !== 0

    return (
        <>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <div className={localStyles.one_input_filter}>
                        <Select
                            items={depCities}
                            result={filters.depCity}
                            setResult={val => setFilter({ depCity: val })}
                            placeholder={PanelLocale['город_выдачи'][locale]}
                            logo={pointIcon}
                        />
                    </div>
                    <div className={localStyles.one_input_filter}>
                        <Select
                            items={desCities}
                            result={filters.desCity}
                            setResult={val => setFilter({ desCity: val })}
                            placeholder={PanelLocale['город_выдачи'][locale]}
                            logo={flagIcon}
                        />
                    </div>
                    <div className={localStyles.one_input_filter}>
                        <Select
                            items={agentsArr}
                            result={filters.agent}
                            setResult={val => setFilter({ agent: val })}
                            placeholder={PanelLocale['агент'][locale]}
                            logo={snakeIcon}
                            withoutBorder
                        />
                    </div>
                </div>
                <div className={globalStyles.dollar}>
                    1$ = {course.USD} руб.<br />
                    1€ = {course.EUR} руб.
                </div>
            </div>
            {
                !menu
                &&
                <div className={globalStyles.thumbler_icon + (pulse ? ` ${globalStyles.pulsing_animation}` : '')} onClick={() => setMenu(true)} ref={iconMenu}>
                    <img src={filterIcon} alt="Фильтры"/>
                </div>
            }
            <div className={globalStyles.thumbler_filters} style={menu ? {left: '5%'} : {left: '-50%'}}>
                <div className={globalStyles.close_thumbler_filters} onClick={() => setMenu(false)}>&times;</div>
                <ThumblersRow
                    rowName={PanelLocale['размер_контейнера'][locale]}
                    thumblersData={[
                        { key: 's20', name: PanelLocale['20'][locale], filterValue: filters.s20, disabled: !sizesArr.includes('20') },
                        { key: 's40', name: PanelLocale['40'][locale], filterValue: filters.s40, disabled: !sizesArr.includes('40') }
                    ]}
                    setFilter={setFilter}
                />
                <ThumblersRow
                    rowName={PanelLocale['интервал_времени'][locale]}
                    thumblersData={[
                        { key: 'today', name: PanelLocale['текущие_даты'][locale], filterValue: filters.today, disabled: !haveToday },
                        { key: 'future', name: PanelLocale['будущие_даты'][locale], filterValue: filters.future, disabled: !haveFuture }
                    ]}
                    setFilter={setFilter}
                    withAllOption={false}
                />
                {
                    rateTypesArr.includes('Импорт')
                    &&
                    <Thumbler 
                        val={filters.import}
                        setVal={val => setFilter({ import: val })}
                        name={PanelLocale['импорт0'][locale]}
                    />
                }
                {
                    rateTypesArr.includes('Экспорт')
                    &&
                    <Thumbler
                        val={filters.export}
                        setVal={val => setFilter({ export: val })}
                        name={PanelLocale['экспорт0'][locale]}
                    />
                }
                {
                    rateTypesArr.includes('Каботаж')
                    &&
                    <Thumbler 
                        val={filters.kabotaj}
                        setVal={val => setFilter({ kabotaj: val })}
                        name={PanelLocale['каботаж20'][locale]}
                    />
                }
                <div className={globalStyles.confirm_filters} onClick={() => setMenu(false)}>{PanelLocale['применить'][locale]}</div>
                <div className={globalStyles.remove_filters} onClick={() => setFilter(clearFilters)}>&#128465; {PanelLocale['очистить_всё'][locale]}</div>
            </div>
        </>
    )
}