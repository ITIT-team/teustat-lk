import React from 'react'
import s from 'styles/Graphic/StartScreen/main.module.css'

export const StartScreen = () => {
  return (
    <div className={s.container}>
      <div className={s.heading}>
        Чтобы построить график, нужно применить все фильтры
      </div>
      <div className={s.add_btn}>
        + Построить график
      </div>
    </div>
  )
}
