import React from 'react'
import { useGlobalContext } from 'Context'

import { PanelLocale } from 'locales'

export const TableHead = ({ category }) => {
  const { locale } = useGlobalContext()

  return (
    <thead>
      <tr>
        <th>{PanelLocale['дата_ставки'][locale]}</th>
        <th>{PanelLocale['город_станция_терминал_отправления_назначения'][locale]}</th>
        {
          category === 'Сборный груз' ?
          <th>{PanelLocale['цена_за'][locale]}</th>
          :
          <>
            <th>{PanelLocale['размер'][locale]}</th>
            { !['Автовывоз', 'Выдача'].includes(category) && <th>{PanelLocale['принадлежность'][locale]}</th> }
          </>
        }
        <th>{PanelLocale['агент'][locale]}</th>
        <th>{PanelLocale['цена'][locale]}</th>
        <th>{PanelLocale['ндс'][locale]}</th>
      </tr>
    </thead>
  )
}
