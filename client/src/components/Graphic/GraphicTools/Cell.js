import React from 'react'

import s from 'styles/Graphic/GraphicTools/dataset.card.module.css'

export const Cell = ({ children }) => {
  return (
    <td>
      <div className={s.cell_container}>
        {children}
      </div>
    </td>
  )
}
