import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { CountryIcons } from 'constants/CountryIcons'
import c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const DepartureAndDestinationCell = ({
    depCity,
    desCity,
    depStation = null,
    desStation = null,
    depTerminal = null,
    desTerminal = null,
    full = false,
    alwaysShowTerminals = false,
    alwaysShowStations = false,
    middleTerminal = null,
    departureCityCountry,
    destinationCityCountry,
    asDiv = false,
    checkWidth=false,
    customMargin=null,
    isBoldCities=false
}) => {
    const ref = useRef()
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    const children = () => {
        if (depCity !== '' || desCity !== ''){
            return (
                <>
                    <div className={c.dep_and_des_text} style={customMargin ? { margin: customMargin } : {}}>
                        <div className={c.departure_block}>
                            <div className={c.dep_city} style={{ fontWeight: isBoldCities ? 600 : 'normal' }}>
                                {
                                    departureCityCountry && departureCityCountry !== ''
                                    &&
                                    <img className={c.flag_icon} src={CountryIcons[departureCityCountry]} alt={departureCityCountry} />
                                }
                                {depCity !== '' ? depCity : PanelLocale['не_указан'][locale]}
                            </div>
                            {
                                (depStation !== null && depStation !== '' && full) || (depStation !== null && depStation !== '' && alwaysShowStations)
                                    ?
                                    <div className={c.dep_station}>{depStation}</div>
                                    :
                                    <></>
                            }
                            {
                                (depTerminal !== null && depTerminal !== '' && full) || (depTerminal !== null && depTerminal !== '' && alwaysShowTerminals)
                                    ?
                                    <div className={c.dep_terminal}>{depTerminal}</div>
                                    :
                                    <></>
                            }
                        </div>
                        <div className={c.splitter}>
                            <div className={c.splitter_symbol}>v</div>
                            {
                                middleTerminal !== null
                                &&
                                <div className={c.splitter_middle_terminal}>
                                    {
                                        middleTerminal !== '' ? middleTerminal : PanelLocale['терминал_не_указан'][locale]
                                    }
                                </div>
                            }
                        </div>
                        <div className={c.destination_block}>
                            <div className={c.des_city} style={{ fontWeight: isBoldCities ? 600 : 'normal' }}>
                                {
                                    destinationCityCountry && destinationCityCountry !== ''
                                    &&
                                    <img className={c.flag_icon} src={CountryIcons[destinationCityCountry]} alt={destinationCityCountry} />
                                }
                                {desCity !== '' ? desCity : PanelLocale['не_указан'][locale]}
                            </div>
                            {
                                (desStation !== null && desStation !== '' && full) || (desStation !== null && desStation !== '' && alwaysShowStations)
                                    ?
                                    <div className={c.des_station}>{desStation}</div>
                                    :
                                    <></>
                            }
                            {
                                (desTerminal !== null && desTerminal !== '' && full) || (desTerminal !== null && desTerminal !== '' && alwaysShowTerminals)
                                    ?
                                    <div className={c.des_terminal}>{desTerminal}</div>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </>
            )
        }
    }
    if (asDiv) {
        return <div ref={ref} className={c.dep_and_des_cell}>{children()}</div>
    }
    return <td ref={ref} className={c.dep_and_des_cell}>{children()}</td>
}
