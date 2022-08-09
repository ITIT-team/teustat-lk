import React, { useEffect, useState } from 'react'
import { CustomPagination } from '../CustomPagination'
import { GroupageRowWrapper } from './cells/GroupageRowWrapper'
import $ from 'jquery'
import { storageCleaner } from 'utils'
import 'utils/panel/addMagic'
import 'styles/PanelPage/table/dragtable.css'
import table_c from 'styles/PanelPage/table/table.module.css'

export const GroupageTable = ({ records, filter, sorterSetter }) => {
  const [pagination, setPagination] = useState(0)

  const [order, setOrder] = useState((() => {
    const storageObj = JSON.parse(localStorage.getItem('groupage_tableorder'))
    const stateObj = {
      date: 0, departureAndDestinationCity: 1,
      typeUnit: 2, rate: 3, service: 4, condition: 5,
    }
    storageCleaner(storageObj, stateObj, 'groupage_tableorder')
    return JSON.parse(localStorage.getItem('groupage_tableorder')) ||
    {
      date: 0, departureAndDestinationCity: 1,
      typeUnit: 2, rate: 3, service: 4, condition: 5,
    }
  })())

  useEffect(() => {
    $('.sar-table').dragtable({
      persistState: function (table) {
        table.el.find('th').each(function (i) {
          if (this.id !== '') {
            table.sortOrder[this.id] = i
          }
        });
        setOrder(JSON.parse(JSON.stringify(table.sortOrder)))
      },
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('groupage_tableorder', JSON.stringify(order))
  }, [order])

  useEffect(() => setPagination(0), [filter])

  const orderedCells = () => {
    const sortedValues = Object.values(order).sort((a, b) => a - b)
    let keys = []
    sortedValues.forEach(val => keys.push(Object.keys(order).find(key => order[key] === val)))
    return keys
  }

  const promptMessage = 'Объем - м3, Вес - кг/т'

  return (
    <div className={table_c.groupage_table_container}>
      <table className="sar-table">
        {
          (() => {
            const keys = orderedCells()
            const map = {
              date: 'Дата ставки',
              departureAndDestinationCity: 'Пункт отправления / назначения',
              typeUnit: 'Цена за',
              rate: 'Цена',
              service: 'Агент',
              condition: 'Комментарии',
            }
            return (
              <>
                <thead>
                  <tr>
                    {
                      keys.map(key => {
                        if (key === 'rate') {
                          return <th onClick={() => {
                            if (filter.rateSort === 'up') sorterSetter('down')
                            if (filter.rateSort === 'down') sorterSetter('none')
                            if (filter.rateSort === 'none') sorterSetter('up')
                          }} style={{textAlign: 'left', paddingLeft: 45}} key={`th_${key}`} id={key}>{map[key]} {(() => {
                            if (filter.rateSort === 'none') return <b>&uarr;&darr;</b>
                            if (filter.rateSort === 'up') return <b style={{ color: 'green' }}>&darr;</b>
                            if (filter.rateSort === 'down') return <b style={{ color: 'red' }}>&uarr;</b>
                          })()}</th>
                        }
                        return <th key={`th_${key}`} id={key}>{
                          map[key] === 'Цена за' ?
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
                      <GroupageRowWrapper r={r} id={r.id} key={r.id} keys={keys} filter={filter}/>
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
  )
}