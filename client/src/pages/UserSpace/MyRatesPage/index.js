import React from 'react'
import { Button } from 'components/Global/Button'

import { ReactComponent as SettingIcon } from 'assets/userspace/settings_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/main.module.css'

export const MyRatesPage = () => {
  return (
    <div className={s.my_rates_page_container}>
      <div className={s.header_buttons}>
        <SettingIcon
          className={s.setting_icon}
          data-prompt-text-black='Настройки'
        />
        <h1>Мои ставки</h1>
        <Button
          style={{
            marginLeft: 30
          }}
        >+ Добавить новые</Button>
      </div>
    </div>
  )
}
