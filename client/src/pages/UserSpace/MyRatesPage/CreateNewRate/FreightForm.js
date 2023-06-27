import React from 'react'
import { Select } from 'components/Global'

import GlobuseIcon from 'assets/myratepage/globus_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/freight.module.css'

export const FreightForm = () => {
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
