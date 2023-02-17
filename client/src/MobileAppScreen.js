import React from 'react'
import { GOOGLE_PLAY_URL, APP_STORE_URL } from 'constants/GlobalConstants'

import blurHeart from 'assets/mobileappscreen/blur_heart.png'
import mainLogo from 'assets/main/logo.svg'
import googlePlayIcon from 'assets/mobileappscreen/google_play_icon.svg'
import appStoreIcon from 'assets/mobileappscreen/appstore_icon.svg'
import s from 'styles/MobileAppScreen/main.module.css'

export const MobileAppScreen = () => {
  return (
    <div className={s.container}>
      <img src={blurHeart} alt='mobilescreenapp_blur_heart' className={s.blur_heart} />
      <img src={mainLogo} alt='mainlogo_teustat' className={s.main_logo} />
      <h1 className={s.main_text}>TEUSTAT</h1>
      <div className={s.down_plate}>
        <div className={s.plate_text}>
          Для работы с телефона или планшета скачайте мобильное приложение
        </div>
        <div className={s.plate_icons}>
          <a href={GOOGLE_PLAY_URL} target='_blank' rel='noopener noreferrer' className={s.icon_link + ' ' + s.google}>
            <img src={googlePlayIcon} alt='GooglePlay' />
          </a>
          <a href={APP_STORE_URL} target='_blank' rel='noopener noreferrer' className={s.icon_link + ' ' + s.apple}>
            <img src={appStoreIcon} alt='AppStore' />
          </a>
        </div>
      </div>
    </div>
  )
}
