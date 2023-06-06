import React from 'react'
import { RadioButton } from 'components/UserSpace/RadioButton'

import s from 'styles/UserSpace/MyRatesPage/main.module.css'

export const Cards = () => {
  const Card = () => (
    <div className={s.card}>
      <div className={s.radio_button_container}>
        <RadioButton />
      </div>
      <div className={s.last_update}>
        <div className={s.last_update_head}>Последнее обновление</div>
        <div className={s.last_update_value}>11 апреля 2023</div>
      </div>
      <div className={s.validity}>
        <div className={s.validity_head}>Валидность</div>
        <div className={s.validity_value}>с 3.03 по 5.04</div>
      </div>
    </div>
  )

  return (
    <div className={s.cards_container}>
      {
        Array.from(Array(50).keys()).map(card => <Card />)
      }
    </div>
  )
}
