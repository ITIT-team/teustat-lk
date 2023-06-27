import React from 'react'
import { RadioButton } from 'components/UserSpace/RadioButton'
import {
  ContainerOwnerCell,
  ContainerSizeCell,
  DepartureAndDestinationCell,
} from 'components/PanelPage/Table/Cells'
import { TrashIcon } from 'components/UserSpace/TrashIcon'

import s from 'styles/UserSpace/MyRatesPage/main.module.css'
import { ReactComponent as RewriteIcon } from 'assets/userspace/rewrite_icon.svg'
import { ReactComponent as CopyIcon } from 'assets/main/copy_icon.svg'

export const Cards = () => {
  const Card = () => (
    <div className={s.card}>
      <div className={s.radio_button_container}>
        <RadioButton />
      </div>
      <div className={s.last_update}>
        <div className={s.last_update_head}>Последнее обновление</div>
        <div className={s.last_update_value}>11 апреля 2023</div>
      </div>
      <div className={s.validity}>
        <div className={s.validity_head}>Валидность</div>
        <div className={s.validity_value}>с 3.03 по 5.04</div>
      </div>
      <div className={s.cities}>
        <DepartureAndDestinationCell
          depCity={'Какой-то город'}
          departureCityCountry={'РОССИЯ'}
          destinationCityCountry={'ТУРЦИЯ'}
          depTerminal={'РОССИЯ'}
          desTerminal={'ТУРЦИЯ'}
          desCity={'Тоже какой-то город'}
          full
          asDiv
          isBoldCities
        />
      </div>
      <div className={s.container_size}>
        <ContainerSizeCell
          size={20}
          asDiv
        />
      </div>
      <div className={s.container_owner}>
        <ContainerOwnerCell
          containerOwner={'COC'}
          asDiv
        />
      </div>
      <div className={s.nds}>
        Экспорт НДС 0%
      </div>
      <div className={s.utils_icons}>
        <div className={s.icon}>
          <RewriteIcon />
        </div>
        <div className={s.icon}>
          <CopyIcon />
        </div>
        <TrashIcon />
      </div>
    </div>
  )

  return (
    <div className={s.cards_container}>
      {
        Array.from(Array(50).keys()).map(card => <Card key={card} />)
      }
    </div>
  )
}
