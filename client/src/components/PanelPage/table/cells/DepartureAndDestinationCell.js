import React, { useRef, useEffect } from 'react'
import c from 'styles/PanelPage/table/table.module.css'

import vietnamIcon from 'assets/panel/countries/vietnam_icon.png'
import indiaIcon from 'assets/panel/countries/india_icon.png'
import kazakhstanIcon from 'assets/panel/countries/kazakhstan_icon.png'
import chinaIcon from 'assets/panel/countries/china_icon.png'
import koreaIcon from 'assets/panel/countries/korea_icon.png'
import laosIcon from 'assets/panel/countries/laos_icon.png'
import russiaIcon from 'assets/panel/countries/russia_icon.png'
import singaporeIcon from 'assets/panel/countries/singapore_icon.png'
import thailandIcon from 'assets/panel/countries/thailand_icon.png'
import taiwanIcon from 'assets/panel/countries/taiwan_icon.png'
import turkeyIcon from 'assets/panel/countries/turkey_icon.png'
import japanIcon from 'assets/panel/countries/japan_icon.png'
import malaysiaIcon from 'assets/panel/countries/malaysia_icon.png'
import belarusIcon from 'assets/panel/countries/belarus_icon.png'
import cambodiaIcon from 'assets/panel/countries/cambodia_icon.png'
import bangladeshIcon from 'assets/panel/countries/bangladesh_icon.png'
import philippinesIcon from 'assets/panel/countries/philippines_icon.png'
import indonesiaIcon from 'assets/panel/countries/indonesia_icon.png'
import usaIcon from 'assets/panel/countries/usa_icon.png'
import germanyIcon from 'assets/panel/countries/germany_icon.png'
import pakistanIcon from 'assets/panel/countries/pakistan_icon.png'

const countryIcons = {
    "ВЬЕТНАМ": vietnamIcon,
    "ИНДИЯ": indiaIcon,
    "КАЗАХСТАН": kazakhstanIcon,
    "КИТАЙ": chinaIcon,
    "КОРЕЯ, РЕСПУБЛИКА": koreaIcon,
    "ЛАОССКАЯ НАРОДНО-ДЕМОКРАТИЧЕСКАЯ РЕСПУБЛИКА": laosIcon,
    "РОССИЯ": russiaIcon,
    "СИНГАПУР": singaporeIcon,
    "ТАИЛАНД": thailandIcon,
    "ТАЙВАНЬ (КИТАЙ)": taiwanIcon,
    "Тайвань": taiwanIcon,
    "ТУРЦИЯ": turkeyIcon,
    "ЯПОНИЯ": japanIcon,
    "МАЛАЙЗИЯ": malaysiaIcon,
    "БЕЛАРУСЬ": belarusIcon,
    "КАМБОДЖА": cambodiaIcon,
    "БАНГЛАДЕШ": bangladeshIcon,
    "ФИЛИППИНЫ": philippinesIcon,
    "ИНДОНЕЗИЯ": indonesiaIcon,
    "СОЕДИНЕННЫЕ ШТАТЫ": usaIcon,
    "ГЕРМАНИЯ": germanyIcon,
    "ПАКИСТАН": pakistanIcon,
}

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
    checkWidth=false
}) => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    const children = () => {
        if (depCity !== '' || desCity !== ''){
            return (
                <>
                    <div className={c.dep_and_des_text}>
                        <div className={c.departure_block}>
                            <div className={c.dep_city}>
                                {
                                    departureCityCountry && departureCityCountry !== ''
                                    &&
                                    <img className={c.flag_icon} src={countryIcons[departureCityCountry]} alt={departureCityCountry} />
                                }
                                {depCity !== '' ? depCity : 'Не указан'}
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
                                        middleTerminal !== '' ? middleTerminal : 'Терминал не указан'
                                    }
                                </div>
                            }
                        </div>
                        <div className={c.destination_block}>
                            <div className={c.des_city}>
                                {
                                    destinationCityCountry && destinationCityCountry !== ''
                                    &&
                                    <img className={c.flag_icon} src={countryIcons[destinationCityCountry]} alt={destinationCityCountry} />
                                }
                                {desCity !== '' ? desCity : 'Не указан'}
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
