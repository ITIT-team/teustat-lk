import React, { useEffect, useState } from 'react'
import { Loader } from 'components/Global/Loader'
import { useGlobalContext } from 'Context'
import { CustomPagination } from '../CustomPagination'
import { AutoRowWrapper } from './Cells/AutoRowWrapper'
import $ from 'jquery'
import { storageCleaner, compareObjects } from 'utils'
import { INITIAL_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import 'utils/panel/addMagic'
import 'styles/PanelPage/Table/dragtable.css'
import table_c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const AutoTable = ({ eventAnalytic, records, filter, sorterSetter }) => {
  const { locale } = useGlobalContext()
  const [pagination, setPagination] = useState(() => {
    const pag = sessionStorage.getItem('auto_pagination')
    if (pag) return parseInt(pag)
    return 0
  })

  const [order, setOrder] = useState(
    (() => {
      const storageObj = JSON.parse(localStorage.getItem('auto_tableorder'))
      const stateObj = {
        date: 0,
        departureAndDestinationCity: 1,
        distance: 2,
        containerSize: 3,
        service: 4,
        rate: 5,
        nds: 6,
        condition: 7,
      }
      storageCleaner(storageObj, stateObj, 'auto_tableorder')
      return (
        JSON.parse(localStorage.getItem('auto_tableorder')) || {
          date: 0,
          departureAndDestinationCity: 1,
          distance: 2,
          containerSize: 3,
          service: 4,
          rate: 5,
          nds: 6,
          condition: 7,
        }
      )
    })()
  )

  useEffect(() => {
    $('.sar-table').dragtable({
      persistState: function (table) {
        table.el.find('th').each(function (i) {
          if (this.id !== '') {
            table.sortOrder[this.id] = i
          }
        })
        setOrder(JSON.parse(JSON.stringify(table.sortOrder)))
      },
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('auto_tableorder', JSON.stringify(order))
  }, [order])

  useEffect(() => {
    if (
      !compareObjects(
        filter,
        INITIAL_TABS_STATE.find((t) => t.id === TAB_ID.AUTO)
      )
    )
      setPagination(0)
  }, [filter])

  useEffect(
    () => sessionStorage.setItem('auto_pagination', pagination.toString()),
    [pagination]
  )

  const orderedCells = () => {
    const sortedValues = Object.values(order).sort((a, b) => a - b)
    let keys = []
    sortedValues.forEach((val) =>
      keys.push(Object.keys(order).find((key) => order[key] === val))
    )
    return keys
  }

  const promptMessage =
    PanelLocale['coc_контейнер_перевозчика_soc_контейнер_заказчика'][locale]

  return records?.length ? (
    <div className={table_c.auto_table_container}>
      <table className="sar-table">
        {(() => {
          const keys = orderedCells()
          const map = {
            date: PanelLocale['дата_ставки'][locale],
            departureAndDestinationCity:
              PanelLocale['пункт_отправления_назначения'][locale],
            distance: PanelLocale['расстояние'][locale],
            containerSize: PanelLocale['размер'][locale],
            service: PanelLocale['агент'][locale],
            rate: PanelLocale['цена'][locale],
            nds: PanelLocale['ндс'][locale],
            condition: PanelLocale['комментарии'][locale],
          }
          return (
            <>
              <thead>
                <tr>
                  {keys.map((key) => {
                    if (key === 'rate') {
                      return (
                        <th
                          onClick={() => {
                            if (filter.rateSort === 'up') sorterSetter('down')
                            if (filter.rateSort === 'down') sorterSetter('none')
                            if (filter.rateSort === 'none') sorterSetter('up')
                          }}
                          key={`th_${key}`}
                          id={key}
                        >
                          {map[key]}{' '}
                          {(() => {
                            if (filter.rateSort === 'none')
                              return <b>&uarr;&darr;</b>
                            if (filter.rateSort === 'up')
                              return <b style={{ color: 'green' }}>&darr;</b>
                            if (filter.rateSort === 'down')
                              return <b style={{ color: 'red' }}>&uarr;</b>
                          })()}
                        </th>
                      )
                    }
                    return (
                      <th key={`th_${key}`} id={key}>
                        {map[key] === PanelLocale['принадлежность'][locale] ? (
                          <div className={table_c.owners_prompt_container}>
                            {map[key]}
                            <div
                              data-prompt-text={promptMessage}
                              className={table_c.owners_prompt_icon}
                            >
                              i
                            </div>
                          </div>
                        ) : (
                          <>{map[key]}</>
                        )}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {
                  records.concat([])
                  .splice(pagination * 13, 13)
                  .map((r) => (
                    <AutoRowWrapper
                      r={r}
                      filter={filter}
                      key={r.id}
                      id={r.id}
                      keys={keys}
                      handleContact={({ event, data }) =>
                        eventAnalytic({ event, data: { ...data, ...r } })
                      }
                      openCard={() =>
                        eventAnalytic({ event: 'click_card', data: r })
                      }
                    />
                  ))}
              </tbody>
            </>
          )
        })()}
      </table>
      <CustomPagination
        pagination={pagination}
        setPagination={setPagination}
        count={records.length}
      />
    </div>
  ) : <Loader customStyles={{ height: '40vh', marginTop: 150 }} />
}
