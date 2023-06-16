import React from 'react'
import { Select } from 'components/Global'

import GlobuseIcon from 'assets/myratepage/globus_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/delivery.module.css'

export const DeliveryForm = () => {
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
          logo={GlobuseIcon}
          items={[
            'Экспорт',
            'Импорт',
            'Каботаж'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Тип перевозки *'
          withoutBorder
        />
      </div>
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
          logo={GlobuseIcon}
          items={[
            'Экспорт',
            'Импорт',
            'Каботаж'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Тип перевозки *'
          withoutBorder
        />
      </div>
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
          logo={GlobuseIcon}
          items={[
            'Экспорт',
            'Импорт',
            'Каботаж'
          ]}
          result=''
          setResult={() => { }}
          placeholder='Тип перевозки *'
          withoutBorder
        />
      </div>
    </>
  )
}
