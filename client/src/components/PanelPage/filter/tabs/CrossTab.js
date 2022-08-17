import React, { useState, useRef, useEffect } from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { Select } from 'components/Global/Select'
import { ThumblersRow } from 'components/PanelPage/ThumblersRow'
import { Thumbler } from 'components/PanelPage/Thumbler'
import globalStyles from 'styles/PanelPage/filter/global.module.css'
import localStyles from 'styles/PanelPage/filter/tabs/tab.cross.module.css'

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
    futureDates,
    containerOwners
} from 'utils/panel/getters/cross'
import { usePanelContext } from 'Context'

export const CrossTab = ({ filters, setFilter, clearFilters }) => {
    const { records, course, pulse, setPulse } = usePanelContext()
    const [menu, setMenu] = useState(false)

    const iconMenu = useRef()

    useEffect(() => {
        if (iconMenu.current){
            iconMenu.current.addEventListener('mouseover', () => {
                setPulse(false)
            })
        }
    }, [ setPulse ])

    const data = records.find(r => r.id === TAB_ID.CROSS).recs

    const depCities = departureCities(data, filters)
    const desCities = destinationCities(data, filters)
    const sizesArr = sizes(data, filters)
    const rateTypesArr = rateTypes(data, filters)
    const agentsArr = agents(data, filters)
    const ownersArr = containerOwners(data, filters)
    const haveToday = todayDates(data, filters).length !== 0
    const haveFuture = futureDates(data, filters).length !== 0

    return (
        <>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <div className={localStyles.one_input_block}>
                        <Select
                            items={depCities}
                            result={filters.depCity}
                            setResult={val => setFilter({ depCity: val })}
                            placeholder="Город отправления"
                            logo={pointIcon}
                        />
                    </div>
                    <div className={localStyles.one_input_block}>
                        <Select
                            items={desCities}
                            result={filters.desCity}
                            setResult={val => setFilter({ desCity: val })}
                            placeholder="Город назначения"
                            logo={flagIcon}
                        />
                    </div>
                    <div className={localStyles.one_input_block}>
                        <Select
                            items={agentsArr}
                            result={filters.agent}
                            setResult={val => setFilter({ agent: val })}
                            placeholder="Агент"
                            logo={snakeIcon}
                            withoutBorder
                        />
                    </div>
                </div>
                <div className={globalStyles.dollar}>
                    1$ = {course} руб.
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
                    rowName='Размер контейнера'
                    thumblersData={[
                        { key: 's20', name: '20', filterValue: filters.s20, disabled: !sizesArr.includes('20') },
                        { key: 's20t', name: '20 тяж.', filterValue: filters.s20t, disabled: !sizesArr.includes('20 фут.тяж.') },
                        { key: 's40', name: '40', filterValue: filters.s40, disabled: !sizesArr.includes('40') }
                    ]}
                    setFilter={setFilter}
                />
                <ThumblersRow
                    rowName='Принадлежность контейнера'
                    thumblersData={[
                        { key: 'coc', name: 'COC', filterValue: filters.coc, disabled: !ownersArr.includes('COC') },
                        { key: 'soc', name: 'SOC', filterValue: filters.soc, disabled: !ownersArr.includes('SOC') }
                    ]}
                    setFilter={setFilter}
                />
                <ThumblersRow
                    rowName='Интервал времени'
                    thumblersData={[
                        { key: 'today', name: 'Текущие даты', filterValue: filters.today, disabled: !haveToday },
                        { key: 'future', name: 'Будущие даты', filterValue: filters.future, disabled: !haveFuture }
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
                        name="Импорт НДС 0%"
                    />
                }
                {
                    rateTypesArr.includes('Экспорт')
                    &&
                    <Thumbler
                        val={filters.export}
                        setVal={val => setFilter({ export: val })}
                        name="Экспорт НДС 0%"
                    />
                }
                {
                    rateTypesArr.includes('Каботаж')
                    &&
                    <Thumbler 
                        val={filters.kabotaj}
                        setVal={val => setFilter({ kabotaj: val })}
                        name="Каботаж НДС 20%"
                    />
                }
                <div className={globalStyles.confirm_filters} onClick={() => setMenu(false)}>Применить</div>
                <div className={globalStyles.remove_filters} onClick={() => setFilter(clearFilters)}>&#128465; Очистить всё</div>
            </div>
        </>
    )
}
