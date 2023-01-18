import React, { useState, useEffect, useRef } from 'react'

import { OneCalendar } from './OneCalendar'

import c from 'styles/components/interval.picker.module.css'

const monthData = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]

export const IntervalPicker = ({
    interval = {
        from: new Date('2020-01-01'),
        to: new Date()
    },
    result = {
        from: null,
        to: null
    },
    setResult,
    placeholder,
    logo,
    borderRadius = '10px',
    border = '2px solid transparent',
    containerHeight = '50px',
    selectHeight = '30px',
    withoutBorder
}) => {
    const [opened, setOpened] = useState(false)
    const [years] = useState(() => {
        const yearFrom = interval.from.getFullYear()
        const yearTo = interval.to.getFullYear()
        return Array.from({ length: yearTo - yearFrom + 1 }, (_, i) => yearFrom + i)
    })
    const [selectedYear, setSelectedYear] = useState(interval.to.getFullYear())
    const container = useRef()
    const input = useRef()
    const itemList = useRef()

    const activeOn = () => {
        container.current.style.borderColor = 'var(--hardBlue)'
        input.current.focus()
        setOpened(true)
    }

    const activeOff = () => {
        container.current.style.borderColor = border.split(' ')[2]
        input.current.blur()
        setOpened(false)
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
                    value={(() => {
                        const fromDateStr = result.from?.toLocaleDateString('ru')
                        const toDateStr = result.to?.toLocaleDateString('ru')
                        if (!fromDateStr && !toDateStr) return ''
                        return `${fromDateStr ? fromDateStr : '...'} - ${toDateStr ? toDateStr : '...'}`
                    })()}
                    readOnly={true}
                />
                <div className={c.clear_container} onClick={() => setResult({
                    from: null,
                    to: null
                })}>
                    <div className={c.clear}>&times;</div>
                </div>
            </div>
            <div className={c.item_list + (opened ? ` ${c.list_active}` : '')} ref={itemList} style={{ top: `${parseInt(containerHeight) - 1}px` }}>
                <OneCalendar
                    calendarData={
                        years.map(
                            y => ({
                                year: y,
                                monthes: y === interval.to.getFullYear() ? monthData.slice(0, interval.to.getMonth() + 1) : monthData

                            })
                        )
                    }
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    result={result}
                    setResult={setResult}
                />
            </div>
        </div>
    )
}
