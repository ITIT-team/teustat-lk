import React, { useState, useRef, useEffect } from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { Select } from 'components/Global/Select'
import { ThumblersRow } from 'components/PanelPage/ThumblersRow'
import { Thumbler } from 'components/PanelPage/Thumbler'
import globalStyles from 'styles/PanelPage/Filter/global.module.css'
import localStyles from 'styles/PanelPage/Filter/tabs/tab.jd.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import navIcon from 'assets/panel/tabs/navigator_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'
import filterIcon from 'assets/panel/filter/filter_icon.svg'

import {
    departureCities,
    destinationCities,
    services,
    sizes,
    ownerships,
    rateTypes,
    departureStations,
    destinationStations,
    departureTerminals,
    destinationTerminals,
    todayDates,
    futureDates
} from 'utils/panel/getters/jd'
import { usePanelContext, useGlobalContext } from 'Context'

import { PanelLocale } from 'locales'

export const JdTab = ({ filters, setFilter, clearFilters }) => {
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

    const data = records.find(r => r.id === TAB_ID.JD).recs

    const depCities = departureCities(data, filters)
    const desCities = destinationCities(data, filters)
    const servicesArr = services(data, filters)
    const sizesArr = sizes(data, filters)
    const ownershipsArr = ownerships(data, filters)
    const rateTypesArr = rateTypes(data, filters)
    const depStationsArr = departureStations(data, filters)
    const desStationsArr = destinationStations(data, filters)
    const depTerminalsArr = departureTerminals(data, filters)
    const desTerminalsArr = destinationTerminals(data, filters)
    const haveToday = todayDates(data, filters).length !== 0
    const haveFuture = futureDates(data, filters).length !== 0

    return (
        <div className={localStyles.jd_container}>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <div className={localStyles.one_block}>
                        <Select
                            items={depCities}
                            result={filters.depCity}
                            setResult={val => setFilter({ depCity: val })}
                            placeholder={PanelLocale['город_отправления'][locale]}
                            logo={pointIcon}
                        />
                        <Select
                            items={desCities}
                            result={filters.desCity}
                            setResult={val => setFilter({ desCity: val })}
                            placeholder={PanelLocale['город_назначения'][locale]}
                            logo={pointIcon}
                        />
                    </div>
                    <div className={localStyles.one_block}>
                        <Select
                            items={depStationsArr}
                            result={filters.depStation}
                            setResult={val => setFilter({ depStation: val })}
                            placeholder={PanelLocale['станция_отправления'][locale]}
                            logo={flagIcon}
                        />
                        <Select
                            items={desStationsArr}
                            result={filters.desStation}
                            setResult={val => setFilter({ desStation: val })}
                            placeholder={PanelLocale['станция_назначения'][locale]}
                            logo={flagIcon}
                        />
                    </div>
                    <div className={localStyles.one_block}>
                        <Select
                            items={servicesArr}
                            result={filters.agent}
                            setResult={val => setFilter({ agent: val })}
                            placeholder={PanelLocale['агент'][locale]}
                            logo={userIcon}
                            withoutBorder
                        />
                    </div>
                </div>
                <div className={globalStyles.dollar}>
                    1$ = {course.USD} руб.
                </div>
            </div>
            {
                !menu
                &&
                <div className={globalStyles.thumbler_icon + (pulse ? ` ${globalStyles.pulsing_animation}` : '')} onClick={() => setMenu(true)} ref={iconMenu}>
                    <img src={filterIcon} alt="Фильтры"/>
                </div>
            }
            <div className={globalStyles.thumbler_filters} style={menu ? { left: '5%', top: '7%' } : { left: '-50%', top: '7%' }}>
                <div className={globalStyles.close_thumbler_filters} onClick={() => setMenu(false)}>&times;</div>
                <ThumblersRow
                    rowName={PanelLocale['размер_контейнера'][locale]}
                    thumblersData={[
                        { key: 's20', name: PanelLocale['20'][locale], filterValue: filters.s20, disabled: !sizesArr.includes('20') },
                        { key: 's20t', name: PanelLocale['20_тяж.'][locale], filterValue: filters.s20t, disabled: !sizesArr.includes('20 фут.тяж.') },
                        { key: 's40', name: PanelLocale['40'][locale], filterValue: filters.s40, disabled: !sizesArr.includes('40') }
                    ]}
                    setFilter={setFilter}
                />
                <ThumblersRow
                    rowName={PanelLocale['принадлежность_контейнера'][locale]}
                    thumblersData={[
                        { key: 'coc', name: PanelLocale['COC'][locale], filterValue: filters.coc, disabled: !ownershipsArr.includes('COC') },
                        { key: 'soc', name: PanelLocale['SOC'][locale], filterValue: filters.soc, disabled: !ownershipsArr.includes('SOC') }
                    ]}
                    setFilter={setFilter}
                />
                <Select
                    items={depTerminalsArr}
                    result={filters.depTerminal}
                    setResult={val => setFilter({ depTerminal: val })}
                    placeholder={PanelLocale['терминал_отправления'][locale]}
                    logo={navIcon}
                    border="1px solid #D6DCE3"
                    borderRadius="1000px"
                    containerHeight='35px'
                    selectHeight='25px'
                    withoutBorder
                />
                <br />
                <Select
                    items={desTerminalsArr}
                    result={filters.desTerminal}
                    setResult={val => setFilter({ desTerminal: val })}
                    placeholder={PanelLocale['терминал_назначения'][locale]}
                    logo={navIcon}
                    border="1px solid #D6DCE3"
                    borderRadius="1000px"
                    containerHeight='35px'
                    selectHeight='25px'
                    withoutBorder
                />
                <br />
                <ThumblersRow
                    rowName={PanelLocale['интервал_времени'][locale]}
                    thumblersData={[
                        { key: 'today', name: PanelLocale['текущие_даты'][locale], filterValue: filters.today, disabled: !haveToday },
                        { key: 'future', name: PanelLocale['будущие_даты'][locale], filterValue: filters.future, disabled: !haveFuture }
                    ]}
                    withAllOption={false}
                    setFilter={setFilter}
                />
                {
                    rateTypesArr.includes('Каботаж')
                    &&
                    <Thumbler
                        name={PanelLocale['каботаж20'][locale]}
                        val={filters.kabotaj}
                        setVal={val => setFilter({ kabotaj: val })}
                    />
                }
                {
                    rateTypesArr.includes('Импорт')
                    &&
                    <Thumbler
                        name={PanelLocale['импорт0'][locale]}
                        val={filters.import}
                        setVal={val => setFilter({ import: val })}
                    />
                }
                {
                    rateTypesArr.includes('ЖД Китай')
                    &&
                    <Thumbler
                        name={PanelLocale['прямое_жд_кнр_рф0'][locale]}
                        val={filters.direct}
                        setVal={val => setFilter({ direct: val })}
                    />
                }
                {
                    rateTypesArr.includes('Экспорт')
                    &&
                    <Thumbler
                        name={PanelLocale['экспорт0'][locale]}
                        val={filters.export}
                        setVal={val => setFilter({ export: val })}
                    />
                }
                <div className={globalStyles.confirm_filters} onClick={() => setMenu(false)}>{PanelLocale['применить'][locale]}</div>
                <div className={globalStyles.remove_filters} onClick={() => setFilter(clearFilters)}>&#128465; {PanelLocale['очистить_всё'][locale]}</div>
            </div>
        </div>
    )
}