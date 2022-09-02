import React from 'react'
import { useGlobalContext } from 'Context'
import st from 'styles/components/envelop.module.css'

import { PanelLocale } from 'locales'

export const EnvelopButton = ({ onClick=()=>{} }) => {
  const { locale } = useGlobalContext()
  return (
    <div className={st.envelop_button} onClick={onClick}>
      { PanelLocale['отправить_заявку'][locale] }
    </div>
  )
}
