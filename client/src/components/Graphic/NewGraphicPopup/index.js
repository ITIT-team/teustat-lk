import React from 'react'

import { BlurPage } from 'components/Global/BlurPage'
import s from 'styles/Graphic/NewGraphicPopup/main.module.css'

export const NewGraphicPopup = ({ onClosePopup=()=>{} }) => {
  return (
    <BlurPage onClick={onClosePopup} black>
      <div onClick={e => e.stopPropagation()} className={s.container}>
        <div className={s.heading}>Заполните все фильтры</div>
      </div>
    </BlurPage>
  )
} 
