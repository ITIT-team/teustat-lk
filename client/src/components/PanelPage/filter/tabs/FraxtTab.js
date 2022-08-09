import React, { useState, useRef, useEffect } from 'react'
import { Select } from 'components/Global/Select'
import { ThumblersRow } from 'components/PanelPage/ThumblersRow'
import { Thumbler } from 'components/PanelPage/Thumbler'
import globalStyles from 'styles/PanelPage/filter/global.module.css'
import localStyles from 'styles/PanelPage/filter/tabs/tab.fraxt.module.css'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import snakeIcon from 'assets/panel/tabs/snake_way_icon.svg'
import shipIcon from 'assets/panel/tabs/ship_line_icon.svg'
import navIcon from 'assets/panel/tabs/navigator_icon.svg'
import filterIcon from 'assets/panel/filter/filter_icon.svg'

import {
    departureCities,
    destinationCities,
    services,
    givenCities,
    sizes,
    ownerships,
    rateTypes,
    todayDates,
    futureDates,
    terminals
} from 'utils/panel/getters/fraxt'
import { usePanelContext } from 'Context'

export const FraxtTab = ({ filters, setFilter, clearFilters }) => {
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

    const data = records.find(r => r.id === 1).recs

    const depCities = departureCities(data, filters)
    const desCities = destinationCities(data, filters)
    const givenCitiesArr = givenCities(data, filters)
    const servicesArr = services(data, filters)
    const sizesArr = sizes(data, filters)
    const ownershipsArr = ownerships(data, filters)
    const rateTypesArr = rateTypes(data, filters)
    const haveToday = todayDates(data, filters).lenght !== 0
    const haveFuture = futureDates(data, filters).length !== 0
    const terminalsArr = terminals(data, filters)

    return (
        <>
            <div className={globalStyles.up_filters_container}>
                <div className={globalStyles.input_filters}>
                    <div className={localStyles.departure_port}>
                        <Select
                            items={depCities}
                            result={filters.depPort}
                            setResult={val => setFilter({ depPort: val })}
                            placeholder='Пункт отправления'
                            logo={pointIcon}
                        />
                    </div>
                    <div className={localStyles.destination_port}>
                        <Select
                            items={desCities}
                            result={filters.desPort}
                            setResult={val => setFilter({ desPort: val })}
                            placeholder='Порт назначения'
                            logo={flagIcon}
                        />
                    </div>
                    <div className={localStyles.given_city}>
                        <Select
                            items={givenCitiesArr}
                            result={filters.cityOfGiven}
                            setResult={val => setFilter({ cityOfGiven: val })}
                            placeholder='Город сдачи порожнего контейнера DROP OFF'
                            logo={snakeIcon}
                        />
                    </div>
                    <div className={localStyles.service}>
                        <Select
                            items={servicesArr}
                            result={filters.agent}
                            setResult={val => setFilter({ agent: val })}
                            placeholder='Линия'
                            logo={shipIcon}
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
                        { key: 's40', name: '40', filterValue: filters.s40, disabled: !sizesArr.includes('40') }
                    ]}
                    setFilter={setFilter}
                />
                <ThumblersRow
                    rowName='Принадлежность контейнера'
                    thumblersData={[
                        { key: 'coc', name: 'COC', filterValue: filters.coc, disabled: !ownershipsArr.includes('COC') },
                        { key: 'soc', name: 'SOC', filterValue: filters.soc, disabled: !ownershipsArr.includes('SOC') }
                    ]}
                    setFilter={setFilter}
                />
                <Select
                    items={terminalsArr}
                    result={filters.terminal}
                    setResult={val => setFilter({ terminal: val })}
                    placeholder="Терминал назначения"
                    logo={navIcon}
                    border="1px solid #D6DCE3"
                    borderRadius="1000px"
                    containerHeight='35px'
                    selectHeight='25px'
                    withoutBorder
                />
                <br />
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