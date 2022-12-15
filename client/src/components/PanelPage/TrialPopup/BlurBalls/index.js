import React from 'react'
import s from 'styles/PanelPage/TrialPopup/blurballs.module.css'

export const BlurBalls = () => {
  return (
    <>
      <div className={s.blurball + ' ' + s.first} />
      <div className={s.blurball + ' ' + s.second} />
      <div className={s.blurball + ' ' + s.third} />
    </>
  )
}
