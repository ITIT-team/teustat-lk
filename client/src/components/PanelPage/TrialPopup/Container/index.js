import React from 'react'
import s from 'styles/PanelPage/TrialPopup/container.module.css'

import ImgSrc from 'assets/panel/trialpopup/container_with_boxes.svg'

export const Container = () => {
  return (
    <div className={s.circle}>
      <img src={ImgSrc} alt='Container With Boxes' />
    </div>
  )
}
