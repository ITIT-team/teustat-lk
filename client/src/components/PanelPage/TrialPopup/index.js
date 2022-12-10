import React from 'react'
import { BlurPage } from 'components/Global/BlurPage'
import { Container } from './Container'
import { BlurBalls } from './BlurBalls'
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
      </div>
    </BlurPage>
  )
}
