import React, { useEffect, useState } from 'react'
import { useGlobalContext } from 'Context'
import { CustomPagination } from '../CustomPagination'
import { CrossRowWrapper } from './Cells/CrossRowWrapper'
import { ServiceHeadCell } from './ServiceHeadCell'
import $ from 'jquery'
import { storageCleaner, compareObjects } from 'utils'
import { INITIAL_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import 'utils/panel/addMagic'
import 'styles/PanelPage/Table/dragtable.css'
import table_c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const CrossTable = ({
  eventAnalytic,
  records,
  filter,
  sorterSetter,
  serviceSorterSetter=()=>{},
}) => {
  const { locale } = useGlobalContext()
  const [pagination, setPagination] = useState(() => {
    const pag = sessionStorage.getItem('cross_pagination')
    if (pag) return parseInt(pag)
    return 0
  })

  const [order, setOrder] = useState(
    (() => {
      const storageObj = JSON.parse(localStorage.getItem('cross_tableorder'))
      const stateObj = {
        date: 0,
        departureAndDestinationCity: 1,
        containerSize: 2,
        containerOwner: 3,
        rate: 4,
        service: 5,
        condition: 6,
      }
      storageCleaner(storageObj, stateObj, 'cross_tableorder')
      return (
        JSON.parse(localStorage.getItem('cross_tableorder')) || {
          date: 0,
          departureAndDestinationCity: 1,
          containerSize: 2,
          containerOwner: 3,
          rate: 4,
          service: 5,
          condition: 6,
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
    localStorage.setItem('cross_tableorder', JSON.stringify(order))
  }, [order])

  useEffect(() => {
    if (
      !compareObjects(
        filter,
        INITIAL_TABS_STATE.find((t) => t.id === TAB_ID.FOBFOR)
      )
    )
      setPagination(0)
  }, [filter])

  useEffect(() => {
    sessionStorage.setItem('cross_pagination', pagination.toString())
  }, [pagination])

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

  return (
    <div className={table_c.cross_table_container}>
      <table className="sar-table">
        {(() => {
          const keys = orderedCells()
          const map = {
            date: PanelLocale['дата_ставки'][locale],
            departureAndDestinationCity:
              PanelLocale['город_отправления_город_назначения'][locale],
            containerSize: PanelLocale['размер'][locale],
            containerOwner: PanelLocale['принадлежность'][locale],
            rate: PanelLocale['цена'][locale],
            service: PanelLocale['агент'][locale],
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
                    if (key === 'service') {
                      return (
                        <ServiceHeadCell
                          key={key}
                          map={map}
                          filter={filter}
                          serviceSorterSetter={serviceSorterSetter}
                        />
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
                {JSON.parse(JSON.stringify(records))
                  .splice(pagination * 13, 13)
                  .map((r) => (
                    <CrossRowWrapper
                      handleContact={({ event, data }) =>
                        eventAnalytic({ event, data: { ...data, ...r } })
                      }
                      openCard={() =>
                        eventAnalytic({ event: 'click_card', data: r })
                      }
                      r={r}
                      id={r.id}
                      key={r.id}
                      keys={keys}
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
  )
}
