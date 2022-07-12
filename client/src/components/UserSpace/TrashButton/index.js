import React from 'react'
import { TrashIcon } from '../TrashIcon'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

export const TrashButton = ({ onClick, loading }) => {
  return (
    <div className={st.trash_button} onClick={onClick}>
      <TrashIcon
        loading={loading}
        white
        style={{
          background: 'rgba(255, 255, 255, .15)',
          marginRight: 15,
        }}
      />
      <span
        style={{
          color: 'white',
          fontSize: 15,
          fontWeight: 600
        }}
      >Удалить всё</span>
    </div>
  )
}
