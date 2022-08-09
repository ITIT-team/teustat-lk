import React, { useEffect, useState } from 'react'
import { CustomPagination } from '../CustomPagination'
import { FraxtRowWrapper } from './cells/FraxtRowWrapper'
import $ from 'jquery'
import { storageCleaner } from 'utils'
import 'utils/panel/addMagic'
import 'styles/PanelPage/table/dragtable.css'
import table_c from 'styles/PanelPage/table/table.module.css'

export const FraxtTable = ({ records, filter, sorterSetter }) => {
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
    
    const promptMessage = 'COC - контейнер перевозчика, SOC - контейнер заказчика'

    return (
        <>
            <div className={table_c.fraxt_table_container}>
                <table className="sar-table">
                    {
                        (() => {
                            const keys = orderedCells()
                            const map = {
                                date: 'Дата ставки',
                                departureAndDestinationCity: 'Порт отправления / Порт назначения',
                                destinationDropOff: 'Город сдачи',
                                containerSize: 'Размер',
                                containerOwner: 'Принадлежность',
                                service: 'Линия',
                                rate: 'Ставка фрахта',
                                rateDropOff: 'Ставка DROP OFF',
                                condition: 'Комментарии'
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
                                                        map[key] === 'Принадлежность' ?
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