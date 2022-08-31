import React, { useEffect, useState } from 'react'
import { useGlobalContext } from 'Context'
import { CustomPagination } from '../CustomPagination'
import { FraxtRowWrapper } from './Cells/FraxtRowWrapper'
import $ from 'jquery'
import { storageCleaner } from 'utils'
import 'utils/panel/addMagic'
import 'styles/PanelPage/Table/dragtable.css'
import table_c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const FraxtTable = ({ records, filter, sorterSetter }) => {
    const { locale } = useGlobalContext()
    const [pagination, setPagination] = useState(0)

    const [order, setOrder] = useState((() => {
        const storageObj = JSON.parse(localStorage.getItem('fraxt_tableorder'))
        const stateObj = { date: 0, departureAndDestinationCity: 1,
        destinationDropOff: 2, containerSize: 3, containerOwner: 4, service: 5, rate: 6, rateDropOff: 7, condition: 8 }
        storageCleaner(storageObj, stateObj, 'fraxt_tableorder')
        return JSON.parse(localStorage.getItem('fraxt_tableorder')) ||
        { date: 0, departureAndDestinationCity: 1, destinationDropOff: 2, containerSize: 3, containerOwner: 4, service: 5, rate: 6, rateDropOff: 7, condition: 8 }
    })())

    useEffect(() => {
        $('.sar-table').dragtable({
            persistState: function(table) {
                table.el.find('th').each(function(i) {
                    if(this.id !== ''){
                        table.sortOrder[this.id] = i
                    }
                });
                setOrder(JSON.parse(JSON.stringify(table.sortOrder)))
                },
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('fraxt_tableorder', JSON.stringify(order))
    }, [order])

    useEffect(() => setPagination(0) , [filter])

    const orderedCells = () => {
        const sortedValues = Object.values(order).sort((a, b) => a - b)
        let keys = []
        sortedValues.forEach(val => keys.push(Object.keys(order).find(key => order[key] === val)))
        return keys
    }
    
    const promptMessage = PanelLocale['coc_контейнер_перевозчика_soc_контейнер_заказчика'][locale]

    return (
        <>
            <div className={table_c.fraxt_table_container}>
                <table className="sar-table">
                    {
                        (() => {
                            const keys = orderedCells()
                            const map = {
                                date: PanelLocale['дата_ставки'][locale],
                                departureAndDestinationCity: PanelLocale['порт_отправления_порт_назначения'][locale],
                                destinationDropOff: PanelLocale['город_сдачи'][locale],
                                containerSize: PanelLocale['размер'][locale],
                                containerOwner: PanelLocale['принадлежность'][locale],
                                service: PanelLocale['линия'][locale],
                                rate: PanelLocale['ставка_фрахта'][locale],
                                rateDropOff: PanelLocale['ставка_drop_off'][locale],
                                condition: PanelLocale['комментарии'][locale]
                            }
                            return (
                                <>
                                    <thead>
                                        <tr>
                                            {
                                                keys.map(key => {
                                                    if (key === 'rate'){
                                                        return <th onClick={() => {
                                                            if (filter.rateSort === 'up') sorterSetter('down')
                                                            if (filter.rateSort === 'down') sorterSetter('none')
                                                            if (filter.rateSort === 'none') sorterSetter('up')
                                                        }} key={`th_${key}`} id={key}>{map[key]} {(() => {
                                                            if (filter.rateSort === 'none') return <b>&uarr;&darr;</b>
                                                            if (filter.rateSort === 'up') return <b style={{color: 'green'}}>&darr;</b>
                                                            if (filter.rateSort === 'down') return <b style={{color: 'red'}}>&uarr;</b>
                                                        })()}</th>
                                                    }
                                                    if (key === 'rateDropOff' && filter.cityOfGiven === ''){
                                                        return <th style={{
                                                            width: '.1px',
                                                            display: 'none'
                                                        }} key={`th_${key}`} id={key}>{map[key]}</th>
                                                    }
                                                    return <th key={`th_${key}`} id={key}>{
                                                        map[key] === PanelLocale['принадлежность'][locale] ?
                                                        <div className={table_c.owners_prompt_container}>
                                                            {map[key]}<div data-prompt-text={promptMessage} className={table_c.owners_prompt_icon}>i</div>
                                                        </div>
                                                        :
                                                        <>{map[key]}</>
                                                    }</th>
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        JSON.parse(JSON.stringify(records)).splice(pagination * 13, 13).map(r => (
                                            <FraxtRowWrapper r={r} filter={filter} key={r.id} id={r.id} keys={keys}/>
                                        ))
                                    }
                                    </tbody>
                                </>
                            )
                        })()
                    }
                </table>
                <CustomPagination
                    pagination={pagination}
                    setPagination={setPagination}
                    count={records.length}
                />
            </div>
        </>
    )
}