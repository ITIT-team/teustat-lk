import React, { useEffect, useState } from 'react'
import { Loader } from 'components/Global/Loader'
import { useGlobalContext } from 'Context'
import { CustomPagination } from '../CustomPagination'
import { FraxtRowWrapper } from './Cells/FraxtRowWrapper'
import $ from 'jquery'
import { storageCleaner, compareObjects } from 'utils'
import { INITIAL_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import 'utils/panel/addMagic'
import 'styles/PanelPage/Table/dragtable.css'
import table_c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const FraxtTable = ({
  eventAnalytic,
  records,
  filter,
  sorterSetter,
}) => {
  const { locale } = useGlobalContext()
  const [pagination, setPagination] = useState(() => {
    const pag = sessionStorage.getItem('fraxt_pagination')
    if (pag) return parseInt(pag)
    return 0
  })

  const [order, setOrder] = useState(
    (() => {
      const storageObj = JSON.parse(localStorage.getItem('fraxt_tableorder'))
      const stateObj = {
        date: 0,
        departureAndDestinationCity: 1,
        destinationDropOff: 2,
        containerSize: 3,
        containerOwner: 4,
        service: 5,
        rate: 6,
        rateDropOff: 7,
        condition: 8,
      }
      storageCleaner(storageObj, stateObj, 'fraxt_tableorder')
      return (
        JSON.parse(localStorage.getItem('fraxt_tableorder')) || {
          date: 0,
          departureAndDestinationCity: 1,
          destinationDropOff: 2,
          containerSize: 3,
          containerOwner: 4,
          service: 5,
          rate: 6,
          rateDropOff: 7,
          condition: 8,
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
    localStorage.setItem('fraxt_tableorder', JSON.stringify(order))
  }, [order])

  useEffect(() => {
    if (
      !compareObjects(
        filter,
        INITIAL_TABS_STATE.find((t) => t.id === TAB_ID.FREIGHT)
      )
    )
      setPagination(0)
  }, [filter])

  useEffect(
    () => sessionStorage.setItem('fraxt_pagination', pagination.toString()),
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
    <>
      <div className={table_c.fraxt_table_container}>
        <table className="sar-table">
          {(() => {
            const keys = orderedCells()
            const map = {
              date: PanelLocale['дата_ставки'][locale],
              departureAndDestinationCity:
                PanelLocale['порт_отправления_порт_назначения'][locale],
              destinationDropOff: PanelLocale['город_сдачи'][locale],
              containerSize: PanelLocale['размер'][locale],
              containerOwner: PanelLocale['принадлежность'][locale],
              service: PanelLocale['линия'][locale],
              rate: PanelLocale['ставка_фрахта'][locale],
              rateDropOff: PanelLocale['ставка_drop_off'][locale],
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
                              if (filter.rateSort === 'down')
                                sorterSetter('none')
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
                      if (key === 'rateDropOff' && filter.cityOfGiven === '') {
                        return (
                          <th
                            style={{
                              width: '.1px',
                              display: 'none',
                            }}
                            key={`th_${key}`}
                            id={key}
                          >
                            {map[key]}
                          </th>
                        )
                      }
                      return (
                        <th key={`th_${key}`} id={key}>
                          {map[key] ===
                          PanelLocale['принадлежность'][locale] ? (
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
                      <FraxtRowWrapper
                        openCard={() =>
                          eventAnalytic({ event: 'click_card', data: r })
                        }
                        r={r}
                        handleContact={({ event, data }) =>
                          eventAnalytic({ event, data: { ...data, ...r } })
                        }
                        filter={filter}
                        key={r.id}
                        id={r.id}
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
    </>
  ) : <Loader customStyles={{ height: '40vh', marginTop: 150 }} />
}
