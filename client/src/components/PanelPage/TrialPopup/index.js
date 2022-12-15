import React, { useState, useEffect } from 'react'
import { BlurPage } from 'components/Global/BlurPage'
import { Container } from './Container'
import { BlurBalls } from './BlurBalls'
import { Stonks } from './Stonks'
import { Card } from './Card'

import girlWithLaptop from 'assets/panel/trialpopup/girl_with_laptop.svg'
import s from 'styles/PanelPage/TrialPopup/main.module.css'

export const TrialPopup = ({ withoutTimeout=false, onClose=()=>{} }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!withoutTimeout) {
      const timeout = () => setShow(true)
      setTimeout(timeout, 20000)
      return () => clearTimeout(timeout)
    }
  }, [withoutTimeout])

  return (show || withoutTimeout) ? (
    <BlurPage onClick={() => {
      setShow(false)
      onClose()
    }} black>
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
        <div className={s.request_text}>
          Отправьте запрос на заключение договора
        </div>
        <div className={s.btns_container}>
          <div
            className={s.cancel_btn}
            onClick={() => {
              setShow(false)
              onClose()
            }}
          >Отмена</div>
          <div
            className={s.submit_btn}
            onClick={() => window.location.href = 'https://teustat.ru/#mainform'}
          >Отправить запрос</div>
        </div>
      </div>
    </BlurPage>
  ) : false
}
