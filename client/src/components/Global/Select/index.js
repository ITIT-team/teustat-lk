import React, { useState, useEffect, useRef } from 'react'
import { alphaviteSorter } from 'utils'
import c from 'styles/components/select.module.css';

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
import arabianIcon from 'assets/panel/countries/arabian_icon.png'

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
    "ОБЪЕДИНЕННЫЕ АРАБСКИЕ ЭМИРАТЫ": arabianIcon,
}

export const Select = ({
    items,
    result,
    setResult,
    placeholder,
    logo,
    borderRadius='10px',
    border='2px solid transparent',
    containerHeight='50px',
    selectHeight='30px',
    withoutBorder
}) => {
    const [filter, setFilter] = useState('')
    const [opened, setOpened] = useState(false)
    const container = useRef()
    const input = useRef()
    // const arrow = useRef()
    const itemList = useRef()

    const activeOn = () => {
        container.current.style.borderColor = 'var(--hardBlue)'
        // arrow.current.style.marginBottom = '0px'
        // arrow.current.style.transform = 'rotateZ(135deg)'
        input.current.focus()
        setOpened(true)
        setFilter('')
    }

    const activeOff = () => {
        container.current.style.borderColor = border.split(' ')[2]
        // arrow.current.style.marginBottom = '8px'
        // arrow.current.style.transform = 'rotateZ(-45deg)'
        input.current.blur()
        setOpened(false)
        setFilter(result)
    }

    const changeValue = value => {
        setResult(value)
        activeOff()
    }

    useEffect(() => {
        container.current.addEventListener('click', activeOn)
        input.current.addEventListener('blur', activeOff)

        itemList.current.addEventListener('mousedown', e => {
            if (document.activeElement === input.current){
                e.preventDefault()
            }
        })
    })

    useEffect(() => { setFilter(result) }, [result])

    return (
        <div className={c.select_container} ref={container} style={{ borderRadius, border, height: containerHeight }}>
            <div 
                className={c.select} 
                style={{
                    borderRight: withoutBorder ? 'none' : '1px solid rgba(25, 52, 77, .15)',
                    height: selectHeight
                }}>
                <img src={logo} alt="icon" />
                <input
                    type="text"
                    placeholder={placeholder}
                    ref={input}
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter'){
                            if (typeof items[0] === 'string'){
                                const arr = items.filter(it => it.toLowerCase().includes(filter.toLowerCase()))
                                if (arr.length !== 0){
                                    setResult(arr[0])
                                    activeOff()
                                }
                            } else {
                                const arr = items.filter(it => it.city.toLowerCase().includes(filter.toLowerCase()))
                                if (arr.length !== 0){
                                    setResult(arr[0].city)
                                    activeOff()
                                }
                            }
                        }
                    }}
                />
                {/* <div className={c.arrow_container}>
                    <div className={c.arrow} ref={arrow}></div>
                </div> */}
                <div className={c.clear_container} onClick={() => setResult('')}>
                    <div className={c.clear}>&times;</div>
                </div>
            </div>
            <div className={c.item_list + (opened ? ` ${c.list_active}` : '')} ref={itemList} style={{top: `${parseInt(containerHeight) - 1}px`}}>
                {
                    items.length === 0 ?
                    <div className={c.info_item}>Список пуст</div>
                    :
                    <>
                    {
                        typeof items[0] === 'string'
                        ?
                        <>
                            {
                                items.filter(it => it.toLowerCase().includes(filter.toLowerCase())).length !== 0 ?
                                alphaviteSorter(items).filter(it => it.toLowerCase().includes(filter.toLowerCase())).map(item => <div
                                    key={item}
                                    className={c.one_item}
                                    onClick={() => changeValue(item)}
                                >{item}</div>)
                                :
                                <div className={c.info_item}>Совпадений нет</div>
                            }
                        </>
                        :
                        <>
                            {
                                items.filter(it => it.city.toLowerCase().includes(filter.toLowerCase())).length !== 0 ?
                                items.sort((a, b) => new Intl.Collator('ru').compare(a.city, b.city)).filter(it => it.city.toLowerCase().includes(filter.toLowerCase())).map(item => <div
                                    key={JSON.stringify(item)}
                                    className={c.one_obj_item}
                                    onClick={() => changeValue(item.city)}
                                >
                                    <div className={c.city_container}>
                                        <img className={c.flag_icon} src={countryIcons[item.country]} alt={item.country}/>
                                        <div className={c.city_name}>{item.city}</div>
                                    </div>
                                    <div className={c.country_name}>{item.country}</div>
                                </div>)
                                :
                                <div className={c.info_item}>Совпадений нет</div>
                            }
                        </>
                    }
                    </>
                }
            </div>
        </div>
    )
}