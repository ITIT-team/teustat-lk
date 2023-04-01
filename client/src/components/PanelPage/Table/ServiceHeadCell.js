import React, { useState, useEffect } from 'react'

import s from 'styles/PanelPage/Table/service_head.module.css'

const colors = {
  'Экспедитор': '#8E4BFD',
  'Оператор': '#99FD4B',
  '': '#2090FB',
}

export const ServiceHeadCell = ({
  map,
  filter,
  serviceSorterSetter,
}) => {
  const [showPlate, setShowPlate] = useState(false)

  const ColorPoint = ({ color, customStyles={} }) => 
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: color,
        marginRight: 10,
        ...customStyles
      }}
    />

  useEffect(() => {
    const documentClickListener = ({target}) => !['service', 'service_plate'].includes(target.id) && setShowPlate(false)
    if (showPlate) document.addEventListener('click', documentClickListener)
    else document.removeEventListener('click', documentClickListener)
  }, [showPlate])

  return (
    <th
      onClick={() => setShowPlate(prev => !prev)}
      className={s.service}
      key={`th_service`}
      id='service'
    >
      {
        showPlate &&
        <div className={s.plate} id='service_plate'>
          <span>Выводить только:</span>
          <div className={s.item} onClick={() => serviceSorterSetter('Экспедитор')}>
            <ColorPoint color={colors['Экспедитор']} />
            Экспедитор
          </div>
          <div className={s.item} onClick={() => serviceSorterSetter('Оператор')}>
            <ColorPoint color={colors['Оператор']} />
            Оператор
          </div>
          <div className={s.item} onClick={() => serviceSorterSetter('')}>
            <ColorPoint color={colors['']} />
            Все
          </div>
        </div>
      }
      <ColorPoint
        color={colors[filter.serviceType]}
        customStyles={{
          position: 'absolute',
          marginLeft: 0,
          top: '37%',
          left: 'calc(50% - 35px)'
        }}
      />
      {' '}
      {map.service}
    </th>
  )
}
