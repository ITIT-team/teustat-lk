import React from 'react'
import { Select } from 'components/Global'

import GlobuseIcon from 'assets/myratepage/globus_icon.svg'
import MapPointIcon from 'assets/panel/tabs/map_point_icon.svg'
import NavigatorIcon from 'assets/panel/tabs/navigator_icon.svg'
import CalendarIcon from 'assets/myratepage/calendar_icon.svg'
import FlagIcon from 'assets/panel/tabs/flag_icon.svg'
import TagIcon from 'assets/myratepage/tag_icon.svg'
import CoinIcon from 'assets/myratepage/coin_icon.svg'
import ArrowInBox from 'assets/myratepage/arrow_in_box.svg'
import ChatIcon from 'assets/myratepage/chat_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/fobfor.module.css'

export const FobForForm = () => {
  return (
    <>
      <div className={s.one_inputs_row}>
        <Select
          logo={GlobuseIcon}
          items={[
            'Экспорт',
            'Импорт',
            'Каботаж'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Тип перевозки *'
        />
        <Select
          logo={CalendarIcon}
          items={[
            'Тут',
            'Будет',
            'Календарь'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Валидность *'
        />
        <Select
          logo={CoinIcon}
          items={[
            'RUB',
            'USD',
            'EUR'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Валюта *'
          withoutBorder
        />
      </div>
      <div className={s.one_inputs_row}>
        <Select
          logo={MapPointIcon}
          items={[
            'Город1',
            'Город2',
            'Город3'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Откуда *'
        />
        <Select
          logo={FlagIcon}
          items={[
            'Город1',
            'Город2',
            'Город3'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Куда *'
        />
        <Select
          logo={ArrowInBox}
          items={[
            'Экспорт',
            'Импорт',
            'Каботаж'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Терминал перевалки *'
          withoutBorder
        />
      </div>
      <div className={s.one_inputs_row}>
        <Select
          logo={NavigatorIcon}
          items={[
            'Станция1',
            'Станция2',
            'Станция3'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Станция отправления *'
        />
        <Select
          logo={TagIcon}
          items={[
            'Здесь',
            'Просто',
            'Цена'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Цена *'
        />
        <Select
          logo={ChatIcon}
          items={[
            'Тут',
            'Просто',
            'Комментарии'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Добавить комментарий'
          withoutBorder
        />
      </div>
    </>
  )
}
