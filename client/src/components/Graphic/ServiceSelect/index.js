import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/components/select.module.css';

import { PanelLocale } from 'locales'

export const ServiceSelect = ({
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
        if (result) setFilter(result.service)
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
            if (document.activeElement === input.current){
                e.preventDefault()
            }
        })
    })

    useEffect(() => {
        if (result) setFilter(result.service)
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
                        if (e.key === 'Enter'){
                            const arr = items.filter(it => it.service.toLowerCase().includes(filter.toLowerCase()))
                            if (arr.length !== 0){
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
            <div className={c.item_list + (opened ? ` ${c.list_active}` : '')} ref={itemList} style={{top: `${parseInt(containerHeight) - 1}px`}}>
                {
                    items.length === 0 ?
                    <div className={c.info_item}>{PanelLocale['список_пуст'][locale]}</div>
                    :
                    <>
                        {
                            items
                            .filter(it => it.service.toLowerCase().includes(filter.toLowerCase()))
                            .length !== 0 ?
                            items
                            .sort((a, b) => new Intl.Collator('ru').compare(a.service, b.service))
                            .filter(it => it.service.toLowerCase().includes(filter.toLowerCase()))
                            .map(item => <div
                                    key={item.id}
                                    className={c.one_item}
                                    onClick={() => changeValue(item)}
                                >{item.service}</div>
                            )
                            :
                            <div className={c.info_item}>{PanelLocale['совпадений_нет'][locale]}</div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
