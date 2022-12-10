import React from 'react'
import { BlurPage } from 'components/Global/BlurPage'
import { Container } from './Container'
import { BlurBalls } from './BlurBalls'
import { Stonks } from './Stonks'
import { Card } from './Card'

import girlWithLaptop from 'assets/panel/trialpopup/girl_with_laptop.svg'
import s from 'styles/PanelPage/TrialPopup/main.module.css'

export const TrialPopup = ({ onClose=()=>{} }) => {
  return (
    <BlurPage onClick={onClose} black>
      <div className={s.container}>
        <div className={s.header}>
          Ставки <Container /> доступны
        </div>
        <div className={s.header}>
          в платной версии
        </div>
        <BlurBalls />
        <img className={s.girl} src={girlWithLaptop} alt='girl' />
        <Stonks />
        <Card />
      </div>
    </BlurPage>
  )
}
