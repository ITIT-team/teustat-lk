import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import { CountryIcons } from 'constants/CountryIcons'
import c from 'styles/components/select.module.css';

import { PanelLocale, CountriesLocale } from 'locales'

export const CitySelect = ({
    items,
    result,
    setResult,
    placeholder,
    logo,
    borderRadius = '10px',
    border = '2px solid transparent',
    containerHeight = '50px',
    selectHeight = '30px',
    withoutBorder
}) => {
    const { locale } = useGlobalContext()
    const [filter, setFilter] = useState('')
    const [opened, setOpened] = useState(false)
    const container = useRef()
    const input = useRef()
    const itemList = useRef()

    const activeOn = () => {
        container.current.style.borderColor = 'var(--hardBlue)'
        input.current.focus()
        setOpened(true)
        setFilter('')
    }

    const activeOff = () => {
        container.current.style.borderColor = border.split(' ')[2]
        input.current.blur()
        setOpened(false)
        if (result) setFilter(result.city)
        else setFilter('')
    }

    const changeValue = value => {
        setResult(value)
        activeOff()
    }

    useEffect(() => {
        container.current.addEventListener('click', activeOn)
        input.current.addEventListener('blur', activeOff)

        itemList.current.addEventListener('mousedown', e => {
            if (document.activeElement === input.current) {
                e.preventDefault()
            }
        })
    })

    useEffect(() => {
        if (result) setFilter(result.city)
        else setFilter('')
    }, [result])

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
                        if (e.key === 'Enter') {
                            const arr = items.filter(
                                it => (
                                    it.city.toLowerCase().includes(filter.toLowerCase()) ||
                                    it.cityRus.toLowerCase().includes(filter.toLowerCase())
                                )
                            )
                            if (arr.length !== 0) {
                                setResult(arr[0])
                                activeOff()
                            }
                        }
                    }}
                />
                <div className={c.clear_container} onClick={() => setResult(null)}>
                    <div className={c.clear}>&times;</div>
                </div>
            </div>
            <div className={c.item_list + (opened ? ` ${c.list_active}` : '')} ref={itemList} style={{ top: `${parseInt(containerHeight) - 1}px` }}>
                {
                    items.length === 0 ?
                        <div className={c.info_item}>{PanelLocale['список_пуст'][locale]}</div>
                        :
                        <>
                            {
                                items
                                    .filter(
                                        it => (
                                            it.city.toLowerCase().includes(filter.toLowerCase()) ||
                                            it.cityRus.toLowerCase().includes(filter.toLowerCase())
                                        )
                                    ).length !== 0 ?
                                    Object.entries(
                                        items
                                            .filter(
                                                it => (
                                                    it.city.toLowerCase().includes(filter.toLowerCase()) ||
                                                    it.cityRus.toLowerCase().includes(filter.toLowerCase())
                                                )
                                            )
                                            .reduce((acc, curr) => {
                                                if (acc[curr.country]) {
                                                    acc[curr.country] = acc[curr.country].concat(curr)
                                                } else {
                                                    acc[curr.country] = [curr]
                                                }
                                                return acc
                                            }, {})
                                    )
                                        .sort((a, b) => new Intl.Collator('ru').compare(a[0], b[0]))
                                        .map(([country, cities]) => {
                                            cities.sort((a, b) => new Intl.Collator('ru').compare(a.city, b.city))
                                            return (
                                                <div className={c.country_block} key={country}>
                                                    <span className={c.country_name}>{CountriesLocale[country]?.[locale] || country}</span>
                                                    {
                                                        cities.map(city => <div
                                                            key={city.id}
                                                            className={c.one_obj_item}
                                                            onClick={() => changeValue(city)}
                                                        >
                                                            <div className={c.city_container}>
                                                                <img className={c.flag_icon} src={CountryIcons[country]} alt={country} />
                                                                <div className={c.city_name}>{city.city}</div>
                                                            </div>
                                                        </div>)
                                                    }
                                                </div>
                                            )
                                        })
                                    :
                                    <div className={c.info_item}>{PanelLocale['совпадений_нет'][locale]}</div>
                            }
                        </>
                }
            </div>
        </div>
    )
}
