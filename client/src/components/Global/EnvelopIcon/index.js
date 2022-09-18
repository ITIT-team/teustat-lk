import React from 'react'
import envelopIcon from 'assets/panel/table/envelop_icon.svg'
import c from 'styles/components/envelop.module.css'

export const EnvelopIcon = ({ onClick, style }) => {
  return (
    <div className={c.send_request} style={style} onClick={onClick}>
      <img src={envelopIcon} alt="Конверт" />
    </div>
  )
}
