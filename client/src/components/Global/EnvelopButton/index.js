import React from 'react'
import st from 'styles/components/envelop.module.css'

export const EnvelopButton = ({ onClick=()=>{} }) => {
  return (
    <div className={st.envelop_button} onClick={onClick}>
      Отправить заявку
    </div>
  )
}
