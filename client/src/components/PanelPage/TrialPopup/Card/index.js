import React, { useState, useEffect } from 'react'
import moment from 'moment'
import s from 'styles/PanelPage/TrialPopup/card.module.css'

import userFile from 'assets/panel/trialpopup/user_file.svg'

export const Card = () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'))

  useEffect(() => {
    const int = () => setTime(moment().format('HH:mm:ss'))

    setInterval(int, 1000)
    return () => {
      clearInterval(int)
    }
  }, [])

  return (
    <div className={s.card}>
      <div className={s.container}>
        <div className={s.time}>{ time }</div>
        <img className={s.user_file} alt='user file' src={userFile} />
        <div className={s.gray_text}>Company name</div>
        <div className={s.coc}>COC</div>
        <div className={s.fourty}>40</div>
        <div className={s.plus}>+3000 руб</div>
        <div className={s.arr}>&uarr;</div>
      </div>
    </div>
  )
}
